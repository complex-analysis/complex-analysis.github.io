let example1 = [];

let otherCanvas;

let example2 = [];

let auxText = ['Simple', 'Phase', 'Modulus', 'Enhanced'];

let slider;

function preload() {
  
  for (let i = 0; i < 4; i++) {
		example1[i] = loadImage("ex1/plot" + i + ".png"); //if you have images in a folder, be sure to include in the file path
	}
  
  for (let k = 0; k < 4; k++) {
		example2[k] = loadImage("ex2/zplot" + k + ".png"); //if you have images in a folder, be sure to include in the file path
	}
  

}

function setup() {
  createCanvas(800, 350);
  
  slider = createSlider(0, 3, 0, 1);
  slider.position(width/2-80, 360);
  slider.style('width', '150px');
  
  otherCanvas = createGraphics(350, 350);
  
}

function draw() {
  
  background(255);
  
  image(example1[slider.value()], 0, 0);
  
    fill(0);
    stroke(0);
    textSize(18);
    textAlign(CENTER);
  text(auxText[slider.value()], width/2, height/2);
  
  otherCanvas.background(255);
  otherCanvas.image(example2[slider.value()],0,0);
  image(otherCanvas, 450, 0);
	
}
