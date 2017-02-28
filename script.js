

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width  = window.innerWidth-100;
canvas.height = window.innerHeight-130;
var playerScore = 0;
var computerScore = 0;
var scorePlayer = document.getElementById('pScore');
var scoreComputer = document.getElementById('cScore');

var Paddle = function Paddle(xpos, ypos, width, height, speed) {
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
// ******************************************************  Render
Paddle.prototype.render = function() {
  context.beginPath();
  context.rect(this.xpos, this.ypos, this.width, this.height);
  context.fillStyle = 'black';
  context.fill();
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
};

// ******************************************************  Move
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
//going thru the sides
  if(this.centerX + this.radius > canvas.width) {
    this.speedX = this.speedX * -1;
    computerScore +=1;

    console.log('o no ' + computerScore + " points for the computer"  );
// increment points and reload game
  }
  if(this.centerX - this.radius < 0) {
    this.speedX = this.speedX * -1;
    playerScore += 1;
    console.log('yay ' + playerScore + ' points for you');
  }
};
// // ------------collision-----------------
var speedComp=10;
var collisionCheck = function(paddle, axis) {
  var widthheight = axis == "x" ? "width" : "height";
  var centerRect = paddle[axis + "pos"] + paddle[widthheight] / 2;
  return Math.abs(ball["center"+axis.toUpperCase()] - centerRect);
 };
var collision = function() {
  var distXpaddle = collisionCheck(paddleR, "x");
  var distYpaddle = collisionCheck(paddleR, "y");
  var distXcomputer = collisionCheck(computer, "x");
  var distYcomputer = collisionCheck(computer, "y");

  if (distXpaddle <= (paddleR.width/2 + ball.radius) && distYpaddle <= (paddleR.height/2 + ball.radius)) {

      ball.speedX = ball.speedX * -1;
      // this works surprisingly enough
      // hitzone = ball.centerY+20;
      speedComp = Math.random() * (200-50)-50;
    console.log("boing" );
  };
  if (distXcomputer <= (computer.width/2 + ball.radius) && distYcomputer <= (computer.height/2 + ball.radius)) {
    console.log("boop" );
      ball.speedX = ball.speedX * -1;
  };
};

//
// ******************************************************  Instances
var paddleR = new Paddle(canvas.width-25, canvas.height/2-50, 20, 100, 50);
var ball = new Ball(canvas.width/2, canvas.height/2);
var computer = new Paddle(5, canvas.height/2-50, 20, 100);
var updateComputer = function() {
  computer.ypos = ball.centerY-speedComp;
  // paddleR.ypos = ball.centerY -50;
};

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };

var drawLine = function() {
  context.beginPath();
  context.moveTo(canvas.width/2, 0);
  context.lineTo(canvas.width/2, canvas.height);
  context.stroke();
};

var updateScore = function() {
  scorePlayer.innerHTML = playerScore;
  scoreComputer.innerHTML = computerScore;
}
// callback for animate function
  function step() {
      context.clearRect(0,0,canvas.width, canvas.height);
      drawLine();
      ball.move();
      collision();
      updateComputer();
      ball.render();
      computer.render();
      paddleR.render();
      updateScore();
      animate(step);
}
    window.addEventListener('keydown', paddleR.move.bind(paddleR));
    window.onload = animate(step);
