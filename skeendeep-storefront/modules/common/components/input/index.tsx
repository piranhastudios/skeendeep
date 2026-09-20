import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 text-sm font-medium text-foreground">
            {topLabel}
          </Label>
        )}
        <div className="relative w-full">
          <input
            type={inputType}
            name={name}
            id={name}
            placeholder=" "
            required={required}
            className="peer block w-full h-12 px-4 pt-4 pb-0 bg-card text-sm text-foreground border border-input rounded-md appearance-none transition-colors focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 hover:border-foreground/30"
            {...props}
            ref={inputRef}
          />
          {/* Floating label: sits centered while the input is empty and
              unfocused (placeholder-shown), floats up on focus or content.
              peer-focus must come after peer-placeholder-shown so it wins
              when both apply (empty + focused). */}
          <label
            htmlFor={name}
            className="pointer-events-none absolute left-4 top-1.5 text-xs text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground px-4 focus:outline-none transition-all duration-150 outline-none focus:text-foreground absolute right-0 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
