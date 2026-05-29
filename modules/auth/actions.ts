'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema, type LoginInput } from './schemas'

export async function loginAction(data: LoginInput) {
  // 1. Validar datos en el servidor
  const validation = loginSchema.safeParse(data)
  if (!validation.success) {
    return {
      success: false,
      error: 'Datos de inicio de sesión no válidos.',
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validation.data
  const supabase = await createClient()

  try {
    // 2. Intentar iniciar sesión en Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Traducir mensajes de error comunes de Supabase Auth
      let errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo.'
      
      if (error.status === 400 || error.message.toLowerCase().includes('invalid login credentials')) {
        errorMessage = 'Correo electrónico o contraseña incorrectos.'
      } else if (error.message.toLowerCase().includes('email not confirmed')) {
        errorMessage = 'El correo electrónico asociado no ha sido confirmado.'
      } else if (error.message.toLowerCase().includes('rate limit')) {
        errorMessage = 'Demasiados intentos fallidos. Por favor, espera un momento.'
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    return {
      success: true,
    }
  } catch (err) {
    return {
      success: false,
      error: 'Ha ocurrido un error inesperado de red o servidor.',
    }
  }
}
