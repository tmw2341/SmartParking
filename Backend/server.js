var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Use Jade templating.
app.set('view engine', 'jade')

/**
 |=========================
 |        Routes          |
 |=========================
*/
//Landing page
app.get('/', function(req, res){
  console.log('going to index...')
  res.render('index');
});

app.get('/test', function(req, res){
  res.render('test');
});

io.on('connection', function (socket) {
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});






//Serve and listen on the set port.
server.listen(port);
console.log('se329-webagjscripts.ece.iastate.edu serving on: ' + port);
