var fs = require('fs');
var http = require('http');
var path = require('path');
// var ext = require('ext');

function handleRequest(req, res) {
  // What did we request?
  var pathname = req.url;

  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }

  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  var contentType = typeExt[ext] || 'text/plain';

  // Now read and write back the file with the appropriate content type
  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Dynamically setting content type
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}

var server = http.createServer(handleRequest);
server.listen(process.env.PORT || 8081);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  console.log('Connected: ' + socket.id);
  socket.on('disconnect', function() {
    console.log('Disconnected: ' + socket.id);
  });
  socket.on('mouse', function(data) {
    console.log('--- mouse: ' + data.x + ' ' + data.y);
    socket.broadcast.emit('mouse', data);
  });
});
