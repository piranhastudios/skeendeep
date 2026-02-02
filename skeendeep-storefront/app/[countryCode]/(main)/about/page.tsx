import Image from "next/image"
import { Leaf, Heart, Users, Award } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const values = [
  {
    icon: Leaf,
    title: "Materiality",
    description: "We select pieces that honor the natural character and integrity of their materials, emphasizing texture and quality over trends.",
  },
  {
    icon: Heart,
    title: "Proportion",
    description: "Every piece in our collection demonstrates considered proportions that create balance and harmony in your living spaces.",
  },
  {
    icon: Users,
    title: "Curation",
    description: "In a world full of options, we curate intentionally, making it easier to choose pieces that support how you live.",
  },
  {
    icon: Award,
    title: "Restraint",
    description: "We believe in the power of restraint—selecting pieces that speak quietly but carry weight in their design integrity.",
  },
]

const stats = [
  { value: "Expert", label: "Curation Process" },
  { value: "500+", label: "Carefully Selected Pieces" },
  { value: "Intentional", label: "Design Choices" },
  { value: "Global", label: "Design Network" },
]

const team = [
  {
    name: "Adaeze Okonkwo",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
  },
  {
    name: "Chidi Emenike",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Ngozi Adeyemi",
    role: "Master Craftsman",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Emeka Nwosu",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
            About Us
          </h1>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Where interior design expertise meets ecommerce craft, creating a space for intentional choices in furniture and living.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                alt="Our workshop"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-accent uppercase tracking-wider text-sm font-medium">Our Story</span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mt-4">
                Where Design Expertise Meets Digital Craft
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  NDARA sits at the intersection of interior design expertise and ecommerce craft. We believe furniture isn't just about filling rooms—it's about shaping how you experience space.
                </p>
                <p>
                  In a world overflowing with options, we create a space for intention. Our curated collection honors materiality, proportion, texture, and restraint, supporting how you actually live rather than chasing fleeting trends.
                </p>
                <p>
                  Every piece in our collection has been carefully selected to make intentional choices easier. This is furniture that understands the balance between form and function, between aesthetics and lived experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight">
              Our Philosophy
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our curation and selection process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-background rounded-xl p-8">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground">
                  {stat.value}
                </span>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight">
              Meet Our Team
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind every piece.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-foreground">{member.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Highlight */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent uppercase tracking-wider text-sm font-medium">Sustainability</span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mt-4">
                Sourced From Sustainable Forests
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We care deeply about the origin of our materials. Every piece of wood we use comes from responsibly managed forests certified by international bodies.
                </p>
                <p>
                  Our commitment extends beyond sourcing. We minimize waste in production, use water-based finishes, and ensure our packaging is recyclable or biodegradable.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <span className="font-serif text-3xl font-medium text-foreground">100%</span>
                  <p className="text-sm text-muted-foreground mt-1">Certified Wood</p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-medium text-foreground">Zero</span>
                  <p className="text-sm text-muted-foreground mt-1">Landfill Waste</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
                alt="Sustainable forest"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

          </div>
  )
}
