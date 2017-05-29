var OrientDB = require('orientjs');

var server = OrientDB({
	host: 'localhost',
	port: 2424,
	username: 'root',
	password: 'pass'
});

var db = server.use({
	name: 'o2',
	username: 'root',
	password: 'pass'
});
// db.record.get('#22:0') //#22:0 유일 무의한 식별자 
// .then(function(record){
// 	console.log('Lecoard record : ',record.title);
// });

// CREATE
// READ
// UPDATE
// DELETE

// CRUD : 기초적인 데이터 수정방법

// 데이터 보기
//////1 : topic 전체가 출력
// var sql = 'SELECT FROM topic';
// db.query(sql).then(function(results){
// 	console.log(results);
// });
//////2 : topic의 #22:0의 데이터 출력
// var sql = 'SELECT FROM topic WHERE @rid=:rid';
// var param = {
// 	params:{
// 		rid:'#22:0'
// 	}
// };
// db.query(sql, param).then(function(results){
// 	console.log(results);
// });

//CREATE
//var sql = 'INSERT INTO topic(title, description) VALUES(:title, :desc)';
// param = {
// 	title:'Express',
// 	desc:'Express is framework for web'
// }
// db.query(sql,param).then(function(results){
// }); --> 따로 쓰는것도 가능하고 함쳐 쓰는것도 가능하다.

// db.query(sql, {
// 	params:{
// 		title:'Express',
// 		desc:'Express is framework for web'
// 	}
// }).then(function(results){
// 	console.log(results);
// });

//UPDATE : return[update 갯수]
// var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
// db.query(sql, {params:{title:'Expressjs', rid:'#23:0'}}).then(function(results){
// 	console.log(results);
// })


//DELETE : return[delete 갯수]
//var sql = 'DELETE FROM topic WHERE @rid=:rid';
// db.query(sql,{params:{rid:'#23:0'}}).then(function(results){
// 	console.log(results);
// })