/* 

Written in p5.js (https://p5js.org/)
Under Creative Commons License
https://creativecommons.org/licenses/by-sa/4.0/

Author: Juan Carlos Ponce Campuzano
Site: https://jcponce.github.io/
Date: 15-Oct-2020
 
*/

let dots = [];
let count = 40;
let noiseval = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pointInit();

}

function draw() {
  background(255);
  for (var i = 0; i < count; i++) {
    dots[i].drawMe();
    dots[i].updateMe();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function pointInit() {
  for (var i = 0; i < count; i++) {
    dots[i] = new curveObj();
  }
}



class curveObj {

  constructor() {
    this.initMe();
  }

  initMe() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.imgCol = floor(random(0, 3));
    this.sizeScale = random(6, 10);
    this.rotAngle = 0;
    this.rotSpeed = random(-3, 3);
    this.speed = random(0.5, 2);
    this.xnoise = random(100);
    this.red = random(90, 90);
    this.green = random(100, 255);
    this.blue = random(200, 255);
    this.set();
  }

  updateMe() {
    this.x = this.x + noise(this.xnoise) * 2 - 1;
    this.xnoise = this.xnoise + noiseval;
    this.y = this.y + this.speed;
    if (this.y > height + 100) {
      this.initMe();
      this.y = -100;
    }
    this.rotAngle += this.rotSpeed;
  }

  drawMe() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.rotAngle));
    scale(this.sizeScale, this.sizeScale);
    stroke(this.red, this.green, this.blue);
    strokeWeight(0.11);
    strokeJoin(ROUND);
    noFill();
    beginShape();
    for (let k = 0; k < 360; k += 0.5) {
      let t = map(k, 0, 360, 0, TWO_PI);
      let vs = this.sumC(t);
      vertex(vs.x, vs.y);
    }
    endShape(CLOSE);
    pop();
  }

  set() {
    this.m = this.getRndInteger(2, 4);

    this.complex = [];
    let s = 1;
    for (let i = 0; i < 4; i++) {
      this.complex[i] = new p5.Vector(random(0.5, s), random(0.5, s));
    }

    this.n = [];
    for (let i = 0; i < 4; i++) {
      this.n[i] = this.getRndInteger(-30, 30);
    }
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sumC(t) {
    let sumX = 0;
    let sumY = 0;
    let k = 0;
    while (k < this.m) {
      let x = this.complex[k].x;
      let y = this.complex[k].y;
      let c = this.n[k];
      sumX += x * cos(c * t) - y * sin(c * t);
      sumY += x * sin(c * t) + y * cos(c * t);
      k++
    }

    return createVector(sumX, sumY);
  }

  show() {
    strokeJoin(ROUND);
    noFill();
    beginShape();
    for (let k = 0; k < 360; k += 1) {
      let t = map(k, 0, 360, 0, TWO_PI);
      let vs = this.sumC(t);
      vertex(vs.x, vs.y);
    }
    endShape(CLOSE);
  }

}