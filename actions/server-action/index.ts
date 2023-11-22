import * as z from 'zod';
// create server
export const serverSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
});

export type ServerSchema = z.infer<typeof serverSchema>;
