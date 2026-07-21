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
  // debugger;
  // Fallback data
  const {
    headerSection = {
      title: "About Us",
      description: "Doctor-led medical aesthetics rooted in clinical expertise, skin health, and natural-looking results."
    },
    storySection = {
      sectionLabel: "Our Story",
      title: "Medical Expertise Meets Aesthetic Care",
      description: [
        { _key: '1', _type: 'block', children: [{ _key: '1', _type: 'span', text: "Skeendeep Medical Beauty Clinic is a doctor-led medical aesthetic clinic, run by Dr Adeline Afong (MD, MRCGP, DRCOG, DFFP, DPD)." }] },
        { _key: '2', _type: 'block', children: [{ _key: '2', _type: 'span', text: "Dr Afong is a skilled general practitioner with over 24 years of experience. She is a fully licensed member of the General Medical Council and a Member of the Royal College of General Practitioners, and is fully licensed in cosmetic dermatology in both the UK and the US." }] },
        { _key: '3', _type: 'block', children: [{ _key: '3', _type: 'span', text: "Each treatment is personally administered by Dr Afong herself, so you can rest assured that your treatment will be carried out to the highest standard." }] }
      ],
      image: null
    },
    valuesSection = {
      title: "Why Choose Us?",
      description: "The focus is always on you. We give you a thorough assessment to get to the root of your skin problems and offer medically sound solutions.",
      values: [
        {
          icon: "Award",
          title: "Clinical Expertise",
          description: "Treatments grounded in medical knowledge, safety, and evidence-based practice.",
        },
        {
          icon: "Users",
          title: "Personalised Care",
          description: "Every patient receives an individual assessment and treatment plan.",
        },
        {
          icon: "Leaf",
          title: "Natural Results",
          description: "We focus on refined, balanced outcomes that enhance rather than alter.",
        },
        {
          icon: "Heart",
          title: "Inclusive Skin Expertise",
          description: "Experienced in treating all skin types, including darker skin tones.",
        },
      ]
    },
    statsSection = {
      stats: [
        { value: "30+", label: "Years of Medical Expertise" },
        { value: "100+", label: "Clients Transformed" },
        { value: "5/5", label: "Rated by Patients" },
      ]
    },
    teamSection = {
      title: "Doctor-led care, delivered with experience and precision.",
      description: "Fully licensed in the UK and US, Dr Afong brings decades of medical and aesthetic experience, combining dermatology knowledge with a calm, patient-centred approach trusted by her clients.",
      teamMembers: [
        {
          name: "Dr Adeline Afong",
          role: "Medical Director & Founder",
          image: null
        },
      ]
    },
    sustainabilitySection = {
      sectionLabel: "What you can expect at Skeendeep",
      title: "Why Patients Choose Us",
      description: [
        { _key: '1', _type: 'block', children: [{ _key: '1', _type: 'span', text: "We focus on medically led treatments, clinically proven solutions, and personalised care designed to deliver safe, effective, natural-looking results." }] }
      ],
      image: null,
      stat1Value: "24+",
      stat1Label: "Years Experience",
      stat2Value: "GMC Registered",
      stat2Label: "Fully Licensed Medical Doctor"
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
                src={storySection.image ? urlFor(storySection.image).width(800).url() : "/images/dr_afong.png"}
                alt="Dr Adeline Afong at Skeendeep Medical Beauty Clinic"
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
          <div className="grid gap-8 md:gap-12" style={{ 
            gridTemplateColumns: `repeat(auto-fit, minmax(${statsSection.stats?.length > 3 ? '200px' : '250px'}, 1fr))` 
          }}>
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

          <div className="flex flex-wrap justify-center gap-8">
            {teamSection.teamMembers?.map((member: any, index: number) => (
              <div key={index} className="text-center w-full sm:w-64">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={member.image ? urlFor(member.image).width(400).url() : "/images/dr_afong.png"}
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
      <section id="sustainability" className="py-16 md:py-24">
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
                src={sustainabilitySection.image ? urlFor(sustainabilitySection.image).width(800).url() : "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"}
                alt="Skin care treatment at Skeendeep"
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
