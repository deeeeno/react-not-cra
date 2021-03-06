# Node, NPM
## node
당연히 가장 먼서 세팅해야하는 것은 node와 npm이다. 지금은 너무나도 자연스럽게 `npm init -y`를 먼저 사용한 세팅을 진행하지만, 문득 **왜 사용할까?**라는 생각이 들곤 했다. 
### 왜 필요해?
가장 먼저 나타난 이유는 **최신 스펙의 개발**이다. javascript는 발전 속도가 너무나도 빠르다. 하지만, 브라우저는 이 속도를 따라오지 못한다. 이 둘 사이의 차이를 이어주는 징검다리 역할을 해주는 것이 node이다. node 환경에서 개발된 바벨, 웹팩 등의 환경을 통해 브라우저와 자바스크립트를 이어줄 수 있다.   
### 빌드, 배포
연합뉴스 선배와 얘기했을 때(2019년에..) 불과 3~4년 전만 해도 복사 붙여넣기를 통해 빌드,배포를 진행하였다고 한다. node는 이런 과정을 자동화를 시켜주고 테스트, 라이브러리 의존성도 해결해준다.
### 커스터마이징
개발 환경 셋팅을 도와주는 것들은 여러가지가 있다. CRA(create-react-app), vue-cli가 대표적으로 사용된다. 당연히 편리하지만, 그대로 사용할 수 없는 경우도 있을 것이다. 이전에 카프카 consumer 세팅을 하려하는 데에도 애를 먹었던 적이 있다(결국 해결하진 못했지만).

## npm
npm는 Node Package Manage로 node환경 속 패키지 관리나 빌드 등 프로젝트 관리하는 툴이다.
### init
우선 초기화를 해주자. 즉, 프로젝트를 생성하는 것이다. `npm init`을 입력하면 여러가지 정보를 기입하라고 나타난다. 쓰기 귀찮으면 `-y`조건을 넣어주자! 입력하는 정보는 아래와 같다.
```
name        : 프로젝트 이름
version     : 버전
description : 설명
main        : 노드 어플리케이션인 경우 진입점 경로(default : index.js), 프론트엔드 프로젝트에선 사용하지 않는다.
scripts     : 프로젝트에서 사용되는 명령어
author      : 작성자
license     : 라이센스
```
### scripts
npm을 사용한다면 스크립트를 가장 많이 사용할 것이다. 대표적으로 start, install, uninstall, test가 존재한다. 그 외에도 매우매우 많지만 대표적인 것만 알아두자!   
명령어는 추가도 가능하다. 대신 새롭게 추가한 것은 `npm run ${추가한 이름}`으로 진행해야 한다.
```
"scripts":{
  "start": "echo \"start\"",
  "build" : "echo \"build\"",
}
```