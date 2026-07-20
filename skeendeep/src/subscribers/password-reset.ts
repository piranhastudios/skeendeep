import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function passwordResetHandler({
  event: {
    data: { entity_id, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  // The event also fires for admin user resets — only email customers here
  if (actor_type !== "customer") {
    return
  }

  const notificationModuleService = container.resolve(Modules.NOTIFICATION)

  const storefrontUrl =
    process.env.STOREFRONT_URL || "https://skeendeep.storefactory.shop"

  // No country-code prefix: the storefront proxy redirects to the visitor's
  // region and preserves the query string
  const resetUrl = `${storefrontUrl}/auth/reset-password?token=${encodeURIComponent(
    token
  )}&email=${encodeURIComponent(entity_id)}`

  await notificationModuleService.createNotifications({
    to: entity_id,
    channel: "email",
    template: "password-reset",
    data: {
      email: entity_id,
      reset_url: resetUrl,
      year: new Date().getFullYear(),
    },
  })
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
