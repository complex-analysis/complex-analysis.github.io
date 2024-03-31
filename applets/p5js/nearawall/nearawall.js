/* Near a wall simulation designed with p5.js (https://p5js.org/)
 Under Creative Commons License
 https://creativecommons.org/licenses/by-sa/4.0/
 
 Writen by Juan Carlos Ponce Campuzano, 19-August-2017
 */

/*
 Last update 16/Mar/2024
 */

let numMax = 400;
let t = 0;
let h = 0.01;
let particles = [];

//vector field variables
let xmax = 3.5;
let xmin = -3.5;
let ymax = 4;
let ymin = 0;
let sc = 0.5;
let xstep = 0.25;
let ystep = 0.25;

let WIDTH = 700;
let HEIGHT = 500;
let frameWidth = WIDTH/100;
let frameHeight = HEIGHT/100;

let currentParticle = 0;

let fshow = false;
let tshow = false;
let starting = false;

let buttonField;
let buttonTrace;
let sliderk;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    cursor(HAND);
    controls();
    resetSketch();
}

function resetSketch() {
    
    //seting up particles
    for (let i=0; i<numMax; i++) {
        let valX = random(-6, 6);
        let valY = random(0, 5);
        particles[i] = new Particle(valX, valY, t, h);
    }
    fshow = false;
    tshow = false;
    
}

function fieldShow() {
    
    if(fshow==false) {
        fshow = true;
    } else{
        fshow = false;
    }
    
    if(tshow==true) {
        tshow = false;
    }
    
}

function traceShow() {
    if(tshow==false) {
        tshow = true;
    }else{
        tshow = false;
    }
    
    if(fshow==true) {
        fshow = false;
    }
    
}

function draw() {
    
    //This is for drawing the trace of particles
    if(tshow==true){
        fill(0,6);
    } else{
        fill(0,110);
    }
    noStroke();
    rect(0,0,width,height);
    
    //Initial message
    if (starting==false) {
        fill(255);
        stroke(255);
        textAlign(CENTER);
        textSize(32);
        text("Click on screen to start", width/2, height/2);
    }
    
    translate(width/2, height-70);//we need the oringin at the center
    
    if(starting==true) {
        
        //Reference xy
        stroke(255, 0, 0,100);
        strokeWeight(2);
        line(0,-1,100,-1);//xAxis
        stroke(51, 204, 51,100);
        line(0,0,0,-100);//yAxis, the value is negative since axis in p5js is upside down
        
        t += h;
        
        for (let i=particles.length-1; i>=0; i-=1) {
            let p = particles[i];
            p.update();
            p.display();
            if ( p.x > frameWidth ||  p.y > frameHeight || p.x < -frameWidth ||  p.y < 0 ) {
                particles.splice(i,1);
                currentParticle--;
                particles.push(new Particle(random(-frameWidth, frameWidth),random(4.8,5),t,h) );
            }
        }
        
        if(fshow == true){
            field(t);
        }
        
    }
    
    //Black background for text and sliders
    noStroke();
    fill(0);
    rect(-700, 0, 1400, 100);
    //text
    textSize(16);
    fill(250);
    
    text('k = '+nfc(sliderk.value(),1,1),-40, 20);//for slider k
    
}

function mousePressed() {
    starting = true;
}

let P = (t, x, y) => ( sliderk.value() * x  );//Change this function
let Q = (t, x, y) =>  ( sliderk.value() * (-y) );//Change this function


//Define particles and how they are moved with Runge–Kutta method of 4th degree.
class Particle{
    
   constructor(_x, _y, _t, _h){
    this.x = _x;
    this.y = _y;
    this.time = _t;
    this.radius = random(3, 5);
    this.h = _h;
    this.op = random(187,200);
    this.r = random(0);
    this.g = random(164,255);
    this.b = random(255);
	}
    
    update() {
        this.k1 = P(this.time, this.x, this.y);
        this.j1 = Q(this.time, this.x, this.y);
        this.k2 = P(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k1, this.y + 1/2 * this.h * this.j1);
        this.j2 = Q(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k1, this.y + 1/2 * this.h * this.j1);
        this.k3 = P(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k2, this.y + 1/2 * this.h * this.j2);
        this.j3 = Q(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k2, this.y + 1/2 * this.h * this.j2);
        this.k4 = P(this.time + this.h, this.x + this.h * this.k3, this.y + this.h * this.j3);
        this.j4 = Q(this.time + this.h, this.x + this.h * this.k3, this.y + this.h * this.j3);
        this.x = this.x + this.h/6 *(this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4);
        this.y = this.y + this.h/6 *(this.j1 + 2 * this.j2 + 2 * this.j3 + this.j4);
        this.time += this.h;
    }
    
    display() {
        fill(this.r, this.b, this.g, this.op);
        noStroke();
        this.updatex = map(this.x, -7, 7, -width, width);
        this.updatey = map(-this.y, -5, 5, -height, height);
        ellipse(this.updatex, this.updatey, 2*this.radius, 2*this.radius);
    }
    
}

//Set sliders and buttons
function controls() {

    sliderk = createSlider(0, 1.5, 0.5, 0.1);
    sliderk.position(230, 460);
    sliderk.style('width', '150px');
    
    buttonField = createButton('Field');
    buttonField.position(590, 464);
    buttonField.mousePressed(fieldShow);
    
    buttonTrace = createButton('Trace');
    buttonTrace.position(520, 464);
    buttonTrace.mousePressed(traceShow);
    
}

//Vector field
function field(_time) {
    for(let k=ymin; k<=ymax; k+=ystep){
        for(let j=xmin; j<=xmax; j+=xstep){
            let xx = j + sc * P(_time, j, k);
            let yy = k + sc * Q(_time, j, k);
            
            let lj = map(j, -3.5, 3.5, -width, width);
            let lk = map(-k, -3, 3, -height, height);
            let lx = map(xx, -3.5, 3.5, -width, width);
            let ly = map(-yy, -3, 3, -height, height);
            let angle = atan2(ly-lk, lx-lj);
            let dist = sqrt((lk-ly)*(lk-ly)+(lj-lx)*(lj-lx))
            fill(255, dist);
            noStroke();
            push();
            translate(lj, lk);
            rotate(angle);
            //scale(map(dist,0,1.5,0,0.01));
            triangle(0, -4, 20, 0, 0, 4);
            rect(-15, -1.5, 15, 3)
            pop();
        }
    }
}
