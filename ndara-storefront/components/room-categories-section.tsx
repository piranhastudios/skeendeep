import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const rooms = [
  {
    name: "Living Room",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80",
    href: "/collections/living-room",
    featured: true,
  },
  {
    name: "Dining Room",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    href: "/collections/dining-room",
  },
  {
    name: "Entryway",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80",
    href: "/collections/entryway",
  },
]

export function RoomCategoriesSection() {
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
                <Link href={rooms[0].href}>
                  See Collection
                </Link>
              </Button>
            </div>
          </div>

          {/* Secondary Rooms */}
          {rooms.slice(1).map((room) => (
            <Link
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
