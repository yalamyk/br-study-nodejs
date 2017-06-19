// 아래 코드는 장바구니 코드입니다. 
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser('234456788999976543!@!@!@!@as'));
// cookieParser('key값') : 해당 key 값으로 암호화를 한다.
// 암호화를 했다고 하더라도 id,password의 값은 절대 cookie값에 저장하지 않는다. : 다른 대안 방법이 있음.

var products = {
	1:{title:'The history of web 1'},
	2:{title:'The next web1'},
	3:{title:'The next web2'},
	4:{title:'The next web3'}
}; //databse 대용값

app.get('/products', function(req,res){
	var output = '';
	for( var name in products){
		output += 
			`<li>
				<a href="/cart/${name}">${products[name].title}</a>
			</li>`
		// console.log(products[name].title);
	}
	res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
})
app.get('/count',function(req,res){
	if(req.signedCookies.count){
		var count = parseInt(req.signedCookies.count);
	}else{
		var count = 0;
	}
	count = count + 1;
	res.cookie('count', count, {signed:true});
	res.send('count : '+count);
	//requst header안에 cookie값이 있다.
}); //웹 브라우저가 저장하고 있다가 반환(같은 url안에서만 유효)


/*
var cart = {
	1:1,
	2:2
	....
}
*/
app.get('/cart/:id', function(req,res){
	//cart(장바구니)를 생성한다.
	var id = req.params.id;
	if(req.signedCookies.cart){
		var cart = req.signedCookies.cart;
	}else{
		var cart = {};
	}
	
	if(!cart[id]){
		cart[id] = 0; // 강제로 값을 세팅해 준다.
	}

	cart[id] = parseInt(cart[id])+1;

	res.cookie('cart',cart, {signed:true});
	//res.send(cart);
	res.redirect('/cart');
});
app.get('/cart',function(req,res){
	var cart = req.signedCookies.cart;
	if(!cart){
		res.send('empty!');
	}else{
		var output = '';
		for(var id in cart){
			output += `<li>${products[id].title} (${cart[id]})</li>`;
		}
	}
	res.send(`
		<h1>Cart</h1>
		<ul>${output}</ul>
		<a href="/products">Products List</a>
	`);
})
app.listen(3303, function(){
	console.log('Connect 3303 port!!');
});
//express는 쿠키 기능을 가지고 있지 않음 : npm으로 cookie-parser설치
