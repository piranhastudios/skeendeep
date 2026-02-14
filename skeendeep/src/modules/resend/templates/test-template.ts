import { getOrderPlacedTemplateData } from "./template-data"
import { OrderDTO, CustomerDTO } from "@medusajs/framework/types"
import ResendNotificationProviderService from "../service"
import * as dotenv from "dotenv"
import path from "path"

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../../../.env") })

// Mock logger
const mockLogger = {
    info: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.log,
}

const mockOrder: OrderDTO & { customer: CustomerDTO } = {
    id: "order_01JSNXDH9BPJWWKVW03B9E9KW8",
    display_id: 1,
    email: "jngatchu@gmail.com",
    currency_code: "gbp",
    total: 2000, // £20.00 in pence
    created_at: new Date().toISOString(),
    customer: {
        id: "cus_01JSNXD6VQC1YH56E4TGC81NWX",
        first_name: "Sarah",
        last_name: "Johnson",
        email: "jngatchu@gmail.com",
        phone: "+44 7700 900000",
        has_account: true,
        company_name: null,
        metadata: null,
        created_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    shipping_address: {
        id: "caaddr_01JSNXD6W0TGPH2JQD18K97B25",
        customer_id: "cus_01JSNXD6VQC1YH56E4TGC81NWX",
        company: "",
        first_name: "Sarah",
        last_name: "Johnson",
        address_1: "123 High Street",
        address_2: "Flat 4",
        city: "London",
        country_code: "gb",
        province: "Greater London",
        postal_code: "SW1A 1AA",
        phone: "+44 7700 900000",
        metadata: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    items: [
        {
            id: "ordli_01JSNXDH9C47KZ43WQ3TBFXZA9",
            title: "Natural Body Butter",
            subtitle: "Lavender & Chamomile",
            thumbnail: "https://images.squarespace-cdn.com/content/v1/6044d04b1b15ec3dfef6cf41/1615469806118-CVEO5XS2V27THL1BOCQK/logo-w-tagline-rgb.jpg",
            variant_id: "variant_01JSNXAQCZ5X81A3NRSVFJ3ZHQ",
            product_id: "prod_01JSNXAQBQ6MFV5VHKN420NXQW",
            product_title: "Natural Body Butter",
            product_description: "Luxurious body butter made with natural ingredients",
            product_subtitle: "Lavender & Chamomile",
            product_type: null,
            product_type_id: null,
            product_collection: null,
            product_handle: "natural-body-butter",
            variant_sku: "BODY-BUTTER-LAV",
            variant_barcode: null,
            variant_title: "50ml",
            requires_shipping: true,
            is_discountable: true,
            is_tax_inclusive: false,
            metadata: {},
            quantity: 1,
            unit_price: 1500,
            total: 1500,
            subtotal: 1500,
            tax_total: 0,
            discount_total: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        } as any,
    ],
    shipping_methods: [
        {
            id: "ordsm_01JSNXDH9B9DDRQXJT5J5AE5V1",
            name: "Standard Shipping",
            description: "3-5 business days",
            amount: 500,
            total: 500,
            subtotal: 500,
            tax_total: 0,
        } as any,
    ],
} as any

/**
 * Test sending email via Resend
 */
async function testEmailTemplate() {
    console.log("🧪 Testing Email Sending via Resend...\n")

    // Check for required environment variables
    if (!process.env.RESEND_API_KEY) {
        console.error("❌ RESEND_API_KEY environment variable is required")
        console.error("💡 Set it in your .env file or run: export RESEND_API_KEY=your_key")
        process.exit(1)
    }

    const testEmail = process.env.TEST_EMAIL || "jngatchu@gmail.com"
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Skeendeep <orders@skeendeep.com>"

    try {
        // Initialize the notification service
        const notificationService = new ResendNotificationProviderService(
            { logger: mockLogger as any },
            {
                api_key: process.env.RESEND_API_KEY,
                from: fromEmail,
                use_cache: false, // Disable cache for testing
            }
        )

        // Get template data
        const templateData = getOrderPlacedTemplateData(mockOrder)

        console.log("📧 Sending email to:", testEmail)
        console.log("📧 From:", fromEmail)
        console.log("\n📋 Template Data:")
        console.log(JSON.stringify(templateData, null, 2))
        console.log("\n")

        // Send the email
        const result = await notificationService.send({
            to: testEmail,
            template: "order-placed",
            data: templateData,
            channel: "email",
        })

        if (result.id) {
            console.log("✅ Email sent successfully!")
            console.log(`📨 Email ID: ${result.id}`)
            console.log(`\n💡 Check your inbox at ${testEmail}`)
        } else {
            console.error("❌ Failed to send email - no ID returned")
            process.exit(1)
        }
    } catch (error) {
        console.error("❌ Error sending email:", error)
        process.exit(1)
    }
}

// Run the test
testEmailTemplate()
