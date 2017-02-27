

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// context.rect(0, 0, canvas.width, canvas.height);
canvas.width  = window.innerWidth-100;
canvas.height = window.innerHeight-130;


var Paddle = function Paddle(xpos, ypos, width, height, speed) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.height = height;
  this.width = width;
  this.speed = speed;
};

// var Computer = Object.create(Paddle);

// var Computer = function Computer(xpos, ypos, height, width, speed) {
//   this.xpos = xpos;
//   this.ypos = ypos;
//   this.height = height;
//   this.width = width;
//   this.speed = speed;
// };
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
// Computer.prototype.render = function() {
//   context.beginPath();
//   context.rect(this.xpos, this.ypos, this.height, this.width);
//   context.fillStyle = 'black';
//   context.fill();
// };

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
    console.log('o no');
    //debugger;
    // increment points and reload game
  }
  if(this.centerX - this.radius < 0) {
    this.speedX = this.speedX * -1;
    console.log('yay');
    // debugger;
  }
};
// // ------------collision-----------------
// var collision = function() {
//   var centerXRect = paddleR.xpos + paddleR.width/ 2;
//   var centerYRect = paddleR.ypos + paddleR.height/ 2;
//
//   var distX = Math.abs(this.centerX - centerXRect);
//   var distY = Math.abs(this.centerY - centerYRect);
// //
//   if (distX > (paddleR.width/2 + this.radius)) { return false;}
//   if (distY > (paddleR.height/2 + this.radius)) {return false;}
// //
//   if (distX <= (paddleR.width/2 + this.radius)) {
//     console.log("boing " + distX);
//       this.speedX = this.speedX * -1;
//   }
//   if (distY <= (paddleR.height/2 + this.radius)) {
//     console.log("boop " + distY);
//       this.speedY = this.speedY * -1;
//   }
// }
// };
//when the ball is slow the collision with the computer paddle doesn't happen
var collisionCheck = function(paddle, axis) {
  // var widthheight = axis == "x" ? "width" : "height";
  // var centerRect = paddle[axis + "pos"] + paddle[widthheight] / 2;
  // var centerComp = paddle[axis + "pos"] - paddle[widthheight] / 2;



//needs to + on paddleR and - on computer'
//made the ball bounce off the center of paddleR with -50
//return the distance between centers of circle and rectangle
// console.log('center ' + centerRect);
  // return Math.abs(ball["center"+axis.toUpperCase()] - centerRect);

//this compensates for ball bouncing  too far from computer paddle
  // return Math.abs(ball["center"+axis.toUpperCase()] - (paddle == computer? centerComp : centerRect ));
  return Math.abs(ball["center"+axis.toUpperCase()] - (paddle == computer? centerXComp : centerXRect ));
 };
var collision = function() {
  // var distXpaddle = collisionCheck(paddleR, "x");
  // var distYpaddle = collisionCheck(paddleR, "y");
  // var distXcomputer = collisionCheck(computer, "x");
  // var distYcomputer = collisionCheck(computer, "y");
//reversed height and width of paddle
  var centerXRect = paddleR.xpos + paddleR.width/2 ;
  // + 50 works for the bottom half of the paddle +100 works for the bottom tip
  // paddleR.ypos + paddleR.width still goes thru the bottom half and runs up teh side
  var centerYRect = paddleR.ypos + paddleR.height/ 2 ;
  // this makes it boop off correctly not 50 away
  var centerXComp = computer.xpos + computer.width/2;
  var centerYComp = computer.ypos + computer.height/2 ;

  var distXpaddle = Math.abs(ball.centerX - centerXRect);
  var distYpaddle = Math.abs(ball.centerY - centerYRect);
  var distXcomputer = Math.abs(ball.centerX - centerXComp);
  var distYcomputer = Math.abs(ball.centerY - centerYComp);
//
  if (distXpaddle <= (paddleR.width/2 + ball.radius) && distYpaddle <= (paddleR.height/2 + ball.radius)) {
    console.log("boing X" +paddleR.height);
      ball.speedX = ball.speedX * -1;
      // ball.speedY = ball.speedY * -1;
      // debugger;
  };
  if (distXcomputer <= (computer.width/2 + ball.radius) && distYcomputer <= (computer.height/2 + ball.radius)) {
    console.log("boop"+ computer.width );
      ball.speedX = ball.speedX * -1;
      // ball.speedY = ball.speedY * -1;
      // debugger;
  };
};

//
// ******************************************************  Instances
// Paddle(xpos, ypos, height, width, speed)
// var paddleL = new Paddle(0, canvas.height/2-50, 30, 100);
var paddleR = new Paddle(canvas.width-25, canvas.height/2-50, 20, 100, 50);
var ball = new Ball(canvas.width/2, canvas.height/2);
var computer = new Paddle(5, canvas.height/2-50, 20, 100, 50);
var updateComputer = function() {
//works at 0 -25
//at 50 gets stuck behind and inconsistent at 60 no
//+10 works inconsistently
  computer.ypos = ball.centerY -50 ;
  paddleR.ypos = ball.centerY -10;
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
// callback for animate function
  function step() {
      context.clearRect(0,0,canvas.width, canvas.height);
      drawLine();
      ball.move();
      // computer.update();
      collision();
      updateComputer();
      ball.render();
      // paddleL.render();
      computer.render();
      paddleR.render();

      animate(step);
}
    window.addEventListener('keydown', paddleR.move.bind(paddleR));
    window.onload = animate(step);
