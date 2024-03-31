/* 
Written in p5.js (https://p5js.org/)
Under Creative Commons License
https://creativecommons.org/licenses/by-sa/4.0/
Written by Juan Carlos Ponce Campuzano, 16-Oct-2020
https://jcponce/github/io

Notes: To be refactored. :)
*/

let domC;
let inp;
let s = 2; // Change this size

let zI, zO;

function setup() {
    // It looks better when the canvas is a square, min 400x400, 
    // but you can use a rectangle as well :)
    cnv = createCanvas(500, 500);
    cnv.parent('sketch-Holder');
    pixelDensity(1);

    pg = createGraphics(500, 500);


    userInt();

    // Domain coloring setting
    resetPlot();

}

function draw() {
    domC.plotHSV(sel.value());
    domC.update();
    //console.log( inp.value());
}


function trimN(s) {
    if (s.trim) {
        return s.trim();
    }
    return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function userInt() {

    textf = createButton('Ingresa una función f(z):');
    textf.addClass('w3-large');
    textf.addClass('w3-button');
    textf.addClass('w3-hover-white');
    textf.position(width, 50);

    inp = createInput('(z-1)/(z^2+z+1)');
    inp.addClass('w3-large')
    inp.position(width + 10, 90);
    inp.style('width:260px');
    inp.changed(resetParameters);
    inp.attribute('placeholder', 'e.g. 1/(z^2 + iz)^2');

    textc = createButton('Selecciona curvas de nivel:');
    textc.addClass('w3-large');
    textc.addClass('w3-button');
    textc.addClass('w3-hover-white');
    textc.position(width, 170);

    sel = createSelect();
    sel.addClass('w3-large');
    sel.option('Phase');
    sel.option('Modulus');
    sel.option('Phase/Modulus');
    sel.option('None');
    sel.selected('Modulus');
    sel.position(width + 60, 210);


    textm = createButton('Clic y arrastra para cambiar vista');
    //textm.addClass('w3-large');
    textm.addClass('w3-button');
    textm.addClass('w3-hover-white');
    textm.position(width, 390);

    zI = createButton('(+)');
    zI.addClass('w3-large');
    zI.position(width + 60, 350);
    zI.mousePressed(zoomIn);

    zI = createButton('(-)');
    zI.addClass('w3-large');
    zI.position(width + 140, 350);
    zI.mousePressed(zoomOut);

    button = createButton('Reset');
    button.addClass('w3-large');
    button.position(width + 80, 440);
    button.mousePressed(resetValues);
}

function resetPlot() {
    domC = new domainColoring(inp.value(), s);
}

function mouseWheel(e) {
    if (domC.x <= mouseX && mouseX <= domC.w && domC.y <= mouseY && mouseY <= domC.h)
        domC.zoomAt(mouseX, mouseY, 0.9, e.delta < 0);
}

function zoomIn() {
    domC.zoomAt(width / 2, height / 2, 0.85, true);
}

function zoomOut() {
    domC.zoomAt(width / 2, height / 2, 0.85, false);
}

function keyReleased() {
    if (keyCode === 81) //Q key
        domC.printDebug = !domC.printDebug;
}

function mousePressed() {
    domC.pressedPlot();
}

function mouseReleased() {
    domC.releasedPlot();
}

function touchStarted() {
    domC.pressedPlot();
}

function touchEnded() {
    domC.releasedPlot();
}

/*
function keyPressed() {
  if (keyCode === ENTER) {
    domC.func = domC.verifyFunction(complex_expression(input, pt.value, pu.value, pn.value));
  }
}*/

function resetPlotDim() {
    s = 2; //def.size;
    let sw = s * 2;
    let sh = (sw * height) / width;
    domC.origSize = new p5.Vector(sw, sh);
    //domC.origSize = new p5.Vector(s, s);
    domC.size = new p5.Vector(domC.origSize.x, domC.origSize.y);
}

function resetParameters() {
    domC.func = domC.verifyFunction(complex_expression(inp.value()));
}

function resetValues() {
    let s = 2; //def.size;
    let sw = s * 2;
    let sh = (sw * height) / width;
    domC.origSize = new p5.Vector(sw, sh);
    domC.size = new p5.Vector(domC.origSize.x, domC.origSize.y);
    domC.pos.x = domC.origPos.x;
    domC.pos.y = domC.origPos.y;
    domC.zoom = domC.origZoom;
    let nx = map(domC.pos.x, -domC.size.x / 2, domC.size.x / 2, domC.x, domC.w);
    let ny = map(domC.pos.y, -domC.size.y / 2, domC.size.y / 2, domC.y, domC.h);
    domC.bX = nx;
    domC.bY = ny;
}

function screenSize() {
    if (size) {
        resizeCanvas(500, 500);
    } else if (!size) {
        resizeCanvas(700, 700);
    }
    resetPlot();
}

function zoomIn() {
    domC.zoomAt(width / 2, height / 2, 0.85, true);
  }
  
  function zoomOut() {
    domC.zoomAt(width / 2, height / 2, 0.85, false);
  }

//function myInputEvent() {
//   console.log('you are typing: ', this.value());
//}

function updateTextInput(val) {
    document.getElementById('textInput').value = val;
    resetParameters();
}