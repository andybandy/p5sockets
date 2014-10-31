var socket;

function setup() {
  createCanvas(710, 400);
  socket = io.connect(location.origin);
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
