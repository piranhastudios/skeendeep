import { Metadata } from "next"
import ProductsTemplate from "./products-template"

export const metadata: Metadata = {
  title: "Products",
  description: "Explore all of our curated furniture products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: string
    page?: string
    category?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function ProductsPage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page, category } = searchParams

  return (
    <ProductsTemplate
      sortBy={sortBy}
      page={page}
      category={category}
      countryCode={params.countryCode}
    />
  )
}
