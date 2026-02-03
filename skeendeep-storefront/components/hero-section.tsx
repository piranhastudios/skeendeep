import Image from "next/image"
import { Button } from "@/components/ui/button"
import LocalizedClientLink from "@/components/common/localized-client-link"
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { client } from "@/lib/sanity/client"
import type { SanityDocument } from "next-sanity"

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export function HeroSection({ homePageData }: { homePageData?: SanityDocument }) {
  const heroImageUrl = homePageData?.heroImage
    ? urlFor(homePageData.heroImage)?.width(1920).height(1080).url()
    : null

  const heading = homePageData?.heroHeading || "SHAPING SPACES,\nNOT FILLING THEM"
  const description = homePageData?.heroDescription || "NDARA brings together interior design thinking and ecommerce craft to create a considered way of furnishing a home."

  return (
    <section className="bg-white px-2 pb-2 md:px-4 md:pb-4 -mt-8 md:-mt-12">
      <div className="relative min-h-[85vh] md:min-h-screen rounded-2xl md:rounded-3xl overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl || "/images/image.jpg"}
            alt="Luxurious brown velvet sofa in a warm, earthy living space"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-16 md:pt-28 flex flex-col justify-center min-h-[85vh] md:min-h-screen">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight text-balance">
              {heading.split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < heading.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="mt-6 text-white/80 text-sm md:text-base max-w-md leading-relaxed">
              {description}
            </p>
            <div className={"flex space-x-4"}>
              <LocalizedClientLink href="/book">
                <Button
                  className="mt-8 bg-background text-foreground hover:cursor-pointer hover:bg-background/90 rounded-full px-8 py-6 text-sm font-medium"
                >
                  Book an Appointment
                </Button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/products">
                <Button
                  className="mt-8 bg-foreground text-background hover:cursor-pointer hover:bg-foreground/90 rounded-full px-8 py-6 text-sm font-medium"
                >
                  Explore Products
                </Button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
