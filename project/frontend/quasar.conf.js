const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = function (/* ctx */) {
  return {
    supportTS: false,
    boot: [

      'i18n',
      'axios',
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      chainWebpack(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      },
    },

    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {},
      importStrategy: 'auto',
      plugins: [
        'LocalStorage',
        'Notify'
      ]
    },

    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: `Decetralized Insurance`,
        short_name: `Decetralized Insurance`,
        description: `A Community Based Risk Coverage on Zilliqa`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
      },

      builder: {
        appId: 'zilinc'
      },

      nodeIntegration: true,

      extendWebpack(/* cfg */) {
      }
    }
  }
}
