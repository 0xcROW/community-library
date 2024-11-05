import {z} from 'zod'

const userSchema = z.object({
    username: z.string().min(3, 'User name is required!'),
    email: z.string().email('Invalid email address!'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
    avatar: z.string().url('Invalid URL').optional()
});

// const userIdSchema = z.object({
//     id: z.string().uuid('Invalid UUID')
// });

const userIdSchema = z.object({
    id: z.number().int('ID must be an Integer').positive('ID must be positive')
});

export {userSchema, userIdSchema};