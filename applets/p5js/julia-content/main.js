/* Written in p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 28-Nov-2018
 * Original code by Kato https://www.openprocessing.org/user/114431
 */

// Last update 18-Oct-2018

let julia = new Julia();
let c;
let WIDTH = 770;
let HEIGHT = 590;
let ctlsBack = 180;
let sizePlot = false;
let starting = false;
let up = 1;
let down = 2;
let left = 3;
let right = 4;
let zoomin = 5;
let zoomout = 6;
let reset = 7;
let infor = 8;
let changeC = true;

let buttonUP;
let buttonDOWN;
let buttonLEFT;
let buttonRIGHT;

let buttonZOOMIN;
let buttonZOOMOUT;

let buttonRESET;
let buttonORBIT;
let buttonINFO;


let sliderIter;

var cnv;

let prevmx = 0;
let prevmy = 0;
let pmx = 0;
let pmy = 0;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {
    cnv = createCanvas(WIDTH, HEIGHT);
    cursor(HAND);
    
    pixelDensity(1);//I need this for small devices
    
    //changeC = false;
    c = new p5.Vector(0, 0);
    frameRate(60);
    
    controlsUI();
    
}

function windowResized() {
    resizeCanvas(510, 510);
}

function draw() {
    background(200);
    //Initial message
    if (starting == false) {
        fill(190);
        stroke(190);
        rect(0,0, width, height);
        fill(0);
        stroke(0);
        textAlign(LEFT);
        textSize(32);
        text("Use the controls on the left side,", width / 2-180, height / 2 - 120);
        text("or the corresponding keyboard keys.", width / 2-180, height / 2 - 70);
        textAlign(CENTER);
        text("Click here to start!", width / 2+50, height / 2 );
    }
    
    if(starting == true){
        textAlign(LEFT);
        //cursor(HAND);
        julia.update();
        julia.draw();
        
        fill(0);
        stroke(0);
        strokeWeight(0.2);
        textSize(22);
        text("Control keys", 30, 70);
        text("Iterations", 35, 500);
        textSize(18);
        text("Press 'Enter' \nto fix c", 35, 420);
        
        
    }
    
    up = 1;
    down = 2;
    left = 3;
    right = 4;
    zoomin = 5;
    zoomout = 6;
    reset = 7;
    infor = 8;
    
}

function keyReleased() {
    if (keyCode === 73)//I key
        julia.printDebug = !julia.printDebug;
    
    if(keyCode === 13){//Enter key
        changeC = !changeC;
    }
}

//function mouseWheel() {
//    if(starting == true){
//        julia.zoomAt(mouseX, mouseY, 0.85, event.delta < 0);
//    }
//}

// KeyCodes available at: http://keycode.info/
const KC_UP = 38;        // Move up W
const KC_DOWN = 40;        // Move down S
const KC_LEFT = 37;        // Move left A
const KC_RIGHT = 39;    // Move right D
const KC_UNZOOM = 189;    // Zoom back -
const KC_ZOOM = 187;    // Zoom in +
const KC_RESET = 82;    // Reset zoom level and position R

