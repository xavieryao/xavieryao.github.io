/*
 * A temperary web server in Node.js for mobile test.
 */

var http = require("http");
var fs = require('fs');

var port = 3000;

if(process.argv.length > 2){
	if (process.argv[0] === 'sudo') {
		port = process.argv[3];
	}else{
		port = process.argv[2];
	}
}

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
}).listen(port);