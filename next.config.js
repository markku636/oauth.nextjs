const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './src/i18n.ts'
);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
    withNextIntl({
        output: 'standalone',
        typescript: {
            ignoreBuildErrors: true,
        },
        reactStrictMode: true,
        eslint: {
            ignoreDuringBuilds: true,
        },
        logging: {
            fetches: {
                fullUrl: false,
            },
        },
        transpilePackages: ['crypto-js'],
    })
);
