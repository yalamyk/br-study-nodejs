// 메인 어플리케이션 : app.js 
//express에서 추천하는 시작 파일 이름이다.
var express = require('express');
var app = express(); // 가져온 모듈이 함수라서 application을 리턴한다. express 만든 사람이 정해놓은 형식이다.

//// express 라우터에 대해서 : get
// ****************************************** 라우팅의 정의 : 사용자 Router Controller
// 사용자 get('/') send('welcome to homepage')
//          get('/login') send('login please')
// get : 사용자의 요청과 요청에 대한 처리인 controller를 중개해 주는 역활이다.

//아래가 없을 경우 에러나더라 
app.get('/', function(req, res){ // 사용자가 요청한것에 대한 정보 //사용자가 요청한것에 대한 정보에 대한 응답에 대한 객체를 담고 있다.
	res.send('hello home page');
}); // /는 홈의  말한다. // 사용자 접속 방식. url get (post도 있다.)
app.get('/login', function(req, res){ //get 메소드를 라우터라고 부르고 하는 일을 라우팅이라고 부른다.
	res.send('login please');
});
app.listen(3000, function(){
	console.log('Connected 3000 port!')
}); //app에 리슨 메소드 있음3000번 포트를 리슨할 수 있다.

//******************************************

// ****************************************** 정적인 디렉토리와 동적인 소스코드 실행
app.use(express.static('public'));  //정적인 디랙토리 지정하는 기능의 코드 덩어리 : 이해하지 말기. 낙천적으로. :: public이라는 정적인 파일을 사용할 수 있게 된다.
// 1. public 안에 있는 것을 / 밑에 작성하면 바로 불러 올 수 있다.
// 2. 아래처럼url 을 추가시켜 줄 수 있다. 
app.get('/route', function(req, res){
	res.send('Hello Router, <img src="/the_love.jpg">');
});
app.get('/dynamic', function(req,res){ //동적으로 실행이 되는 것이라서 node app을 껏다가 다시 켜야 한다.
	var lis = '';
	for(var i=1; i<5; i++){
		lis = lis + '<li>Coding</li>'
	}
	var time = Date(); // 
	var output = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
		<head>
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<title></title>
		</head>
		<body>
			Hello, Dynamic!
			<ul>
				${lis}
			</ul>
			${time}
		</body>
		</html>`; // `소스코드` : 그래이 백센트
	res.send(output);
});
// ****************************************** 

// ****************************************** Jade 사용 : 정적인 파일과 동적인 파일의 장점을 둘다 갖춘것 : 탬플릿 엔진
app.set('view engine', 'jade'); //jade를 연결하는 코드
app.set('views', './views'); //기본값을 갖고 있지만 명확하게 하기위해 작성
app.get('/template', function(req, res){
	res.render('temp',{time : Date(), _title:'Jade' }); //temp라는 template  파일을 랜더링 해서 서버로 전송한다.

});
// ******************************************

//******************************************시멘틱 url 
// app.get('/topic',function(req, res){
app.get('/topic/:id',function(req, res){// 시멘틱 url : 깔끔한 url //query string을 바꾼다.
	//res.send(req.query.id + ', ' +req.query.name);
	//http://localhost:3000/topic?name=boram&id=123
	var topics = [
		'JavaScript is ...',
		'NodeJs is ...',
		'Express is ...'
	];
	var output = `
		<a href="/topic?id=0?">JavaScript</a><br>
		<a href="/topic?id=1?">NdirodeJs</a><br>
		<a href="/topic?id=2?">Express</a><br>
		<!--${topics[req.query.id]}-->
		${topics[req.params.id]} <!-- 시멘틱 url 일 경우에는 params로 사용한다. -->
	`;
	res.send(output);
});
app.get('/topic/:id/:mode',function(req, res){
	res.send(req.params.id+' , '+req.params.mode);
});
// ****************************************** 
// ****************************************** form의 사용
app.get('/form',function(req,res){
	res.render('form');
});
// ******************************************
//****************************************** post 방식으로 받기

// app.get('/form_receiver', function(req,res){
// 	var title=req.query.title;
// 	var description = req.query.description;
// 	res.send(title+', '+description);
// });
var bodyParser = require('body-parser'); //미들웨어로드 : post방식일 경우 url에 값이 없기 때문에 body의 값을 받아와야 됨.
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/form_receiver',function(req,res){
	var title = req.body.title; //body로 받아오는것을 가로챌수있다...
	var description = req.body.description;
	res.send(title+', '+description);
});