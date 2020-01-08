/* p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 26-Jun-2019
 * Adapted from Justin Chambers 03/2018
 * https://www.openprocessing.org/sketch/524376
 */

let particles = [];
//let randomS;
//let simplex;
let nums;
let particleDensity = 4000;
let noiseScale = 800;
let maxLife = 10;
let simulationSpeed = 0.2;
let fadeFrame = 0;
let backgroundColor;
let visualMode = 0;
let numModes = 4;
let invertColors = false;

function setup(){
    nums = windowWidth * windowHeight / particleDensity;
    backgroundColor = color(20, 20, 20);
    createCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    for(let i = 0; i < nums; i++){
        particles[i] = new Particle();
    }
    
    //simplex = new SimplexNoise();
}

function draw(){
    cursor(HAND);
    noStroke();
    
    ++fadeFrame;
    if(fadeFrame % 5 == 0){
        if(invertColors){
            blendMode(ADD);
        } else {
            blendMode(DIFFERENCE);
        }
        fill(1, 1, 1);
        rect(0,0,width,height);
        
        if(invertColors){
            blendMode(DARKEST);
        } else {
            blendMode(LIGHTEST);
        }
        fill(backgroundColor);
        rect(0,0,width,height);
    }
    
    blendMode(BLEND);
    smooth();
    for(let i = 0; i < nums; i++){
        let iterations = map(i,0,nums,5,1);
        let radius = map(i,0,nums,2,6);
        
        particles[i].move(iterations);
        particles[i].checkEdge();
        
        let alpha = 255;
        let particleColor;
        let fadeRatio;
        fadeRatio = min(particles[i].life * 5 / maxLife, 1);
        fadeRatio = min((maxLife - particles[i].life) * 5 / maxLife, fadeRatio);
        let colorCase = visualMode;
        if(visualMode == 0)
        {
            colorCase = int(particles[i].pos.x / width * 3) + 1;
        }
        switch(colorCase)
        {
            case 1:
                let lifeRatioGrayscale = min(255, (255 * particles[i].life / maxLife) + red(backgroundColor));
                particleColor = color(lifeRatioGrayscale, alpha * fadeRatio);
                break;
            case 2:
                particleColor = particles[i].color;
                break;
            case 3:
                particleColor = color(blue(particles[i].color) + 70, green(particles[i].color) + 20, red(particles[i].color) - 50);
                break;
        }
        if(invertColors){
            particleColor = color(255 - red(particleColor), 255 - green(particleColor), 255 - blue(particleColor));
        }
        fill(red(particleColor), green(particleColor), blue(particleColor), alpha * fadeRatio);
        particles[i].display(radius);
    }
}

class Particle {
    
    constructor(){
        // member properties and initialization
        this.vel = createVector(0, 0);
        this.pos = createVector(random(0, width), random(0, height));
        this.life = random(0, maxLife);
        this.flip = int(random(0,2)) * 2 - 1;
        let randColor = int(random(0,3));
        switch(randColor)
        {
            case 0:
                this.color = color(110,57,204);
                break;
            case 1:
                this.color = color(7,153,242);
                break;
            case 2:
                this.color = color(255,255,255);
                break;
        }
    }
    
    // member functions
    move(iterations){
        if((this.life -= 0.01666) < 0)
            this.respawn();
        while(iterations > 0){
            let angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale*this.flip;
            //simplex.noise2D(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale*this.flip;
            this.vel.x = cos(angle);
            this.vel.y = sin(angle);
            this.vel.mult(simulationSpeed);
            this.pos.add(this.vel);
            --iterations;
        }
    }
    
    checkEdge(){
        if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
            this.respawn();
        }
    }
    
    respawn(){
        this.pos.x = random(0, width);
        this.pos.y = random(0, height);
        this.life = maxLife;
    }
    
    display(r){
        ellipse(this.pos.x, this.pos.y, r, r);
    }
    
}

function advanceVisual(){
    visualMode = ++visualMode % numModes;
    if(visualMode == 0){
        invertColors = !invertColors;
        backgroundColor = invertColors ? color(235, 235, 235) : color(20, 20, 20);
    }
    noiseSeed(random()*Number.MAX_SAFE_INTEGER);
    background(backgroundColor);
    
    for(let i = 0; i < nums; i++){
        particles[i].respawn();
        particles[i].life = random(0,maxLife);
    }
}

function mousePressed(){
    advanceVisual();
}

function touchStarted(){
    advanceVisual();
}
