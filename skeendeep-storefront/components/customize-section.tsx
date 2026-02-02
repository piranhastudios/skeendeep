import Image from "next/image"
import { Button } from "@/components/ui/button"

export function CustomizeSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80"
              alt="Elegant table lamp with wooden base in a warm interior setting"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:pl-8 lg:pl-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight tracking-tight">
              CURATED FOR
              <br />
              HOW YOU LIVE
            </h2>
            
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              We believe in curation over trends. Our collection brings together
              pieces that honor materiality and proportion, making intentional
              choices easier in a world full of options.
            </p>

            <Button 
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm px-8 py-6 text-sm font-medium"
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
