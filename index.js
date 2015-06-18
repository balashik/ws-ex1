var express = require('express');
var myBooks = require('./books');
var myApp = express();


myApp.use(function(req,res,next){
	//headers
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});


myApp.get('/',function (req,res){
	res.sendFile(__dirname + '/index.html');

});

//getting all the books
myApp.get('/getAllBooks',function (req,res){
	res.send('all inventory: '+ myBooks.getAllBooks());

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


//port listening 
var PORT = process.env.PORT || 3000;
myApp.listen(PORT, function(){
    console.log('App ready on port: ' + PORT);
});