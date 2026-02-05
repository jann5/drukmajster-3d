import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    contacts: defineTable({
        email: v.string(),
        subject: v.string(),
        message: v.string(),
        filesInfo: v.optional(v.string()),
        // Legacy field for backward compatibility
        storageIds: v.optional(v.array(v.string())),
        attachments: v.optional(v.array(v.object({
            storageId: v.string(),
            name: v.string(),
            type: v.string(),
        }))),
        sentAt: v.number(), // timestamp
    }),
    projects: defineTable({
        title: v.string(),
        category: v.string(),
        image: v.string(),
        size: v.string(),
        order: v.optional(v.number()),
        createdAt: v.number(),
    }),
    visits: defineTable({
        ip: v.string(),
        userAgent: v.string(),
        path: v.string(),
        timestamp: v.number(),
    }).index("by_timestamp", ["timestamp"]),
});
