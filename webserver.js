// javascript 

// v8 크롬만들면서 오픈소스로 공개 ---> web에 국한되게 되지 않게 됨

// nodejs
// v8 event-draven non-blocking io 가 결합하여 서버쪽에서도 javascript가 동작하는 결정적계기가됨




// runtime이라는 기술은 webbrowser nodejs이 있다.
// 이 2개를 동작해서 서버쪽에서 동작하는 js를 만들수 있다.

// alert('hellow word'); --> function
// ===> only web browser

// javascript와 runtiem의 관계
// webbrowser과 nodejs에 어떤것이 있느냐에 따라 실행할 수 있는 기능이 다름




// python java rubye ====> nodejs의 경쟁자들
// nodejs 장점
// - 성능이 좋은 어플리케이션을 만들 수 있다.
// - server도 js를 만들어서 하나의 완결된 application을 만들 수 있다. 





const http = require('http'); //http라는 부품을 가져와서 node에서 사용할 수 있게 한다.
// http 상수(한번 모듈을 가져오면 바뀌지 않기 때문에 상수. 상수의 약자인 const를 붙여 준다.)에 http 모듈을 가져온다.

const hostname = '127.0.0.1'; // 이 컴퓨터의 ip라고 생각하면 된다.
const port = 300; // port

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n'); // 응답의 결과 
});

server.listen(port, hostname, () => { //server에서 listen이라는 것을 return 해준다. javascript의 객체지향 개념이다.
  console.log(`Server running at http://${hostname}:${port}/`);
});

// 인터넷의 동작 방법
// 1. 서버
// 2. 클라이언트
// 3. 아이피
// 4. 포트

// 클라이언트====인터넷====서버
//  --> 상대적인 개념이다.
//  --> 웹브라우저가 설치되어 있는 곳이 클라이언트다.
//  --> http://a.com을 받아 응답하는 곳이 서버이다.
//  --> http://a.com는 도매인의 이름일 뿐이다. (전화번호의 개념)
//  --> 실제로는 http://a.com이 52.192.173.151인 ip의 값이 것이다.


//  http://a.com ---> 서버 :  http://a.com (게임, 운동..등등 많은 application이 있는데 누가 응답할 것인가?)
// --> 여러개의 문이 있다. 이 문을 port라고 한다.
// --> 80번 포트를 열어 놓고(listen) 사용자가 http://a.com:80이라고 접속하면 컴퓨터가 80으로 연결해준다. 웹서버가 응답할 수 있게 해준다.
// --> 80이라는것을 생략할 수도 있다. (http로 접속할 경우에는 80이라고 하자고 약속을 해놓을 경우에.)
// --> http://a.com:1337, http://a.com:80등 가능


// ===> nodejs는 빠르게 응답하는것에 초점을 맞추고 있다.



// [모듈]
// nodejs는 웹서버를 이미 만들어 놓았다.
// 그것을 배우면 되는것이다.
// 이미 만들어져있는 모듈들.

[npm]
javascript가 제공하는 모듈 : Array, String, Data.....
기본적인 기능을 결합해서 많은 기능들을 만들어 낼 수 있다. 
원자를 어떻게 결합하느냐에 따라 물, 수소가 되듯.
그렇기 위해 좋은 부품. 모듈이 필요하다.
타인의 모듈을 가져와 쓸 수 있는것이 바로 npm이다.
npm : node에서 만들어진 패키지 메니저
1설치 2삭제 3업그레이드 4의존성관리(우리가 사용하는 다른 사람들의 module을 관리)

npmjs.com ==> 많은 사용자가 있고 많은 종류의 module이 등록되어 있다.
 -g : global 어느 위치에서든 사용할 수 있게 된다.

 [npm : module로 실제 사용. underscorejs]
 npm init : 여러 속성이 있다. --> package.json 다른 사람이 내가 만든것을 다운받을 수 있는 데이터의 초석
 완료시 extraneous라고 뜬다. -> 이물질. 불완전
   [옵션]
     ---save : 의존성 표시
     package.json에 dependencies옵션이 추가된다. 해당 프로젝트에 꼭 필요한 경우. 이것이 있으면 언제든지 underscore 1.8.3을 포함시킬 수 있다.
     다른 디랙토리에서 사영할 경우에도 해당 의존성을 쉽게 가져올 수 있게 된다.

예시로 underscore이 있다.

[callback 함수]
a = [3,1,2]; function b(v1, v2){console.log('c',v1,v2);return 0;}; a.sort(b); console.log(a);
==> b는 누군가에게 호출당할 함수이다. 이것이 콜백 함수 이다. 확장될 가능성이 있다.
==> b라고 이름을 준 이유는 여러번 호출되게 위해서 이다.

a = [3,1,2]; a.sort(function(v1, v2){return v2-v1}); console.log(a);

function sort(callback){callback();}sort();
==> 에러 : 인자가 전달이 되었어야 한다.
sort(function(){console.log('hello callback');}); 
==> 함수를 인자로 전달하여 sort라는 함수 안에서 callback이 실행이 되게 된다.


[동기 비동기의 개념]
동기 : synchronous : 서버에서 한명 한명에게 이메일을 보냄.
비동기 : asynchronous : 이메일을 보내는 별도의 시스템에게 일을 위임시킴. 그 사이에 다른 일처리를 끝낸 후 사용자에게 알린다.

[동기와 비동기의 코드]
-fs.readFileSync : 동기. nodejs에서는 왠만하면 sync를 쓰지 말라고 명시가 되어 있다.
-fs.readFile : 비동기


