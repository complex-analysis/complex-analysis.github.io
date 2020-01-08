let positions =new Array(1*2);

// 0,1,2,3,4,5
// 4,5,6,7,8,9
let bx;
let by;
let bs = 40;
let bz = 30;
let bover = false;
let locked = false;
let bdifx = 0.0; 
let bdify = 0.0; 
//PImage[] image1 = new PImage [images.length]; 
let newx, newy;
let whichImage;

let running;

function setup() {
  createCanvas(350,350);
  colorMode(HSB, 1);
  frameRate(60);
	unit = new Complex(1,1);
	unitr = new Complex(1,0);
	dim = new Complex(width, height);
	
	 imageMode(CENTER);
  
  bx = width/2.0;
  by = height/2.0;
 
  for (let j=0; j < 4*2; j+=2) {
    positions[j]= random(width-90);
    positions[j+1]= random(height-90);
  }
  
}

let newpox1; 
let newpoy1;

let start = -1;
function draw() {
  background(255);
  running = millis()/1000;
    if(start > -1 && running <= 350){
	cursor(HAND);
  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  let w = 6;
  let h = (w * height) / width;

  // Start at negative half the width and height
  let xmin = -w / 2;
  let ymin = -h / 2;

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();

  // Maximum number of iterations for each point on the complex plane
  let maxiterations = 100;

  // x goes from xmin to xmax
  let xmax = xmin + w;
  // y goes from ymin to ymax
  let ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  let dx = (xmax - xmin) / (width);
  let dy = (ymax - ymin) / (height);

  // Start y
  let y1 = ymin;

  for (let j = 0; j < height; j++) {
		
  let sat = (x, y) => 1 / 5 * log(5 * sqrt(x * x + y * y)) / log(1.3) - 1 / 5 * floor(log(5 * sqrt(x * x + y * y)) / log(1.3)) + 0.85;
  let val = (x, y) => 1 / 3 * (18 * (PI - atan2(y, -x)) / (2 * PI) - floor(18 * (PI - atan2(y, -x)) / (2 * PI))) + 0.7;
  let funColor = (x, y) => val(x, y) * sat(x, y);
		
    // Start x  
    
    let x1 = xmin;
    for (let i = 0; i < width; i++) {

      
      let x = x1;
      let y = -y1;
      
      let z = new Complex({
		  	re: x, 
				im: y
			});
			let newpox1 = map(positions[0], 0, width, xmin, xmax);
			let newpoy1 = map(positions[1], height, 0, ymin, ymax);
			let cz = new Complex({
		  	re: newpox1, 
				im: newpoy1
			});
			
			let w = z.pow(cz);
		

      x = w.re;//Real;
      y = w.im;//Ima;
			
      // We color each pixel based on something
      // Gosh, we could make fancy colors here if we wanted
      let h = (PI-atan2(y, -x))/(2*PI)
			//The first in "s" makes the white curves opaque
			//let s = (abs( 3*sin( 2* PI * (log(sqrt( x*x + y*y ))/log(2) - floor( log(sqrt(x*x + y*y ))/log(2))  ))));
			//let s2 = map(s, 0, 1, 0, 100);
			//let b = sqrt(sqrt(abs( sin(2 * PI * y) * sin(2 * PI * x) )));
			//let b2 = 0.5 * ((1 - s) + b + sqrt((1 - s - b) * (1 - s - b) + 0.01));
			//let b3 = map(b2, 0, 1, 0, 100);
			let s = sat(x,y);
      set(i, j, color(h, 1, s));

      x1 += dx;
    }
    y1 += dy;
  }
  updatePixels();
	
	for (let j=0; j < 1; j++) {
    if (bover && whichImage==j) {
      stroke(0);
      fill(0.5, 1, 0.6);// white
		}
    else{
       stroke(0);
		fill(1);}
    ellipse( positions[j*2], positions[j*2+1], 15, 15) ;
  }
  
	
	let cX = map(positions[0], 0, width, xmin, xmax);
    let cY = map(positions[1], height, 0, ymin, ymax);
  fill(1);
	stroke(0);
	strokeWeight(3);
  textAlign(LEFT, CENTER);
  textSize(18);
  text("c = (" + str(round(cX*100)/100.0) + "," + str(round(cY*100)/100.0) + ")", 5, height-15);
  textAlign(LEFT, CENTER);
  textSize(19);
	fill(1);
	stroke(0);
	strokeWeight(3);
  text("c", positions[0]+10, positions[1]+5);
    }//ends starts
    else {
        cursor(HAND);
        fill(1,1,0);
        rect(0,0, width, height);
        
        textAlign(CENTER);
        textSize(30);
        fill(1, 0, 1);
        stroke(0);
        strokeWeight(3);
        text("Click to start!", width/2, height/2);
    }
    
    if(running > 349){
        start = -1;
    }
	
}

function mousePressed() {
  checkOver();
  if (bover) { 
    locked = true;
  } 
  else {
    locked = false;
  }
    start += 1;
}
 
function mouseReleased() {
  locked = false;
  bover = false;
}
 
function mouseDragged() {
  if (locked) {
    newx = mouseX; 
    newy = mouseY;
  }
 
  positions [whichImage*2] = newx;
  positions [(whichImage*2)+1] = newy;
}
//
function checkOver() {
  for (let i=0; i < 4; i++) {
 
    // Test if the cursor is over the box  
    if (mouseX > positions[i*2]-bs && mouseX < positions[i*2]+bs && 
      mouseY > positions[i*2+1]-bs && mouseY < positions[i*2+1]+bs) 
    {
      //print("mouseover image: "+i);
      whichImage=i;
      bover = true;  
      break; // leave here !!!!!!!!!!!!!!!!!
    } 
    else
    {
      bover = false;
    }
  } // for
}
