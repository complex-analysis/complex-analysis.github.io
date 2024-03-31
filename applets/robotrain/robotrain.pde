/* Thanks Golan for the reference code! 
 Credit to LearningProcessing for oscillation reference.
 Original version by t.m.s https://www.openprocessing.org/user/31080
 */

float theta = 0; 
float theta2 = 0;
float x;


//===================================================
void setup() {
  size(500, 500);
  x = width/2-100;
}
//===================================================


//===================================================
void draw() {

  // Render the design, based on that percentage. 
  renderMyDesign ();

} 

void renderMyDesign() {
  background(#464646);
  smooth();
  noStroke(); 
  strokeWeight(2);
  //----------------------
  // Here, I assign some handy variables. 
 

  robotLegs();
  robotBody();
  robotHead();
  robotArms(); 

  textSize(40);
  fill(255);
  text("Error 404", x, 100);

  textSize((int)random(10, 22));
  pushMatrix();
  translate(-75, 30);
  rotate(radians(-8));

  //rain effect falling
  for (int i = 0; i < 80; i++) {
    int w = int(random(width+40));
    int h = int(random(height+40));
    fill(random(70, 255));

    int rand = (int)random(2);
    String bit = (rand == 0)? "0" : "1";

    text(bit, w, h);
  }

  popMatrix();

  pushMatrix();
  translate(-60, 480); 

  textSize(18);
  
  //rain effect ground
  for (int i = 0; i < 100; i++) {
    int w = int(random(width+40));
    int h = int(random(height/8));
    fill(random(70, 255));

    int rand = (int)random(2);
    String bit = (rand == 0)? "0" : "1";

    text(bit, w, h);
  }
  popMatrix();
  
} 

void robotHead() {
  float a = map(sin(theta2), -1, 1, -5, 5); //shaking
  theta2 += 0.1; //lower values slow down the movement

  //head 
  fill(#5c5c8a);
  ellipse(257 + a, 250, 124, 84);
  fill(#666699);
  ellipse(257 + a, 243, 115, 70);
  fill(#7575a3);
  ellipse(257 + a, 235, 110, 50);
  //shiny
  pushMatrix();
  translate(270 + a, 220);
  rotate(radians(8));
  fill(#b3b3cc);
  ellipse(0, 0, 30, 10);
  popMatrix();

  //left eyebrow
  stroke(#1c1c1c); 
  strokeWeight(2.6);
  line(223 + a, 245, 223, 238);
  noStroke();
  fill(#1c1c1c);
  pushMatrix();
  translate(213 + a, 236);
  rotate(radians(-10));
  rect(0, 0, 20, 6);
  popMatrix();

  //left eye
  fill(#1c1c1c);
  ellipse(224 + a, 255, 20, 20);
  fill(#ebcb88);
  stroke(50); 
  strokeWeight(2);
  ellipse(224 + a, 255, 13, 13);
  noStroke();

  //right eyebrow
  stroke(#1c1c1c); 
  strokeWeight(2.6);
  line(283 + a, 235, 283, 248);
  noStroke();
  fill(#1c1c1c);
  pushMatrix();
  translate(273 + a, 230);
  rotate(radians(10));
  rect(0, 0, 25, 6);
  popMatrix();

  //right eye
  fill(#1c1c1c);
  ellipse(284 + a, 255, 25, 25);
  fill(#ebcb88);
  stroke(50); 
  strokeWeight(2.6);
  ellipse(284 + a, 255, 16, 16);
  noStroke();

  //left ear
  fill(#1c1c1c);
  rect(186 + a, 230, 15, 44, 7);
  ellipse(185 + a, 252, 10, 30);
  stroke(#1c1c1c); 
  strokeWeight(3);
  line(181 + a, 253, 165 + a, 253);
  line(165 + a, 253, 160 + a, 247);
  line(160 + a, 247, 155 + a, 253);
  line(155 + a, 253, 152 + a, 253);

  //right ear
  rect(310 + a, 230, 15, 44, 7);
  ellipse(326 + a, 252, 10, 30);
  stroke(#1c1c1c); 
  strokeWeight(3);
  line(323 + a, 253, 343 + a, 253);
  line(343 + a, 253, 348 + a, 247);
  line(348 + a, 247, 353 + a, 253);
  line(353 + a, 253, 360 + a, 247);

  //line across middle
  noFill();
  stroke(#2d2d86); 
  strokeWeight(1.5);
  line(257 + a, 209, 257 + a, 291);

  //bolts
  int b=0;
  for (int i = 1; i <= 5; i++) {
    ellipse(250 + a, 218+b, 4, 4);
    b+=12;
  }
  noStroke();
}

void robotBody() {
  //body
  fill(#666699);
  arc(241, 347, 130, 159, radians(-32), radians(213), OPEN);
  fill(#8585ad);
  arc(241, 330, 125, 100, radians(-32), radians(213), OPEN);
  fill(#5c5c8a);
  ellipse(241, 308, 114, 26);

  //neck
  fill(#1c1c1c);
  rect(230, 275, 26, 37, 10);
}

void robotLegs() {
  //left leg
  fill(#1c1c1c);
  pushMatrix();
  translate(212, 420);
  rotate(radians(22));
  ellipse(0, 0, 35, 20);
  popMatrix();

  rect(205, 418, 15, 90);

  //left foot
  arc(230, 500, 40, 20, radians(-180), radians(0), OPEN);

  //right leg
  pushMatrix();
  translate(280, 410);
  rotate(radians(-22));
  ellipse(0, 0, 35, 20);
  popMatrix();

  rect(273, 418, 15, 90);

  //right foot
  arc(300, 500, 40, 20, radians(-180), radians(0), OPEN);
}

void robotArms() {
  float a = map(sin(theta), -1, 1, 210, 270);
  float b = map(sin(theta), -1, 1, 200, 260);
  float c = map(sin(theta), -1, 1, 205, 265);
  float d = map(sin(theta), -1, 1, 230, 240);
  theta += 0.03; //lower values slow down the movement

  //umbrella
  fill(#0076b3);
  rect(c, 160, 8, 200, 3);
  arc(c, 165, 160, 80, radians(-180), radians(0), OPEN);

  //left arm
  fill(#1c1c1c);
  ellipse(200, 333, 18, 23);

  fill(#1c1c1c);
  rect(195, 333, 10, 60, 5);

  stroke(0); 
  strokeWeight(10);
  line(200, 390, a, 330);
  noStroke(); 

  //left hand
  fill(0);
  rect(b, 320, 20, 25, 3);
}
