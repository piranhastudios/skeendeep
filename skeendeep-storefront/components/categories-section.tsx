import Image from "next/image"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { Button } from "@/components/ui/button"

const rooms = [
  {
    name: "About us",
    image: "/images/dr_afong.png",
    href: "/about",
    featured: true,
  },
  {
    name: "Our Services",
    image: "https://plus.unsplash.com/premium_photo-1719617672948-862f2f06e2a1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/services",
  },
  {
    name: "Daily skin care guides",
    image: "https://images.unsplash.com/photo-1648203276014-20f97ba1f817?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/daily-skin-care-guides",
  },
]

import type { SanityDocument } from "next-sanity"

export function CategoriesSection({ homePageData }: { homePageData?: SanityDocument }) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured Room - Living Room */}
          <div className="relative aspect-[4/5] md:aspect-auto md:row-span-2 rounded-lg overflow-hidden group">
            <Image
              src={rooms[0].image || "/placeholder.svg"}
              alt={rooms[0].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="font-serif text-white text-3xl md:text-4xl font-medium mb-4">
                {rooms[0].name}
              </h3>
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm px-6 py-5 text-sm font-medium"
              >
                <LocalizedClientLink href={rooms[0].href}>
                  Learn More
                </LocalizedClientLink>
              </Button>
            </div>
          </div>

          {/* Secondary Rooms */}
          {rooms.slice(1).map((room) => (
            <LocalizedClientLink
              key={room.name}
              href={room.href}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              <Image
                src={room.image || "/placeholder.svg"}
                alt={room.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6">
                <h3 className="font-serif text-white text-2xl font-medium">
                  {room.name}
                </h3>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
