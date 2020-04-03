
require('dotenv-flow').config();

console.log('database host:', process.env.CLOUDINARY_DOMAIN);



const withOffline = moduleExists('next-offline')
  ? require('next-offline')
  : {}

const nextConfig = {
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
    APOLLO_CLIENT: process.env.APOLLO_CLIENT,
    APOLLO_TOKEN: process.env.APOLLO_TOKEN
  },
  target: 'serverless',
  workboxOpts: {
    swDest: 'service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
}

module.exports = moduleExists('next-offline')
  ? withOffline(nextConfig)
  : nextConfig

function moduleExists (name) {
  try {
    return require.resolve(name)
  } catch (error) {
    return false
  }
}


