/*
*
* reference:
* http://socket.io/get-started/chat/
*
------------------------------------------------*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('chat message', 'others start');
  socket.on('chat message', function(msg){
    console.log('msg: ',msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
