import createWithVercelToolbar from '@vercel/toolbar/plugins/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.sanity.io",
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "edzvbldhjtahfxzruynw.supabase.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
}

const withVercelToolbar = createWithVercelToolbar();
// Instead of export default nextConfig, do this:
export default withVercelToolbar(nextConfig);