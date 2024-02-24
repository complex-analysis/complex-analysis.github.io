/* 
This is a Domain coloring class to plot complex functions
using different color schemes.
It requires the following libraries:
 1. p5.js https://p5js.org/, 
 2. HSL uv https://github.com/hsluv/hsluv
 3. complex.js
Written by Juan Carlos Ponce Campuzano 2020
https://jcponce.github.io/
Under Creative Commons License
https://creativecommons.org/licenses/by-sa/4.0/
Last update 21-Aug-2020
*/

class domainColoring {

  constructor(func, size, w, h, frame = true, t = 0, u = 0, n = 1) {

    // I need to adjust dimensions in case the canvas is not a square
    this.frame = frame;
    if (this.frame) {
      this.x = 40;
      this.y = 40;
      this.w = w - this.x;
      this.h = h - this.y;
    } else {
      this.x = 0;
      this.y = 0;
      this.w = w;
      this.h = h;
    }
    this.sw = size * 2;
    this.sh = (this.sw * h) / w;


    // Ok now let gets ready with main variables
    this.origSize = new p5.Vector(this.sw, this.sh);
    this.size = new p5.Vector(this.origSize.x, this.origSize.y);
    this.origPos = new p5.Vector(0, 0); //Origin position
    this.pos = new p5.Vector(this.origPos.x, this.origPos.y);
    this.origZoom = 1;
    this.zoom = this.origZoom;
    this.printDebug = false;
    this.func = this.verifyFunction(complex_expression(func, t, u, n));

    // I need this to drag and move around the plot
    let nx = map(this.pos.x, -this.size.x / 2, this.size.x / 2, this.x, this.w);
    let ny = map(this.pos.y, -this.size.y / 2, this.size.y / 2, this.y, this.h);
    this.bX = nx;
    this.bY = ny;

    //Variables to define the level curves for HSV, HSL, RGB schemes
    this.sharp = 0.39; // delay
    this.b = 0.655; // brightness 0 -> dark, 1 -> bright
    this.nMod = 2; // num of level curves mod
    this.nPhase = 20; // num. of level curves phase
    this.base = 2; // For the base of a logarithm

  }

  // I need to check the user's input so it runs properly
  verifyFunction(z) {
    let k; // This is just to assign the value of z
    this.check = true;
    try {
      k = z.fn;
    } catch (e) {
      if (k === null || k === undefined) {
        this.check = false;
        z = complex_expression('0');
        //console.log(this.check); // debugging!
        return z;
      }

    }
    return z;
  }

