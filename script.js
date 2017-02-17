var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// context.rect(0, 0, canvas.width, canvas.height);
canvas.width  = window.innerWidth/2;
canvas.height = window.innerHeight/2;


var Paddle = function Paddle(xpos, ypos, height, width) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.height = height;
  this.width = width;
}

Paddle.prototype.render = function() {
  context.beginPath();
  context.rect(this.xpos, this.ypos, this.height, this.width);
  context.fillStyle = 'black';
  context.fill();
}

var Ball = function Ball(centerX, centerY, radius) {
  this.centerX= centerX;
  this.centerY= centerY;
  this.radius= radius;
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
}
var paddle1 = new Paddle(canvas.width/2-50, 0, 100, 30);
var paddle2 = new Paddle(canvas.width/2-50, canvas.height-30, 100, 30);
var ball = new Ball(canvas.width / 2, canvas.height / 2, 20);
window.onload = function() {
      ball.render();
      paddle1.render();
      paddle2.render();
  }
//circle
      // var centerX = canvas.width / 2;
      // var centerY = canvas.height / 2;
      // var radius = 20;
      // context.beginPath();
      // context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      // context.fillStyle = 'black';
      // context.fill();

//top paddle - computer
      // context.beginPath();
      // context.rect(canvas.width/2-50, 0, 100, 30);
      // context.fillStyle = 'black';
      // context.fill();


//bottom paddle - player
      // context.beginPath();
      // context.rect(canvas.width/2-50, canvas.height-30, 100, 30);
      // context.fillStyle = 'black';
      // context.fill();




// bind event handler to reset button
document.getElementById('reset').addEventListener('click', function() {
  // context.clearRect(0, 0, canvas.width, canvas.height);
}, false);
