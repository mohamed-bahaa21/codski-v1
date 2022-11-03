require('dotenv').config();
const pkg = require('./package.json');

module.exports = {
  images: {
    domains: ['beta.horizon-lenses.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    VERSION: pkg.version,
    FORCE_SSL: !!process.env.FORCE_SSL,
  },
  basePath: process.env.BASE_PATH,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.js$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/horizon.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000', // 30 days
          },
        ],
      },
    ];
  },
};
