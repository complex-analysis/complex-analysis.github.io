/* p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 31-May-2019
 * Inspired from https://www.maths.unsw.edu.au/about/exponential-sums
 */

let n = 1;// = 2000;
let s;
let maxNum = 1500;
let r;
let g;
let b;

function setup() {
  createCanvas(800, 400);
  colorMode(RGB, 1, 1, 1);
  s = sumseries(maxNum);
  r = random();
  g = random();
  b = random();
  //noLoop();
}

function draw() {
  background(0.9);
  //translate(width/2, height/2)
  
  cursor(HAND);
  let xc = constrain(mouseX, 0, width);
  //n = map(xc, 0, width, 0, maxNum);
  
  w = 100;
  h = (w * height) / width;
  
  // Start at negative half the width and height
  let xmin = -w / 2+15;
  let ymin = -h / 2-5;
  
  // x goes from xmin to xmax
  let xmax = xmin + w;
  // y goes from ymin to ymax
  let ymax = ymin + h;
  
    
  //console.log(s[2].im);
  push();
  for(let i = 0; i < n-1; i++) {
    stroke(r, i/s.length, b);
    strokeWeight(2.5);
    let x0 = map(s[i].re, xmin, xmax, 0, width);
    let y0 = map(s[i].im, ymin, ymax, height, 0);
    let x1 = map(s[i+1].re, xmin, xmax, 0, width);
    let y1 = map(s[i+1].im, ymin, ymax, height, 0);
    line(x0, y0, x1, y1);
  }
  pop();
  
  n+=2;
  if(n>maxNum){
   n=1;
   r = random();
   g = random();
   b = random();
  }
  
}

function mousePressed(){
    r = random();
    g = random();
    b = random();
}

function touchStarted(){
    r = random();
    g = random();
    b = random();
}

