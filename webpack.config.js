const path = require('path');
module.exports = {
  mode:'development',
  entry:{
    main:'./src/app.js',
  },
  output:{
    filename:"main.js",
    path:path.resolve('./dist')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[path.resolve('./src/loader/myloader.js')]
      }
    ]
  }

}