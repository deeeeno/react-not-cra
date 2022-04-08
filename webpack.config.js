const path = require('path');
const FileListPlugin = require('./src/plugin/myPlugin')
const {BannerPlugin} = require('webpack');
const banner = require('./src/plugin/banner');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'development',
  entry:{
    main:'./src/app.js',
  },
  output:{
    filename:"main.js",
    path:path.resolve('./dist'),
    clean:true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:["babel-loader"]
      },/*
      {
        test:/\.png$/,
        loader:"file-loader",
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        }, 
      },*/
      {
        test:/\.css$/,
        use:["style-loader","css-loader"],
      },

    ]
  },
  plugins: [
    new BannerPlugin(banner()),
    new HtmlWebpackPlugin({
      template : './src/template.html',
      title: 'dino webpack',
      filename: 'index.html',
      inject : 'body',

    })
  
  
  ],

}