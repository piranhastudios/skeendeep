"use client"

import React, { Suspense } from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LocalizedClientLink from "@/components/common/localized-client-link"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, token }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.message || "Something went wrong. Please try again.")
        return
      }

      setSuccess(true)
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token || !email) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Invalid reset link
        </h1>
        <p className="mt-2 text-muted-foreground">
          This password reset link is invalid or incomplete. Please request a
          new one.
        </p>
        <div className="mt-8">
          <LocalizedClientLink href="/auth/forgot-password">
            <Button className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-full">
              Request New Link
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-accent" />
          </div>
        </div>
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Password updated
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your password has been reset successfully. You can now sign in with
          your new password.
        </p>
        <div className="mt-8">
          <LocalizedClientLink href="/auth">
            <Button className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-full">
              Sign In
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Reset your password
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter a new password for <span className="font-medium text-foreground">{email}</span>.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-12"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Reset Password"}
        </Button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80"
          alt="Elegant interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <LocalizedClientLink
            href="/auth"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </LocalizedClientLink>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link href="/" className="flex justify-center mb-8">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={48}
                className="h-10 w-auto"
              />
            </Link>

            <Suspense fallback={null}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
