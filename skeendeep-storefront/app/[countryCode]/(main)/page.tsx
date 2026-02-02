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

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title, products",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <HeroSection />
      <MissionStatement />
      <CustomizeSection />
      <ProductsSection collections={collections} region={region} />
      <SustainabilitySection />
      <RoomCategoriesSection />
    </>
  )
}
