"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import React from "react"
import { useFormStatus } from "react-dom"

const variantMap = {
  primary: "default",
  secondary: "secondary",
  transparent: "ghost",
  danger: "destructive",
} as const

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      size="lg"
      className={className}
      type="submit"
      disabled={pending}
      variant={variantMap[variant || "primary"]}
      data-testid={dataTestId}
    >
      {pending && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  )
}
