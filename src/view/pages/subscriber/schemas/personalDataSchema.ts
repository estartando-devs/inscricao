import { z } from 'zod';

export const personalDataSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  birth: z.string().min(8, 'Data obrigatória'),
  phone: z.string().min(8, 'Telefone obrigatório'),
});

export type PersonalData = z.infer<typeof personalDataSchema>;