  //Toggle options to plot level curves and other features
  selectOption() {

    /* For HSV, HSV discrete & RGB */
    if (this.opt === 'Phase') {
      this.funColorHSV = (x, y) => this.cPhaseHSV(x, y);
      this.funColorHSVDiscrete = (x, y) => this.cPhaseHSVDiscrete(x, y);
      this.funColorRGB = (x, y) => this.cPhaseRGB(x, y);
    } else if (this.opt === 'Modulus') {
      this.funColorHSV = (x, y) => this.cModHSV(x, y);
      this.funColorHSVDiscrete = (x, y) => this.cModHSVDiscrete(x, y);
      this.funColorRGB = (x, y) => this.cModRGB(x, y);
    } else if (this.opt === 'Phase/Modulus') {
      this.funColorHSV = (x, y) => this.cPhaModHSV(x, y);
      this.funColorHSVDiscrete = (x, y) => this.cPhaModHSVDiscrete(x, y);
      this.funColorRGB = (x, y) => this.cPhaModRGB(x, y);
    } else {
      this.funColorHSV = (x, y) => 1;
      this.funColorHSVDiscrete = (x, y) => 1;
      this.funColorRGB = (x, y) => 255;
    }

    /* For HSV real and Imaginary components */
    if (this.opt === 'Real') {
      this.funColorSReIm = (x, y) => 1;
      this.funColorBReIm = (x, y) => sqrt(sqrt(abs(sin(3 * PI * x))));
    } else if (this.opt === 'Imaginary') {
      this.funColorSReIm = (x, y) => 1;
      this.funColorBReIm = (x, y) => sqrt(sqrt(abs(sin(3 * PI * y))));
    } else if (this.opt === 'Re/Im') {
      this.funColorSReIm = (x, y) => 1;
      this.funColorBReIm = (x, y) => sqrt(sqrt(abs(sin(3 * PI * y) * sin(3 * PI * x))));
    } else if (this.opt === 'Modulus') {
      this.funColorSReIm = (x, y) => this.satReIm(x, y);
      this.funColorBReIm = (x, y) => 1;
    } else if (this.opt === 'All') {
      this.funColorSReIm = (x, y) => this.satReIm(x, y);
      this.funColorBReIm = (x, y) => this.SatValReIm(x, y);
    } else if (this.opt === 'None') {
      this.funColorSReIm = (x, y) => 1;
      this.funColorBReIm = (x, y) => 1;
    }


    /* For HSL and HSLuv (this one is laggy)*/
    if (this.opt === 'Phase') {
      this.funColorHSL = (x, y) => this.cPhaseHSL(x, y);
      this.funColorHSLuv = (x, y) => this.cPhaseHSLuv(x, y);
    } else if (this.opt === 'Modulus') {
      this.funColorHSL = (x, y) => this.cModHSL(x, y);
      this.funColorHSLuv = (x, y) => this.cModHSLuv(x, y);
    } else if (this.opt === 'Phase/Modulus') {
      this.funColorHSL = (x, y) => this.cPhaModHSL(x, y);
      this.funColorHSLuv = (x, y) => this.cPhaModHSLuv(x, y);
    } else if (this.opt === 'Standard') {
      this.funColorHSL = (x, y) => this.funStdHSL(x, y);
      this.funColorHSLuv = (x, y) => this.funStdHSLuv(x, y);
    } else {
      this.funColorHSL = (x, y) => 0.5;
      this.funColorHSLuv = (x, y) => 0.5;
    }

    /* For Black and White */
    if (this.opt === 'Phase') {
      this.funColorBW = (x, y) => this.val(x, y);
    } else if (this.opt === 'Modulus') {
      this.funColorBW = (x, y) => this.sat(x, y);
    } else if (this.opt === 'Phase/Modulus') {
      this.funColorBW = (x, y) => this.val(x, y) * this.sat(x, y);
    } else if (this.opt === 'Real') {
      this.funColorBW = (x, y) => this.funRe(x, y);
    } else if (this.opt === 'Imaginary') {
      this.funColorBW = (x, y) => this.funIm(x, y);
    } else if (this.opt === 'Re/Im') {
      this.funColorBW = (x, y) => this.funRe(x, y) * this.funIm(x, y);
    }

  }


  /* 
  
  HSV color scheme begins 
  First we need to define the level curves of phase and modulus
  
  */

  //This one needs to be used for all HSV schemes
  funPhase(x, y) {
    return (Math.PI - Math.atan2(y, -x)) / (2 * Math.PI);
  }
  //

  funPhaseHSV(x, y) {
    return (Math.PI - Math.atan2(y, -x)) / (2 * Math.PI);
  }

  cPhaseHSV(x, y) {
    let c = this.nPhase * this.funPhaseHSV(x, y);
    return this.sharp * (c - floor(c)) + this.b;
  }

  cModHSV(x, y) {
    let c = this.nMod * log(sqrt(x * x + y * y));
    return this.sharp * (c - floor(c)) + this.b;
  }

  cPhaModHSV(x, y) {
    return this.cPhaseHSV(x, y) * this.cModHSV(x, y);
  }

  funColorHSV(x, y) {
    return this.cModHSV(x, y);
  }

