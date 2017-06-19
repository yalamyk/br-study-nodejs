var express = require('express');
var session = require('express-session');
//npm install express-session --save : express는 session을 지원하지 않는다.

var app = express();
app.use(session({
  secret: '1234481723!@#!@#thisiskeyvalue',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}));
app.get('/count',function(req,res){
	if(req.session.count){//값을 저장하고
		req.session.count++;
	}else{
		req.session.count = 1;
	}
	res.send('count : '+req.session.count);
});
app.get('/tmp',function(req,res){
	res.send('result:'+req.session.count); //읽어 올 수 있다.
})
app.listen(3303, function(){
	console.log('Connect 3303 port!!');
});
