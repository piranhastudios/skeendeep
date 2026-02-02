import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const testimonials = [
  {
    id: 1,
    name: "Amara Osei",
    role: "Interior Designer",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "NDARA transformed my client's home beyond expectations. The attention to detail and quality of craftsmanship is unmatched. Every piece tells a story and brings warmth to the space.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Homeowner",
    location: "Singapore",
    rating: 5,
    text: "The custom dining table we ordered is absolutely stunning. From the initial consultation to delivery, the process was seamless. It's now the centerpiece of our home.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    featured: false,
  },
  {
    id: 3,
    name: "Fatou Diallo",
    role: "Architect",
    location: "Dakar, Senegal",
    rating: 5,
    text: "I've worked with many furniture brands, but NDARA stands apart. Their commitment to sustainability and traditional craftsmanship aligns perfectly with my design philosophy.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    featured: true,
  },
  {
    id: 4,
    name: "James Okonkwo",
    role: "Hotel Owner",
    location: "Accra, Ghana",
    rating: 5,
    text: "We furnished our entire boutique hotel with NDARA pieces. Our guests constantly compliment the furniture, and the durability has been exceptional even with heavy use.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    featured: false,
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Business Executive",
    location: "Mumbai, India",
    rating: 5,
    text: "The Theodore Armchair is the most comfortable piece of furniture I've ever owned. The quality is evident in every stitch and curve. Worth every penny.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    featured: false,
  },
  {
    id: 6,
    name: "Kofi Mensah",
    role: "Art Collector",
    location: "Kumasi, Ghana",
    rating: 5,
    text: "NDARA understands that furniture is art. Their pieces complement my collection beautifully and have become conversation starters at every gathering.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    featured: true,
  },
]

const stats = [
  { value: "4.9", label: "Average Rating" },
  { value: "5000+", label: "Happy Customers" },
  { value: "98%", label: "Would Recommend" },
  { value: "12", label: "Countries" },
]

export default function TestimonialsPage() {
  const featuredTestimonials = testimonials.filter(t => t.featured)
  const regularTestimonials = testimonials.filter(t => !t.featured)

  return (
    <>      
      {/* Page Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
            Testimonials
          </h1>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Hear from our customers about their experience with NDARA and how our furniture has transformed their spaces.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
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
            {featuredTestimonials.map((testimonial) => (
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
            {regularTestimonials.map((testimonial) => (
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
              Join Our Community
            </h2>
            <p className="mt-4 text-muted-foreground">
              Become part of the NDARA family. Share your experience and inspire others to create beautiful living spaces.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/products" 
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-sm font-medium transition-colors"
              >
                Shop Now
              </a>
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

function FeaturedTestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
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
      
      <p className="text-foreground leading-relaxed mb-8">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      
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

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
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
      <div>
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
        <p className="text-foreground text-sm leading-relaxed mb-4">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        <div>
          <h4 className="font-medium text-foreground text-sm">{testimonial.name}</h4>
          <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
        </div>
      </div>
    </div>
  )
}
