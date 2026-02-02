export interface Product {
  id: number
  slug: string
  name: string
  price: number
  rating: number
  reviews: number
  category: string
  image: string
  images: string[]
  description: string
  features: string[]
  dimensions: {
    width: string
    height: string
    depth: string
    weight: string
  }
  materials: string[]
  colors: { name: string; hex: string }[]
  inStock: boolean
  sku: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: "arwen-table-lamp",
    name: "ARWEN TABLE LAMP",
    price: 455.99,
    rating: 4.5,
    reviews: 842,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80",
    ],
    description: "The Arwen Table Lamp brings a warm, ambient glow to any space. Crafted with a solid oak base and a handwoven natural linen shade, this lamp combines traditional craftsmanship with contemporary design. Perfect for bedside tables, desks, or living room accent lighting.",
    features: [
      "Solid oak wood base with natural grain finish",
      "Handwoven natural linen shade",
      "Dimmable LED compatible",
      "Touch-sensitive on/off switch",
      "Energy-efficient E26 bulb socket",
    ],
    dimensions: {
      width: "35cm",
      height: "58cm",
      depth: "35cm",
      weight: "3.2kg",
    },
    materials: ["Solid Oak", "Natural Linen", "Brass Hardware"],
    colors: [
      { name: "Natural Oak", hex: "#C4A77D" },
      { name: "Walnut", hex: "#5D4037" },
      { name: "Black Oak", hex: "#2D2D2D" },
    ],
    inStock: true,
    sku: "NDR-LMP-001",
  },
  {
    id: 2,
    slug: "lewington-floor-lamp",
    name: "LEWINGTON FLOOR LAMP",
    price: 555.99,
    rating: 4.5,
    reviews: 842,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80",
    ],
    description: "The Lewington Floor Lamp is a statement piece that combines sculptural form with functional lighting. Its slender brass stem rises elegantly to support a generously sized shade, casting a warm, diffused light that transforms any room into a cozy retreat.",
    features: [
      "Solid brass stem with antique finish",
      "Adjustable shade angle",
      "Foot dimmer switch included",
      "Weighted base for stability",
      "Compatible with smart bulbs",
    ],
    dimensions: {
      width: "45cm",
      height: "165cm",
      depth: "45cm",
      weight: "8.5kg",
    },
    materials: ["Solid Brass", "Cotton Shade", "Cast Iron Base"],
    colors: [
      { name: "Antique Brass", hex: "#B5A642" },
      { name: "Matte Black", hex: "#1A1A1A" },
      { name: "Brushed Nickel", hex: "#8B8B8B" },
    ],
    inStock: true,
    sku: "NDR-LMP-002",
  },
  {
    id: 3,
    slug: "theodore-armchair",
    name: "THEODORE ARMCHAIR",
    price: 995.99,
    rating: 4.8,
    reviews: 1024,
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    ],
    description: "The Theodore Armchair embodies timeless elegance with its deep button-tufted back and gently curved arms. Upholstered in premium velvet, this chair offers exceptional comfort while making a sophisticated design statement in any living space.",
    features: [
      "Deep button-tufted backrest",
      "High-density foam cushioning",
      "Solid hardwood frame",
      "Hand-applied brass nail trim",
      "Removable seat cushion",
    ],
    dimensions: {
      width: "82cm",
      height: "95cm",
      depth: "85cm",
      weight: "28kg",
    },
    materials: ["Premium Velvet", "Solid Oak Frame", "Brass Nailheads"],
    colors: [
      { name: "Terracotta", hex: "#A65D3F" },
      { name: "Forest Green", hex: "#3D5A45" },
      { name: "Deep Indigo", hex: "#2C4A52" },
      { name: "Ochre", hex: "#C4A77D" },
    ],
    inStock: true,
    sku: "NDR-CHR-001",
  },
  {
    id: 4,
    slug: "callington-bedspread",
    name: "CALLINGTON BEDSPREAD",
    price: 410.99,
    rating: 4.5,
    reviews: 842,
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    ],
    description: "The Callington Bedspread brings understated luxury to your bedroom. Woven from 100% organic cotton with a subtle waffle texture, this bedspread drapes beautifully and provides lightweight warmth year-round.",
    features: [
      "100% organic cotton construction",
      "Waffle weave texture",
      "Pre-washed for softness",
      "OEKO-TEX certified",
      "Machine washable",
    ],
    dimensions: {
      width: "260cm",
      height: "N/A",
      depth: "240cm",
      weight: "2.8kg",
    },
    materials: ["100% Organic Cotton"],
    colors: [
      { name: "Natural", hex: "#F5F0E8" },
      { name: "Terracotta", hex: "#A65D3F" },
      { name: "Sage", hex: "#9CAF88" },
    ],
    inStock: true,
    sku: "NDR-BED-001",
  },
  {
    id: 5,
    slug: "brodie-mirror",
    name: "BRODIE MIRROR",
    price: 546.99,
    rating: 4.5,
    reviews: 842,
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?w=800&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    ],
    description: "The Brodie Mirror features an elegant arched design with a slender metal frame. Its generous proportions make it ideal as a statement piece in entryways, bedrooms, or living areas, while reflecting light to create a sense of spaciousness.",
    features: [
      "Premium float glass with polished edges",
      "Solid brass frame",
      "Keyhole hanging system",
      "Anti-tarnish coating",
      "Can be hung vertically or horizontally",
    ],
    dimensions: {
      width: "60cm",
      height: "180cm",
      depth: "3cm",
      weight: "12kg",
    },
    materials: ["Float Glass", "Solid Brass Frame"],
    colors: [
      { name: "Brass", hex: "#B5A642" },
      { name: "Matte Black", hex: "#1A1A1A" },
    ],
    inStock: true,
    sku: "NDR-MRR-001",
  },
  {
    id: 6,
    slug: "mika-bed",
    name: "MIKA BED",
    price: 1280.99,
    rating: 4.7,
    reviews: 956,
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    ],
    description: "The Mika Bed combines Scandinavian simplicity with Japanese minimalism. Its low-profile platform design and clean lines create a serene sleeping environment, while the solid oak construction ensures lasting durability.",
    features: [
      "Solid oak platform construction",
      "Integrated headboard",
      "No box spring required",
      "Includes wooden slat support",
      "Easy assembly",
    ],
    dimensions: {
      width: "168cm",
      height: "85cm",
      depth: "218cm",
      weight: "65kg",
    },
    materials: ["Solid Oak", "Steel Hardware"],
    colors: [
      { name: "Natural Oak", hex: "#C4A77D" },
      { name: "Walnut", hex: "#5D4037" },
      { name: "White Oak", hex: "#E8E2D9" },
    ],
    inStock: true,
    sku: "NDR-BED-002",
  },
  {
    id: 7,
    slug: "oslo-dining-table",
    name: "OSLO DINING TABLE",
    price: 1890.99,
    rating: 4.9,
    reviews: 445,
    category: "Dining Room",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    ],
    description: "The Oslo Dining Table is crafted from a single slab of sustainably sourced oak, showcasing the natural beauty of the wood grain. Its sculptural trestle base provides ample legroom while creating visual interest from every angle.",
    features: [
      "Live-edge oak table top",
      "Hand-rubbed oil finish",
      "Sculptural trestle base",
      "Seats 6-8 comfortably",
      "Sustainably sourced timber",
    ],
    dimensions: {
      width: "220cm",
      height: "76cm",
      depth: "100cm",
      weight: "85kg",
    },
    materials: ["Solid Oak", "Steel Trestle Base"],
    colors: [
      { name: "Natural Oak", hex: "#C4A77D" },
      { name: "Smoked Oak", hex: "#5D4037" },
    ],
    inStock: true,
    sku: "NDR-TBL-001",
  },
  {
    id: 8,
    slug: "bergen-office-chair",
    name: "BERGEN OFFICE CHAIR",
    price: 675.99,
    rating: 4.6,
    reviews: 723,
    category: "Office",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
    ],
    description: "The Bergen Office Chair merges ergonomic excellence with refined aesthetics. Its breathable mesh back provides lumbar support, while the premium leather seat offers all-day comfort. Perfect for the modern home office.",
    features: [
      "Adjustable lumbar support",
      "Breathable mesh backrest",
      "Premium leather seat",
      "360-degree swivel",
      "Adjustable armrests",
      "Smooth-rolling casters",
    ],
    dimensions: {
      width: "68cm",
      height: "105-115cm",
      depth: "68cm",
      weight: "18kg",
    },
    materials: ["Premium Leather", "Mesh", "Aluminum Base"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cognac", hex: "#8B4513" },
      { name: "Gray", hex: "#6B6560" },
    ],
    inStock: true,
    sku: "NDR-CHR-002",
  },
  {
    id: 9,
    slug: "nova-pendant-light",
    name: "NOVA PENDANT LIGHT",
    price: 320.99,
    rating: 4.4,
    reviews: 512,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    ],
    description: "The Nova Pendant Light is a sculptural lighting piece that commands attention. Hand-blown glass envelops a warm LED source, creating a soft, ambient glow that transforms any dining area or kitchen island.",
    features: [
      "Hand-blown glass shade",
      "Integrated LED light source",
      "Adjustable drop length",
      "Dimmable",
      "Easy installation",
    ],
    dimensions: {
      width: "35cm",
      height: "40cm",
      depth: "35cm",
      weight: "2.5kg",
    },
    materials: ["Hand-blown Glass", "Brass Hardware", "Fabric Cord"],
    colors: [
      { name: "Smoke", hex: "#6B6560" },
      { name: "Amber", hex: "#C4A77D" },
      { name: "Clear", hex: "#F5F0E8" },
    ],
    inStock: true,
    sku: "NDR-LMP-003",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}
