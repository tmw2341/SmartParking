var socket = io();
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var locations = [
  new Location(function(){ctx.fillRect(110,100,15,15);}, true),
  new Location(function(){ctx.fillRect(177,100,15,15);}, true),
  new Location(function(){ctx.fillRect(244,100,15,15);}, true),
  new Location(function(){ctx.fillRect(310,100,15,15);}, true),
  new Location(function(){ctx.fillRect(377,100,15,15);}, true),
  new Location(function(){ctx.fillRect(110,190,15,15);}, true),
  new Location(function(){ctx.fillRect(177,190,15,15);}, true),
  new Location(function(){ctx.fillRect(244,190,15,15);}, true),
  new Location(function(){ctx.fillRect(310,190,15,15);}, true),
  new Location(function(){ctx.fillRect(377,190,15,15);}, true)
];

for(var i=0; i < locations.length; i++){
  locations[i].fill();
  addText({id: i, status: true});
}

socket.on('sensor-update', function (data) {
  addText(data);
  updateMap(data);
});

function updateMap(data){
  var id = data.id * 1.0; //Convert to number
  var status = data.status === "true"; //Convert to boolean
  if(id < locations.length && id >= 0)
    locations[id].update(status); //Update location on map
}

function addText(obj) {
  console.log(obj);
  var space = $('#space-' + obj.id);
  if(space.length > 0){
    space.html(obj.id + ": " + obj.status);
  }
  else {
    var spaces = $('#space-list');
    spaces.html(spaces.html() + "<li id='space-" + obj.id + "'>" + obj.id + ": " + obj.status + "</li><br>");
  }
}

