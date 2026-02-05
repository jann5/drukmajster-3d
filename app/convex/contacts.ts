import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const logSubmission = mutation({
    args: {
        email: v.string(),
        subject: v.string(),
        message: v.string(),
        filesInfo: v.optional(v.string()),
        attachments: v.optional(v.array(v.object({
            storageId: v.string(),
            name: v.string(),
            type: v.string(),
        }))),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("contacts", {
            ...args,
            sentAt: Date.now(),
        });
    },
});
