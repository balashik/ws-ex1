var fs = require('fs');
var books;


fs.readFile(__dirname + '/books.json','utf8',function (err,data){

	books = JSON.parse(data).books;
});


exports.getAllBooks = function (){

	return books;

}

//searching book by id
exports.getBookById = function (id){
	for(var i = 0; i <books.length; i++){
		if(books[i].id == id){
			return JSON.stringify(books[i]);
		}
	}
	return ('id dosent exist');

}

//searching book by month (best seller month)
exports.getAllBestSellersAtMonth = function(month){

	for(var i = 0; i <books.length; i++){
		if(books[i].bestSellerForMonth.toLowerCase() == month.toLowerCase()){
			return JSON.stringify(books[i]);
		}	
	}

	return ('no data on this month');
}