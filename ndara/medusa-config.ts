import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  // comment out to enable the admin interface on localhost
   admin: {
    disable: process.env.ADMIN_DISABLED === "true" || false,
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    path: `/`,
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            },
          },
        ],
      },
    },
  {
      resolve: "@medusajs/medusa/cache-redis",
      options: { 
        redisUrl: process.env.REDIS_URL,
      },
    },

  ],

})
