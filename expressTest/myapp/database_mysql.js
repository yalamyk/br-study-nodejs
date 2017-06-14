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
var sql = "SELECT * FROM topic";
conn.query(sql, function(err, rows, fields){
	if(err){
		console.log(err);
	}else{
		console.log('rows',rows);
		//rows : array임. [{행},{행}...]
		console.log('fields',fields);
		// 해당 컬럼에 대한 상세 정보
	}
});
conn.end(); //접속 끊김.
// conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// conn.end();