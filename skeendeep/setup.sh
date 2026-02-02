#!/bin/bash
set -e

echo "🔍 Creating .env file from environment variables..."

# Create .env file from environment variables
cat > .env << EOF
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}
JWT_SECRET=${JWT_SECRET}
COOKIE_SECRET=${COOKIE_SECRET}
STORE_CORS=${STORE_CORS}
ADMIN_CORS=${ADMIN_CORS}
AUTH_CORS=${AUTH_CORS}
MEDUSA_ADMIN_ONBOARDING_TYPE=${MEDUSA_ADMIN_ONBOARDING_TYPE}
MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=${MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY}
NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
NEXT_PUBLIC_SUPABASE_BUCKET_NAME=${NEXT_PUBLIC_SUPABASE_BUCKET_NAME}
STRIPE_API_KEY=${STRIPE_API_KEY}
ADMIN_DISABLED=${ADMIN_DISABLED}
DB_NAME=${DB_NAME}
EOF

echo "✅ .env file created"

echo "🔍 Running database setup..."

# Get database name from env or use default
DB_NAME=${DB_NAME:-${DATABASE_NAME:-"medusa-db"}}

echo "🗄️  Setting up database: $DB_NAME"
medusa db:setup --db "$DB_NAME"

echo "🌱 Seeding database..."
yarn seed

echo "👤 Checking for existing admin users..."
# Create admin user only on first deployment
# The medusa user command will fail if user already exists, so we check first
ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@storefactory.shop"}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-"supersecret"}

# Try to create admin user - if it fails (user exists), continue anyway
if npx medusa user -e "$ADMIN_EMAIL" -p "$ADMIN_PASSWORD" 2>/dev/null; then
  echo "✅ Admin user created: $ADMIN_EMAIL"
  echo "⚠️  IMPORTANT: Save these credentials securely!"
  echo "   Email: $ADMIN_EMAIL"
  echo "   Password: $ADMIN_PASSWORD"
else
  echo "ℹ️  Admin user already exists or could not be created, skipping..."
fi

echo "✅ Setup completed successfully!"