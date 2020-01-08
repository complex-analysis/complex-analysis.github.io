/* Written in p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 28-Nov-2018
 */

// Last update 14-Nov-2019

let mandelbrot;

let WIDTH = 490;
let HEIGHT = 490;
let ctlsBack = 00;//This is just need it when controls are inside canvas

let up = 1;
let down = 2;
let left = 3;
let right = 4;
let zoomin = 5;
let zoomout = 6;
let reset = 7;
let info = false;
let sizePlot = false;
let showOrbit = false;

let buttonUP;
let buttonDOWN;
let buttonLEFT;
let buttonRIGHT;

let buttonZOOMIN;
let buttonZOOMOUT;

let sliderIter;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    cursor(HAND);
    pixelDensity(1);//I need this for small devices
    
    
    mandelbrot = new MandelbrotSet();
    frameRate(60);
    smooth();
    
    
    controlsUI();
    
}

function windowResized() {
    if(sizePlot== true){
        resizeCanvas(700, 700);
    } else{
        resizeCanvas(490, 490);
    }
}

function draw() {
    
    background(200);

    mandelbrot.update();
    mandelbrot.plot();

    up = 1;
    down = 2;
    left = 3;
    right = 4;
    zoomin = 5;
    zoomout = 6;
    reset = 7;
    
    //console.log(up);
    
}

function keyReleased() {
    if (keyCode === 73)//I key
        mandelbrot.printDebug = !mandelbrot.printDebug;
    if (keyCode === 66){//B key
        sizePlot = !sizePlot;
    }
    if (keyCode === 79){//O key
        showOrbit = !showOrbit;
        mandelbrot.orbit = !mandelbrot.orbit;
    }
    windowResized();
    if (keyCode === 83)//S key
        saveFractal();
}

function mouseWheel() {
    mandelbrot.zoomAt(mouseX, mouseY, 0.85, event.delta < 0);
}

// KeyCodes available at: http://keycode.info/
const KC_UP = 38;        // Move up W
const KC_DOWN = 40;        // Move down S
const KC_LEFT = 37;        // Move left A
const KC_RIGHT = 39;    // Move right D
const KC_UNZOOM = 189;    // Zoom back -
const KC_ZOOM = 187;    // Zoom in +
const KC_RESET = 82;    // Reset zoom level and position R

class MandelbrotSet {
    
    constructor(){
        this.origSize = new p5.Vector(3, 3);
        this.size = new p5.Vector(this.origSize.x, this.origSize.y);
        this.origPos = new p5.Vector(-0.7, 0);//Origin position
        this.pos = new p5.Vector(this.origPos.x, this.origPos.y);
        this.maxIter = 180;
        this.origZoom = 1;
        this.zoom = this.origZoom;
        this.orbit = false;
        this.printDebug = false;
    }
    
    update(){
        
        var moveSpeed = 0.1 * this.zoom;
        if (up === -1 || keyIsDown(KC_UP))
            this.pos.y -= moveSpeed;
        if (down === -2 || keyIsDown(KC_DOWN))
            this.pos.y += moveSpeed;
        if (left === -3 || keyIsDown(KC_LEFT))
            this.pos.x -= moveSpeed;
        if (right === -4 || keyIsDown(KC_RIGHT))
            this.pos.x += moveSpeed;
        if (zoomout === -6 || keyIsDown(KC_UNZOOM))
            this.zoomAt(width/2, height/2, 0.95, false);
        if (zoomin === -5 || keyIsDown(KC_ZOOM))
            this.zoomAt(width/2, height/2, 0.95, true);
        if (reset === -7 ||keyIsDown(KC_RESET))
        {
            this.size.x = this.origSize.x;
            this.size.y = this.origSize.y;
            this.pos.x = this.origPos.x;
            this.pos.y = this.origPos.y;
            this.zoom = this.origZoom;
        }
        this.maxIter = sliderIter.value();
        
    }
    
    zoomAt(x, y, ammount, isZoomIn){
        
        ammount = isZoomIn ? ammount : 1 / ammount;
        x = map(x, ctlsBack, width, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2);
        y = map(y, height, 0,  this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2);
        this.pos.x = x + (this.pos.x - x) * ammount;
        this.pos.y = y + (this.pos.y - y) * ammount;
        this.zoom *= ammount;
        this.size.x = this.origSize.x * this.zoom;
        this.size.y = this.origSize.y * this.zoom;
        
    }
    
    mandelbrotCalculation(z, c) {
      let o = new p5.Vector(z.x * z.x - z.y * z.y + c.x, 2 * z.x * z.y + c.y);
      return o;
    }
    
