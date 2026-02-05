"use node";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import nodemailer from "nodemailer";

// SMTP configuration for mail.auralasu.pl
const smtpConfig = {
    host: "mail.auralasu.pl",
    port: 465,
    secure: true, // SSL/TLS
    auth: {
        user: "test@auralasu.pl",
        pass: "Vh_w0JTA55!", // Hardcoded for immediate fix
    },
};

export const sendContactEmail = action({
    args: {
        email: v.string(),
        subject: v.string(),
        message: v.string(),
        filesInfo: v.optional(v.string()), // Kept for text backup
        attachments: v.optional(v.array(v.object({
            storageId: v.string(),
            name: v.string(),
            type: v.string(),
        }))),
    },
    handler: async (ctx, args) => {
        const { email, subject, message, filesInfo, attachments } = args;

        console.log("Sending email from:", email);

        // Generate file links
        let fileLinksHtml = "";
        if (attachments && attachments.length > 0) {
            fileLinksHtml = `<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                <p style="margin-bottom: 10px; font-weight: bold; color: #333;">Załączone pliki:</p>
                <ul style="list-style: none; padding: 0; margin: 0;">`;

            for (const file of attachments) {
                // Get a temporary signed URL
                const url = await ctx.storage.getUrl(file.storageId);
                // Extract extension
                const extension = file.name.split('.').pop()?.toUpperCase() || 'PLIK';

                if (url) {
                    fileLinksHtml += `
                    <li style="margin-bottom: 8px;">
                        <a href="${url}" style="display: inline-flex; align-items: center; padding: 8px 12px; background-color: #f3f4f6; color: #2563eb; text-decoration: none; border-radius: 6px; font-size: 14px;">
                            <span style="margin-right: 6px;">📎</span> 
                            <strong>${file.name}</strong> 
                            <span style="color: #6b7280; font-size: 12px; margin-left: 6px;">(${extension})</span>
                        </a>
                    </li>`;
                }
            }
            fileLinksHtml += `</ul></div>`;
        }

        const transporter = nodemailer.createTransport(smtpConfig);

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f9fafb; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                .header { background-color: #000000; padding: 30px 40px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
                .content { padding: 40px; }
                .field { margin-bottom: 24px; }
                .label { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin-bottom: 8px; font-weight: 600; }
                .value { font-size: 16px; color: #111827; background-color: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
                .message-box { font-size: 16px; color: #111827; background-color: #f9fafb; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb; white-space: pre-wrap; }
                .footer { padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>DrukMajster3D</h1>
                </div>
                <div class="content">
                    <div style="margin-bottom: 30px;">
                        <h2 style="margin: 0 0 10px 0; font-size: 20px; color: #111;">Nowe zgłoszenie kontaktowe</h2>
                        <p style="margin: 0; color: #666; font-size: 14px;">Otrzymano nową wiadomość przez formularz na stronie.</p>
                    </div>

                    <div class="field">
                        <span class="label">Od</span>
                        <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
                    </div>

                    <div class="field">
                        <span class="label">Temat</span>
                        <div class="value">${subject}</div>
                    </div>

                    <div class="field">
                        <span class="label">Wiadomość</span>
                        <div class="message-box">${message}</div>
                    </div>

                    ${fileLinksHtml}
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} DrukMajster3D. Wiadomość wygenerowana automatycznie.
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: '"DrukMajster3D Formularz" <test@auralasu.pl>',
            replyTo: email,
            to: "test@auralasu.pl",
            subject: `[WWW] ${subject}`,
            text: `Od: ${email}\nTemat: ${subject}\n\n${message}\n\n${filesInfo || ""}`,
            html: htmlContent,
        };

        try {
            await transporter.sendMail(mailOptions);

            await ctx.runMutation(api.contacts.logSubmission, {
                email,
                subject,
                message,
                filesInfo,
                attachments,
            });

            return { success: true };
        } catch (error) {
            console.error("SMTP Error:", error);
            const errMsg = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Błąd wysyłania: ${errMsg}`);
        }
    },
});
