import { z } from 'zod';

export const bookSchema = z.object({
    title: z.string().min(1, 'Title must have at least 1 character'),
    author: z.string().min(1, 'Author must have at least 1 character'),
});