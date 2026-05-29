import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Debe ingresar un correo electrónico válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .min(1, { message: 'La contraseña es requerida' }),
})

export type LoginInput = z.infer<typeof loginSchema>
