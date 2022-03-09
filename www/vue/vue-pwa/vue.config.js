const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: true,
  pwa: {
    themeColor: '#5F5F5F',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      maskicon: null,
      favicon32: './img/icons/favicon-32x32.png',
      favicon16: './img/icons/favicon-16x16.png',
      appleTouchIcon: null,
      msTileImage: null,
    },
    manifestOptions: {
      name: 'Bouncy Red Ball',
      short_name: 'Bouncy',
      start_url: './',
      display: 'standalone',
      themeColor: '#5F5F5F',
      icons: [
        {
          src: './img/icons/favicon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  },
});
