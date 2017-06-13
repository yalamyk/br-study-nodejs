var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'uploads/');
	},
	filename:function(req,file,cb){
		cb(null,file.originalname);
	}
}); //sotrage는 multer에서 좀더 많은것을 제공한다.


//var upload = multer({dest:'uplads/'});
var upload = multer({storage:_storage});
var fs = require('fs');

//database
var OrientDB = require('orientjs');
var server = OrientDB({
	host: 'localhost',
	port: 2424,
	username: 'root',
	password: 'pass' //실제로는 외부의 설정파일로 빼놓고(보안) 해야 한다.
});
var db = server.use({
	name: 'o2',
	username: 'root',
	password: 'pass'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', express.static('uploads')); //upload라는 정적인 파일을 사용할 수 있게된다.
app.set('views', './views_orientdb');
app.set('view engine','jade');

app.listen(3000,function(){
	console.log('Connected, 3000 port');
});
app.get('/upload',function(req,res){
	res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req,res){
	res.send('Upload!!!'+req.file.filename);
	console.log(req.file); //destination : 목적지
});
app.get('/topic/add',function(req,res){
	var sql = "SELECT FROM topic";
	db.query(sql).then(function(topics){
		res.render('add',{topics:topics});
	});
	
}); // add가 있을 경우 앞에 써줌 -==> 경우에 따라서 route가 중요한 문제가 되기도 한다.
app.post('/topic/add',function(req,res){
	var title = req.body.title;
	var author = req.body.author;
	var description = req.body.description;
	var sql = "INSERT INTO topic (title, description, author) VALUES(:title, :desc, :author)";
	db.query(sql,{
		params:{
			title:title,
			desc:description,
			author:author
		}
	}).then(function(results){
		res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
	});
});
app.get('/topic/:id/edit',function(req,res){
	var sql = "SELECT FROM topic";
	var id = req.params.id;
	db.query(sql).then(function(topics){
		var sql = "SELECT FROM topic WHERE @rid=:rid";
		db.query(sql, {params:{rid:id}}).then(function(topic){
			res.render('edit',{topics:topics, topic:topic[0]});
		});
		
	});
	
});
app.post('/topic/:id/edit',function(req,res){
	var sql = "UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid";
	var id = req.params.id;
	var title = req.body.title;
	var desc = req.body.description;
	var author = req.body.author;
	db.query(sql,{
		params:{
			t:title,
			d:desc,
			a:author,
			rid:id
		}
	}).then(function(topics){
		res.redirect('/topic/'+encodeURIComponent(id));
		
	});
	
});
//topic, topic/:id 두가지 경우의 url을 받았을경우.
//아래의 문제가 있기 때문에 이렇게 작성한다.
app.get(['/topic', '/topic/:id'],function(req, res){
	var sql = "SELECT FROM topic";
	db.query(sql).then(function(topics){
		//res.send(results);
		var id =req.params.id;
		if(id){
			var sql = "SELECT FROM topic WHERE @rid=:rid";
			db.query(sql, {params : {rid:id}}).then(function(topic){
				console.log('topic:'+JSON.stringify(topic));
				res.render('view', {topics:topics, topic:topic[0]});
			});
		}else{
			res.render('view',{topics:topics});
		}
		//res.render('view', {topics:results})
	});
	// 옛날의 잔제.
	// fs.readdir('data', function(err,files){
	// 	if(err){
	// 		console.log(err);
	// 		res.status(500).send('Internal Server Error'); //send가 실행되면 다음 코드는 실행되지 않는다.
	// 	}
	// 	var id = req.params.id;
	// 	if(id){//id 값이 있을때 
	// 		fs.readFile('data/'+id, 'utf8', function(err, data){
	// 			if(err){
	// 				console.log(err);
	// 				res.status(500).sned('Internal Server');
	// 			}
	// 			res.render('view', {topics:files, title:id, description:data});
	// 		});
	// 	}else{//id 값이 없을때
	// 		res.render('view', {topics:files, title:'Welecome', description:'hello javascript for server'});
	// 	}
	// });
	// //res.render('view');
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