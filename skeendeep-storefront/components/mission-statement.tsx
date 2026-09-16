import type { SanityDocument } from "next-sanity"

export function MissionStatement({ homePageData }: { homePageData?: SanityDocument }) {
  const label = homePageData?.missionLabel || "The SkeenDeep Approach"
  const statement = homePageData?.missionStatement || "WE CARE ABOUT RESULTS, SAFETY, AND UNDERSTANDING. ABOUT TREATMENTS AND SKINCARE THAT SUPPORT YOUR SKIN'S HEALTH AND CONFIDENCE."

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-xs md:text-sm tracking-[0.2em] uppercase mb-8">
            {label}
          </p>
          
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-foreground text-balance">
            {statement}
          </h2>
        </div>
      </div>
    </section>
  )
}
