import { client } from "@/lib/sanity/client"
import { type SanityDocument } from "next-sanity"
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { type Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {reviewsData} from "@/lib/data/reveiws"
import { FeaturedTestimonialCard, TestimonialCard } from "./testimonial-cards"

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'See what our clients say about SkeenDeep Medical Aesthetics Clinic. We are committed to helping you achieve your cosmetic results.',
}

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const TESTIMONIALS_PAGE_QUERY = `*[_type == "testimonialsPage"] | order(publishedAt desc)[0]{
  _id,
  title,
  headerDescription,
  stats[]{
    value,
    label
  },
  testimonials[]{
    name,
    role,
    location,
    rating,
    text,
    image,
    featured
  },
  ctaTitle,
  ctaDescription
}`

const options = { next: { revalidate: 30 } }

// Transform Google reviews into testimonial format
const googleReviews = (reviewsData as any).data?.[0]?.reviews_data || []
const defaultTestimonials = googleReviews
  .filter((review: any) => review.review_text && review.review_text.trim().length > 0)
  .map((review: any, index: number) => ({
    id: index + 1,
    name: review.author_title,
    role: "Verified Patient",
    location: (reviewsData as any).data?.[0]?.city || "Birmingham",
    rating: review.review_rating,
    text: review.review_text,
    image: review.author_image,
    featured: index < 3, // First 3 reviews are featured
  }))

const businessData = (reviewsData as any).data?.[0]
const defaultStats = [
  { value: businessData?.rating?.toString() || "5.0", label: "Average Rating" },
  { value: businessData?.reviews?.toString() || "13", label: "Total Reviews" },
  { value: "100%", label: "5-Star Reviews" },
  { value: "Verified", label: "Google Reviews" },
]

export default async function TestimonialsPage() {
  const pageData = await client.fetch<SanityDocument>(
    TESTIMONIALS_PAGE_QUERY,
    {},
    options
  )

  const testimonials = pageData?.testimonials?.map((testimonial: any, index: number) => ({
    ...testimonial,
    id: index + 1,
    image: testimonial.image ? urlFor(testimonial.image)?.width(200).height(200).url() : null,
  })) || defaultTestimonials

  const stats = pageData?.stats || defaultStats
  const pageTitle = pageData?.title || "Testimonials"
  const headerDescription = pageData?.headerDescription || "Hear from our customers about their experience with NDARA and how our furniture has transformed their spaces."
  const ctaTitle = pageData?.ctaTitle || "Join Our Community"
  const ctaDescription = pageData?.ctaDescription || "Become part of the NDARA family. Share your experience and inspire others to create beautiful living spaces."

  const featuredTestimonials = testimonials.filter((t: any) => t.featured)
  const regularTestimonials = testimonials.filter((t: any) => !t.featured)

  return (
    <>      
      {/* Page Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
            {pageTitle}
          </h1>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            {headerDescription}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat: any) => (
              <div key={stat.label} className="text-center">
                <span className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                  {stat.value}
                </span>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-12">
            Featured Reviews
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial: any) => (
              <FeaturedTestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {regularTestimonials.map((testimonial: any) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              {ctaTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {ctaDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedClientLink 
                href="/auth" 
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-sm font-medium transition-colors"
              >
                Join Today
              </LocalizedClientLink>
              <a 
                href="#" 
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-8 py-3 text-sm font-medium transition-colors"
              >
                Write a Review
              </a>
            </div>
          </div>
        </div>
      </section>

          </>
  )
}
