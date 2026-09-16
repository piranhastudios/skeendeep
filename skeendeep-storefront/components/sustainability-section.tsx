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

  const heading = homePageData?.sustainabilityHeading || "SAFETY AND\nRESULTS,\nALWAYS."
  const description = homePageData?.sustainabilityDescription || "Every treatment at SkeenDeep is carried out by experienced medical professionals using clinically regulated, evidence-based products and technology."

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

            <LocalizedClientLink href="/about">
              <Button 
                className="mt-8 bg-accent hover:cursor-pointer text-accent-foreground hover:bg-accent/90 rounded-sm px-8 py-6 text-sm font-medium"
              >
                Meet the Clinic
              </Button>
            </LocalizedClientLink>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={sustainabilityImageUrl || "/img_9385_538_kb.jpg"}
              alt="SkeenDeep Medical Aesthetics Clinic"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
