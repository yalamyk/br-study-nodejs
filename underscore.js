const _ = require('underscore');
var arr = [3,6,9,10,12];

console.log(arr[0]);
console.log(_.first(arr)); //first는 첫번째 원소를 리턴한다.

console.log(arr[arr.length-1]);
console.log(_.last(arr));

// npm을 이용하여 underscore를 설치한다.