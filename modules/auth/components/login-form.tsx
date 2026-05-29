'use client'

import * as React from 'react'
import { Dumbbell, Eye, EyeOff, Loader2, Lock, Mail, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '../hooks/use-login'

export function LoginForm() {
  const { form, onSubmit, isPending, error } = useLogin()
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-surface-container-low dark:bg-black">
      <Card className="w-full max-w-4xl overflow-hidden border-border bg-card shadow-ambient rounded-xl md:grid md:grid-cols-2 md:p-0">
        
        {/* Panel izquierdo decorativo (Oculto en móvil) */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-brand-primary-container text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white shadow-md">
              <Dumbbell className="h-6 w-6" />
            </div>
            <span className="font-heading text-2xl font-black tracking-tight text-white">
              GES<span className="text-brand-primary">BOX</span>
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-extrabold leading-tight">
              Control total en el mostrador de tu gimnasio.
            </h2>
            <p className="text-sm text-zinc-300">
              Registra pagos manuales, valida ingresos al instante mediante número de cédula y evita el acceso de clientes morosos.
            </p>
          </div>

          <div className="text-xs text-zinc-400">
            GESBOX v1.0.0 &copy; {new Date().getFullYear()} - Gestión de Gimnasios en Colombia.
          </div>

          {/* Efectos decorativos de fondo */}
          <div className="absolute top-1/4 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-brand-primary-container/10 rounded-full blur-3xl" />
        </div>

        {/* Panel derecho: Formulario */}
        <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
          <div>
            <div className="flex items-center gap-2 md:hidden mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="font-heading text-xl font-black tracking-tight">
                GES<span className="text-brand-primary">BOX</span>
              </span>
            </div>

            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">
                ¡Bienvenido de nuevo!
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Ingresa tus credenciales de Recepcionista o Administrador para acceder.
              </CardDescription>
            </CardHeader>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Alerta de Error General */}
              {error && (
                <div className="flex items-start gap-2 p-3 text-xs rounded-lg border border-brand-error/20 bg-brand-error/10 text-brand-error animate-[fadeIn_0.2s_ease-out]">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="font-medium">{error}</p>
                </div>
              )}

              {/* Campo: Correo Electrónico */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nombre@gimnasio.com"
                    className="pl-9 pr-4 h-9 border-input focus:border-ring focus:ring-ring bg-surface-container-lowest"
                    disabled={isPending}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] font-medium text-brand-error animate-[fadeIn_0.2s_ease-out]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Campo: Contraseña */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                    Contraseña
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-9 pr-10 h-9 border-input focus:border-ring focus:ring-ring bg-surface-container-lowest"
                    disabled={isPending}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] font-medium text-brand-error animate-[fadeIn_0.2s_ease-out]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Botón de Enviar */}
              <Button
                type="submit"
                className="w-full h-10 mt-2 bg-brand-primary text-white hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-2 font-medium"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Ingresar al Sistema'
                )}
              </Button>
            </form>
          </div>

          <CardFooter className="p-0 mt-6 text-center text-xs text-muted-foreground justify-center md:hidden">
            GESBOX &copy; {new Date().getFullYear()} - Control de gimnasio.
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}
