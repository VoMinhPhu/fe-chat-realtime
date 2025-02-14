"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CircleCheckBig, CircleX } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, status, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-4">
              {status === 'error'
                ? (<div className="flex items-center"><CircleX color="red" /></div>)
                : (<div className="flex items-center"><CircleCheckBig color="#18d832" /></div>)}
              <div>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription className={status === 'error' ? 'text-red-600' : ''}>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
