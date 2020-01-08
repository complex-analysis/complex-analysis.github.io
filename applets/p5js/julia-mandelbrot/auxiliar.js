/* Written in p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 19-Jul-2019
 */

// Last update 19-Jul-2019

//Auxiliary functions

function createGUI(){
    // create gui (dat.gui)
    let gui = new dat.GUI({
                          width: 310
                          });
    gui.close();
    gui.add(clts, 'iter', 0, 300).step(1).name("Iterations:");
    gui.add(clts, 'Save').name("Save (jpg)");
    
    
    
    gui.add(clts, 'User').name("Set c:");
    gui.add(clts, 'Cx').min(-4).max(4).step(0.01).name("Re(c):");
    gui.add(clts, 'Cy').min(-4).max(4).step(0.01).name("Im(c):");
}

function pointGuide(){
    if (!clts.User) {
        if (!changeC) {
            
            if (abs(mouseX - mx) > 0.1) {
                mx = mx + (mouseX - mx) * easing;
            }
            if (abs(mouseY - my) > 0.1) {
                my = my + (mouseY - my) * easing;
            }
            
            mx = constrain(mx, inner, (width - inner) / 2);
            my = constrain(my, inner, height - inner);
            
            fill(255);
            ellipse(mx, my, radius, radius);
            
        } else{
            fill(1, 200, 233)
            prevmx = mx;
            prevmy = my;
            ellipse(prevmx, prevmy, radius, radius);
        }
    }
}

function keyReleased() {
    if (keyCode === 73)//I key
        mandelbrot.printDebug = !mandelbrot.printDebug;
}

function mouseWheel() {
    mandelbrot.zoomAt(mouseX, mouseY, 0.85, event.delta < 0);
}

function doubleClicked(){
    if(changeC){
        changeC = false;
    } else {
        changeC = true;
    }
    
}

//For colors
function setPixelRGB(x, y, r, g, b) {
    let pixelID = (x + y * width) * 4;
    pixels[pixelID + 0] = r;
    pixels[pixelID + 1] = g;
    pixels[pixelID + 2] = b;
    pixels[pixelID + 3] = 255;
}

function setPixelHSV(x, y, h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    
    setPixelRGB(x, y, round(r * 255), round(g * 255), round(b * 255));
}
