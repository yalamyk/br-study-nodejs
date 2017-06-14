//https://github.com/mysqljs/mysql 에서 예제 코드 참조
//*********************<mysql 접속>
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'passpass',
  database : 'o2'
});

conn.connect(); // 에러 안나면 ok

//*********************<mysql databse 확인 : select>
// var sql = "SELECT * FROM topic";
// conn.query(sql, function(err, rows, fields){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		//console.log('rows',rows);
// 		//rows : array임. [{행},{행}...]
// 		//console.log('fields',fields);
// 		// 해당 컬럼에 대한 상세 정보
// 		for(var i=0; i<rows.length; i++){
// 			console.log(rows[i].author);
// 		}
// 	}
// });

//*********************<mysql databse 추가 : insert>
// var sql = "INSERT INTO topic (title, description, author) VALUES(?,?,?)";
// var params = ['Supervisor', 'Watcher', 'graphittie'];
// conn.query(sql, params, function(err, rows, fileds){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(rows.insertId);
// 		//rows : OkPacket{}
// 	}
// });

//*********************<mysql databse 수정, 삭제 >
// var sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
// var params = ['NPM','leezche',1];
// conn.query(sql, params, function(err, rows, fields){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(rows);
// 		//rows : OkPacket{}
// 	}
// });
var sql = 'DELETE FROM topic WHERE id=?';
var params = [1];
conn.query(sql, params, function(err, rows, fields){
	if(err){
		console.log(err);
	}else{
		console.log(rows);
		//rows : OkPacket{}
	}
});
conn.end(); //접속 끊김.
