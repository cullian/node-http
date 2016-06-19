var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

//Create a server, lets call it server
var server = http.createServer(function(req, res){
  console.log('Request for ' + req.url + ' by method ' + req.method);
//    If request is a GET
  if (req.method == 'GET') {
//      Establish filePath and fileExt using request url
    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;
    var filePath = path.resolve('./public'+fileUrl);
    var fileExt = path.extname(filePath);
//      If it is html we can deal with it
    if (fileExt == '.html') {
//        Check if it exists
        fs.exists(filePath, function(exists) {                 
        if (!exists) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                    ' not found</h1></body></html>');
        return;
        }
//        Stream html file requested
        res.writeHead(200, { 'Content-Type': 'text/html' });
          fs.createReadStream(filePath).pipe(res);
              });
    }
//      If it is not html, we cannot deal with it
    else {

        res.writeHead(501, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
    }
  }
//    If request is not a GET, we cannot handle it
  else {
        res.writeHead(501, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
  }
})

//Start Server
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
