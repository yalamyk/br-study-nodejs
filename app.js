// 메인 어플리케이션 : app.js  :  express에서 추천하는 시작 파일 이름이다.
var express = require('express');
var app = express(); // 가져온 모듈이 함수라서 application을 리턴한다. express 만든 사람이 정해놓은 형식이다.
app.listen(3000, function(){
	console.log('Connected 3000 port!')
}); //app에 리슨 메소드 있음3000번 포트를 리슨할 수 있다.
