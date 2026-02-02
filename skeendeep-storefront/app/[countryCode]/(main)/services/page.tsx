import Image from "next/image"
import { Paintbrush, Truck, Wrench, Ruler, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import LocalizedClientLink from "@/components/common/localized-client-link"

const services = [
	{
		icon: Paintbrush,
		title: "Interior Design",
		description:
			"Our expert designers work closely with you to create spaces that reflect your personality and lifestyle. From concept to completion, we bring your vision to life.",
		features: [
			"Personalized consultations",
			"3D visualizations",
			"Material sourcing",
			"Project management",
		],
		image:
			"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
	},
	{
		icon: Ruler,
		title: "Custom Furniture",
		description:
			"Each piece is meticulously crafted to your exact specifications using traditional techniques and sustainable materials from our certified forests.",
		features: [
			"Bespoke designs",
			"Premium materials",
			"Skilled craftsmanship",
			"Lifetime warranty",
		],
		image:
			"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
	},
	{
		icon: Truck,
		title: "Delivery & Setup",
		description:
			"White-glove delivery service ensures your furniture arrives in perfect condition. Our team handles everything from transport to placement.",
		features: [
			"Scheduled delivery",
			"Careful handling",
			"Room placement",
			"Packaging removal",
		],
		image:
			"https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80",
	},
	{
		icon: Wrench,
		title: "Installation",
		description:
			"Professional installation by our trained technicians. We ensure every piece is properly assembled and positioned for optimal use and aesthetics.",
		features: [
			"Expert assembly",
			"Wall mounting",
			"Lighting setup",
			"Final inspection",
		],
		image:
			"https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
	},
]

const processSteps = [
	{
		number: "01",
		title: "Consultation",
		description:
			"We begin with understanding your needs, style preferences, and space requirements.",
	},
	{
		number: "02",
		title: "Design",
		description:
			"Our team creates detailed designs and 3D visualizations for your approval.",
	},
	{
		number: "03",
		title: "Crafting",
		description:
			"Skilled artisans bring designs to life using premium sustainable materials.",
	},
	{
		number: "04",
		title: "Delivery",
		description:
			"White-glove delivery and professional installation complete the journey.",
	},
]

export default function ServicesPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header />

			{/* Page Header */}
			<section className="bg-secondary py-16 md:py-24">
				<div className="container mx-auto px-6">
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight text-center">
						Our Services
					</h1>
					<p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
						From initial concept to final installation, we provide comprehensive
						services to transform your living spaces into extraordinary
						environments.
					</p>
				</div>
			</section>

			{/* Services List */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-6">
					<div className="flex flex-col gap-24">
						{services.map((service, index) => (
							<div
								key={service.title}
								className={`grid md:grid-cols-2 gap-12 items-center ${
									index % 2 === 1 ? "md:flex-row-reverse" : ""
								}`}
							>
								{/* Image */}
								<div
									className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${
										index % 2 === 1 ? "md:order-2" : ""
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
										<service.icon className="w-7 h-7 text-accent" />
									</div>
									<h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
										{service.title}
									</h2>
									<p className="mt-4 text-muted-foreground leading-relaxed">
										{service.description}
									</p>
									<ul className="mt-6 grid grid-cols-2 gap-3">
										{service.features.map((feature) => (
											<li
												key={feature}
												className="flex items-center gap-2 text-sm text-foreground"
											>
												<div className="w-1.5 h-1.5 rounded-full bg-accent" />
												{feature}
											</li>
										))}
									</ul>
									<LocalizedClientLink href="/services/details">
										<Button className="mt-8 rounded-full bg-foreground text-background hover:bg-foreground/90 px-6">
											Learn More{" "}
											<ArrowRight className="w-4 h-4 ml-2" />
										</Button>
									</LocalizedClientLink>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className="py-16 md:py-24 bg-secondary">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight">
							Our Process
						</h2>
						<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
							A seamless journey from inspiration to installation.
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{processSteps.map((step) => (
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
							Ready to Transform Your Space?
						</h2>
						<p className="mt-4 text-background/70 max-w-xl mx-auto">
							Schedule a free consultation with our design experts and take the
							first step towards your dream home.
						</p>
						<Button className="mt-8 rounded-full bg-background text-foreground hover:bg-background/90 px-8 py-6">
							Book a Consultation
						</Button>
					</div>
				</div>
			</section>

					</div>
	)
}
