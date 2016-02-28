/*
*
* reference:
* http://socket.io/get-started/chat/
*
------------------------------------------------*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

  //console.log('-- connection --');

  //接続されたユーザー固有のID
  //console.log('id: ', socket.id);

  //送信者以外にイベント送信
  socket.broadcast.emit('chat message', 'others start');

  //イベント設定
  socket.on('chat message', function(msg){
    //console.log('msg: ',msg);
    io.emit('chat message', msg);
  });

});


http.listen(process.env.PORT || 5000, function(){
  //console.log('Node app is running on port', app.get('port'));
});
