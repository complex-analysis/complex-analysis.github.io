/* Written in p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 19-Jul-2019
 * https://jcponce.github.io/
 */

let mandelSet;
let juliaSet;

let widthMandel = 400;
let centerX = -0.7;
let sizeGraph = 2.7;

let widthJulia = 400;
let sizeGraphJ = 3;

let WIDTH;
let HEIGHT;
let starting = false;

// --Controls GUI--
let clts = {
iter: 90,
Save: function () { save('mandelbrot-julia.jpg'); },
User: false,
Cx: 0,
Cy: 0,
};

let changeC = false;
let mx = 0;
let my = 0;
let prevmx = 0;
let prevmy = 0;


let easing = 0.9;
let radius = 5;
let edge = 0;
let inner = edge + radius;

// KeyCodes available at: http://keycode.info/
const KC_UP = 38;        // Move up Arrow up
const KC_DOWN = 40;        // Move down Arrow down
const KC_LEFT = 37;        // Move left Arrow left
const KC_RIGHT = 39;    // Move right Arrow right
const KC_UNZOOM = 189;    // Zoom back -
const KC_ZOOM = 187;    // Zoom in +
const KC_RESET = 82;    // Reset zoom level and position R

function setup() {
    
    WIDTH = 2 * widthMandel;
    HEIGHT = widthMandel;
    
    createCanvas(WIDTH, HEIGHT);
    ellipseMode(RADIUS);
    pixelDensity(1);
    cursor(HAND);
    
    mandelbrot = new MandelbrotSet(widthMandel, sizeGraph);
    julia = new JuliaSet(widthJulia, sizeGraphJ);
    
    createGUI();

}

function draw() {
    
    //Initial message
    if (starting == false) {
        fill(190);
        stroke(190);
        rect(0,0, width, height);
        fill(0);
        stroke(0);
        textSize(32);
        textAlign(CENTER);
        text("Click here to start!", width / 2, height / 2 );
        //Use the controls on the left side, or the corresonding keys, to explore.
    }
    
    if(starting == true){
        textAlign(LEFT);
    mandelbrot.update();
    mandelbrot.plot();

    julia.update();
    julia.plot();
    
    pointGuide();
    }
    
}

function mouseClicked(){
    
   starting = true;
    
}

