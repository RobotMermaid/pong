

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// context.rect(0, 0, canvas.width, canvas.height);
canvas.width  = window.innerWidth-100;
canvas.height = window.innerHeight-130;


var Paddle = function Paddle(xpos, ypos, height, width, speed) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.height = height;
  this.width = width;
  this.speed = speed;
};
var Ball = function Ball(centerX, centerY, radius) {
  this.centerX= centerX;
  this.centerY= centerY;
  this.radius= radius || 20;
  this.speedX = Math.random() * (6-3) + 3;
  this.speedY = Math.random() * (6-3) + 3;
};

Paddle.prototype.render = function() {
  context.beginPath();
  context.rect(this.xpos, this.ypos, this.height, this.width);
  context.fillStyle = 'black';
  context.fill();
};
// move the paddle within the canvas space & define speed
Paddle.prototype.move = function(event) {
  if (event.keyCode === 38 && this.ypos>0) {
    this.ypos -= this.speed;
  }  else if (event.keyCode === 40 && this.ypos<canvas.height-100) {
    this.ypos += this.speed;
  }
};

Ball.prototype.move = function() {

  this.centerX += this.speedX;
  this.centerY += this.speedY;
//bouncing off top and bottom
  if(this.centerY + this.radius > canvas.height || this.centerY - this.radius < 0) {
    this.speedY = this.speedY * -1;
  }
//going thru vertical sides
  if(this.centerX + this.radius > canvas.width+50 || this.centerX - this.radius < -70) {
    // this.speedX = this.speedX * -1;
    // increment points and reload game
  }


  //not working collison attempt
  // if(paddleR.ypos + paddleR.height < (this.centerX + this.radius) < paddleR.ypos && this.centerX + this.radius > paddleR.xpos) {
  //  console.log('boop' + this.centerY );
  //   this.speedX = this.speedX * -1;
  //
  // }

// ------------collision-----------------
  var centerXRect = paddleR.xpos + paddleR.width/ 2;
  var centerYRect = paddleR.ypos + paddleR.height/ 2;

  var distX = Math.abs(this.centerX + this.radius - centerXRect);
  var distY = Math.abs(this.centerY + this.radius - centerYRect);
//
  if (distX > (paddleR.width / 2 + this.radius)) {
      return false;
  }
  if (distY > (paddleR.height / 2 + this.radius)) {
      return false;
  }
//
  if (distX <= (paddleR.width / 2)) {
    console.log("boing" );
      this.speedX = this.speedX * -1;
  }
  if (distY <= (paddleR.height / 2)) {
    console.log("boop" );
      this.speedY = this.speedY * -1;
  }

}


Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
};


var paddleL = new Paddle(0, canvas.height/2-50, 30, 100);
var paddleR = new Paddle(canvas.width-25, canvas.height/2-50, 20, 100, 50);
var ball = new Ball(canvas.width/2, canvas.height/2);



var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };


  // callback for animate function
var drawLine = function() {
  context.beginPath();
  context.moveTo(canvas.width/2, 0);
  context.lineTo(canvas.width/2, canvas.height);
  context.stroke();
}
  function step() {
      context.clearRect(0,0,canvas.width, canvas.height);
      drawLine();
      ball.move();
      ball.render();
      paddleL.render();
      paddleR.render();


      animate(step);
      // window.requestAnimationFrame(step);
}
    window.addEventListener('keydown', paddleR.move.bind(paddleR));
    window.onload = animate(step);
