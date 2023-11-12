// next.config.js

module.exports = {
    // Set the mode to either 'development' or 'production'
    /*env: {
      customKey: 'my-value',
    },
    // Enable React's Strict Mode in development for highlighting potential problems
    reactStrictMode: true,
    */
    // Set up redirects
    async redirects() {
      return [
        {
          source: '/old-route',
          destination: '/new-route',
          permanent: true,
        },
      ];
    },
    // Set up headers
    async headers() {
      return [
        {
          source: '/about',
          headers: [
            {
              key: 'x-custom-header',
              value: 'my custom header value',
            },
          ],
        },
      ];
    },
    // Customize the build ID
    /*generateBuildId: async () => {
      // You can, for example, get the latest git commit hash here
      return 'my-build-id';
    },*/
    // Specify a directory where the compiled pages will reside
    distDir: 'build',
    
    // Extend the webpack config
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      // Note: we provide webpack above so you do not need to `require` it
      // Perform customizations to the webpack config
      // Important: return the modified config
      return config;
    },
  };
  