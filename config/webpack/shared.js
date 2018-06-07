const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Clean = require('clean-webpack-plugin');
const { resolve } = require('path');
const { sync } = require('glob');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = 'dist';
const examplePath = './source/stylesheets/examples/';

process.noDeprecation = true;

module.exports = {
  entry: {
    body: './source/javascripts/body.js',
    head: './source/javascripts/head.js',
    application: './source/stylesheets/application.scss',
    exampleGettingStarted: examplePath + 'example-getting-started.scss',
    exampleReset: examplePath + 'example-reset.scss',
    exampleElements: examplePath + 'example-elements.scss',
    exampleCard: examplePath + 'example-card.scss',
    exampleWorkingWithMaps: examplePath + 'example-working-with-maps.scss',
    exampleComponents: examplePath + 'example-components.scss',
    images: sync('./source/images/**/*', { nodir: true }),
    vendor: ['lodash', 'jquery']
  },

  output: {
    path: resolve(publicPath),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env']]
          }
        }
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: 'import-glob-loader',
        enforce: 'pre'
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /fonts\/.*\.(svg|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '',
              // can't use 'fonts' because it conflicts with Middleman
              name: isProduction ? 'fnt/[name]-[hash].[ext]' : 'fnt/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /images\/.*\.(jpg|jpeg|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '',
              outputPath: 'img/',
              context: 'source/images/',
              // can't use 'images' because it conflicts with Middleman
              name: isProduction ? '[path][name]-[hash].[ext]' : '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: require.resolve('jquery'),
        use: ['expose-loader?$', 'expose-loader?jQuery']
      },
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: ['modernizr-loader', 'json-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.ts', '.sass', '.scss', '.css', '.png', '.svg', '.gif', '.jpeg'],
    modules: [resolve('source/javascripts'), 'node_modules'],
    alias: {
      assets: resolve('source/'),
      modernizr$: resolve('.modernizrrc')
    }
  },

  resolveLoader: {
    modules: ['node_modules']
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))),
    new Clean([publicPath], {
      root: resolve()
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].bundle-[hash].css' : '[name].bundle.css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ManifestPlugin({
      publicPath: '/',
      writeToFileEmit: true
    })
  ]
};
