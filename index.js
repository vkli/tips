<!--server side-->

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

<!--takes some time after first run to take effect-->
io.on('connection',function(socket){
  console.log('a user connected');

  <!--send message to everyone except a certain socket-->
  socket.broadcast.emit('hi');

  <!--print chatmessage to terminal-->
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);

    <!--send message to everyone-->
    io.emit('chat message', msg);
  });

  socket.on('disconnect',function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});