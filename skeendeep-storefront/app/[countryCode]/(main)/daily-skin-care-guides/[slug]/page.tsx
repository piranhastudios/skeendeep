import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { PortableText } from "next-sanity"
import { client, urlFor } from "@/lib/sanity/client"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { Button } from "@/components/ui/button"
import { type Metadata } from "next"

const GUIDE_QUERY = `*[_type == "skinCareGuide" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  category,
  image,
  publishedAt,
  body
}`

async function getGuide(slug: string) {
  return client.fetch(GUIDE_QUERY, { slug }, { next: { revalidate: 30 } })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) {
    return { title: "Guide Not Found" }
  }
  return {
    title: guide.title,
    description: guide.excerpt,
  }
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground tracking-tight mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground tracking-tight mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-muted-foreground leading-relaxed mb-5">{children}</p>
    ),
  },
  types: {
    image: ({ value }: any) =>
      value?.asset ? (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
      ) : null,
  },
}

export default async function SkinCareGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = await getGuide(slug)

  if (!guide) {
    notFound()
  }

  const publishedDate = guide.publishedAt
    ? new Date(guide.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <LocalizedClientLink
            href="/daily-skin-care-guides"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Skin Care Guides
          </LocalizedClientLink>
          {guide.category && (
            <p className="text-accent uppercase tracking-wider text-sm font-medium">
              {guide.category}
            </p>
          )}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight mt-3">
            {guide.title}
          </h1>
          {publishedDate && (
            <p className="mt-4 text-sm text-muted-foreground">{publishedDate}</p>
          )}
        </div>
      </section>

      {/* Cover image */}
      {guide.image && (
        <div className="container mx-auto px-6 max-w-3xl -mt-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={urlFor(guide.image).width(1200).url()}
              alt={guide.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <PortableText value={guide.body || []} components={portableTextComponents} />
        </div>
      </article>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground tracking-tight">
              Have Questions About Your Skin?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Book a consultation with Dr Afong for a thorough assessment and advice tailored to your skin.
            </p>
            <Button
              asChild
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm px-8 py-6 text-sm font-medium"
            >
              <LocalizedClientLink href="/book">
                Book a Consultation
              </LocalizedClientLink>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
