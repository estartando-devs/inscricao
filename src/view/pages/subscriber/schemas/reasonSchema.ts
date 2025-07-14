import { z } from 'zod';

export const reasonSchema = z.object({
  reason: z.string().min(50, 'Conte um pouco mais sobre seu motivo para participar.').max(500, 'Máximo de 500 caracteres.'),
});
