/*
 This is a simple simulation of an incompressible, nonviscous fluid.
 Inspired by the Coding Challenge #132
 https://youtu.be/alhpH6ECFvQ
 
 Flow around a circle simulation designed with p5.js (https://p5js.org/)
 Under Creative Commons License
 https://creativecommons.org/licenses/by-sa/4.0/
 
 Written by Juan Carlos Ponce Campuzano, 12-Feb-2019
 I still need to refactor :)
 https://jcponce.github.io
 */

let positions = new Array(1 * 2);
// 0,1,2,3,4,5
// 4,5,6,7,8,9
let bx;
let by;
let bs;
let bz = 30;
let bover = false;
let locked = false;
let newx;
let newy;
//let whichImage;

let Strength = 40;
let v = 40;
let a = 90;
let numMax = 450;
let t = 0;
let h = 0.001;
let particles = [];
let currentParticle = 0;

let trace = false;

let buttonTrace;

let sliderRadius;
let sliderSpeed;
let checkbox;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //seting up particles
  for (let i = 0; i < numMax; i++) {
    let valX = random(-width / 2, width / 2);
    let valY = random(-height / 2, height / 2);
    particles[i] = new Particle(valX, valY, t, h);
  }

  controls();

  bs = sliderRadius.value();
  imageMode(CENTER);
  
  bx = width / 2.0;
  by = height / 2.0;

  for (let j = 0; j < 1 * 2; j += 2) {
    positions[j] = random(0, 0);
    positions[j + 1] = random(0, 0);
  }
  
}

function draw() {

  cursor(HAND);

  translate(width / 2, height / 2);

  if (trace == true) {
    background(0, 6);
  } else background(0, 100);
  //stroke(0);
  //strokeWeight(2);
  
  //rect(-width / 2, -height / 2, width, height);

  t += h;

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.x > width / 2 || p.y > height / 2 || p.x < -width / 2 || p.y < -height / 2 || (pow(p.x - positions[0], 2) + pow(p.y - positions[1], 2)) < sliderRadius.value()) {
      particles.splice(i, 1);
      currentParticle--;
      particles.push(new Particle(-width / 2, random(-height / 2, height / 2), t, h));
    }
  }


  for (let j = 0; j < 1; j++) {
    if (bover && whichImage == j) {
      noStroke();
      fill(200);
    } else {
      noStroke();
      fill(80);
    }
    ellipse(positions[j * 2], positions[j * 2 + 1], (sliderRadius.value()+2) * 2, (sliderRadius.value()+2) * 2);
  }

  translate(-width / 2, -height / 2);
  fill(250);
  rect(3, 3, 120, 170, 10);
  fill(0);
  stroke(0);
  strokeWeight(0.3);
  textSize(16);
  textAlign(LEFT);
  text("Radius", buttonTrace.x-1, buttonTrace.y + 55);
  text("Speed", buttonTrace.x-1, buttonTrace.y + 115);
 
 textSize(32);
 fill(255);
 stroke(0);
 strokeWeight(2);
 textAlign(CENTER);
 if(positions[0]==0 && positions[1]==0){
  text("Drag circle!", width/2, height/2);
 }

}

function controls(){
    buttonTrace = createButton('Trace');
    buttonTrace.position(10, 15);
    buttonTrace.mousePressed(traceShow);
    buttonTrace.style('font-size', '20px');
    buttonTrace.addClass('button');
    
    //checkbox = createCheckbox('More', false);
    //checkbox.style('font-size', '20px');
    //checkbox.position(buttonTrace.x+60, buttonTrace.y );
    //checkbox.changed(myCheckedEvent);
    
    sliderRadius = createSlider(0.01, 200, 100, 0.01);
    sliderRadius.position(buttonTrace.x-1, buttonTrace.y + 60);
    sliderRadius.style('width', '100px');
    
    sliderSpeed = createSlider(0.01, 100, 40, 0.01);
    sliderSpeed.position(buttonTrace.x-1, buttonTrace.y + 120);
    sliderSpeed.style('width', '100px');
    
}

/*function myCheckedEvent() {
    if (this.checked()) {
        console.log('Checking!');
    } else {
        console.log('Unchecking!');
    }
}*/

let alpha = 0.9;

//Define particles and how they are moved with Runge–Kutta method of 4th degree.
class Particle {

  constructor(_x, _y, _t, _h) {
    this.x = _x;
    this.y = _y;
    this.time = _t;
    this.radius = random(3, 4);
    this.h = _h;
    this.op = 200;
    this.r = random(10);
    this.g = random(220, 220);
    this.b = random(120, 255);
  }

