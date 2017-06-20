var express = require('express');
var session = require('express-session');
//npm install express-session --save : express는 session을 지원하지 않는다.
var FileStore = require('session-file-store')(session);
//session-file-store : session을 파일에 저장하고 싶을때 사용하는 모듈 - express-session에 의존하고 있기 때문에 의존 관계를 명시한다.
//sessions 폴더가 생성된다.
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: '1234481723!@#!@#thisiskeyvalue',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
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
	var uname = req.body.username;
	var pwd = req.body.password;
	//실제로는 database가 개입하게 된다.
	for(var i=0; i<users.length; i++){
		var user = users[i];
		if(uname === user.username && pwd === user.password){
			//res.send('hello master');
			req.session.displayName = user.displayName;
			return req.session.save(function(){ // 저장이 된 후
				res.redirect('/welcome'); //맞다면 즉시 중지 
			});
		}
	}
	res.send('who are you? <a href="/auth/login">login</a>');
	//res.send(uname);
});
var users = [{
	username:'boram',
	password:'123',
	displayName:'boram-dis'
}];
app.post('/auth/register',function(req,res){
	var user = {
		username:req.body.username,
		password:req.body.password,
		displayName:req.body.displayName
	};
	users.push(user);
	req.session.displayName = req.body.displayName;
	req.session.save(function(){
		res.redirect('/welcome');	
	});
});
app.get('/auth/register',function(req,res){
	var output = `
		<h1>Register</h1>
		<form action="/auth/register" method="post">
			<p>
				<input type="text" name="username" placeholder="username">
			</p>
			<p>
				<input type="password" name="password" placeholder="password"/>
			</p>
			<p>
				<input type="text" name="displayName" placeholder="displayName"/>
			</p>
			<p>
				<input type="submit">
			</p>
		</form>
	`;
	res.send(output);
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
			<ul>
				<li><a href="/auth/login">login</a></li>
				<li><a href="/auth/register">register</a></li>
			</ul>			
		`);
	}
	//res.send(req.session);
});
app.get('/auth/logout',function(req,res){
	delete req.session.displayName;
	res.redirect('/welcome');
});
app.listen(3303, function(){
	console.log('Connect 3303 port!!');
});
