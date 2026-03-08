/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Allow production builds to succeed even with type errors.
        // Type errors are still shown in dev mode. Remove this once all
        // components have been fully typed.
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
