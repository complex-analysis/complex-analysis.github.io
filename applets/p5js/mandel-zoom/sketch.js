/*
 
Zoomin in Mandelbrot set

Author: Juan Carlos Ponce Campuzano
Website: https://jcponce.github.io
Date: 16/Mar/2024

*/

// a shader variable
let theShader;
let shaderBg;

let img;
let time_;
let framerate;

function preload() {
  // load the shader
  theShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  // disables scaling for retina screens which can create inconsistent scaling between displays
  //pixelDensity(1);

  createCanvas(400, 400);
  noStroke();

  // shaders require WEBGL mode to work
  shaderBg = createGraphics(400, 400, WEBGL);
  
}

function draw() {
  // we can draw the background each frame or not.
  // if we do we can use transparency in our shader.
  // if we don't it will leave a trailing after image.
  // background(0);
  // shader() sets the active shader with our shader
  shaderBg.shader(theShader);

  // get the mouse coordinates, map them to values between 0-1 space
  let yMouse = (map(mouseY, 0, height, height, 0) / height) * 2 - 1;
  let xMouse = (mouseX / width) * 2 - 1;

  // Make sure pixels are square
  xMouse = (xMouse * width) / height;
  yMouse = (yMouse ) ;
  

  // pass the interactive information to the shader
  theShader.setUniform("iResolution", [width, height]);
  theShader.setUniform("iTime", millis() / 1000.0);
  theShader.setUniform("iMouse", [viewX, viewY]);




  // rect gives us some geometry on the screen to draw the shader on
  shaderBg.rect(0, 0, width, height);
  image(shaderBg, 0, 0, width, height);
  
  let increment = 20 / ((frameRate() || 60) * 140); // timestep based on framerate, will rotate same speed on all regardless of framerate
  time_ += increment;
  if(time_ > TWO_PI) time_ -= TWO_PI; // prevent time from getting to big and maybe causing errors?

  // flip coordinate information box
  let flipX = 0;
  let flipY = 0;
  if (width - mouseX < 200) {
    flipX = -130;
  }
  if (height - mouseY < 100) {
    flipY = -35;
  }

  // draw coordinate information box if you want

  /*
  
  fill(255);
  rect(mouseX + flipX, mouseY + flipY, 60, 40);
  fill(0);
  text("x: " + int(mouseX), mouseX + 15 + flipX, mouseY + 15 + flipY);
  text("y: " + int(mouseY), mouseX + 15 + flipX, mouseY + 30 + flipY);
  fill(0);
  rect(mouseX + 60 + flipX, mouseY + flipY, 70, 40);
  fill(255);
  text("x: " + nfc(xMouse, 3), mouseX + 15 + 60 + flipX, mouseY + 15 + flipY);
  text("y: " + nfc(yMouse, 3), mouseX + 15 + 60 + flipX, mouseY + 30 + flipY);

*/

  //console.log(imView);
}

function windowResized() {
  resizeCanvas(400, 400);
}

let imView = false;

function mousePressed() {
  if (imView === false) {
    imView = true;
  }
  cursor('grabbing');
}

function mouseReleased() {
  if (imView === true) {
    imView = false;
  }
  cursor('grab');
}

// Change 3D view 
let viewX = 189;
let viewY = 224;
function mouseDragged() {
  viewX = mouseX;
  viewY = map(mouseY, 0, height, height, 0);
  //console.log(viewX,viewY);
}

function mouseReleased() {
  if (imView === true) {
    imView = false;
  }
  cursor('grab');
}