/*
 A cool dynamic version of velocity fields.
 Flow around a circle with velocity U and circulation C.
 First a translation and scalling is applied to the
 circle C_0 with center z=0+0*i and radius |z|=1.
 This is done using the map T(z)=-0.15_0.23*i + r_0*z,
 with r_0=0.23*sqrt(13*2) and i^2=-1.
 
 Thus C_0 is mapped to the circle C_1 with center z1=-0.15+i*0.23
 and radius r_0. Finally the Joukowsky mapping J(z)=z+1/z is applied.
 Thus the circle C_1 is mapped to the Arfoil.
 This is known as The Joukowski Airfoil.
 */

//Warning: The code is pretty messy but I will be back later to improve it. :)

/*
 Feel free to do whatever with this code.
 If you do use it, I'd love to see what you did.
 Send me a note at  j.ponce@uq.edu.au
 */

//http://creativecommons.org/licenses/by-nc/4.0/


/*
 Last updated 08 March 2019
 */

let numMax = 600;
let t = 0;
let h = 0.01;
let particles = [];

let a = 1;//radius

//vector field variables
let xmax = 7;
let xmin = -7;
let ymax = 4;
let ymin = -4;
let sc = 0.15;
let xstep = 0.5;
let ystep = 0.5;

let WIDTH = 800;
let HEIGHT = 500;
let frameHeight = HEIGHT/100-2;

let currentParticle = 0;

let fshow = false;
let tshow = false;
let starting = false;

let buttonTrace;

let sliderU;// Speed
let sliderC;//Circulation
let sliderT;//Tranformation using homotopy

let rd=0.23*2*2.54950975679639241501;//radius

function setup() {
    createCanvas(WIDTH, HEIGHT);
    controls();
    resetSketch();
}

function resetSketch() {
    
    //seting up particles
    for (var i=0; i<numMax; i++) {
        var valX = random(-5, 5);
        var valY = random(-3, 3);
        particles[i] = new Particle(valX, valY, t, h);
    }
    tshow = false;
    
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

    //Initial message
    if (starting==false) {
        stroke(0);
        fill(0);
        noStroke();
        rect(0,0,800,500);
        fill(255);
        stroke(0);
        textSize(24);
        text("Click on screen to start", 6*width/17, height/4);
    }
    
    //This is for drawing the trace of particles
    if(tshow==true){
        fill(255, 8);
    } else{
        fill(255, 150);
    }
    
    stroke(255);
    strokeWeight(0.5);
    rect(0,0,800, 500);
    
    translate(width/2, height/2);//we need the origin at the center
    
    t += h;
    
    if (starting==true) {
        for (let i=particles.length-1; i>=0; i-=1) {
            let p = particles[i];
            p.update();
            p.display();
            if ( p.x > 4 ||  p.y > 3 || p.x < -5 ||  p.y < -3 || pow(pow(p.x, 2)+pow(p.y, 2), 1/2)<a ) {
                particles.splice(i,1);
                currentParticle--;
                particles.push(new Particle(random(-4.5, -4),random(-frameHeight, frameHeight),t,h) );
            }
        }
    }
    
    
    //Reference xy
    stroke(255, 0, 0);
    strokeWeight(2);
    line(0,0,100,0);
    stroke(51, 204, 51,100);
    line(0,0,0,-100);
    
    //This draws the circle to be transformed
    fill(0);
    stroke(0);
    strokeWeight(1);
    strokeJoin(ROUND);
    beginShape();
    for(let i = 0; i <= 2*PI; i+=PI/50){
        let xc = cos(i);
        let yc = sin(i);
        vertex(100*(xc*(1-sliderT.value()) + JkTransX(xc,yc)*sliderT.value()), -100*(yc*(1-sliderT.value())+JkTransY(xc,yc)*sliderT.value()));
    }
    endShape(CLOSE)
    
    //This is the black rectangle for the controls
    noStroke();
    rect(-400, 200, 820, 50);
    
    
    textSize(20);
    fill(255);
    text('U='+sliderU.value(), -390, 230);
    text('C='+sliderC.value(), -185, 230);
    text('T='+sliderT.value(), 34, 230);
    
    
}

function mousePressed() {
    starting = true;
}

function touchStarted(){
    starting = true;
}

let P = (t, x, y) => 4.9*(   (2 * a*a * sliderU.value() * y*y)/((x*x+ y*y)*(x*x+ y*y)) + sliderU.value()*(1 - (a*a)/(x*x + y*y)) - (sliderC.value()*y)/(2*PI*(x*x + y*y)) );//Change this function
let Q = (t, x, y) =>  4.9*( -(2*a*a * sliderU.value() * x * y)/((x*x+ y*y)*(x*x+ y*y)) + (sliderC.value() * x)/(2*PI*(x*x + y*y)) );//Change this function

//This part defines the components of the Joukowsky transformation
let JkTransX = (x,y) => rd*x-0.15 + (rd*x-0.15)/((rd*x-0.15)*(rd*x-0.15)+(rd*y+0.23)*(rd*y+0.23));


let JkTransY = (x,y) => rd*y+0.23 - (rd*y+0.23)/((rd*x-0.15)*(rd*x-0.15)+(rd*y+0.23)*(rd*y+0.23));



//Define particles and how they are moved with Runge–Kutta method of 4th degree.
class Particle{
    
    constructor(_x, _y, _t, _h){
        this.x = _x;
        this.y = _y;
        this.time = _t;
        this.radius = random(3, 5);
        this.h = _h;
        this.op = random(199,200);
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
        this.updatex = map(this.x*(1-sliderT.value()) + JkTransX(this.x,this.y)*sliderT.value(), -8, 8, -width, width);
        this.updatey = map(-this.y*(1-sliderT.value())- JkTransY(this.x,this.y)*sliderT.value(), -5, 5, -height, height);
        ellipse(this.updatex, this.updatey, 2*this.radius, 2*this.radius);

    }
    
}

//Set sliders and buttons
function controls() {
    
    buttonTrace = createButton('Trace');
    buttonTrace.position(690, 465);
    buttonTrace.mousePressed(traceShow);
    
    sliderU = createSlider(0.1, 1, 0.3, 0.1);
    sliderU.position(75, 460);
    sliderU.style('width', '100px');
    
    sliderC = createSlider(-10, 10, 0, 0.1);
    sliderC.position(290, 460);
    sliderC.style('width', '100px');
    
    sliderT = createSlider(0, 1, 0, 0.01);
    sliderT.position(510, 460);
    sliderT.style('width', '100px');
    
}


