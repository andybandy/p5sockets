var socket;

function setup() {
  socket = io.connect('http://localhost:8081');
  socket.on('mouse', function(data) {
    console.log(data);
    fill(0, 0, 255);
    noStroke();
    ellipse(data.x, data.y, 30, 30);
  });
}

function draw() {
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  };

  socket.emit('mouse', data);
}
