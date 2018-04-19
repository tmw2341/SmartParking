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
app.use("/images", express.static( path.join(__dirname, "../Frontend/images")));

app.locals.sensors = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true
};

/**
 |=========================
 |        Routes          |
 |=========================
 */
//Landing page
app.get('/', function(req, res){
  res.render('home', {sensors: JSON.stringify(app.locals.sensors)});
});

app.put('/sensor', function(req, res){
  var sensor = req.body;
  app.locals.sensors[sensor.id] = sensor.status.toLowerCase() === "true";
  io.sockets.emit('sensor-update', {id: sensor.id, status: app.locals.sensors[sensor.id]});
  res.send("Sensor status: " + sensor.status + "   Sensor ID: " + sensor.id);
});

io.on('connection', function (socket) {
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('receive-event', function(msg){
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
