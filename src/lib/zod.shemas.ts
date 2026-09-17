import {z} from "zod";

export const loginZodShema = z.object({
    email: z.string().trim().pipe(z.email("Invalid email format")),
    password: z.string().min(6, "Password must be at least 6 characters long"),  
});

export const resgisterZodShema = z.object({
    email: z.string().trim().pipe(z.email("Invalid email format")),
    displayName: z.string().trim().min(1, "Displayname name is required").max(50, "Display name must be at most 50 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't coincidence",
    path: ["confirmPassword"]
});

export const updatePrfileZodShema = z.object({
    displayName: z.string().trim().min(1, "Displayname name is required").max(50, "Display name must be at most 50 characters long"),
    photoUrl: z.union([z.url("Invalid URL format"), z.literal("")]).optional()
});

export const createTaskZodShema = z.object({
    title: z.string().trim().min(1, "Title is required").max(50, "Title name must be at most 25 characters long"),
    description: z.string().max(500, "Description must be at most 500 characters long").optional()
});

export const messageZodSchema = z.object({
    text: z.string().trim().min(1, "Escriba algo por favor")
})

export const searchFriendZodSchema = z.object({
    email: z.string().trim().pipe(z.email("Invalid email format")),
})

export type LoginZodShemaType = z.infer<typeof loginZodShema>;
export type RegisterZodShemaType = z.infer<typeof resgisterZodShema>;
export type UpdateProfileZodShemaType = z.infer<typeof updatePrfileZodShema>;
export type CreateTaskZodShemaType = z.infer<typeof createTaskZodShema>;
export type MessageZodSchemaType = z.infer<typeof messageZodSchema>;
export type SearchFriendSchemaType = z.infer<typeof searchFriendZodSchema>;