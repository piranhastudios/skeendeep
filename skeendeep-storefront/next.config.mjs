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
      'images.unsplash.com',
      'lh3.googleusercontent.com'
    ],
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/:countryCode((?!api|_next).{2})/about-us",
        destination: "/:countryCode/about",
        permanent: true,
      },
    ]
  },
}

const withVercelToolbar = createWithVercelToolbar();
// Instead of export default nextConfig, do this:
export default withVercelToolbar(nextConfig);