    drawOrbit() {
      let virtualPos;
      let actualPos;
      let mouseC;
      let orbit = [];

      let xt, yt;

      actualPos = new p5.Vector(mouseX, mouseY);
      
      orbit.push(actualPos);
        
      xt = map(actualPos.x, ctlsBack, width, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2);
      yt = map(actualPos.y, height, 0, this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2);
        
      virtualPos = new p5.Vector(0, 0);
      mouseC = new p5.Vector(xt, yt);

      let count = 0;
      while (count < this.maxIter && dist(virtualPos.x, virtualPos.y, 0, 0) < 10) {
        let next = this.mandelbrotCalculation(virtualPos, mouseC);
        xt = map(next.x, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2, ctlsBack, width);
        yt = map(next.y, this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2, height, 0);
        actualPos = new p5.Vector(xt, yt);
        orbit.push(actualPos);
        virtualPos = next;
        count++;
      }

      beginShape();
      noFill();
      if (count == this.maxIter) {
        stroke(255);
      } else {
        stroke(51, 51, 255);
      }
      strokeWeight(0.99 / 300 * width);
      for (let P of orbit) {
        vertex(P.x, P.y);
      }
      endShape();

    }
    
    plot(){
        
        loadPixels();
        
        var cX = this.pos.x + map(mouseX, ctlsBack, width, -this.size.x / 2, this.size.x / 2);//this is for Mandelbrot
        var cY = this.pos.y + map(mouseY, height, 0, -this.size.y / 2, this.size.y / 2);//this is for Mandelbrot
        
        for (var x = ctlsBack; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var sqZ = new p5.Vector(0, 0);
                var z = new p5.Vector(
                                      this.pos.x + map(x, ctlsBack, width, -this.size.x / 2, this.size.x / 2),
                                      this.pos.y + map(y, height, 0, -this.size.y / 2, this.size.y / 2)
                                      );
                var c = new p5.Vector(z.x, z.y);
                
                var iter = 0;
                while (iter < this.maxIter) {
                    sqZ.x = z.x * z.x - z.y * z.y;
                    sqZ.y = 2 * z.x * z.y;
                    z.x = sqZ.x + c.x;
                    z.y = sqZ.y + c.y;
                    if (abs(z.x + z.y) > 16)
                        break;
                    iter++;
                }
                setPixelHSV(x, y, map(iter, 0, this.maxIter, 0, 1), 1, iter !== this.maxIter);
            }
        }
        updatePixels();
        
        if(this.orbit){
          this.drawOrbit();
        }
                   
                   
        if (this.printDebug) {
            //Frame reference
            
            stroke(220);
            strokeWeight(2);
            line((width+ctlsBack)/2, 0, (width+ctlsBack)/2, height);
            line(ctlsBack, height/2, (width+ctlsBack), height/2);
            ellipse((width+ctlsBack)/2, height/2, 8, 8);
            
            fill(255);
            stroke(0);
            strokeWeight(3);
            textSize(24);
            text("x: " + str( round( this.pos.x * 1000 )/1000 )
                 + "\ny: " + str( round( this.pos.y * 1000 )/1000 )
                 + "\nzoom: " + str( round(  (1 / this.zoom) * 1000 )/1000 )
                 + "\niterations: " + str( round(  (this.maxIter) * 1000 )/1000 )
                 , ctlsBack + 10, 19
                 );
        }
        //draw constant label
        fill(255);
        stroke(0);
        strokeWeight(3);
        textSize(24);
        if(0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height){
            text("Mouse: (" + str(round(cX*1000)/1000.0) + "," + str(round(cY*1000)/1000.0) + ")", ctlsBack + 10, height-15);
        }
        
        var xc = mouseX;
        var yc = mouseY;
        if(xc<=ctlsBack){
            fill(200);}
        else{
            fill(255);}
        noStroke();
        ellipse(xc, yc, 8, 8);
        
    }
    
}

function setPixelRGB(x, y, r, g, b) {
    var pixelID = (x + y * width) * 4;
    pixels[pixelID + 0] = r;
    pixels[pixelID + 1] = g;
    pixels[pixelID + 2] = b;
    pixels[pixelID + 3] = 255;
}

function setPixelHSV(x, y, h, s, v) {
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    setPixelRGB(x, y, Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

function controlsUI(){
    document.getElementById("up").onclick = () => {
        up = -1;
    }
    document.getElementById("down").onclick = () => {
        down = -2;
    }
    document.getElementById("left").onclick = () => {
        left = -3;
    }
    document.getElementById("right").onclick = () => {
        right = -4;
    }
    document.getElementById("zoomin").onclick = () => {
        zoomin = -5;
    }
    document.getElementById("zoomout").onclick = () => {
        zoomout = -6;
    }
    document.getElementById("reset").onclick = () => {
        reset = -7;
    }
    document.getElementById("info").onclick = () => {
        userINFO();
    }
    document.getElementById("screen").onclick = () => {
        if (sizePlot) {
            sizePlot = false;
        } else {
            sizePlot = true;
        }
        windowResized();//userSCREEN();
    }
    document.getElementById("orbit").onclick = () => {
        if (showOrbit) {
            showOrbit = false;
        } else {
            showOrbit = true;
        }
        mandelbrot.orbit = !mandelbrot.orbit;
    }
    document.getElementById("save").onclick = () => {
        saveFractal();
    }
 
    sliderIter = createSlider(0, 400, 160, 1);
    sliderIter.parent('slider');
    sliderIter.style('width', '120px')
    
}

function userINFO() {
    if (info) {
        info = false;
    } else {
        info = true;
    }
    mandelbrot.printDebug = !mandelbrot.printDebug;
}

function saveFractal(){
    save('mandelbrot.jpg')
}

