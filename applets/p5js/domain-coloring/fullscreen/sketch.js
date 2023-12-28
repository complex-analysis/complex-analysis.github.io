/* 
Written in p5.js (https://p5js.org/)
Under Creative Commons License
https://creativecommons.org/licenses/by-sa/4.0/
Written by Juan Carlos Ponce Campuzano, 16-Oct-2020
https://jcponce/github/io

Notes: To be refactored. :)
*/

function setup(){
    
    let canvas = createCanvas(500, 500);
      canvas.parent('canvasContainer');
}

function draw(){
    background(100);
}

function windowResize(){
    
    resizeCanvas(windowWidth, windowHeight);
}