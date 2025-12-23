import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default withNextIntl(nextConfig);
