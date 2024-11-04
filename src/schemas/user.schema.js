import {z} from 'zod'

const userSchema = z.object({
    username: z.string().min(3, 'User name is required!'),
    email: z.string().email('Invalid email address!'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
    avatar: z.string().url('Invalid URL').optional()
})

export {userSchema}