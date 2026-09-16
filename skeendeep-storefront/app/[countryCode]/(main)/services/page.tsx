import Image from "next/image"
import { Paintbrush, Truck, Wrench, Ruler, ArrowRight, BatteryCharging, Apple, WandSparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import LocalizedClientLink from "@/components/common/localized-client-link"
import { client } from "@/lib/sanity/client"
import { type SanityDocument } from "next-sanity"
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { type Metadata } from "next"

export const metadata: Metadata = {
	title: 'Treatments',
	description: 'We treat Acne, Excessive Sweating, Wrinkles, Thread Veins and offers Fat Reduction. Explore our range of treatments specifically tailored to you and your skin.',
}

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? imageUrlBuilder({ projectId, dataset }).image(source)
		: null

const SERVICES_PAGE_QUERY = `*[_type == "servicesPage"] | order(publishedAt desc)[0]{
  _id,
  title,
  headerDescription,
  services[]{
    title,
    icon,
    description,
    features,
    image
  },
  processTitle,
  processDescription,
  processSteps[]{
    number,
    title,
    description
  },
  ctaTitle,
  ctaDescription,
  ctaButtonText
}`

const options = { next: { revalidate: 30 } }

const iconMap = {
	Paintbrush,
	Ruler,
	Truck,
	Wrench,
	BatteryCharging,
	Apple,
	WandSparkles
}

const defaultServices = [
	{
		icon: "WandSparkles",
		title: "Wrinkle Reduction",
		description:
			"Clinically proven treatments that soften fine lines and wrinkles, helping you look rested and natural without surgery.",
		features: [
			"Non-invasive treatments",
			"Natural-looking results",
			"Performed by medical professionals",
			"No downtime",
		],
		image: "/homepage-welcome-clinic.webp",
	},
	{
		icon: "Apple",
		title: "Acne Treatment",
		description:
			"Personalised plans that tackle active breakouts and prevent them from returning, tailored to your skin type and history.",
		features: [
			"Personalised treatment plan",
			"Targets active breakouts",
			"Prevents recurrence",
			"Post-treatment skincare advice",
		],
		image: "/Dr-Adeline-Afong-GP-and-Aesthetics-Clinician-Large-e1758041158206.webp",
	},
	{
		icon: "BatteryCharging",
		title: "Excessive Sweating",
		description:
			"An effective, medically supervised solution for excessive sweating, giving you confidence and comfort every day.",
		features: [
			"Medically supervised",
			"Long-lasting results",
			"Minimally invasive",
			"Quick procedure",
		],
		image: "/img_9385_538_kb.jpg",
	},
	{
		icon: "Paintbrush",
		title: "Fat Reduction",
		description:
			"Targeted, non-invasive treatments that help reduce localised fat and refine your body contours.",
		features: [
			"Non-invasive technology",
			"Targets stubborn fat",
			"Gradual, natural results",
			"No downtime",
		],
		image: "/homepage-welcome-clinic.webp",
	},
]

const defaultProcessSteps = [
	{
		number: "01",
		title: "Consultation",
		description:
			"We begin with a thorough assessment of your skin and a discussion of your goals.",
	},
	{
		number: "02",
		title: "Personalised Plan",
		description:
			"Your practitioner designs a treatment and skincare plan tailored to you.",
	},
	{
		number: "03",
		title: "Treatment",
		description:
			"Your treatment is performed by an experienced medical professional.",
	},
	{
		number: "04",
		title: "Aftercare",
		description:
			"We guide your follow-up care so your results look their best.",
	},
]

export default async function ServicesPage() {
	const pageData = await client.fetch<SanityDocument>(
		SERVICES_PAGE_QUERY,
		{},
		options
	)

	const services = pageData?.services?.map((service: any) => ({
		...service,
		image: service.image ? urlFor(service.image)?.width(800).height(600).url() : null,
	})) || defaultServices

	const processSteps = pageData?.processSteps || defaultProcessSteps
	const pageTitle = pageData?.title || "Our Treatments"
	const headerDescription = pageData?.headerDescription || "Explore our range of clinically proven, non-invasive treatments — each tailored to you and your skin."
	const processTitle = pageData?.processTitle || "Our Process"
	const processDescription = pageData?.processDescription || "A clear, comfortable journey from consultation to aftercare."
	const ctaTitle = pageData?.ctaTitle || "Ready to Start?"
	const ctaDescription = pageData?.ctaDescription || "Book a consultation with our medical team and take the first step towards healthier-looking skin."
	const ctaButtonText = pageData?.ctaButtonText || "Book a Consultation"

	return (
		<div className="min-h-screen bg-background">
			{/* Page Header */}
			<section className="bg-secondary py-16 md:py-24">
				<div className="container mx-auto px-6">
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
						{pageTitle}
					</h1>
					<p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
						{headerDescription}
					</p>
				</div>
			</section>

			{/* Services List */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-6">
					<div className="flex flex-col gap-24">
						{services.map((service: any, index: number) => {
							const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Paintbrush
							return (
								<div
									key={service.title}
									className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
										}`}
								>
									{/* Image */}
									<div
										className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""
											}`}
									>
										<Image
											src={service.image || "/placeholder.svg"}
											alt={service.title}
											fill
											className="object-cover"
										/>
									</div>

									{/* Content */}
									<div className={index % 2 === 1 ? "md:order-1" : ""}>
										<div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-6">
											<IconComponent className="w-7 h-7 text-accent" />
										</div>
										<h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
											{service.title}
										</h2>
										<p className="mt-4 text-muted-foreground leading-relaxed">
											{service.description}
										</p>
										<ul className="mt-6 grid grid-cols-2 gap-3">
											{service.features.map((feature: string) => (
												<li
													key={feature}
													className="flex items-start gap-2 text-sm text-foreground"
												>
													<div className="w-1.5 h-1.5 mt-[7px] rounded-full bg-accent flex-shrink-0" />
													{feature}
												</li>
											))}
										</ul>
										<LocalizedClientLink href="/services/list">
											<Button className="mt-8 rounded-full bg-foreground text-background hover:bg-foreground/90 px-6">
												Learn More{" "}
												<ArrowRight className="w-4 h-4 ml-2" />
											</Button>
										</LocalizedClientLink>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className="py-16 md:py-24 bg-secondary">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight">
							{processTitle}
						</h2>
						<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
							{processDescription}
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{processSteps.map((step: any) => (
							<div key={step.number} className="text-center">
								<span className="font-serif text-5xl md:text-6xl font-medium text-accent/30">
									{step.number}
								</span>
								<h3 className="font-medium text-lg text-foreground mt-4 mb-2">
									{step.title}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-6">
					<div className="bg-foreground rounded-2xl p-12 md:p-16 text-center">
						<h2 className="font-serif text-3xl md:text-4xl font-medium text-background tracking-tight">
							{ctaTitle}
						</h2>
						<p className="mt-4 text-background/70 max-w-xl mx-auto">
							{ctaDescription}
						</p>
						<Button className="mt-8 rounded-full bg-background text-foreground hover:bg-background/90 px-8 py-6">
							{ctaButtonText}
						</Button>
					</div>
				</div>
			</section>

		</div>
	)
}
