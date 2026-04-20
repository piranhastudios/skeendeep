"use client"

import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function FeaturedTestimonialCard({ testimonial }: { testimonial: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldShowReadMore = testimonial.text?.length > 250

  return (
    <div className="bg-card border border-border rounded-xl p-8 relative">
      <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />
      
      <div className="flex items-center gap-0.5 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      
      <div className="mb-8">
        <p className={cn(
          "text-foreground leading-relaxed",
          !isExpanded && shouldShowReadMore && "line-clamp-4"
        )}>
          &ldquo;{testimonial.text || ""}&rdquo;
        </p>
        {shouldShowReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-accent text-sm font-medium mt-2 hover:underline"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialCard({ testimonial }: { testimonial: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldShowReadMore = testimonial.text?.length > 200

  return (
    <div className="bg-background rounded-xl p-8 flex gap-6">
      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={testimonial.image || "/placeholder.svg"}
          alt={testimonial.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3.5 h-3.5",
                i < testimonial.rating
                  ? "fill-accent text-accent"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>
        <div className="mb-4">
          <p className={cn(
            "text-foreground text-sm leading-relaxed",
            !isExpanded && shouldShowReadMore && "line-clamp-4"
          )}>
            &ldquo;{testimonial.text || ""}&rdquo;
          </p>
          {shouldShowReadMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-accent text-xs font-medium mt-1 hover:underline"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
        <div>
          <h4 className="font-medium text-foreground text-sm">{testimonial.name}</h4>
          <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
        </div>
      </div>
    </div>
  )
}
