import Image from "next/image"
import { Button } from "@/components/ui/button"
import LocalizedClientLink from "@/components/common/localized-client-link"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"
import { client } from "@/lib/sanity/client"
import type { SanityDocument } from "next-sanity"

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export function SustainabilitySection({ homePageData }: { homePageData?: SanityDocument }) {
  const sustainabilityImageUrl = homePageData?.sustainabilityImage
    ? urlFor(homePageData.sustainabilityImage)?.width(800).height(600).url()
    : null

  const heading = homePageData?.sustainabilityHeading || "MATERIAL\nINTEGRITY\nMATTERS."
  const description = homePageData?.sustainabilityDescription || "Our commitment to texture and restraint starts with the materials we choose. Every piece begins with responsibly sourced wood from certified sustainable forests."

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight tracking-tight">
              {heading.split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < heading.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              {description}
            </p>

            <LocalizedClientLink href="/about/#sustainability">
              <Button 
                className="mt-8 bg-accent hover:cursor-pointer text-accent-foreground hover:bg-accent/90 rounded-sm px-8 py-6 text-sm font-medium"
              >
                Testimonials
              </Button>
            </LocalizedClientLink>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={sustainabilityImageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"}
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
