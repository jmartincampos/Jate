const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Specify the HTML template
        filename: 'index.html' // Output HTML filename
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json', // Output manifest filename
        name: 'Your App Name', // App name
        short_name: 'App', // Short app name
        description: 'Description of your app', // App description
        background_color: '#ffffff', // Background color
        theme_color: '#ffffff', // Theme color
        icons: [
          {
            src: path.resolve('src/assets/icon.png'), // Path to your app icon
            sizes: [96, 128, 192, 256, 384, 512] // Icon sizes
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src/service-worker.js', // Path to your service worker file
        swDest: 'service-worker.js' // Output service worker filename
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/, // Match CSS files
          use: ['style-loader', 'css-loader'] // Use style-loader and css-loader
        },
        {
          test: /\.js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude node_modules directory
          use: {
            loader: 'babel-loader', // Use babel-loader
            options: {
              presets: ['@babel/preset-env'] // Use @babel/preset-env for modern JavaScript features
            }
          }
        }
      ],
    },
  };
};
