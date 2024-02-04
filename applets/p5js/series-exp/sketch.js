let c, num;
let n = 1;

let r, g, b;

function preload(){
  init();
}

function setup() {
  createCanvas(800, 400);
  colorMode(RGB, 1, 1, 1);
  
  
  cursor(HAND);

  r = random();
  g = random();
  b = random();
}

function draw() {
  background(0.9);

  translate(width/2, height/2);
 
  
  push();
  for (let i = 0; i < n - 1; i++) {
    stroke( r, i / s.length, b);
    strokeWeight(2.5);
    let x0 = s[i].re;
    let y0 = s[i].im;
    let x1 = s[i + 1].re;
    let y1 = s[i + 1].im;
    line(x0, -y0, x1, -y1);
  }
  pop();
  
  

  n += 6;
  
  if (n > num) {
    n = 1;
    r = random();
    g = random();
    b = random();
    init();
  } 
  //console.log(n);
  
  
}

function init(){
  c = new complexCurve();
  s = c.sumS();
  num = c.getData(c.ran).n;
}

function mousePressed() {
  
  init();
  n = 1;
  r = random();
  g = random();
  b = random();
}

class complexCurve {
  constructor() {
    this.ran = int(random(0,6));
    //console.log(this.ran);
  }

  sumS() {
    let x = [];
    let xSum = [];
    let f, s, px, py, n;
    s = this.getData(this.ran).s;
    px = this.getData(this.ran).x;
    py = this.getData(this.ran).y;
    n = this.getData(this.ran).n;
    for (let k = 0; k < n; k++) {
      let sum = new Complex(0, 0);
      for (let i = 0; i < k; i++) {
        f = this.getFunc(i);
        let rex = cos(2 * PI * f);
        let imx = sin(2 * PI * f);
        x[i] = new Complex(rex, imx);
        sum.add(x[i]);
      }
      xSum[k] = { 
        re: s * sum.re + px, 
        im: s * sum.im  + py
      };
    }
    return xSum;
  }
  
  getFunc(k){
    let ran = this.ran;
    if(ran === 0){
      return cos(k * 63.12233)+k/334 + k*k/23;
    } else if(ran === 1){
      return k/5 + cos(k*101.673);
    } else if(ran === 2){
      return log(k + 1) + ((k + 1) * (k + 1)) / 100;
    } else if(ran === 3){
      return 50 * pow(k, 1/2);
    } else if(ran === 4){
      return k/48 + k*k*k/78;
    } else if(ran === 5){
      return pow(k,1/2)/2;
    } 
  }
  
  getData(k){
    let ran = this.ran;
    let v = [
      // s: Scale, x,y: Position, n: Number of points
      {s: 5, x: -150, y: 20, n: 4000},
      {s: 40, x: -40, y: 40, n: 2000},
      {s: 5, x: 0, y: 0, n: 3000},
      {s: 10, x: -100, y: -50, n: 1000},
      {s: 60, x: 0, y: 0, n: 1000},
      {s: 8, x: 0, y: 0, n: 2500},
    ]
    return v[ran];
  }

  
}


class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
  }

  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }

  modulus(c) {
    const r = sqrt(this.re * this.re + this.im * this.im);
    return r;
  }

  angle(c) {
    const ang = atan2(this.y, this.re);
    return ang;
  }

  exp(c) {
    const re = exp(this.re) * cos(this.im);
    const im = exp(this.re) * sin(this.im);
    return new Complex(re, im);
  }

  log(c) {
    const re = log(pow(this.re * this.re + this.im * this.im, 1 / 2));
    const im = atan2(this.im, this.re);
    return new Complex(re, im);
  }
}

