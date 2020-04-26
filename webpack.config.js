const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin"); 
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === "development"; 
const isProd = !isDev;
console.log(`webpack mode = ${isDev?'development':'production'}`);


const optimization = () => {
  const config = {
    splitChunks: { 
      chunks: "all" 
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    "css-loader"
  ];

  if(extra) {
    loaders.push(extra);
  }
    
    return loaders;
}

module.exports = {
  
  mode: "development",
  entry: {
    main: "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename("js")
  },
  resolve: {
    alias: {
      "@myStyle": path.resolve(__dirname, "src/css/style.scss") 
    }
  },
  optimization: optimization(), 
  devServer: {
    port: 80,
    hot: isDev 
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html" 
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename("css")
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders("less-loader")
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader")
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"] 
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/, 
        use: ["file-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"] 
      },    
    ]
  }
};