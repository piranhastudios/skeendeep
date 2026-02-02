import Image from "next/image"
import { Button } from "@/components/ui/button"
import LocalizedClientLink from "@/components/common/localized-client-link"

export function SustainabilitySection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight tracking-tight">
              MATERIAL
              <br />
              INTEGRITY
              <br />
              MATTERS.
            </h2>
            
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Our commitment to texture and restraint starts with the
              materials we choose. Every piece begins with responsibly
              sourced wood from certified sustainable forests.
            </p>

            <LocalizedClientLink href="/about/#sustainability">
              <Button 
                className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm px-8 py-6 text-sm font-medium"
              >
                Our Materials
              </Button>
            </LocalizedClientLink>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
              alt="Modern curved sofa in sustainable materials"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
