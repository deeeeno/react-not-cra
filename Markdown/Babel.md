# Babel
히브리어로 바벨은 혼돈이라는 뜻을 가지고 있다. 웹을 볼 수 있는 브라우저는 매우 많다. 인터넷 익스플로러, 크롬, 파이퍼폭스 등등.. 다양한 환경을 가지고 있다. 이렇게 환경이 다르기 때문에 같은 코드여도 동작이 안 될 수 있고, 다른 코드를 통해 되어야 하는 경우도 있다. 가령, es6는 IE에서 지원하지 않는 것..!   
이런 것을 해결해주는 것이 **Babel**이다. 
## 트랜스파일
ES6문법 혹은 타입 스크립트, JSX처럼 다른 언어로 분류되는 것을 모든 브라우저에 호환시켜 주도록 변환하는 것을 **트랜스파일**이라고 한다.  

## Babel의 설치와 동작
```
npm i -D @babel/core @babel/cli
```
바벨을 설치하고 아래와 같은 테스트 코드를 작성해본 후 명령어를 입력해보자!
```
//babel.js
const alert = msg => window.alert(msg);

//command
npx babel src/babel.js
const alert = msg => window.alert(msg);
```
## Babel의 동작
Babel은 총 3가지 단계로 트랜스파일을 진행한다.
```
1. Parsing      : 코드를 읽고 AST라는 추상 구문 트리로 변환하는 단계
2. Transforming : 추상 구문 트리를 변환하는 단계
3. Printing     : 결과물을 보여주는 단계
```
이 중 바벨 명령어는 1,3단계인 parsing, Printing을 담당하게 되고, Transforming의 경우 **Plugin**이 수행하게 된다.
## Plugin
이번에도 역시나 플러그인을 직접 만들어보면서 파악해보자! 플러그인 예시는 [바벨 공식 사이트](https://babeljs.io/docs/en/plugins#plugin-development)의 예시로 사용하였다.
```
module.exports = function myPlugin(){
  return{
    visitor:{
      //예시 : 코드 역순으로 바꾸기
      Identifier(path){
        const name = path.node.name;
        console.log(`code -> : ${name}`);
        path.node.name = name.split("").reverse().join("");
        
      },
      //const -> var로 바꾸기
      VariableDeclaration(path){
        console.log(`kind -> : ${path.node.kind}`);
        if(path.node.kind === "const") path.node.kind = 'var';
      }
    }
  }
}
//command
npx babel ./src/babel.js --plugins ./src/plugin/babel-plugin.js
kind -> : const
alert
msg
window
alert
msg
console
log
alert
var trela = gsm => wodniw.trela(gsm);

elosnoc.gol('hihi');
trela('hihi');
```
플러그인 코드를 보면 visitor라는 키를 가지는 객체를 return하도록 되어있고, Identifier, VariableDeclaration 등의 메소드를 통해 코드에 접근 할 수 있도록 되어있다. `Identifier` 메소드를 통해서는 코드를 조작할 수 있고, `VariableDeclaration`을 통해 선언 명령어를 변경할 수 있는 것을 확인해보았다.
## Preset
플러그인의 종류는 여러가지가 있다. react를 대응하기 위한 jsx 플러그인이나 화살표 함수 변경하는 플러그인 등등.. 이를 모두 묶은 것을 preset이라고 한다. 공식 홈페이지에 따르면 여러가지 프리셋이 존재한다.
```
preset-env          : es6 이상을 변환할 때 사용
preset-flow         : flow를 변환
preset-react        : react
preset-typescript   : typescript
```
예시로 es6대응을 위해 `preset-env`를 사용해보자. `npm i -D @babel/preset-env`를 통해 설치한다.   
## babel.config.js
명령어로 귀찮게 하나하나 할 수는 없다. 웹팩처럼 설정 파일을 만들 수 있다. 바벨 설정 파일을 만드는 법을 3개가 있다. babel.config.js, babel.config.json, .babelrc가 있다. 각각의 장점은 아래와 같다.[참고 사이트](https://kschoi.github.io/cs/babel-config-js-vs-babelrc/)
```
.babelrc          : 상대적인 디렉토리의 바벨 설정에 쓰임. 
babel.config.js   : 프로젝트 전체적인 바벨 설정에 쓰임.
babel.config.json : .js를 쓰면 바벨 구성 api가 노출될 수 있고 캐싱에 복잡성이 생길 수 있다함. 그래서 json게 좋다고 하더라
```
아무튼 우리는 babel.config.js로 해보자! 아래와 같이 파일을 생성하고 `npx babel ./src/babel.js`를 실행해보자.
```
module.exports = {
  presets:["@babel/preset-env"]
}

"use strict";

var alert = function alert(msg) {
  return window.alert(msg);
};

console.log('hihi');
alert('hihi');
```
기타 대응 브라우저의 버전, 폴리필(이건 더 알아보기)을 babel.config.js를 통해 설정할 수 있다.
```
module.exports = {
  presets:[
    [//프리셋에 대한 옵션을 설정할 경우 [프리셋 이름, 옵션]으로 설정해야함.
      "@babel/preset-env",{
      targets:{       //대응 브라우저 종류와 버전을 작성해줌.
        chrome : "79",
        ie : "11"
      },
      useBuiltIns:"usage",    //폴리필을 사용할 것이라는 뜻
      corejs:{version :2},
      }
    ]
  ]
}
```

## Babel with Webpack
역시나 가장 중요한건 웹팩을 통한 바벨 트랜스파일링이다. 바벨 또한 로더로 가지고 있다. `npm i -D babel-loader`를 통해 설치하자! 그 후에 webpack.config.js에서 로더 설정을 추가하자! module의 rules!
```
{
        test:/\.js$/,
        exclude:/node_modules/,   //로더 설정에서 제외시켜주셈!
        use:["babel-loader"]
      },
```
