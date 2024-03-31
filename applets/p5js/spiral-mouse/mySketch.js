//Inspired from https://www.maths.unsw.edu.au/about/exponential-sums


let setX = [];
let setY = [];
let sumX = [];
let sumY = [];
let setX1 = [];
let setY1 = [];
let sumX1 = [];
let sumY1 = [];
let all = [];

let n, hu;

function setup() {
  createCanvas(800, 500);
  background(1);
  colorMode(HSB, 1, 1, 1);

}

function draw() {
  background(1);
 cursor(HAND);
  fill(1, 0.9,0.2);
  textSize(15);
  text("Im", width / 2 + 5, 20);
  text("Re", width - 28, height / 2 + 15);

  noFill();
  stroke(1, 0.9,0.2);
  strokeWeight(0.7);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);

  let limit =22;
  hu = 0;
	n = map(mouseX, 0, width, 0, 1200);
	//hu = map(i, 0, n-1, 0, 1);
    
 //beginShape();
	push();
  for (let i = 0; i < n; i++) {

    setX[i] = cos(2 * PI * (expression(i)));
    setY[i] = sin(2 * PI * (expression(i)));

    sumX[i] = arrSum(setX, i);
    sumY[i] = arrSum(setY, i);

    let nX = [];
    let nY = [];

    nX[i] = map(sumX[i], -limit*3/2+15, limit*3/2+15, 0, width);
    nY[i] = map(sumY[i], -limit-7, limit-7, height, 0);
		
		setX1[i] = cos(2 * PI * (expression(i+1)));
    setY1[i] = sin(2 * PI * (expression(i+1)));

    sumX1[i] = arrSum(setX, i+1);
    sumY1[i] = arrSum(setY, i+1);

    let nX1 = [];
    let nY1 = [];

    nX1[i] = map(sumX1[i], -limit*3/2+15, limit*3/2+15, 0, width);
    nY1[i] = map(sumY1[i], -limit-7, limit-7, height, 0);
    
    stroke(i/1200, 1, 1);
	  noFill();
		 //fill(i/1300, 1, 1);
    strokeWeight(2);
 //vertex(nX[i], nY[i]);
		line(nX[i], nY[i], nX1[i], nY1[i]);
		 
  }
	pop();
  //endShape();

  //noLoop();
	

}

function expression(n) {
  //return pow(log(n + 1), 4);
 // return (n+1)/3+(n+1)*(n+1)/11+(n+1)*(n+1)*(n+1)/79;
  return log(n+1)+(n+1)*(n+1)/100;
}

function arrSum(array, index) {
  let sum = 0;
  for (let i = 0; i < index; i++) {
    sum += array[i];
  }
  return sum;
}