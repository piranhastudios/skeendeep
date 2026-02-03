import Image from "next/image"
import { Button } from "@/components/ui/button"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"
import { client } from "@/lib/sanity/client"
import type { SanityDocument } from "next-sanity"
import LocalizedClientLink from "./common/localized-client-link"

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export function CustomizeSection({ homePageData }: { homePageData?: SanityDocument }) {
  const customizeImageUrl = homePageData?.customizeImage
    ? urlFor(homePageData.customizeImage)?.width(800).height(800).url()
    : null

  const heading = homePageData?.customizeHeading || "CURATED FOR\nHOW YOU LIVE"
  const description = homePageData?.customizeDescription || "We believe in curation over trends. Our collection brings together pieces that honor materiality and proportion, making intentional choices easier in a world full of options."

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={customizeImageUrl || "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80"}
              alt="Elegant table lamp with wooden base in a warm interior setting"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:pl-8 lg:pl-16">
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
            <LocalizedClientLink href="/services">
              <Button
                className="mt-8 bg-accent hover:cursor-pointer text-accent-foreground hover:bg-accent/90 rounded-sm px-8 py-6 text-sm font-medium"
              >
                Explore Services
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}
