var abovePts = 0;
var underPts = 0;
var allPts = 0;
var k = 0;
var a;
var b;

var rangeY;
var valX;
var valY;

function data() {
  rangeY = 0.6; // vertical distance on the screen
  valY = 0; // height of the horizontal axis
  a = -1; // first x
  b = 1; // last x
}

function fun(x) {
  return (x - 1) * (x + 1) * (x - 0.3) * (x + 0.2) * -1;
//   return sin(x);
  // return exp(x);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(600, 600);
  data();
  valX = (a + b) / 2;
  valY *= -1;

  background(64);
  var density = 10000;
  drawFun(density);

  fill(255, 0, 0);
  stroke(0);
  textSize(32);
  strokeWeight(5);

  if (a > b) {
    fill(255, 0, 0);
    text('[a, b] must be real integral!', 50, height / 2);
    noLoop();
  } else {
    text('The value of integral is:', 0, height - 10);
  }
  strokeWeight(1);
}

function draw() {
  k++;
  for (var i = 0; i < 100; i++) {
    drawNextPoint();
  }
  drawAxises();
  drawIntergal();
  drawPoints();
}

function drawFun(pts) {
  beginShape();
  noFill();
  stroke(255);
  var delta = ((b - a) * 1.0) / pts;
  for (var i = 0; i < pts; i++) {
    var x = delta * i + a;
    var y = fun(x);
    y = map(y, valY - rangeY / 2, valY + rangeY / 2, height, 0);
    x = map(x, a, b, 0, width);
    vertex(x, y);
  }
  endShape();
}

function drawAxises() {
  strokeWeight(2);
  // OX line
  stroke(0, 0, 255, 90);
  var yy = height / 2 + map(valY, 0, rangeY / 2, 0, height / 2);
  line(0, yy, width, yy);
  line(width, yy, width - 10, yy - 5);
  line(width, yy, width - 10, yy + 5);

  // OY line
  line(width / 2, 0, width / 2, height);
  line(width / 2, 0, width / 2 + 5, 0 + 10);
  line(width / 2, 0, width / 2 - 5, 0 + 10);

  fill(160);
  textSize(12);
  stroke(0);
  text('y = fun(x)', width / 2 + 10, 20);
  text('x', width - 15, yy - 10);
  strokeWeight(1);
}

function drawNextPoint() {
  var x = random(width);
  var y = random(height);
  var xr = map(x, 0, width, a, b);
  var yr = map(y, 0, height, valY + rangeY / 2, valY - rangeY / 2);

  if (yr < fun(xr) && yr > 0) {
    // fill(0, 255, 0);
    stroke(0, 255, 0);
    abovePts++;
  } else if (yr > fun(xr) && yr < 0) {
    // fill(255, 0, 0);
    stroke(255, 0, 0);
    underPts++;
  } else {
    // fill(255);
    stroke(150);
  }
  // noStroke();
  // ellipse(x, y, 4, 4);
  point(x, y);
  allPts++;
}

function drawIntergal() {
  k++;

  fill(255, 0, 0);
  stroke(0);
  textSize(32);
  strokeWeight(5);
  text('The value of integral is:', 0, height - 10);



  var integral = (((abovePts - underPts) * 1.0) / (allPts * 1.0)) * (rangeY * (b - a));
  if (k % floor(frameRate() / 2) == 0) {
    fill(0);
    rect(340, height - 35, 360, 28);
    fill(255);
    strokeWeight(1);
    textSize(32);
    text(integral, 340, height - 10);
  }

  strokeWeight(1);
}


function drawPoints() {
  // Points
  var xx;
  var yy;
  var str;
  textSize(16);
  strokeWeight(1);
  stroke(0);
  fill(255, 200, 0);

  // [0, 0]
  xx = width / 2;
  yy = height / 2 + map(valY, 0, rangeY, 0, height);
  ellipse(xx, yy, 8, 8);
  str = '( ' + valX + ', 0 )';
  text(str, xx + 5, yy + 20);

  // [-X, 0]
  xx = 0;
  ellipse(xx, yy, 8, 8);
  str = '( ' + a + ', 0 )';
  text(str, xx + 5, yy + 20);

  // [X, 0]
  xx = width;
  ellipse(xx, yy, 8, 8);
  xx -= 55;
  str = '( ' + b + ', 0 )';
  text(str, xx + 5, yy + 20);

  // [0, Y]
  xx = width / 2;
  if (valY <= 0) {
    yy = 3 * height / 4;
    ellipse(xx, yy, 8, 8);
    str = '( ' + valX + ', ' + (-rangeY / 4 + valY) + ' )';
    text(str, xx + 5, yy + 20);
  } else {
    yy = height / 4;
    ellipse(xx, yy, 8, 8);
    str = '( ' + valX + ', ' + (rangeY / 4 + valY) + ' )';
    text(str, xx + 5, yy + 20);
  }
}