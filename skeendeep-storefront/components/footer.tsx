import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Github, Twitch } from 'lucide-react'
import { client } from "@/lib/sanity/client"
import { type SanityDocument } from "next-sanity"
import LocalizedClientLink from "./common/localized-client-link"

const FOOTER_QUERY = `*[_type == "footer"][0]{
  brandTagline,
  productLinks[]{name, href},
  servicesLinks[]{name, href},
  aboutLinks[]{name, href},
  testimonialsLinks[]{name, href},
  contactPhone,
  contactEmail,
  locationAddress,
  socialLinks[]{name, icon, href},
  copyrightText
}`

const LEGAL_LINKS_QUERY = `*[_type == "legalPage"][]{
    title,
    "slug": slug.current
  }`

const iconMap = {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Github,
  Twitch,
}

const defaultFooterLinks = {
  product: [
    { name: "Living Room", href: "/collections/living-room" },
    { name: "Bedroom", href: "/collections/bedroom" },
    { name: "Dining Room", href: "/collections/dining-room" },
    { name: "Office", href: "/collections/office" },
  ],
  services: [
    { name: "Interior Design", href: "/services/interior-design" },
    { name: "Custom Furniture", href: "/services/custom-furniture" },
    { name: "Delivery", href: "/services/delivery" },
    { name: "Installation", href: "/services/installation" },
  ],
  about: [
    { name: "Our Story", href: "/about" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  testimonials: [
    { name: "Customer Reviews", href: "/testimonials" },
    { name: "Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
  ],
}

const defaultSocialLinks = [
  { name: "LinkedIn", href: "#", icon: "Linkedin" },
  { name: "Facebook", href: "#", icon: "Facebook" },
  { name: "Instagram", href: "#", icon: "Instagram" },
  { name: "Youtube", href: "#", icon: "Youtube" },
]

export async function Footer() {
  const [footerData, legalLinks] = await Promise.all([
    client.fetch<SanityDocument>(FOOTER_QUERY, {}, { next: { revalidate: 3600 } }),
    client.fetch<any[]>(LEGAL_LINKS_QUERY, {}, { next: { revalidate: 3600 } })
  ])

  const brandTagline = footerData?.brandTagline || "Where interior design expertise meets ecommerce craft. Curated furniture that shapes spaces, not just fills them."
  const productLinks = footerData?.productLinks || defaultFooterLinks.product
  const servicesLinks = footerData?.servicesLinks || defaultFooterLinks.services
  const aboutLinks = footerData?.aboutLinks || defaultFooterLinks.about
  const testimonialsLinks = footerData?.testimonialsLinks || defaultFooterLinks.testimonials
  const contactPhone = footerData?.contactPhone || "+1 (999) 888-77-66"
  const contactEmail = footerData?.contactEmail || "hello@ndara.com"
  const locationAddress = footerData?.locationAddress || "AE2650, Moscow,\nMametovoy 22-15, Office 4"
  const socialLinks = footerData?.socialLinks || defaultSocialLinks
  const copyrightText = footerData?.copyrightText || "© 2024 — Copyright. All Rights reserved."

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/ndara-logo.svg"
                alt="NDARA"
                width={120}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {brandTagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link: any) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map((link: any) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">About Us</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link: any) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">Testimonials</h4>
            <ul className="space-y-3">
              {testimonialsLinks.map((link: any) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-foreground mb-3 text-sm">Contact Us</h4>
              <p className="text-muted-foreground text-sm">{contactPhone}</p>
              <p className="text-muted-foreground text-sm">{contactEmail}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3 text-sm">Location</h4>
              <p className="text-muted-foreground text-sm whitespace-pre-line">
                {locationAddress}
              </p>
            </div>

            <div className="md:text-right">
              <div className="flex gap-4 md:justify-end">
                {socialLinks.map((social: any) => {
                  const IconComponent = iconMap[social.icon as keyof typeof iconMap]
                  return IconComponent ? (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <IconComponent size={16} />
                    </Link>
                  ) : null
                })}
                {/*Region and language selector can be added here */}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            {copyrightText}
          </p>
          <div className="flex gap-6">
            {legalLinks?.length > 0 ? (
              legalLinks.map((link: any) => (
                 <LocalizedClientLink 
                    key={link.slug} 
                    href={`/legal/${link.slug}`} 
                    className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                  >
                  {link.title}
                </LocalizedClientLink>
              ))
            ) : (
             <>
              <LocalizedClientLink href="/legal/privacy" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                Privacy Policy
              </LocalizedClientLink>
              <LocalizedClientLink href="/legal/terms" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                Terms of Service
              </LocalizedClientLink>
             </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
