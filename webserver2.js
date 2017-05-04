const http = require('http');

const hostname = '127.0.0.1'; //만든 서버가
const port = 1337; // 특정한 포트를 바라보게 한다.

// http.createServer((req,res) => {
// 	res.writeHead(200, {'Content-Type' : 'text/plain'});
// 	res.end('Hello World\n');
// }).listen(port, hostname, () => {
// 	console.log('Server running at http://${hostname}:${port}/');
// 	console.log(`Server running at http://${hostname}:${port}/`);
// });

//위의 코드가 아래 코드의 축약형이다.
var server = http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	res.end('Hello World\n');
}); //server 라는 객체를 리턴한다.
server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
	//시간이 걸릴 수 잇기 때문에 비동기 callback으로 작동한다.
});

//node를 이용한 프레임워크를 이용하면 서버 코드를 쉽게 개발 할 수 있다.


// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

