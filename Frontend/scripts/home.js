var socket = io();
socket.on('sensor-update', function (data) {
  addText(data);
});


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
var socket = io();
socket.on('sensor-update', function (data) {
  addText(data);
});


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