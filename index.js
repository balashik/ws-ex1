var express = require('express');
var myBooks = require('./books');
var myApp = express();

myApp.get('/',function (req,res){
	res.sendFile(__dirname + '/index.html');

});


myApp.get('/getAllBooks',function (req,res){
	res.send('all inventory: ' + myBooks.getAllBooks());

});

// searching book by id
myApp.param('id' , function(req, res, next, value){
	req.bookID = myBooks.getBookById(value);
	next();
});

myApp.get('/id/:id',function (req,res){
	res.send('requested book is: '+ req.bookID);
});

//searching book by month (best seller in month)
myApp.param('month' , function(req, res, next, value){
	req.bestSeller = myBooks.getAllBestSellersAtMonth(value);
	next();
});

myApp.get('/bestSellerOfMonth/:month',function (req,res){
	res.send('requested book is: '+ req.bestSeller);
});


myApp.listen(8080);
console.log('listeninng');