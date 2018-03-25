var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');

//Use Jade templating.
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '../Frontend/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/scripts", express.static( path.join(__dirname, "../Frontend/scripts")));
app.use("/styles", express.static( path.join(__dirname, "../Frontend/styles")));

/**
 |=========================
 |        Routes          |
 |=========================
 */
//Landing page
app.get('/', function(req, res){
  console.log(__dirname);
  res.render('home');
});

app.put('/sensor', function(req, res){
  var sensor = req.body;
  console.log(sensor);
  io.sockets.emit('sensor-update', sensor);
  res.send('Success');
});

io.on('connection', function (socket) {
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
//Map Page for displaying lot.
app.get('/map', function (req, res) {
    res.render('map');
});

//Serve and listen on the set port.
server.listen(port);
console.log('se329-webagjscripts.ece.iastate.edu serving on: ' + port);
