import { z } from 'zod';

export const experienceSchema = z.object({
  experience: z.string().min(50, 'Descreva sua experiência ou diga que está começando agora.').max(500, 'Máximo de 500 caracteres.'),
});
