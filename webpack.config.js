const path = require('path');
const FileListPlugin = require('./src/plugin/myPlugin')
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
        use:[path.resolve('./src/loader/myloader.js')]
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
  plugins: [new FileListPlugin({outputFile:'test.md'})],

}