  plotHSV(opt = 'Modulus') {

    this.backgroundPlot();

    this.opt = opt;
    this.selectOption();

    loadPixels();

    for (let x = this.x; x < this.w; x++) {
      for (let y = this.x; y < this.h; y++) {

        let z, c, w, h, v;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };
        w = this.func.fn(c); //Evaluate function

        h = this.funPhaseHSV(w.r, w.i);

        v = this.funColorHSV(w.r, w.i);

        this.setPixelHSV(x, y, h, 1, v);

      }
    }
    updatePixels();

    this.grid();

  }

  /* HSV color scheme ends */



  /* 
  
  HSV color scheme with real and imaginary components begins 
  First we need to define the level curves of phase and modulus
  
  */

  funPhaseReIm(x, y) {
    return (PI - atan2(y, -x)) / (2 * PI);
  }

  satReIm(x, y) {
    let c = log(sqrt(x * x + y * y)) / log(2);
    return (abs(3 * sin(2 * PI * (c - floor(c)))));
  }

  valReIm(x, y) {
    let c = abs(sin(3 * PI * y) * sin(3 * PI * x))
    return sqrt(sqrt(c));
  }

  SatValReIm(x, y) {
    let c = 1 - this.satReIm(x, y) - this.valReIm(x, y);
    return 0.5 * ((1 - this.satReIm(x, y)) + this.valReIm(x, y) + sqrt(c * c + 0.01));
  }

  funColorSReIm(x, y) {
    return 1;
  }

  funColorBReIm(x, y) {
    return this.valReIm(x, y);
  }

  plotHSVReIm(opt = 'Re/Im') {

    this.backgroundPlot();

    this.opt = opt;
    this.selectOption();

    loadPixels();

    for (let x = this.x; x < this.w; x++) {
      for (let y = this.x; y < this.h; y++) {

        let z, c, w, h, s, v;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };
        w = this.func.fn(c); //Evaluate function

        //noLoop();

        //let h = this.funPhaseHSV(w.r, w.i);

        //let b = this.funColorHSV(w.r, w.i);

        h = this.funPhaseReIm(w.r, w.i);
        s = this.funColorSReIm(w.r, w.i);
        v = this.funColorBReIm(w.r, w.i);

        this.setPixelHSV(x, y, h, s, v);
      }
    }
    updatePixels();

    this.grid();

  }

  /* HSV color scheme with real and imaginary components begins  ends */



  /* 
  
  HSV discrete color scheme begins 
  First we need to define the level curves of phase and modulus
  
  */

  funPhaseHSVDiscrete(x, y) {
    return atan2(y, x);
  }

  cPhaseHSVDiscrete(x, y) {
    let c = this.nPhase * this.funPhaseHSV(x, y);
    return this.sharp * (c - floor(c)) + this.b;
  }

  cModHSVDiscrete(x, y) {
    let c = this.nMod * log(sqrt(x * x + y * y));
    return this.sharp * (c - floor(c)) + this.b;
  }

  cPhaModHSVDiscrete(x, y) {
    return this.cPhaseHSVDiscrete(x, y) * this.cModHSVDiscrete(x, y);
  }

  funColorHSVDiscrete(x, y) {
    return this.cModHSVDiscrete(x, y);
  }

  plotHSVDisc(opt = 'Modulus') {

    this.backgroundPlot();

    this.opt = opt;
    this.selectOption();

    loadPixels();

    for (let x = this.x; x < this.w; x++) {
      for (let y = this.x; y < this.h; y++) {
        let z, c, w, h, v;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };
        w = this.func.fn(c); //Evaluate function


        h = this.funPhaseHSVDiscrete(w.r, w.i);

        v = this.funColorHSVDiscrete(w.r, w.i);

        if ((0 <= h && h < PI / 6) || (-PI / 6 <= h && h < 0)) {

          this.setPixelHSV(x, y, 0, 1, v); //red

        } else if (-5 * PI / 6 < h && h <= -PI / 2) {

          this.setPixelHSV(x, y, 0.66, 1, v); //blue

        } else if (PI / 2 + PI / 20 <= h && h < 5 * PI / 6) {

          this.setPixelHSV(x, y, 0.333, 1, v); //green

        } else if (PI / 2 - PI / 20 < h && h < PI / 2 + PI / 20) {

          this.setPixelHSV(x, y, 0.166, 1, v); //yellow

        } else if (PI / 6 < h && h <= PI / 2 - PI / 20) {

          this.setPixelHSV(x, y, 0.083, 1, v); //orange

        } else if (-PI / 2 < h && h <= -PI / 6) {

          this.setPixelHSV(x, y, 0.75, 1, v); //purple

        } else if ((-PI <= h && h <= -5 * PI / 6) || (5 * PI / 6 < h && h <= PI)) {

          this.setPixelHSV(x, y, 0.499, 1, v); //blue sky

        } else this.setPixelHSV(x, y, 1, 0, 0); //black

      }
    }
    updatePixels();

    this.grid();

  }

  /* HSV discrete color scheme ends */



  /* 
  
  HSV gradient descent color scheme begins 
  First we need to define the level curves of phase and modulus
  
  */

  funPhaseHSVGrad(x, y) {
    return (Math.PI - Math.atan2(y, -x)) / (2 * Math.PI);
  }

  satHSVGrad(x, y) {
    return (1 + abs(sin(2 * PI * this.funColorHSVGrad(x, y)))) / 2;
  }

  valHSVGrad(x, y) {
    return (1 + abs(cos(2 * PI * this.funColorHSVGrad(x, y)))) / 2;
  }

  funColorHSVGrad(x, y) {
    return log(1 + sqrt(x * x + y * y));
  }

  plotHSVG() {

    this.backgroundPlot();

    //this.opt = opt; // Don't need this here?
    //this.selectOption(); // Don't need this here?

    loadPixels();

    for (let x = this.x; x < this.w; x++) {
      for (let y = this.x; y < this.h; y++) {
        let z, c, w, h, s, v;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };
        w = this.func.fn(c); //Evaluate function

        h = this.funPhaseHSVGrad(w.r, w.i);
        s = pow(this.satHSVGrad(w.r, w.i), 1.3)
        v = pow(this.valHSVGrad(w.r, w.i), 1.3);

        this.setPixelHSV(x, y, h, s, v);
      }
    }
    updatePixels();

    this.grid();

  }

  /* HSV gradient descent color scheme ends */



  /* 
  
  RGB color scheme begins 
  First we need to define the level curves of phase and modulus
  
  */

  funPhaseRGB(x, y) {
    return (Math.PI - Math.atan2(y, -x)) / (2 * Math.PI) * 255 - 20;
  }

  cPhaseRGB(x, y) {
    let c = this.nPhase * (Math.PI - Math.atan2(y, -x)) / (2 * Math.PI);
    return 255 * (this.sharp * (c - floor(c)) + this.b);
  }

  cModRGB(x, y) {
    let c = this.nMod * log(sqrt(x * x + y * y));
    return 255 * (this.sharp * (c - floor(c)) + this.b);
  }

  cPhaModRGB(x, y) {
    return this.cPhaseRGB(x, y) * this.cModRGB(x, y) / 255;
  }

  funColorRGB(x, y) {
    return this.cModRGB(x, y);
  }

  plotRGB(opt = 'Modulus') {

    this.backgroundPlot();

    this.opt = opt;
    this.selectOption();

    loadPixels();

    for (let x = this.x; x < this.w; x++) {
      for (let y = this.y; y < this.h; y++) {

        let z, c, w, r, g, b;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };
        w = this.func.fn(c); //Evaluate function

        r = this.funPhaseRGB(w.r, w.i);

        g = this.funColorRGB(w.r, w.i) - 50;

        b = 180;

        this.setPixelRGB(x, y, r, g, b);
      }
    }
    updatePixels();

    this.grid();

  }

  /* RGB color scheme ends */



  /* 
  
  HSL color scheme begins 
  First we need to define the level curves of phase and modulus
  
  */

  funPhaseHSL(x, y) {
    return (Math.PI - Math.atan2(y, -x)) / (2 * Math.PI);
  }

  funStdHSL(x, y) {
    return 2 / (1 + exp(-sqrt(x * x + y * y))) - 1;
  }

  cPhaseHSL(x, y) {
    let c = this.nPhase * this.funPhaseHSL(x, y);
    return this.sharp * (c - floor(c)) + this.b;
  }

  cModHSL(x, y) {
    let c = this.nMod * log(sqrt(x * x + y * y));
    return this.sharp * (c - floor(c)) + this.b;
  }

  cPhaModHSL(x, y) {
    return this.cPhaseHSL(x, y) * this.cModHSL(x, y);
  }

  funColorHSL(x, y) {
    return this.cModHSL(x, y);
  }


  plotHSL(opt = 'Modulus') {

    this.backgroundPlot();

    this.opt = opt;
    this.selectOption();

    loadPixels();

    for (let x = this.x; x < this.w; x++) {
      for (let y = this.y; y < this.h; y++) {

        let z, c, w, h, s, l;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };
        w = this.func.fn(c); //Evaluate function

        h = this.funPhaseHSL(w.r, w.i);

        s = 1;

        l = this.funColorHSL(w.r, w.i);

        this.setPixelHSL(x, y, h, s, l);
      }
    }
    updatePixels();

    this.grid();

  }

  /* HSL color scheme ends */



  /* 
  
  HSLuv color scheme begins. This one is laggy
  First we need to define the level curves of phase and modulus
  Note: This is might be quite slow. :(
  
  */

  funPhaseHSLuv(x, y) {
    return (Math.PI - Math.atan2(y, -x)) / (2 * Math.PI);
  }

  funStdHSLuv(x, y) {
    return 2 / (1 + exp(-sqrt(x * x + y * y))) - 1;
  }

  cPhaseHSLuv(x, y) {
    let c = this.nPhase * this.funPhaseHSLuv(x, y);
    return this.sharp * (c - floor(c)) + this.b;
  }

  cModHSLuv(x, y) {
    let c = this.nMod * log(sqrt(x * x + y * y));
    return this.sharp * (c - floor(c)) + this.b;
  }

  cPhaModHSLuv(x, y) {
    return this.cPhaseHSLuv(x, y) * this.cModHSLuv(x, y);
  }

  funColorHSLuv(x, y) {
    return this.cModHSLuv(x, y);
  }


  plotHSLuv(opt = 'Modulus', minHue = 0, maxHue = 1) {

    this.backgroundPlot();

    this.opt = opt;
    this.selectOption();

    loadPixels();

    for (let x = this.x; x < this.w; x++) {
      for (let y = this.y; y < this.h; y++) {

        let z, c, w, h, s, l;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };
        w = this.func.fn(c); //Evaluate function

        //let h = this.funPhaseHSLuv(w.r, w.i);

        h = map(this.funPhaseHSLuv(w.r, w.i), 0, 1, minHue, maxHue);

        s = 1;

        l = this.funColorHSLuv(w.r, w.i);

        this.setPixelHSLuv(x, y, h, s, l);
      }
    }
    updatePixels();

    this.grid();

  }

  /* HSLuv color scheme ends */



  /* 
  
  Black and white color scheme begins 
  Here we need to define the level curves of phase and modulus
  
  */

  funRe(x, y) {
    let realComp = x;
    let bwRe;
    if (((round(10 / 5) * realComp - floor(round(10 / 5) * realComp))) < 0.5) {
      bwRe = 1;
    } else {
      bwRe = -1;
    }
    return bwRe;
  }

  funIm(x, y) {
    let imComp = y;
    let bwIm;
    if (((round(10 / 5) * imComp - floor(round(10 / 5) * imComp))) < 0.5) {
      bwIm = 1;
    } else {
      bwIm = -1;
    }
    return bwIm;
  }

  sat(x, y) {
    let satAux = log(sqrt(x * x + y * y)) / log(2);
    let bw;
    if (((round(10 / 7) * satAux - floor(round(10 / 7) * satAux))) < 0.5) {
      bw = 1;
    } else {
      bw = -1;
    }
    return bw;
  }

  val(x, y) {
    let valAux = round(10) * this.funPhase(x, y);
    let bwval;
    if (((valAux - floor(valAux))) < 0.5) {
      bwval = 1;
    } else {
      bwval = -1;
    }
    return bwval;
  }

  funColorBW(x, y) {
    this.sat(x, y);
  }


  plotBW(opt = 'Modulus') {

    this.backgroundPlot();

    this.opt = opt;
    this.selectOption();

    loadPixels();

    let xr, yr;
    for (let x = this.x; x < this.w; x++) {
      for (let y = this.y; y < this.h; y++) {

        let z, c, w, h;
        z = new p5.Vector(
          this.pos.x + map(x, this.x, this.w, -this.size.x / 2, this.size.x / 2),
          this.pos.y + map(y, this.h, this.y, -this.size.y / 2, this.size.y / 2)
        );
        c = {
          r: z.x,
          i: z.y
        };

        w = this.func.fn(c); //Evaluate function

        let xv = w.r;
        let yv = w.i;

        if (xv < 0.5) {
          xr = xv;
          xr = 1;
        } else {
          xr = -1;
        }
        if (yv < 0.5) {
          yr = yv;
          yr = 1;
        } else {
          yr = -1;
        }

        h = this.funColorBW(xv, yv);

        this.setPixelHSL(x, y, 1, 0, h);
      }
    }
    updatePixels();

    this.grid();

  }

  /* Black and White color scheme ends */



  /* 
  
  Auxiliar functions begins 
  
  */

  /* Plot window with number labels and axis */

  grid() {

    // Real axis label
    push();
    fill(0);
    stroke(0)
    strokeWeight(0.5);
    textSize(16);
    textAlign(LEFT);
    text('Re', this.w + 10, this.h);
    pop();


    // Imaginary axis label
    push();
    fill(0);
    stroke(0)
    strokeWeight(0.5);
    textSize(16);
    textAlign(RIGHT);
    text('Im', this.x, this.y - 19);
    pop();

    // Zoom and Mouse position labels
    if (this.w > 350 && this.h > 350) {
      push();

      // Zoom label
      fill(0);
      stroke(0);
      noStroke();
      textSize(18);
      textAlign(LEFT);
      let zv = round((1 / this.zoom) * 1000) / 1000,
        zpx = this.x + 10,
        zpy = this.y - 10,
        zMax = 1000000,
        zMin = 0.00001;
      /*//Maybe I need this part :)
      if (zMin <= zv && zv <= zMax)
        text('Zoom: ' + str(zv), zpx, zpy);
      if (zv < zMin)
        text('Zoom: → 0', zpx, zpy);
      if (zv > zMax) text('Zoom: → ∞', zpx, zpy);
      */

      // Mouse label
      let cX, cY;
      cX = this.pos.x + map(mouseX, this.x, this.w, -this.size.x / 2, this.size.x / 2); //this is for reference
      cY = this.pos.y + map(mouseY, this.h, this.y, -this.size.y / 2, this.size.y / 2); //this is for reference

      if (this.dragging === true) {
        text('Mouse z: (-,-)', zpx, zpy);
      } else {
        if (this.x < mouseX && mouseX < this.w && this.y < mouseY && mouseY < this.h) {
          let mz = {
            r: cX,
            i: cY
          };
          let mw = this.func.fn(mz);
          text('Mouse z: (' + str(round(cX * 100) / 100) + ',' + str(round(cY * 100) / 100) + ')', zpx, zpy);
          let c1 = round(mw.r * 100) / 100;
          let c2 = round(mw.i * 100) / 100;
          let mod = Math.pow(c1 * c1 + c2 * c2, 1/2);
          if ( mod < 100000 ) {
            text('f(z): (' + str(round(mw.r * 100) / 100) + ',' + str(round(mw.i * 100) / 100) + ')', this.w / 2 + 50, zpy);
          } else{
            text('f(z): → ∞', this.w / 2 + 50, zpy);
          }
          cursor('crosshair');
          //noFill();
          //stroke(0);
          //strokeWeight(1);
          //ellipse(mouseX, mouseY, 15);
        }
      }
      pop();
    }


    // Points of reference on the grid and number labels
    push();
    let n = 4;
    let dec = 100;
    let lim1 = 0.006;
    let lim2 = 0.003;
    let lim3 = 0.001;
    let lim4 = 0.0001;
    let txtSize, txtWeight;

    if (lim2 <= 1 / this.zoom && 1 / this.zoom < lim1) {
      txtWeight = 0.5;
      txtSize = 12;
    } else if (lim3 <= 1 / this.zoom && 1 / this.zoom < lim2) {
      txtWeight = 0.4;
      txtSize = 10;
    } else if (lim4 <= 1 / this.zoom && 1 / this.zoom < lim3) {
      txtWeight = 0.3;
      txtSize = 9;
    } else if (1 / this.zoom < lim4) {
      txtWeight = 0.1;
      txtSize = 7;
    } else {
      txtWeight = 0.5;
      txtSize = 13;
    }

    textSize(txtSize);
    for (let i = this.x; i < this.w + this.x; i = i + (this.w - 1 * this.x) / n) {
      let vx = map(i, this.x, this.w, -this.size.x / 2, this.size.x / 2);
      fill(0);
      stroke(0)
      strokeWeight(txtWeight);
      textAlign(CENTER);
      text('' + str(round((this.pos.x + vx) * dec) / dec), i, this.h + 20);
      fill(0);
      noStroke();
      ellipse(i, this.h, 2.5);

    }

    for (let j = this.y; j <= this.h + this.y; j = j + (this.h - 1 * this.y) / n) {
      let vy = map(j, this.h, this.y, -this.size.y / 2, this.size.y / 2);
      fill(0);
      stroke(0)
      strokeWeight(txtWeight);
      textAlign(RIGHT);
      text('' + str(round((this.pos.y + vy) * dec) / dec), this.x - 2, j - 3);
      fill(0);
      noStroke();
      ellipse(this.x, j, 2.5);

    }
    pop();

    if (!this.check) {
      push();
      fill(255);
      rect(0, 0, this.w, this.h);
      fill(0);
      textSize(this.w / 100 * 6);
      textAlign(CENTER);
      text('Something went wrong 😟! \n Please, check your input!', this.w / 2, this.h / 2);
      pop();
    }

    // Frame for reference
    if (this.printDebug) {
      stroke(20);
      strokeWeight(1);
      line((this.w) / 2 + this.x / 2, this.x, (this.w) / 2 + this.x / 2, this.h);
      line(this.y, this.h / 2 + this.y / 2, (this.w), this.h / 2 + this.y / 2);
      ellipse((this.w + this.x) / 2, (this.h + this.y) / 2, 8, 8);
    }

  }

  // White background
  backgroundPlot() {

    push();
    fill(255);
    rect(0, 0, this.w, this.h);
    noFill();
    stroke(100);
    strokeWeight(0.5);
    rect(this.x, this.y, this.w - this.x, this.h - this.y);
    pop();

    cursor(ARROW);
  }

  //ends grid


  /* Zooming function */
  zoomAt(x, y, ammount, isZoomIn) {

    // Update data to zoom in or out
    let zx, zy, dx, dy;
    ammount = isZoomIn ? ammount : 1 / ammount;
    zx = map(x, this.x, this.w, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2);
    zy = map(y, this.h, this.y, this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2);
    this.pos.x = zx + (this.pos.x - zx) * ammount;
    this.pos.y = zy + (this.pos.y - zy) * ammount;
    this.zoom *= ammount;
    this.size.x = this.origSize.x * this.zoom;
    this.size.y = this.origSize.y * this.zoom;

    // Update date while zooming to sincrynize with dragging
    dx = map(this.origPos.x, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2, this.x, this.w);
    dy = map(this.origPos.y, this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2, this.h, this.y);

    this.bX = dx;
    this.bY = dy;

    /* Trying stuff, later to check up :)
    let nx = map(this.bX, this.x, this.w, this.pos.x - this.size.x / 2, this.pos.x + this.size.x / 2);
    let ny = map(this.bY, this.h, this.y, this.pos.y - this.size.y / 2, this.pos.y + this.size.y / 2);
    
    let posx, posy;
    posx = nx + (posx - nx) * ammount;
    posy = ny + (posy - ny) * ammount;
    let ox = map(posx, -this.size.x / 2, this.size.x / 2, this.x, this.w);
    let oy = map(posy, -this.size.y / 2, this.size.y / 2, this.y, this.h);
    
    this.bX = ox;
    this.bY = oy;
    */

    // For debugging
    //console.log(this.bX);

  }

  updateDrag() {
    if (this.dragging) {
      cursor('grabbing')
      this.bX = mouseX + this.offsetX;
      this.bY = mouseY + this.offsetY;
      this.pos.x = map(this.bX, this.w, this.x, -this.size.x / 2, this.size.x / 2);
      this.pos.y = map(this.bY, this.y, this.h, -this.size.y / 2, this.size.y / 2);
      //console.log(cX)
    }
    //Reference of origin to debug :)
    //fill(0)
    //ellipse(this.bX, this.bY, 10)
  }

  /* Dragging plot functions */
  pressedPlot() {
    if (0 < mouseX && mouseX < this.w &&
      0 < mouseY && mouseY < this.h) {
      this.dragging = true;
      this.offsetX = this.bX - mouseX;
      this.offsetY = this.bY - mouseY;
    }
  }

  releasedPlot() {
    // Quit dragging
    this.dragging = false;
    //console.log(this.dragging);
  }

  /* Update values to zoom and drag */
  update() {
    // KeyCodes available at: http://keycode.info/

    const KC_UNZOOM = 188; // Zoom back <
    const KC_ZOOM = 190; // Zoom in >
    const KC_RESET = 27; // Reset zoom level and position ESC

    let moveSpeed = 0.1 * this.zoom;
    if (keyIsDown(KC_UNZOOM))
      this.zoomAt(this.w / 2 + this.x / 2, this.h / 2 + this.y / 2, 0.95, false);
    if (keyIsDown(KC_ZOOM))
      this.zoomAt(this.w / 2 + this.x / 2, this.h / 2 + this.y / 2, 0.95, true);
    if (keyIsDown(KC_RESET)) {
      this.size.x = this.origSize.x;
      this.size.y = this.origSize.y;
      this.pos.x = this.origPos.x;
      this.pos.y = this.origPos.y;
      this.zoom = this.origZoom;
    }

    // Adjust location if user draggs the plot
    this.updateDrag();

  }


  /* 
  
  Setting the color of pixels
  Set pixel HSL and HSV functions are based on these:
  https://gist.github.com/mjackson/5311256
  
  */

  setPixelRGB(x, y, r, g, b) {
    let pixelID = (x + y * this.w) * 4;
    pixels[pixelID + 0] = r;
    pixels[pixelID + 1] = g;
    pixels[pixelID + 2] = b;
    pixels[pixelID + 3] = 255;
  }

  setPixelHSV(x, y, h, s, v) {
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
    this.setPixelRGB(x, y, Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }

  setPixelHSL(x, y, h, s, l) {
    let r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      let hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    this.setPixelRGB(x, y, Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }

  /* 
  This is still slow. :(
  It requires the library 
  https://github.com/hsluv/hsluv/blob/master/javascript/dist/hsluv-0.1.0.min.js
  More info: https://www.hsluv.org/
  */
  setPixelHSLuv(x, y, h, s, l) {
    let pixelID = (x + y * this.w) * 4;
    let rgb = hsluv.hsluvToRgb([h * 360, s * 50, l * 50]);
    pixels[pixelID] = rgb[0] * 255;
    pixels[pixelID + 1] = rgb[1] * 255;
    pixels[pixelID + 2] = rgb[2] * 255;
  }

}