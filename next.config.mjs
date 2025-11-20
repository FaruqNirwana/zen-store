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
    // Set Turbopack root to silence workspace root warning
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