  update() {
      
    let sp = sliderSpeed.value();
    let rd = sliderRadius.value();
    let px = positions[0];
    let py = positions[1];
      
    //-U cos(a) + U a² cos(a) / ((x cos(a) + y sin(a))² + (x sin(a) + y cos(a))²) + U a² (-2 cos(a) (x sin(a) + y cos(a)) - 2sin(a) (x cos(a) + y sin(a))) (x sin(a) + y cos(a)) / ((x cos(a) + y sin(a))² + (x sin(a) + y cos(a))²)²
      
    // -sp * cos(alpha) + sp * pow(rd, 2) * cos(alpha) / ( pow( x * cos(alpha) + y * sin(alpha), 2) + pow(x * sin(alpha) + y * cos(alpha),2)) + sp * pow(rd, 2)* (-2 *cos(alpha) * (x * sin(alpha) + y * cos(alpha)) - 2*sin(alpha) * (x * cos(alpha) + y * sin(alpha))) *(x * sin(alpha) + y * cos(alpha) ) / pow( pow(x * cos(alpha) + y * sin(alpha), 2) + pow(x * sin(alpha) + y * cos(alpha),2), 2 )
      
    //U sin(a) - U a² sin(a) / ((x cos(a) + y sin(a))² + (x sin(a) + y cos(a))²) - U a² (-2 cos(a) (x cos(a) + y sin(a)) - 2sin(a) (x sin(a) + y cos(a))) (x sin(a) + y cos(a)) / ((x cos(a) + y sin(a))² + (x sin(a) + y cos(a))²)²
      
   // sp * sin(alpha) - sp * pow(rd, 2) * sin(alpha) / ( pow(x* cos(alpha) + y *sin(alpha), 2) + pow(x * sin(alpha) + y * cos(alpha), 2)) - sp *pow(rd, 2) * (-2 * cos(alpha) * (x * cos(alpha) + y * sin(alpha)) - 2*sin(alpha) * (x * sin(alpha) + y * cos(alpha))) * (x * sin(alpha) + y * cos(alpha)) / pow( pow(x * cos(alpha) + y * sin(alpha), 2) + pow(x *sin(alpha) + y *cos(alpha),2), 2 )
      
      
      let P = (t, x, y) => Strength * ( sp - (sp * (rd * rd) * (pow(x - px, 2) - pow(y - py, 2))) / pow( pow(x - px, 2) + pow(y - py, 2) , 2) );
      
      let Q = (t, x, y) => Strength * ((-2 * sp * (rd * rd) * (x - px) * (y - py)) / pow( pow(x - px, 2) + pow(y - py, 2) , 2) );
      
    this.k1 = P(this.time, this.x, this.y);
    this.j1 = Q(this.time, this.x, this.y);
    this.k2 = P(this.time + 1 / 2 * this.h, this.x + 1 / 2 * this.h * this.k1, this.y + 1 / 2 * this.h * this.j1);
    this.j2 = Q(this.time + 1 / 2 * this.h, this.x + 1 / 2 * this.h * this.k1, this.y + 1 / 2 * this.h * this.j1);
    this.k3 = P(this.time + 1 / 2 * this.h, this.x + 1 / 2 * this.h * this.k2, this.y + 1 / 2 * this.h * this.j2);
    this.j3 = Q(this.time + 1 / 2 * this.h, this.x + 1 / 2 * this.h * this.k2, this.y + 1 / 2 * this.h * this.j2);
    this.k4 = P(this.time + this.h, this.x + this.h * this.k3, this.y + this.h * this.j3);
    this.j4 = Q(this.time + this.h, this.x + this.h * this.k3, this.y + this.h * this.j3);
    this.x = this.x + this.h / 6 * (this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4);
    this.y = this.y + this.h / 6 * (this.j1 + 2 * this.j2 + 2 * this.j3 + this.j4);
    this.time += this.h;
  }

  display() {
    fill(this.r, this.b, this.g, this.op);
    noStroke();
    ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius);
  }

}

function traceShow() {
  if (trace == false) {
    trace = true;
  } else {
    trace = false;
  }
}

//The following functions allow me to drag the circle

function mousePressed() {
  checkOver();
  if (bover) {
    locked = true;
  } else {
    locked = false;
  }
}

function mouseReleased() {
  locked = false;
  bover = false;
}

function mouseDragged() {
  if (locked) {
    newx = mouseX - width / 2;
    newy = mouseY - height / 2;
  }

  positions[whichImage * 2] = newx;
  positions[(whichImage * 2) + 1] = newy;
}
//
function checkOver() {
  for (let i = 0; i < 1; i++) {

    // Test if the cursor is over the box  
    if (mouseX - width / 2 > positions[i * 2] - bs && mouseX - width / 2 < positions[i * 2] + bs &&
      mouseY - height / 2 > positions[i * 2 + 1] - bs && mouseY - height / 2 < positions[i * 2 + 1] + bs) {
      //print("mouseover image: "+i);
      whichImage = i;
      bover = true;
      break; // leave here !!!!!!!!!!!!!!!!!
    } else {
      bover = false;
    }
  } // for
}
