"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

// Simple toaster — for production use shadcn/ui's sonner integration
let addToastFn: ((message: string, type?: ToastType) => void) | null = null

export function toast(message: string, type: ToastType = "info") {
  addToastFn?.(message, type)
}

const typeStyles: Record<ToastType, string> = {
  success: "border-aegis-green-400/30 bg-aegis-green-400/10 text-aegis-green-400",
  error: "border-aegis-critical/30 bg-aegis-critical/10 text-aegis-critical",
  warning: "border-aegis-medium/30 bg-aegis-medium/10 text-aegis-medium",
  info: "border-aegis-blue-400/30 bg-aegis-blue-400/10 text-aegis-blue-300",
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    addToastFn = (message, type = "info") => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
    }
    return () => { addToastFn = null }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-lg border px-4 py-3 text-sm font-medium backdrop-blur-sm shadow-aegis-md",
            "animate-slide-in-right",
            typeStyles[t.type],
          )}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
