# ESLint
Lint는 스웨터 보푸라기 등을 의미한다. 코드에도 보푸라기가 있으니.. 선언한 변수를 사용하지 않았다거나, 들여쓰지 않는 등 규격에 맞지 않는 것을 의미한다. 이런 코드 보푸라기를 해결하는 것을 Lint라고 부르며, ECMAScript 코드의 문제를 검사하는 Linter를 ESLint라고 부른다.   

## Config
먼저 설치부터 알아보자! `npm i -D eslint`를 통해 설치할 수 있다. 설치 후 `npx eslint --init` 명령어를 통해서 eslint 설정을 진행할 수 있다. 진행하면 프로젝트 루트 경로에 `.eslintrc.{선택한 포맷}`으로 나타날 것이다.
```
➜  project1 npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
  @eslint/create-config
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
Successfully created .eslintrc.json file in 'path'
```
여기서 주목해야할 점은 `extends, rules` 두가지이다.
## Rule
```
rules: {
    "for-direction" : "error",
},
```
`rules`는 eslint에서 검사하고자 하는 규칙들을 의미한다. 공식 사이트의 [Rules](https://eslint.org/docs/rules/)를  보면 상당히 많은 것들을 확인할 수 있다.   
가령, `for-direction` 규칙을 보면 아래와 같이 설명을 보여준다. eslint 설정인 `.eslintrc.js`에서 현재 나와있는 정보들 중 extends, rules를 주석처리 하고 rules에 위와 같이 추가해보자.   
그 후에 코드 파일에 아래처럼 입력 후 `npx eslint {code}`를 해주면 오류가 나타날 것이다.
```
//code.js
for (var i = 0; i < 10; i--) {
}

4:1  error  The update clause in this loop moves the variable in the wrong direction  for-direction

✖ 1 problem (1 error, 0 warnings)
```

## Extends
```
extends: [
    "eslint:recommended",
],
```
extends는 규칙들을 미리 적용해둔 묶음이다. 아까 보았던 [Rules](https://eslint.org/docs/rules/) 페이지에 보면 체크 표시가 있는 경우 `"extends": "eslint:recommended"`에 적용되어있다고 나와있다. 적용 법은 매우 간단하다. 설정파일의 extends 항목에 넣으면 된다! 만약 eslint init 명령어에서 vue or react가 쓰인다고 하면 `"plugin:react/recommended",`도 포함될 것이다!   


# Prettier
Prettier는 코드를 좀 더 이쁘게 만들어준다. [Prettier Playground](https://prettier.io/playground/)를 확인해보면 직접 rule을 만들 수 있다. 우선 디폴트 설정을 json으로 복사하여 `.prettierrc.json`으로 저장하자!   

## With ESLint
eslint와 역할이 겹치는 부분도 있지만, 좀 더 일관적인 스타일로 다듬어주는 역할을 한다. 이번엔 ESLint에 Prettier를 적용하는 것을 알아보자! 아래의 두개를 설치, `.eslintrc`파일의 extends에 추가하자.
```
npm i -D prettier
npm i -D eslint-config-prettier

"plugin:prettier/recommended",  //prettier 규칙을 eslint 규칙으로 추가
"eslint-config-prettier"        //eslint와 중복을 방지
```

# Husky
형상관리로 Git을 사용한다면 Gti 훅을 사용할 수 있다. 커밋 전,푸시 전 등 여러 부분에서 실행되는 훅을 제공한다. `husky`는 깃 훅을 쉽게 사용할 수 있도록 한다. 
```
npm i -D husky
npx husky install
```
## add hook
이번 훅을 추가하는 예시로 커밋 전 스테이지 된 js파일에 대해 eslint검사를 진행하는 훅을 만들어보자! 먼저 stage된 파일을 eslint검사 진행해주는 `lint-staged`를 설치하고, package.json에 아래 내용을 추가하자.
```
npm i -D lint-staged
"lint-staged": {
    "*.js": "eslint --fix"
},
```
직접 오류나는 파일을 add후에 `npx lint-staged`를 진행하면 오류가 남을 알려준다. 아래 명령어로 husky의 pre-commit을 추가하고, 아까 오류나던 파일을 커밋 진행하면 오류가 나는 것을 알려준다.
```
npx husky add .husky/pre-commit "npx lint-staged"
```
