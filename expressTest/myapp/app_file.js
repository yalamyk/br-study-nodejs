var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_file');
app.set('view engine','jade');

app.listen(3000,function(){
	console.log('Connected, 3000 port');
});
app.get('/topic/new',function(req,res){
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error'); //send가 실행되면 다음 코드는 실행되지 않는다.
		}
		res.render('new',{topics:files});
	});
	
});
//topic, topic/:id 두가지 경우의 url을 받았을경우.
//아래의 문제가 있기 때문에 이렇게 작성한다.
app.get(['/topic', '/topic/:id'],function(req, res){
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error'); //send가 실행되면 다음 코드는 실행되지 않는다.
		}
		var id = req.params.id;
		if(id){//id 값이 있을때 
			fs.readFile('data/'+id, 'utf8', function(err, data){
				if(err){
					console.log(err);
					res.status(500).sned('Internal Server');
				}
				res.render('view', {topics:files, title:id, description:data});
			});
		}else{//id 값이 없을때
			res.render('view', {topics:files, title:'Welecome', description:'hello javascript for server'});
		}
	});
	//res.render('view');
});
app.post('/topic',function(req,res){
	var title = req.body.title;
	var description = req.body.description;

	fs.writeFile('data/'+title, description, function(err){
		if(err){
			res.status(500).send('Internal Server Error'); //send가 실행되면 다음 코드는 실행되지 않는다.
			//사용자에게 500이라는 에러가 있다는것을 전달.
			//자세한 정보는 전달하지 않는다. : 해킹의 위험이 될 수 있는 정보가 있을 수 있다.
		}
		//res.send('Success!');
		res.redirect('/topic/'+title); //redirect : 보내버린다.
	});
});
app.get('/topic', function(req,res){ //주소를 직접 치고 들어오는 것이 get이다.
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error'); //send가 실행되면 다음 코드는 실행되지 않는다.
		}
		res.render('view', {topics:files}); //{}객체 안에 담아서 주임한다.
	});
	//res.render('view');
});
//topic에서 topics를 넘겨줬는데
//같은 topic에 id만 추가 되었을 뿐인데
//위에서 넘겨준 topics가 없어서 애러가 난다.
//따라서 topics를 읽어온 다음에, 그속에 파일 값과 함께 넘겨준다.
app.get('/topic/:id',function(req,res){
	var id = req.params.id;
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error'); //send가 실행되면 다음 코드는 실행되지 않는다.
		}
		fs.readFile('data/'+id, 'utf8', function(err, data){
			if(err){
				console.log(err);
				res.status(500).sned('Internal Server');
			}
			res.render('view', {topics:files, title:id, description:data});
		})
	});
	
});