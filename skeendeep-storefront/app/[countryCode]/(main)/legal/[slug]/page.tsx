import { notFound } from "next/navigation"
import { type Metadata } from "next"
import { PortableText, type PortableTextComponents } from "next-sanity"
import { client } from "@/lib/sanity/client"

export const revalidate = 3600

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-serif font-medium mt-12 mb-6 text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-serif font-medium mt-10 mb-5 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-serif font-medium mt-8 mb-4 text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg md:text-xl font-serif font-medium mt-6 mb-3 text-foreground">{children}</h4>,
    normal: ({ children }) => <p className="mb-6 text-muted-foreground leading-relaxed">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-primary pl-6 italic my-8 text-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
    link: ({ value, children }) => {
      const isExternal = (value?.href || '').startsWith('http')
      return (
        <a 
          href={value?.href} 
          target={isExternal ? '_blank' : undefined} 
          rel={isExternal ? 'noopener noreferrer' : undefined} 
          className="text-primary hover:underline underline-offset-4"
        >
          {children}
        </a>
      )
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const query = `*[_type == "legalPage" && slug.current == $slug][0]{
    title,
    "description": content[0].children[0].text
  }`
  const page = await client.fetch(query, { slug })

  if (!page) {
    return {
      title: "Not Found",
    }
  }

  const description = page.description || `Read our ${page.title} at SKEENDEEP.`

  return {
    title: `${page.title} | SKEENDEEP`,
    description,
    openGraph: {
      title: `${page.title} | SKEENDEEP`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${page.title} | SKEENDEEP`,
      description,
    },
  }
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const query = `*[_type == "legalPage" && slug.current == $slug][0]{
    title,
    content,
    publishedAt
  }`
  
  const page = await client.fetch(query, { slug })

  if (!page) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 max-w-4xl min-h-screen bg-background">
      <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8">
        {page.title}
      </h1>
      
      {page.publishedAt && (
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: {new Date(page.publishedAt).toLocaleDateString()}
        </p>
      )}

      <div className="max-w-none">
        {page.content ? (
          <PortableText value={page.content} components={components} />
        ) : (
          <p className="text-muted-foreground">No content available.</p>
        )}
      </div>
    </div>
  )
}
