import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Publicly accessible query to fetch projects
export const get = query({
    args: {},
    handler: async (ctx) => {
        const projects = await ctx.db.query("projects").collect();
        // Sort by order asc, then by createdAt desc as fallback
        return projects.sort((a, b) => {
            const orderA = a.order ?? Infinity; // New items might not have order yet
            const orderB = b.order ?? Infinity;
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return b.createdAt - a.createdAt;
        });
    },
});

// Admin-only mutations protected by a password check

export const verifyPassword = mutation({
    args: { password: v.string() },
    handler: async (_, args) => {
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "drukmajster3d";
        return args.password === ADMIN_PASSWORD;
    },
});

export const add = mutation({
    args: {
        password: v.string(),
        title: v.string(),
        category: v.string(),
        image: v.string(),
        size: v.string(),
    },
    handler: async (ctx, args) => {
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "drukmajster3d";

        if (args.password !== ADMIN_PASSWORD) {
            throw new Error("Unauthorized: Invalid password");
        }

        // Get max order to append to end
        const projects = await ctx.db.query("projects").collect();
        const maxOrder = projects.reduce((max, p) => Math.max(max, p.order ?? 0), 0);

        await ctx.db.insert("projects", {
            title: args.title,
            category: args.category,
            image: args.image,
            size: args.size,
            order: maxOrder + 1,
            createdAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: {
        password: v.string(),
        id: v.id("projects"),
    },
    handler: async (ctx, args) => {
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "drukmajster3d";

        if (args.password !== ADMIN_PASSWORD) {
            throw new Error("Unauthorized: Invalid password");
        }

        await ctx.db.delete(args.id);
    },
});

export const updateOrder = mutation({
    args: {
        password: v.string(),
        projects: v.array(v.object({
            id: v.id("projects"),
            order: v.number(),
        })),
    },
    handler: async (ctx, args) => {
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "drukmajster3d";
        if (args.password !== ADMIN_PASSWORD) {
            throw new Error("Unauthorized: Invalid password");
        }

        // Parallel updates for efficiency
        await Promise.all(
            args.projects.map(async (p) => {
                await ctx.db.patch(p.id, { order: p.order });
            })
        );
    },
});
