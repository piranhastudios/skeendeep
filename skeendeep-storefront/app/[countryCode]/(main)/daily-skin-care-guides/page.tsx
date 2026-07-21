import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { client, urlFor } from "@/lib/sanity/client"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { Button } from "@/components/ui/button"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: 'Daily Skin Care Guides',
  description: 'Practical, medically sound skin care advice from Dr Adeline Afong. Simple routines and expert guidance to keep your skin healthy between treatments.',
}

const GUIDES_QUERY = `{
  "page": *[_type == "skinCareGuidesPage"][0]{headerSection, ctaSection},
  "guides": *[_type == "skinCareGuide" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    image,
    publishedAt
  }
}`

const fallbackImages = [
  "https://images.unsplash.com/photo-1648203276014-20f97ba1f817?w=800&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
]

async function getGuidesData() {
  return client.fetch(GUIDES_QUERY, {}, { next: { revalidate: 30 } })
}

export default async function SkinCareGuidesPage() {
  const data = await getGuidesData()

  const headerSection = data?.page?.headerSection || {
    title: "Daily Skin Care Guides",
    description: "Practical, medically sound skin care advice from Dr Adeline Afong. Simple routines and expert guidance to keep your skin healthy between treatments.",
  }
  const ctaSection = data?.page?.ctaSection || {
    title: "Need Personalised Advice?",
    description: "Every skin is different. Book a consultation with Dr Afong for a thorough assessment and a treatment plan designed around your skin.",
    buttonText: "Book a Consultation",
  }
  const guides = data?.guides || []

  return (
    <div className="min-h-screen bg-background">

      {/* Page Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
            {headerSection.title}
          </h1>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            {headerSection.description}
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {guides.length === 0 ? (
            <p className="text-center text-muted-foreground">
              New guides are on their way. Check back soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide: any, index: number) => (
                <LocalizedClientLink
                  key={guide._id}
                  href={`/daily-skin-care-guides/${guide.slug}`}
                  className="group flex flex-col bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={guide.image ? urlFor(guide.image).width(800).url() : fallbackImages[index % fallbackImages.length]}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    {guide.category && (
                      <span className="text-accent uppercase tracking-wider text-xs font-medium mb-3">
                        {guide.category}
                      </span>
                    )}
                    <h2 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                      {guide.title}
                    </h2>
                    {guide.excerpt && (
                      <p className="mt-3 text-muted-foreground text-sm leading-relaxed flex-1">
                        {guide.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      Read guide
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
            {ctaSection.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {ctaSection.description}
          </p>
          <Button
            asChild
            className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm px-8 py-6 text-sm font-medium"
          >
            <LocalizedClientLink href="/book">
              {ctaSection.buttonText}
            </LocalizedClientLink>
          </Button>
        </div>
      </section>

    </div>
  )
}
