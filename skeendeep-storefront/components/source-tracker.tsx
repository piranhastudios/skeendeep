"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import posthog from "posthog-js"

export function SourceTracker() {
  const source = useSearchParams().get("source")

  useEffect(() => {
    if (!source) return

    posthog.register({ source })
    posthog.capture("source_visit", { source })
  }, [source])

  return null
}
