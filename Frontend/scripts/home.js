var socket = io();
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var locations = [
  new Location(110,100),
  new Location(177,100),
  new Location(244,100),
  new Location(310,100),
  new Location(377,100),
  new Location(110,190),
  new Location(177,190),
  new Location(244,190),
  new Location(310,190),
  new Location(377,190)
];

var sensors = $('#sensors-div').html();
if(sensors)
  sensors = JSON.parse(sensors);

for(var i=0; i < locations.length; i++){
  locations[i].update(sensors[i]);
  addText({id: i, status: sensors[i]});
}

socket.on('sensor-update', function (data) {
  addText(data);
  updateMap(data);
});

function updateMap(data){
  var id = data.id * 1.0; //Convert to number
  if(id < locations.length && id >= 0)
    locations[id].update(data.status); //Update location on map
}

function addText(obj) {
  var space = $('#space-' + obj.id);
  if(space.length > 0){
    space.html(obj.id + ": " + obj.status);
  }
  else {
    var spaces = $('#space-list');
    spaces.html(spaces.html() + "<li id='space-" + obj.id + "'>" + obj.id + ": " + obj.status + "</li><br>");
  }
}

