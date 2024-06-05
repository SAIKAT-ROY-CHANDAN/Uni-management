import { z } from "zod";

const userValidationSchema = z.object({
    id: z.string({ invalid_type_error: 'Password must be string' }),
    password: z.string().max(20,
        {
            message: "Password Can not be more than 20 characters"
        }).optional(),
})

export const UserValidation = {
    userValidationSchema
} 