function Julia() {
    this.origSize = new p5.Vector(3, 3);
    this.size = new p5.Vector(this.origSize.x, this.origSize.y);
    this.origPos = new p5.Vector(0, 0);//Origin position
    this.pos = new p5.Vector(this.origPos.x, this.origPos.y);
    this.maxIter = 180;//slider.value();//150;
    this.origZoom = 1;
    this.zoom = this.origZoom;
    this.printDebug = false;
}
Julia.prototype.update = function () {
    var moveSpeed = 0.1 * this.zoom;
    if (up === -1 || keyIsDown(KC_UP))
        this.pos.y -= moveSpeed;
    if (down === -2 || keyIsDown(KC_DOWN))
        this.pos.y += moveSpeed;
    if (left === -3 || keyIsDown(KC_LEFT))
        this.pos.x -= moveSpeed;
    if (right === -4 || keyIsDown(KC_RIGHT))
        this.pos.x += moveSpeed;
    if ( keyIsDown(KC_UNZOOM))
        this.zoomAt(mouseX, mouseY, 0.95, false);
    if ( keyIsDown(KC_ZOOM))
        this.zoomAt(mouseX, mouseY, 0.95, true);
    if (infor === -8)
        this.printDebug = !this.printDebug;
    if (reset === -7 ||keyIsDown(KC_RESET))
    {
        this.size.x = this.origSize.x;
        this.size.y = this.origSize.y;
        this.pos.x = this.origPos.x;
        this.pos.y = this.origPos.y;
        this.zoom = this.origZoom;
        changeC = true;
    }
    this.maxIter = sliderIter.value();
};
Julia.prototype.zoomAt = function(x, y, ammount, isZoomIn) {
    ammount = isZoomIn ? ammount : 1 / ammount;
    x = map(x, ctlsBack, width, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2);
    y = map(y, height, 0, this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2);
    this.pos.x = x + (this.pos.x - x) * ammount;
    this.pos.y = y + (this.pos.y - y) * ammount;
    this.zoom *= ammount;
    this.size.x = this.origSize.x * this.zoom;
    this.size.y = this.origSize.y * this.zoom;
};
Julia.prototype.draw = function() {
    loadPixels();
    
    let mx = constrain(mouseX, ctlsBack, width);
    let my = constrain(mouseY, 0, height);
    //I need this if/else so the fractal stops updating when mouse is outside the canvas
    if(changeC === true && ctlsBack < mouseX && mouseX < width && 0 < mouseY && mouseY < height){
        cX = this.pos.x + map(mx, ctlsBack, width, -this.size.x / 2, this.size.x / 2);//this is for Julia
        cY = this.pos.y + map(my, height, 0, -this.size.y / 2, this.size.y / 2);//this is for Julia
        pmx = mx;
        pmy = my;
    }else{
        cX = this.pos.x + map(pmx, 0, width, -this.size.x / 2, this.size.x / 2);//this is for Julia
        cY = this.pos.y + map(pmy, height, 0, -this.size.y / 2, this.size.y / 2);//this is for Julia
    }
    
    if (!changeC) {
        fill(255);
        noStroke();
        ellipse(mx, my, 8, 8);
    }else{
        c = new p5.Vector(cX, cY);
    }
    
    for (let x = ctlsBack; x < width; x++) {
        for (let y = 0; y < height; y++) {
            var sqZ = new p5.Vector(0, 0);
            var z = new p5.Vector(
                              this.pos.x + map(x, ctlsBack, width, -this.size.x / 2, this.size.x / 2),
                              this.pos.y + map(y, height, 0, -this.size.y / 2, this.size.y / 2)
                              );
            
            let iter = 0;
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
    if (this.printDebug) {
        stroke(220);
        strokeWeight(2);
        line((width+ctlsBack)/2, 0, (width+ctlsBack)/2, height);
        line(ctlsBack, height/2, (width+ctlsBack), height/2);
        ellipse((width+ctlsBack)/2, height/2, 8, 8);
        
        fill(255);
        stroke(0);
        strokeWeight(3);
        textSize(24);
        text("x: " + str( round( this.pos.x * 100 )/100 )
        + "\ny: " + str( round( this.pos.y * 100 )/100 )
        + "\nzoom: " + str( round(  (1 / this.zoom) * 100 )/100 )
        + "\niterations: " + str( round(  (this.maxIter) * 100 )/100 )
        , ctlsBack + 10, 18
        );
    }
    //draw constant label
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(24);
    if ( mouseX > ctlsBack ){
    text("c is (" + str(round(c.x * 1000)/1000.0) + "," + str(round(c.y * 1000)/1000.0) + ")", ctlsBack + 10, height-15);
    }
    
    if(changeC === true && ctlsBack < mouseX && mouseX < width && 0 < mouseY && mouseY < height){
            fill(255);
            strokeWeight(1);
            ellipse(mx, my, 8, 8);
            prevmx = mx;
            prevmy = my;
        }else{
            fill(255);
            strokeWeight(3);
            ellipse(prevmx, prevmy, 8, 8);
        }
};

function mouseClicked() {
        starting = true;
        /*if (changeC) {
            changeC = false;
        } else {
            changeC = true;
        }*/
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
    setPixelRGB(x, y, round(r * 255), round(g * 255), round(b * 255));
}

function controlsUI(){
    buttonUP = createButton('&uarr;');
    buttonUP.position(70, 90);
    buttonUP.addClass('button');
    buttonUP.mousePressed(userUP);
    
    buttonDOWN = createButton('&darr;');
    buttonDOWN.position(buttonUP.x, buttonUP.y+45);
    buttonDOWN.addClass('button');
    buttonDOWN.mousePressed(userDOWN);
    
    buttonLEFT = createButton('&larr;');
    buttonLEFT.position(buttonUP.x-50, (buttonUP.y+45));
    buttonLEFT.addClass('button');
    buttonLEFT.mousePressed(userLEFT);
    
    buttonRIGHT = createButton('&rarr;');
    buttonRIGHT.position(buttonUP.x+45, (buttonUP.y+45));
    buttonRIGHT.addClass('button');
    buttonRIGHT.mousePressed(userRIGHT);
    
    buttonZOOMIN = createButton('&plus;');
    buttonZOOMIN.position(buttonUP.x, buttonUP.y+100);
    buttonZOOMIN.addClass('button');
    buttonZOOMIN.mousePressed(userZOOMIN);
    
    buttonZOOMOUT = createButton('&minus;');
    buttonZOOMOUT.position(buttonUP.x, buttonUP.y+140);
    buttonZOOMOUT.addClass('button');
    buttonZOOMOUT.mousePressed(userZOOMOUT);
    
    buttonRESET = createButton('R');
    buttonRESET.position(buttonUP.x, buttonUP.y+200);
    buttonRESET.addClass('button');
    buttonRESET.mousePressed(userRESET);
    
    //buttonORBIT = createButton('O');
    //buttonORBIT.position(buttonUP.x, buttonUP.y+250);
    //buttonORBIT.addClass('button');
    //buttonORBIT.mousePressed(userORBIT);
                                           
    buttonINFO = createButton('I');
    buttonINFO.position(buttonUP.x +3, buttonUP.y+250);
    buttonINFO.addClass('button');
    buttonINFO.mousePressed(userINFO);

    sliderIter = createSlider(0, 400, 100, 1);
    sliderIter.style('width', '140px')
    sliderIter.position(buttonUP.x-50, buttonUP.y+420)
}

function userUP() {
    up = -1;
}

function userDOWN() {
    down = -2;
}

function userLEFT() {
    left = -3;
}

function userRIGHT() {
    right = -4;
}

function userZOOMIN() {
    //zoomin = -5;
    julia.zoomAt(475, 297,1.55, false);
}

function userZOOMOUT() {
    //zoomout = -6;
    julia.zoomAt(475, 297, 1.55, true);
}

function userRESET() {
    reset = -7;
    
}
                                           
function userINFO() {
    infor = -8;
}
                                           
function userORBIT() {
    infor = -9;
}


/*function mousePressed() {
    up = true;
}

function mouseReleased() {
    up = false;
}*/
