var express = require('express');
var session = require('express-session');
//npm install express-session --save : express는 session을 지원하지 않는다.
var OrientoStore = require('connect-oriento')(session);
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: '1234481723!@#!@#thisiskeyvalue',
  resave: false,
  saveUninitialized: true,
  store:new OrientoStore({
  	server: "host=localhost&port=2424&username=root&password=pass&db=o2"
  })
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
});
app.get('/auth/login',function(req,res){
	var output = `
		<h1>Login</h1>
		<form action="/auth/login" method="post">
			<p>
				<input type="text" name="username" placeholder="username">
			</p>
			<p>
				<input type="password" name="password" placeholder="password"/>
			</p>
			<p>
				<input type="submit">
			</p>
		</form>
	`;
	res.send(output);
});
app.post('/auth/login',function(req,res){
	var user= {
		username:'boram',
		password:'123',
		displayName:'boram-display'
	};
	var uname = req.body.username;
	var pwd = req.body.password;
	//실제로는 database가 개입하게 된다.
	if(uname === user.username && pwd === user.password){
		//res.send('hello master');
		req.session.displayName = user.displayName;
		req.session.save(function(){
			res.redirect('/welcome');
		});
	}else{
		res.send('who are you? <a href="/auth/login">login</a>');
	}
	//res.send(uname);
});
app.get('/welcome',function(req,res){
	if(req.session.displayName){
		res.send(`
			<h1> Hello, ${req.session.displayName} </h1>
			<a href="/auth/logout">logout</a>
		`);
	}else{
		res.send(`
			<h1>Welcome</h1>
			<a href="/auth/login">login</a>
		`);
	}
	//res.send(req.session);
});
app.get('/auth/logout',function(req,res){
	delete req.session.displayName;
	//database를 사용하는 경우 redirect을 했을때 database에 접근하기 전에 redirect가 되어 원하는 결과가 나오지 않을 수 있다.
	//database사용 - redirect사용할 경우 ==> callback function으로 작성하여 오작동을 방지한다.
	req.session.save(function(){
		res.redirect('/welcome'); 
	});
	
});
app.listen(3303, function(){
	console.log('Connect 3303 port!!');
});
