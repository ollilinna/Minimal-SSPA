const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  BUILD: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'src'),
  ROOT: path.resolve(__dirname, '.'), 
  NODE_MODULES: path.resolve(__dirname, 'node_modules')
}

// Webpack config
module.exports = {
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: {
    bundle: [path.join(paths.SRC, 'app.js'), path.join(paths.SRC, 'styles.js')]
  },
  output: {
    path: paths.BUILD,
    filename: 'min.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.ROOT, 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [ /node_modules/ ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: './img/[hash].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'node_modules': paths.NODE_MODULES
    }
  }
}
