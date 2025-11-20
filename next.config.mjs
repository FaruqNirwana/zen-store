/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
        ],
        // Increase minimum cache TTL to reduce optimization requests
        minimumCacheTTL: 60,
    },
    // Disable Turbopack for production builds to avoid font resolution issues
    // Vercel will use webpack instead
    experimental: {
        // Explicitly disable Turbopack for production
        turbo: process.env.NODE_ENV === 'production' ? undefined : {},
    },
};

export default nextConfig;
