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
  },
}

export default nextConfig
