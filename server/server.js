/* Require node modules to implement */
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

function getFileExtension(route) {
    var arr = route.split('.');
    if(arr.length<=1) {
        return 'html'
    }
    return arr[arr.length -1].toLowerCase();
}

function handleRequests(req, res) {
    var header;
    var route = url.parse(req.url).path;
    if(route === '/') {
        route = '/index.html';
    }
    var ext = getFileExtension(route);
    switch (ext) {
        case 'css':
            header = {
                'Content-Type': 'text/css'
            };
            break;
        case 'js':
            header = {
                'Content-Type': 'application/javascript'
            };
            break;
        case 'html':
            header = {
                'Content-Type': 'text/html'
            };
            break;
        default:
            header = {
                'Content-Type': 'application/json'
            };
            break;
    }
        var filePath;
        filePath = path.join(__dirname, '../client' + route);
        readFile(filePath, function(data){
            writeResponse(res, data, header)    
        });
    }
function writeResponse(res, data, header) {
    var statusCode = statusCode || 200;
    res.writeHead(statusCode, header);
    res.end(data);
}
function readFile(filePath, callBack) {
    fs.readFile(filePath, function (err, data) {
        callBack(data);
    });
};
var server = http.createServer(handleRequests);

/*Requests are completed over port numbers and each one needs a unique number. Most port numbers between 0 - 1024 are reserved so here 3000 is a standard testing port to use. More on port numbers: https://en.wikipedia.org/wiki/Port_(computer_networking) */
var port = 3000;

server.listen(port);
console.log('Listening on port', port);

