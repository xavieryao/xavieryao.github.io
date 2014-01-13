/*
 * A temperary web server in Node.js for mobile test.
 */

var http = require("http");
var fs = require('fs');

http.createServer(function (req,res){
	if(req.url == '/')
		req.url = '/index.html';	
	req.url = '.' + req.url.split('?')[0];
	console.log(req.url);
	fs.readFile(req.url,'utf-8',function(err,data){
		res.writeHead(200);
		res.write(data);
		res.end();
	});
}).listen(3000);