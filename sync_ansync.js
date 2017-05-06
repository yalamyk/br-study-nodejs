var fs = require('fs');

//Sync 
console.log(1); // 10분 소요가 된다면
var data = fs.readFileSync('text.txt',{encoding:'utf8'});
console.log(data); //10분 후에 찍힌다.

//Async
console.log(2);
fs.readFile('text.txt', {encoding:'utf8'}, function(err, data){
	console.log(3);
	console.log(data); // 작업이 끝나면 실행된다.
});
console.log(4);
// 2, 4, 3이 실행된다.
// 파일을 읽는 작업이 readFile이 실행한 다음 작업이 끝나면 callback함수가 실행되며 실행이 끝났다는 사실을 알려준다.
// 오늘날에는 이게 장점으로 다가 오고 있다. 

//생활코딩 15까지 학습. 20170503