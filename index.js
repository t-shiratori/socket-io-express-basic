/*
*
* reference:
* http://socket.io/get-started/chat/
*
------------------------------------------------*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//ルームネーム
var room1 = 'room0001';

//ポート設定
app.set('port', (process.env.PORT || 5000));

//ルーティング
app.get('/', function(req, res){
  res.sendfile('index.html');
});


/*--

  socket io

-----------------------------------------------------*/
//io()でもio.sockets()でも同じ
io.on('connection', function(socket){

  //接続されたクライアントのソケットをルームに追加する
  socket.join(room1);

  //console.log('-- connection --');

  //console.log('socket: ',socket);
  //console.log('socket adapter: ',socket.adapter);

  //接続されたユーザー固有のID
  //console.log('id: ', socket.id);

  //送信者のみに送信
　socket.emit('onlySendClient','your connected!');

  //送信者以外にイベント送信
  socket.broadcast.emit('chat message', 'others start');

  //ルームメンバー全員にルーム情報を送信
  //socket.adapterにはnamespaceやroomに関する情報が入っている
  var res = {
    name: room1,
    data: socket.adapter.rooms[room1]
  }
  io.to(room1).emit('getRoomData',res);

  //イベント設定
  socket.on('chat message', function(msg){
    //console.log('msg: ',msg);
    io.emit('chat message', msg);
  });

});



//herokuはポート番号を動的に生成する。
//本番環境における動的なポート番号の生成をサポートするために、以下のように書かく。
http.listen(process.env.PORT || 5000, function(){
  //console.log('Node app is running on port', app.get('port'));
});
