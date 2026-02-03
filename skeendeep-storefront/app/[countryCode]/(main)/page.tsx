import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MissionStatement } from "@/components/mission-statement"
import { CustomizeSection } from "@/components/customize-section"
import { ProductsSection } from "@/components/products-section"
import { SustainabilitySection } from "@/components/sustainability-section"
import { RoomCategoriesSection } from "@/components/room-categories-section"
import { Footer } from "@/components/footer"
import { listCollections } from "@/lib/data/collections"
import { getRegion } from "@/lib/data/regions"
import { client } from "@/lib/sanity/client"
import { type SanityDocument } from "next-sanity"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: 'SkeenDeep Medical Aesthetics Clinic | Experts in Non-invasive Aesthetic Dermatology',
  description: 'Experts in Non-invasive Aesthetic Dermatology featuring Dr Afong. We offer treatments for Acne, Excessive Sweating, Wrinkles, and more. Book your consultation today.',
}

const HOME_PAGE_QUERY = `*[_type == "homePage"] | order(publishedAt desc)[0]{
  _id,
  title,
  slug,
  publishedAt,
  heroHeading,
  heroDescription,
  heroImage,
  missionLabel,
  missionStatement,
  customizeHeading,
  customizeDescription,
  customizeImage,
  sustainabilityHeading,
  sustainabilityDescription,
  sustainabilityImage
}`

const options = { next: { revalidate: 30 } }

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title, products",
  })

  // Fetch home page content from Sanity
  const homePageData = await client.fetch<SanityDocument>(
    HOME_PAGE_QUERY,
    {},
    options
  )

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <HeroSection homePageData={homePageData} />
      <MissionStatement homePageData={homePageData} />
      <CustomizeSection homePageData={homePageData} />
      <ProductsSection collections={collections} region={region} />
      <SustainabilitySection homePageData={homePageData} />
      <RoomCategoriesSection homePageData={homePageData} />
    </>
  )
}
