/* Written in p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 19-Jul-2019
 * Adapted from Kato's code https://www.openprocessing.org/user/114431
 */

// Last update 19-Jul-2019

class JuliaSet{
    
    constructor(w_, s_){
        this.initial = s_;
        this.widthSet = w_;
        this.origSize = new p5.Vector(this.initial, this.initial);
        this.size = new p5.Vector(this.origSize.x, this.origSize.y);
        this.origPos = new p5.Vector(0, 0);//Origin position
        this.pos = new p5.Vector(this.origPos.x, this.origPos.y);
        this.maxIter = 100;
        this.origZoom = 1;
        this.zoom = this.origZoom;
        this.printDebug = false;
    }
    
    update(){
        if (keyIsDown(KC_RESET)){
            this.size.x = this.origSize.x;
            this.size.y = this.origSize.y;
            this.pos.x = this.origPos.x;
            this.pos.y = this.origPos.y;
            this.zoom = this.origZoom;
        }
        
        this.maxIter = clts.iter;
        
    }
    
    zoomAt(x, y, ammount, isZoomIn){
        
        ammount = isZoomIn ? ammount : 1 / ammount;
        x = map(x, this.widthSet, width + this.widthSet, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2);
        y = map(y, height, 0, this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2);
        this.pos.x = x + (this.pos.x - x) * ammount;
        this.pos.y = y + (this.pos.y - y) * ammount;
        this.zoom *= ammount;
        this.size.x = this.origSize.x * this.zoom;
        this.size.y = this.origSize.y * this.zoom;
    }
    
    plot(){
        
        loadPixels();
        
        let col1, col2, cX, cY;
        if(clts.User==true){
            cX = clts.Cx;
            cY = clts.Cy;
            col1 = map(cX, -mandelbrot.size.x / 2 - 0.7, mandelbrot.size.x / 2 - 0.7, 0, 250);
            col2 = map(cY, -mandelbrot.size.x / 2, mandelbrot.size.x / 2, 0, 250);
        } else {
            cX = map(mx, 0, width / 2, -mandelbrot.size.x / 2 + mandelbrot.pos.x, mandelbrot.size.x / 2 + mandelbrot.pos.x);
            cY = map(my, height, 0, -mandelbrot.size.y / 2+ mandelbrot.pos.y, mandelbrot.size.y / 2+ mandelbrot.pos.y);
            col1 = map(mx, 0, width / 2, 0, 150);
            col2 = map(my, 0, height, 0, 150);
        }
        
        let c = new p5.Vector(cX, cY);
        
        for (let x = this.widthSet; x < 2*this.widthSet; x++) {
            for (let y = 0; y < height; y++) {
                var sqZ = new p5.Vector(0, 0);
                var z = new p5.Vector(
                                      this.pos.x + map(x,  this.widthSet, 2* this.widthSet, -this.size.x / 2, this.size.x / 2),
                                      this.pos.y + map(y, height, 0, -this.size.y / 2, this.size.y / 2)
                                      );
                
                let iter = 0;
                while (iter < this.maxIter) {
                    sqZ.x = z.x * z.x - z.y * z.y;
                    sqZ.y = 2 * z.x * z.y;
                    z.x = sqZ.x + c.x;
                    z.y = sqZ.y + c.y;
                    if ((z.x * z.x + z.y * z.y) > 35.0)
                        break;
                    iter++;
                }
                setPixelHSVJulia(x, y, map(iter, 0, this.maxIter, 0.5, 1), 1, iter !== this.maxIter);
                // We color each pixel based on how long it takes to get to infinity
                // If we never got there, let's pick the color black
                //if (iter == this.maxIter) {
                  //  set(x, y, color(30));
                //} else {
                    // Gosh, we could make fancy colors here if we wanted
                    //let h = map(log(iter + sqrt(z.x * z.x + z.y * z.y)), 0, 0.9 * log(this.maxIter), 0, 255);
                    //set(x, y, color(h, col1, col2));
               // }
            }
        }
        updatePixels();
        
    }
    
}

//For colors
function setPixelRGBJulia(x, y, r, g, b) {
    let pixelID = (x + y * width) * 4;
    pixels[pixelID + 0] = r;
    pixels[pixelID + 1] = g;
    pixels[pixelID + 2] = b;
    pixels[pixelID + 3] = 255;
}

function setPixelHSVJulia(x, y, h, s, v) {
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
