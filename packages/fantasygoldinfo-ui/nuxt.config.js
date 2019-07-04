import webpack from 'webpack'

export default {
  head: {
    titleTemplate: '%s - fantasygold.network',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'}
    ]
  },
  css: [
    'bulma/css/bulma.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '@/styles/common.less',
    '@/styles/card.less',
    '@/styles/info-table.less',
    '@/icons/style.css'
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type)
    }
  },
  build: {
    extend(config, {isServer}) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
      })
      config.plugins.push(new webpack.DefinePlugin({
        'process.env.fantasygoldinfoAPIBase': JSON.stringify(process.env.FANTASYGOLDINFO_API_BASE
          || process.env[isServer ? 'FANTASYGOLDINFO_API_BASE_SERVER' : 'FANTASYGOLDINFO_API_BASE_CLIENT']
          || 'http://localhost:3001/fantasygoldinfo-api/'),
        'process.env.fantasygoldinfoWSBase': JSON.stringify(process.env.FANTASYGOLDINFO_WS_BASE
          || process.env.FANTASYGOLDINFO_API_BASE_WS
          || 'localhost:3002/fantasygoldinfo-ws/'),
        'process.env.network': JSON.stringify(process.env.FGC_NETWORK || 'mainnet')
      }))
    },
    extractCSS: true,
    postcss: {
      features: {
        customProperties: false
      }
    }
  },
  serverMiddleware: ['packages/fantasygoldinfo-ui/middleware/ip.js'],
  plugins: [
    '~/plugins/components.js',
    '~/plugins/i18n.js',
    '~/plugins/fantasygold-utils.js',
    {src: '~/plugins/websocket.js', ssr: false}
  ]
}
