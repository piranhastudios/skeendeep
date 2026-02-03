import Image from "next/image"
import { Leaf, Heart, Users, Award } from "lucide-react"
import { client, urlFor } from "@/lib/sanity/client"
import { PortableText } from "next-sanity"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We pride ourselves in using our extensive knowledge to offer the highest quality and care. A comfortable environment to talk and discuss solutions to delicate problems.',
}

const iconMap = {
  Leaf,
  Heart,
  Users,
  Award,
} as const

async function getAboutPageData() {
  const query = `*[_type == "aboutPage"][0]`
  const data = await client.fetch(query, {}, { next: { revalidate: 30 } })
  return data
}

export default async function AboutPage() {
  const data = await getAboutPageData()

  // Fallback data
  const {
    headerSection = {
      title: "About Us",
      description: "Where interior design expertise meets ecommerce craft, creating a space for intentional choices in furniture and living."
    },
    storySection = {
      sectionLabel: "Our Story",
      title: "Where Design Expertise Meets Digital Craft",
      description: [
        { _key: '1', _type: 'block', children: [{ _key: '1', _type: 'span', text: "NDARA sits at the intersection of interior design expertise and ecommerce craft. We believe furniture isn't just about filling rooms—it's about shaping how you experience space." }] },
        { _key: '2', _type: 'block', children: [{ _key: '2', _type: 'span', text: "In a world overflowing with options, we create a space for intention. Our curated collection honors materiality, proportion, texture, and restraint, supporting how you actually live rather than chasing fleeting trends." }] },
        { _key: '3', _type: 'block', children: [{ _key: '3', _type: 'span', text: "Every piece in our collection has been carefully selected to make intentional choices easier. This is furniture that understands the balance between form and function, between aesthetics and lived experience." }] }
      ],
      image: null
    },
    valuesSection = {
      title: "Our Philosophy",
      description: "The principles that guide our curation and selection process.",
      values: [
        {
          icon: "Leaf",
          title: "Materiality",
          description: "We select pieces that honor the natural character and integrity of their materials, emphasizing texture and quality over trends.",
        },
        {
          icon: "Heart",
          title: "Proportion",
          description: "Every piece in our collection demonstrates considered proportions that create balance and harmony in your living spaces.",
        },
        {
          icon: "Users",
          title: "Curation",
          description: "In a world full of options, we curate intentionally, making it easier to choose pieces that support how you live.",
        },
        {
          icon: "Award",
          title: "Restraint",
          description: "We believe in the power of restraint—selecting pieces that speak quietly but carry weight in their design integrity.",
        },
      ]
    },
    statsSection = {
      stats: [
        { value: "Expert", label: "Curation Process" },
        { value: "500+", label: "Carefully Selected Pieces" },
        { value: "Intentional", label: "Design Choices" },
        { value: "Global", label: "Design Network" },
      ]
    },
    teamSection = {
      title: "Meet Our Team",
      description: "The passionate people behind every piece.",
      teamMembers: [
        {
          name: "Adaeze Okonkwo",
          role: "Founder & Creative Director",
          image: null
        },
        {
          name: "Chidi Emenike",
          role: "Head of Design",
          image: null
        },
        {
          name: "Ngozi Adeyemi",
          role: "Master Craftsman",
          image: null
        },
        {
          name: "Emeka Nwosu",
          role: "Operations Director",
          image: null
        },
      ]
    },
    sustainabilitySection = {
      sectionLabel: "Sustainability",
      title: "Sourced From Sustainable Forests",
      description: [
        { _key: '1', _type: 'block', children: [{ _key: '1', _type: 'span', text: "We care deeply about the origin of our materials. Every piece of wood we use comes from responsibly managed forests certified by international bodies." }] },
        { _key: '2', _type: 'block', children: [{ _key: '2', _type: 'span', text: "Our commitment extends beyond sourcing. We minimize waste in production, use water-based finishes, and ensure our packaging is recyclable or biodegradable." }] }
      ],
      image: null,
      stat1Value: "100%",
      stat1Label: "Certified Wood",
      stat2Value: "Zero",
      stat2Label: "Landfill Waste"
    }
  } = data || {}

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

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={storySection.image ? urlFor(storySection.image).width(800).url() : "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"}
                alt="Our workshop"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-accent uppercase tracking-wider text-sm font-medium">{storySection.sectionLabel}</span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mt-4">
                {storySection.title}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                 <PortableText value={storySection.description} />
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
              {valuesSection.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {valuesSection.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesSection.values?.map((value: any, index: number) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Leaf;
              return (
                <div key={index} className="bg-background rounded-xl p-8">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-medium text-lg text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {statsSection.stats?.map((stat: any, index: number) => (
              <div key={index} className="text-center">
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
              {teamSection.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {teamSection.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamSection.teamMembers?.map((member: any, index: number) => (
              <div key={index} className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={member.image ? urlFor(member.image).width(400).url() : "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80"}
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
              <span className="text-accent uppercase tracking-wider text-sm font-medium">{sustainabilitySection.sectionLabel}</span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mt-4">
                {sustainabilitySection.title}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <PortableText value={sustainabilitySection.description} />
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <span className="font-serif text-3xl font-medium text-foreground">{sustainabilitySection.stat1Value}</span>
                  <p className="text-sm text-muted-foreground mt-1">{sustainabilitySection.stat1Label}</p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-medium text-foreground">{sustainabilitySection.stat2Value}</span>
                  <p className="text-sm text-muted-foreground mt-1">{sustainabilitySection.stat2Label}</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={sustainabilitySection.image ? urlFor(sustainabilitySection.image).width(800).url() : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"}
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
