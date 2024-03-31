let  num = 380;
var particles_a = [];
var particles_b = [];
var particles_c = [];
let noiseScale = 500;
let noiseStrength = 1;
//let r = 1;

function setup() {
  //createCanvas(800, 400);
  createCanvas(windowWidth,windowHeight);
  noStroke();
  for (let i=0; i<num; i++) {
    let loc_a = createVector(random(width*1.2), random(height), 2);
    let angle_a = random(TWO_PI);
    let dir_a = createVector(cos(angle_a), sin(angle_a));
		let loc_b = createVector(random(width*1.2), random(height), 2);
    let angle_b = random(TWO_PI);
    let dir_b = createVector(cos(angle_b), sin(angle_b));
		let loc_c = createVector(random(width*1.2), random(height), 2);
    let angle_c = random(TWO_PI);
    let dir_c = createVector(cos(angle_c), sin(angle_c));
    let speed = random(0.3, 0.8);
    //particles[i]= new Particle(loc, dir, speed);
		particles_a[i] = new Particle(loc_a, dir_a, speed);
		particles_b[i] = new Particle(loc_b, dir_b, speed);
		particles_c[i] = new Particle(loc_c, dir_c, speed);
  }
}

function draw() {
	
	smooth();
  //background(255);
  fill(0, 6);
  noStroke();
  rect(0, 0, width, height);
    
  for (let i=0; i<num; i++) {
		var radius = map(i,0,num,1,2);
		var fade = map(i,0,num,0,250);
		
		fill(30, fade);
		particles_a[i].move();
		particles_a[i].update(radius);
		particles_a[i].checkEdges();

		fill(70, fade);
		particles_b[i].move();
		particles_b[i].update(radius);
		particles_b[i].checkEdges();

		fill(270, fade);
		particles_c[i].move();
		particles_c[i].update(radius);
		particles_c[i].checkEdges();
  }
}

let Particle = function(loc_, dir_, speed_) {
  this.loc = loc_;
	this.dir = dir_;
	this.speed = speed_;
	this.d = 1;
	//this.col;
	//this.angle;
	//this.vel;
};

Particle.prototype.run = function() {
	  this.move();
    this.checkEdges();
    this.update();
};

// Method to move position
Particle.prototype.move = function(){
	  this.angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength;
    this.dir.x = cos(this.angle)+sin(this.angle)-sin(this.angle);
    this.dir.y = sin(this.angle)-cos(this.angle)*sin(this.angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed*this.d);
    this.loc.add(this.vel);
};

// Method to chech edges 
Particle.prototype.checkEdges = function(){
 if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
};


// Method to update position
Particle.prototype.update = function(r){
    ellipse(this.loc.x, this.loc.y, r);
};
