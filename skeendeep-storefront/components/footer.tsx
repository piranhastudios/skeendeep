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
    { name: "All Products", href: "/products" },
    { name: "Skincare", href: "/products" },
    { name: "SPF Protection", href: "/products?search=SPF" },
    { name: "Featured", href: "/products" },
  ],
  services: [
    { name: "Treatments", href: "/services" },
    { name: "Book an Appointment", href: "/book" },
    { name: "About the Clinic", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
  ],
  about: [
    { name: "Our Story", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Treatments", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
  testimonials: [
    { name: "Customer Reviews", href: "/testimonials" },
    { name: "Shop Skincare", href: "/products" },
    { name: "Book a Treatment", href: "/book" },
  ],
}

const defaultSocialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/skeendeep", icon: "Instagram" },
  { name: "Facebook", href: "https://www.facebook.com/skeendeep", icon: "Facebook" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/skeendeep", icon: "Linkedin" },
  { name: "Youtube", href: "https://www.youtube.com/@skeendeep", icon: "Youtube" },
]

export async function Footer() {
  const [footerData, legalLinks] = await Promise.all([
    client.fetch<SanityDocument>(FOOTER_QUERY, {}, { next: { revalidate: 3600 } }),
    client.fetch<any[]>(LEGAL_LINKS_QUERY, {}, { next: { revalidate: 3600 } })
  ])

  const brandTagline = footerData?.brandTagline || "SkeenDeep Medical Aesthetics Clinic — experts in non-invasive aesthetic dermatology and professional-grade skincare."
  const productLinks = footerData?.productLinks || defaultFooterLinks.product
  const servicesLinks = footerData?.servicesLinks || defaultFooterLinks.services
  const aboutLinks = footerData?.aboutLinks || defaultFooterLinks.about
  const testimonialsLinks = footerData?.testimonialsLinks || defaultFooterLinks.testimonials
  const contactPhone = footerData?.contactPhone || "+44 7598614901"
  const contactEmail = footerData?.contactEmail || "care@skeendeep.co.uk"
  const locationAddress = footerData?.locationAddress || "190 School Road,\nBirmingham,\nB28 8PA, United Kingdom"
  const socialLinks = footerData?.socialLinks || defaultSocialLinks
  const copyrightText = footerData?.copyrightText || "© 2026 SkeenDeep. All rights reserved."

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Skeendeep"
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
