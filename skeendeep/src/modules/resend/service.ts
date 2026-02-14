import {
    AbstractNotificationProviderService,
    MedusaError,
} from "@medusajs/framework/utils"
import {
    Logger,
    ProviderSendNotificationDTO,
    ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types"
import {
    CreateEmailOptions,
    Resend,
} from "resend"
import path from "path"
import { TemplateManager } from "./templates/template-manager"

type ResendOptions = {
    api_key: string
    from: string
    templates_path?: string
    use_cache?: boolean
}

type InjectedDependencies = {
    logger: Logger
}

enum Templates {
    ORDER_PLACED = "order-placed",
}

const templateSubjects: { [key in Templates]: string } = {
    [Templates.ORDER_PLACED]: "Order Confirmation - Skeendeep",
}


class ResendNotificationProviderService extends AbstractNotificationProviderService {
    static identifier = "notification-resend"
    private resendClient: Resend
    private options: ResendOptions
    private logger: Logger
    private templateManager: TemplateManager

    constructor(
        { logger }: InjectedDependencies,
        options: ResendOptions
    ) {
        super()
        this.resendClient = new Resend(options.api_key)
        this.options = options
        this.logger = logger
        
        // Initialize template manager with custom path or default to templates directory
        const templatesPath = options.templates_path || path.join(__dirname, "templates")
        this.templateManager = new TemplateManager(templatesPath, options.use_cache ?? true)
    }

    static validateOptions(options: Record<any, any>) {
        if (!options.api_key) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Option `api_key` is required in the provider's options."
            )
        }
        if (!options.from) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Option `from` is required in the provider's options."
            )
        }
    }

    /**
     * Check if a template exists
     */
    hasTemplate(template: Templates): boolean {
        return this.templateManager.hasTemplate(template)
    }

    /**
     * Get the subject line for a template
     */
    getTemplateSubject(template: Templates): string {
        return templateSubjects[template] || "New Email"
    }

    async send(
        notification: ProviderSendNotificationDTO
    ): Promise<ProviderSendNotificationResultsDTO> {
        const template = notification.template as Templates

        // Check if template exists
        if (!this.hasTemplate(template)) {
            this.logger.error(
                `Template '${notification.template}' not found. Available templates: ${Object.values(Templates).join(", ")}`
            )
            return {}
        }

        try {
            // Render the HTML template with the provided data
            const html = this.templateManager.render(template, notification.data || {})

            const emailOptions: CreateEmailOptions = {
                from: this.options.from,
                to: [notification.to],
                subject: this.getTemplateSubject(template),
                html,
            }

            const { data, error } = await this.resendClient.emails.send(emailOptions)

            if (error || !data) {
                if (error) {
                    this.logger.error("Failed to send email", error)
                } else {
                    this.logger.error("Failed to send email: unknown error")
                }
                return {}
            }

            return { id: data.id }
        } catch (error) {
            this.logger.error(`Error rendering or sending email template '${template}':`, error)
            return {}
        }
    }
}

export default ResendNotificationProviderService

// Export template data helpers for convenience
export { getOrderPlacedTemplateData } from "./templates/template-data"
export { Templates }