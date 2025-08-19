/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['nyoftuegpgpslnvdvdln.supabase.co'],
    unoptimized: true,
  },
  // Disable LightningCSS to prevent fetch errors
  experimental: {
    ...nextConfig?.experimental,
    turbo: {
      rules: {
        '*.css': {
          loaders: ['css-loader'],
          as: '*.css',
        },
      },
    },
  },
}

export default nextConfig
