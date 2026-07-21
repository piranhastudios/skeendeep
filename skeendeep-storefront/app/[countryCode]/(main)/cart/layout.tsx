import { redirect } from "next/navigation"
import { storeReleaseFlag } from "@/flags"

export default async function CartLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const storeEnabled = await storeReleaseFlag()

  if (!storeEnabled) {
    const { countryCode } = await params
    redirect(`/${countryCode}`)
  }

  return <>{children}</>
}
