/* 
Written in p5.js (https://p5js.org/)
Under Creative Commons License
https://creativecommons.org/licenses/by-sa/4.0/
Written by Juan Carlos Ponce Campuzano, 16-Oct-2020
https://jcponce/github/io

Notes: To be refactored. :)
*/

let cv1, cv2;
function setup(){
    
    createCanvas(800, 500);

    cv1 = createGraphics(500, 500);
    cv2 = createGraphics(300, 500);
}

function draw(){
    cv1.background(10);
    image(cv1, 0, 0, 500, 500);
    cv2.background(200);
    image(cv2, 500, 0, 300, 500);
}

function windowResize(){
    
    resizeCanvas(windowWidth, windowHeight);
}