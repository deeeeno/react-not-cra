module.exports = {
  presets:[
    [//프리셋에 대한 옵션을 설정할 경우 [프리셋 이름, 옵션]으로 설정해야함.
      "@babel/preset-env",{
      targets:{       //대응 브라우저 종류와 버전을 작성해줌.
        chrome : "79",
        ie : "11"
      },
      useBuiltIns:"usage",
      corejs:{version :2},
      }
    ]
  ]
}