import Link from "next/link"
import Image from "next/image"

const footerLinks = {
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

const socialLinks = [
  { name: "In", href: "#" },
  { name: "Fb", href: "#" },
  { name: "Ig", href: "#" },
  { name: "Yt", href: "#" },
]

export function Footer() {
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
              Where interior design expertise meets ecommerce craft.
              Curated furniture that shapes spaces, not just fills them.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
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
              {footerLinks.services.map((link) => (
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
              {footerLinks.about.map((link) => (
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
              {footerLinks.testimonials.map((link) => (
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
              <p className="text-muted-foreground text-sm">+1 (999) 888-77-66</p>
              <p className="text-muted-foreground text-sm">hello@ndara.com</p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3 text-sm">Location</h4>
              <p className="text-muted-foreground text-sm">
                AE2650, Moscow,<br />
                Mametovoy 22-15, Office 4
              </p>
            </div>

            <div className="md:text-right">
              <h4 className="font-medium text-foreground mb-3 text-sm">Languages</h4>
              <div className="flex gap-4 md:justify-end">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2024 — Copyright. All Rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
