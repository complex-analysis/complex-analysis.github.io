/**
 * @author Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 *
 * Helper functions for p5.js and more
 */

if ( !Complex ) {
  throw new ReferenceError('This library needs Complex class to function.');
}

if ( !Matrix ) {
  throw new ReferenceError('This library needs Matrix class to function.');
}

Point = Complex;

/// Extending Complex class
// Point.prototype.angleTo = function(p) {
//   let cp = new Point(p);
//   let dif = cp.sub(this);
//   return Math.atan2(dif.im, dif.re);
// };

Point.prototype.angleTo = function(p) {
  let arg1 = this.arg();
  let arg2 = p.arg();
  return ( arg2 - arg1 + TAU ) % TAU;
  // return arg2 - arg1;
};

Point.prototype.dot = function(p) {
  return p.re * this.re + p.im + this.im;
};

Point.prototype.unit = function() {
  let len = this.abs();
  return this.div(len);
};

Point.prototype.cross = function(p) {
  return this.conjugate().mul(p).im;
};

function types(arr) {
  let res = [];

  for (let i = 0, maxi = arr.length; i < maxi; i += 1) {
    if ( Array.isArray(arr[i]) ) {
      res.push('a');
    } else switch( typeof arr[i] ) {
      case 'number':
      case 'string':
      case 'object':
      case 'undefined':
      case 'function': {
        res.push( ( typeof arr[i] )[0] );
        break;
      }
      default: {
        res.push('?');
        break;
      }
    }
  }

  return res.join('');
}

function toPoint(mat) {
  return new Complex(mat.get(0, 0), mat.get(1, 0));
}

function toMatrix(pt) {
  return Matrix.fromArray([pt.re, pt.im], [2, 1]);
}

function clip(v, m, M) {
  return Math.max(m, Math.min(M, v));
}

class Plotter {

  constructor(x1, y1, x2, y2) {

    this.EPS = 1e-4;
    this.zoomFactor = 1;
    let cx = width >> 1;
    let cy = height >> 1;
    this.center = new Complex(cx, cy);

    this.axes = Matrix.Identity(2);

    if ( types([x1, y1, x2, y2]) === 'nnnn' ) {
      let x = width / (x2 - x1);
      let y = height / (y2 - y1);
      this.axes.set(0, 0, x);
      this.axes.set(1, 1, y);
    }

    this.non_linear_func = x => x;

  }

  static EPS() {
    return 1e-9;
  }

  static cross(v1, v2) {
    console.warn("Deprecated: Use a.cross(b) instead");
    return v1.conjugate().mul(v2).im;
  }

  static lineIntersection(pt1, pt2, PT1, PT2) {
    let v1 = pt2.sub(pt1);
    let v2 = PT2.sub(PT1);

    let D = v2.re * v1.im - v1.re * v2.im;
    let D1 = v2.re * ( PT1.im - pt1.im ) - ( PT1.re - pt1.re ) * v2.im;

    let t1 = D1 / D;

    return pt1.add( v1.mul(t1) );

  }

  static intersect(pt1, pt2, region) {

    let vec = pt2.sub(pt1);

    let res = [];

    let cant = region.length;

    for (let i = 0, j = 1; i < cant; i += 1) {

      let v1 = region[i].sub(pt1);
      let v2 = region[j].sub(pt1);

      if ( vec.cross(v1) * vec.cross(v2) <= 0 ) {
        let newP = Plotter.lineIntersection(region[i], region[j], pt1, pt2);
        res.push(newP);
      }

      j += 1;
      if ( j >= cant ) {
        j = 0;
      }
    }

    return res;

  }

  static haveIntersection(pt1, pt2, region) {

    let vec = pt2.sub(pt1);
    let cant = region.length;
    let newReg = region.map(e => e.sub(pt1));

    for (let i = 0, j = 1; j < cant; i += 1, j += 1) {

      let v1 = newReg[i];
      let v2 = newReg[j];

      if ( vec.cross(v1) * vec.cross(v2) <= 0 ) {
        return true;
      }
    }

    return false;

  }

  static cutPolygon(pt1, pt2, region) {

    let vec = pt2.sub(pt1);

    let res = [];

    let cant = region.length;

    for (let i = 0, j = 1; i < cant; i += 1) {

      let v1 = region[i].sub(pt1);
      let v2 = region[j].sub(pt1);

      let s1 = vec.cross(v1);
      let s2 = vec.cross(v2);

      if ( s1 * s2 <= 0 ) {
        let newP = Plotter.lineIntersection(region[i], region[j], pt1, pt2);
        res.push(newP);
      }

      if ( s1 <= 0 ) {
        res.push( region[i].clone() );
      }

      j += 1;
      if ( j >= cant ) {
        j = 0;
      }
    }

    return res;

  }

  static rotatePolygon(path, ref, ang, degree) {
    let factor = ( degree ) ? PI / 180 : 1;
    let rotor = new Complex({
      arg: factor * ang,
      abs: 1
    });
    let p1 = path.map(e => e.sub(ref).mul(rotor).add(ref));
    return p1;
  }

  static averagePoint(path) {
    let cp = new Complex(0, 0);
    let len = path.length;
    for (let i = 0; i < len; i += 1) {
      cp = cp.add( path[i] );
    }
    return cp.div( Math.max( len, 1 ) );
  }

  static createEllipse(cx, cy, a, b, pts) {

    let sq = Math.sqrt;
    let cs = Math.cos;
    let sn = Math.sin;

    let res = [];
    let cant = pts || 200;
    let dAng = Math.PI * 2 / cant;
    let center = new Complex(cx, cy);

    for (let i = 0; i <= cant; i += 1) {
      let arg = dAng * i;
      let len = 1 / sq( ( cs(arg) / a ) ** 2 + ( sn(arg) / b ) ** 2 );
      res.push( center.add( new Complex({ abs: len, arg  }) ) );
    }

    return res;

  }

  zoom(pt, f) {
    // this.zoomCenter = pt;
    // this.setCenter(pt);
    this.zoomFactor = f;
  }

  setCenter(pt) {
    this.center = this.convertPoint(pt);
    // this.center = pt;
    // this.center.re *= -1;
  }

  drawVerticalLine(x, col, str) {
    this.drawLine(new Complex(x, 0), new Complex(x, 1), col, str);
  }

  drawHorizontalLine(y, col, str) {
    this.drawLine(new Complex(0, y), new Complex(1, y), col, str);
  }

  drawAxes(col, str) {
    this.drawVerticalLine(0, col || 100, str || 2);
    this.drawHorizontalLine(0, col || 100, str || 2);
  }

  drawGrid(sx, sy, col, str, highAxes) {
    let tps = types([sx, sy, col, str, highAxes]);

    if ( tps === 'uuuuu' ) {
      sx = sy = 1;
    } else if ( tps === 'nuuuu' )  {
      col = sx;
      sx = sy = 1;
    }

    let spx = ( types([sx]) != 'n' ) ? 1 : sx;
    let spy = ( types([sy]) != 'n' ) ? 1 : sy;

    let cx = this.convertPoint( new Complex(0, 0) );

    let vx = this.convertPoint( new Complex(spx, 0) ).sub( cx );
    let vy = this.convertPoint( new Complex(0, spy) ).sub( cx );
    let vxa = vx.abs();
    let vya = vy.abs();

    const min_px = 50;
    const max_px = 150;
    const min_proj = 50;

    let proj = (v1, v2) => { return Math.abs(v1.cross(v2)) / v2.abs() };

    // console.log(vx, vy);

    let adjustLength = function(v1, v2, len) {

      let fac = 1;

      while ( len > max_px && len / 2 >= min_px ) {
        len /= 2;
        fac /= 2;
      }

      if ( v1.cross(v2) > 1 ) {
        while ( len < min_px || proj(v1, v2) < min_proj ) {
          v1 = v1.mul( 2 );
          len *= 2;
          fac *= 2;
        }
      }

      return fac;

    };

    let ax = adjustLength(vx, vy, vxa);
    let ay = adjustLength(vy, vx, vya);
    vx = vx.mul( ax );
    vy = vy.mul( ay );
    spx *= ax;
    spy *= ay;

    // console.log(vx, vy);
    // console.log(vx, vy, proj(vx, vy), proj(vy, vx));

    let _col = [ ( highAxes ) ? 150 : (col || 100), col || 100];
    let _str = str || 2;
    let inc = [ 2, 0 ];

    let region = [
      new Complex(0, 0),
      new Complex(0, height),
      new Complex(width, height),
      new Complex(width, 0),
    ];

    let isInside = function(pt1, pt2) {
      return Plotter.haveIntersection(pt1, pt2, region);
    };

    let calcX = true;
    let calcY = true;

    for (let i = 0;; i += 1) {
      let c1 = false;
      let c2 = false;
      let c3 = false;
      let c4 = false;

      if ( calcX ) {
        if ( isInside( cx.add( vx.mul(i) ), cx.add( vx.mul(i) ).add(vy) ) ) {
          this.drawVerticalLine(spx * i, _col[ Math.sign(i) ], _str + inc[ Math.sign(i) ] );
          c1 = true;
        }
        if ( isInside( cx.add( vx.mul(-i - 1) ), cx.add( vx.mul(-i - 1) ).add(vy) ) ) {
          this.drawVerticalLine(spx * (-i - 1), _col[ Math.sign(i + 1) ], _str );
          c2 = true;
        }
      }

      if ( calcY ) {
        if ( isInside( cx.add( vy.mul(i) ), cx.add( vy.mul(i) ).add(vx) ) ) {
          this.drawHorizontalLine(spy * i, _col[ Math.sign(i) ], _str + inc[ Math.sign(i) ] );
          c3 = true;
        }
        if ( isInside( cx.add( vy.mul(-i - 1) ), cx.add( vy.mul(-i - 1) ).add(vx) ) ) {
          this.drawHorizontalLine(spy * (-i - 1), _col[ Math.sign(i + 1) ], _str);
          c4 = true;
        }
      }

      if ( !c1 && !c2 && !c3 && !c4 ) {
        break;
      }
    }

  }

  applyNonlinearTransform(fn) {
    if ( types([fn]) === 'f' ) {
      this.non_linear_func = fn;
    }
  }

  convertPoint(ptRaw) {
    let pt = this.non_linear_func(ptRaw);
    let trans = Matrix.fromArray([1, 0, 0, -1], [2, 2]).mul(this.zoomFactor);
    let pt1 = Matrix.fromArray([pt.re, pt.im], [2, 1]);
    let cx = Matrix.fromArray([ this.center.re, this.center.im ], [2, 1]);
    let newPt = toPoint( trans.mul( this.axes.mul( pt1 ) ).add(cx) );
    return newPt;
  }

  fromMouse(x, y) {
    let trans = Matrix.fromArray([1, 0, 0, -1], [2, 2]).mul(this.zoomFactor).inv();
    let cx = Matrix.fromArray([ this.center.re, this.center.im ], [2, 1]);
    let ptm = Matrix.fromArray([x, y], [2, 1]).sub(cx);
    let ampt = trans.mul(ptm);
    let pt = this.axes.inv().mul( ampt );
    return toPoint( pt );
  }

  drawPoint(pt, col, diam) {
    let newPt = this.convertPoint(pt);
    stroke(col || 255);
    strokeWeight(diam || 10);
    point(newPt.re, newPt.im);
  }

  drawPoints(pts, col, diam) {
    for (let i = 0, maxi = pts.length; i < maxi; i += 1) {
      let newPt = this.convertPoint(pts[i]);
      stroke(col || 255);
      strokeWeight(diam || 10);
      point(newPt.re, newPt.im);
    }
  }

  drawVertex(pt, col, diam) {
    let newPt = this.convertPoint(pt);
    stroke(col || 255);
    strokeWeight(diam || 10);
    vertex(newPt.re, newPt.im);
  }

  drawText(txt, pt, col, str, fl) {
    let newPt = this.convertPoint(pt);
    stroke(col || 255);
    strokeWeight(str || 2);
    if ( fl ) {
      fill( fl );
    } else {
      noFill();
    }
    text(txt, newPt.re, newPt.im);
  }

  optSegmentPts(p1, p2) {
    let pA = this.convertPoint(p1);
    let pB = this.convertPoint(p2);
    let len = pA.sub(pB).abs();
    return Math.floor( len / 15 );
  }

  drawSegment(ptA, ptB, col, str, pts) {
    let w = (str || 3);

    stroke(col || 255);
    strokeWeight(w);

    let arr = [];
    let cant = this.optSegmentPts(ptA, ptB);
    for (let i = 0; i <= cant; i += 1) {
      let alpha = i / cant;
      arr.push( ptA.mul( 1 - alpha ).add( ptB.mul(alpha) ) );
    }
    this.drawPath(arr, col, str);
  }

  drawLine(ptA, ptB, col, str) {
    let newPta = this.convertPoint(ptA);
    let newPtb = this.convertPoint(ptB);
    // let w = (str || 3);
    // stroke(col || 255);
    // strokeWeight(w);
    let pts = Plotter.intersect(newPta, newPtb, [
      new Complex(-width * 3, -height * 3),
      new Complex(-width * 3, height * 3),
      new Complex(width * 3, height * 3),
      new Complex(width * 3, -height * 3),
    ]);
    if ( pts.length > 1 ) {
      let ini = this.fromMouse(pts[0].re, pts[0].im);
      let fin = this.fromMouse(pts[1].re, pts[1].im);
      this.drawSegment(ini, fin, col, str, 100);
    }
  }

  optEllipsePts(cx, cy, a, b) {
    let sq = Math.sqrt;
    let cs = Math.cos;
    let sn = Math.sin;

    let lo = 10;
    let hi = 1000;
    let mid;

    let center = this.convertPoint( new Complex(cx, cy) );

    const nA = this.convertPoint( new Complex(a, 0) ).sub(center).abs();
    const nB = this.convertPoint( new Complex(0, b) ).sub(center).abs();
    const ang1 = 0;
    const ang2 = Math.PI / 2;
    const minPx = 10;

    let getLen = function(arg1, arg2) {
      let len1 = 1 / sq( ( cs(arg1) / nA ) ** 2 + ( sn(arg1) / nB ) ** 2 );
      let len2 = 1 / sq( ( cs(arg2) / nA ) ** 2 + ( sn(arg2) / nB ) ** 2 );
      let pt1 = new Complex({ abs: len1, arg: arg1 });
      let pt2 = new Complex({ abs: len2, arg: arg2 });
      return pt2.sub(pt1).abs();
    };

    while ( lo < hi ) {
      mid = ( hi + lo ) >> 1;
      let dAng = Math.PI * 2 / mid;
      let len1 = getLen(ang1, ang1 + dAng);
      let len2 = getLen(ang2, ang2 + dAng);

      if ( len1 <= minPx && len2 <= minPx ) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }

    return mid;

  }

  drawEllipse(center, A, B, col1, str, col2) {
    let fl = !(typeof col2 === 'undefined');
    stroke(col1 || 255);
    strokeWeight(str || 2);
    if ( fl ) {
      fill(col2 || 255);
    } else {
      noFill();
    }
    let a = abs(A);
    let b = abs(B);
    let pts = this.optEllipsePts(center.re, center.im, a, b);
    let elps = Plotter.createEllipse(center.re, center.im, a, b, pts);

    this.drawPath(elps, col1, str, col2, CLOSE);
  }

  drawDirectedPath(path, col1, str, col2, close, showTip) {
    const MAX_DIST = 150;
    const tipSize = 15;
    let len = path.length;
    let dist = 0;

    stroke(col1 || 255);
    strokeWeight(str || 3);
    if ( col2 < 0 || typeof col2 === 'undefined' ) {
      noFill();
    } else {
      fill( col2 || 255 );
    }

    beginShape();
    for (let i = 0; i < len; i += 1) {
      let newp = this.convertPoint(path[i]);
      vertex(newp.re, newp.im);
    }
    endShape(close);

    let prevP = new Complex(0, 0);

    for (let i = 0; i < len; i += 1) {
      let newp = this.convertPoint(path[i]);
      if ( i > 0 ) {
        dist += ( prevP.sub(newp).abs() );

        if ( dist >= MAX_DIST ) {
          this.drawArrowTip(prevP, newp, col1, tipSize);
          while( dist >= MAX_DIST ) {
            dist -= MAX_DIST;
          }
        }
      }
      prevP = newp;
    }
  }

  drawPath(path, strokeC, strW, fillC, close, shapeFn) {
    let cb = ( typeof shapeFn === 'function' ) ? shapeFn : ( () => false );
    let len = path.length;
    let cls = (typeof close === 'undefined' || close === null) ? close : ( close || CLOSE );

    beginShape();
    stroke(strokeC || 255);
    strokeWeight(strW || 3);
    if ( typeof fillC === 'undefined' || fillC === null ) {
      noFill();
    } else {
      fill(fillC || color(0, 0, 0, 0));
    }
    for (let i = 0; i < len; i += 1) {
      if ( cb(path[i], i, path) ) {
        endShape();
        beginShape();
      }
      let newp = this.convertPoint(path[i]);
      vertex(newp.re, newp.im);
    }
    endShape(cls);
  }

  drawColoredPath(path, col1, str, col2, close, fn) {
    let cb = ( typeof fn === 'function' ) ? fn : ( () => false );
    let len = path.length;
    let cls = (typeof close === 'undefined' || close === null) ? close : ( close || CLOSE );

    beginShape();
    strokeWeight(str || 3);
    if ( typeof col2 === 'undefined' || col2 === null ) {
      noFill();
    } else {
      fill(col2 || color(0, 0, 0, 0));
    }
    for (let i = 0; i < len; i += 1) {
      if ( cb(path[i], i, path) ) {
        endShape();
        beginShape();
      }
      let newp = this.convertPoint(path[i]);
      let col = ( typeof col1 === 'function' ) ? col1(path[i], i, path) : col1;
      vertex(newp.re, newp.im);
      stroke(col || 255);
    }
    endShape(cls);
  }

  drawTriangle(ptA, ptB, ptC, col1, str, col2) {
    let cant = 20;
    let pts = [ ptA, ptB, ptC ];
    let arr = [];

    for (let i = 0; i < 3; i += 1) {
      let next = (i + 1) % 3;
      for (let j = 0; j < cant; j += 1) {
        let alpha = j / cant;
        arr.push( pts[i].mul(1 - alpha).add( pts[next].mul(alpha) ) );
      }
    }

    this.drawPath(arr, col1, str, col2, CLOSE);
  }

  drawArrowTip(cp1, cp2, col, len) {

    let p1 = this.convertPoint(cp1);
    let p2 = this.convertPoint(cp2);
    let v1 = p2.sub(p1);

    v1 = v1.div( v1.abs() );

    let rotor = new Complex({ abs: 1, arg: PI / 8 });

    let v2 = v1.mul(rotor);
    let v3 = v1.div(rotor);

    v2 = v2.mul( len / v2.abs() );
    v3 = v3.mul( len / v3.abs() );

    let pA = p2.sub( v2 );
    let pB = p2.sub( v3 );

    fill(col);
    stroke(col);

    beginShape();
    strokeWeight(1);
    vertex(p2.re, p2.im);
    vertex(pA.re, pA.im);
    vertex(pB.re, pB.im);
    endShape(CLOSE);

  }

  drawArrow(cp1, cp2, col, nrm) {

    let p1 = cp1;
    let p2 = cp2;
    let isNorm = Boolean(nrm);
    let v1 = p2.sub(p1);
    let len = ( isNorm ) ? v1.abs() : 1;

    v1 = v1.div(len);

    let rotor = new Complex({
      arg: PI / 8,
      abs: 1
    });

    let sw = clip(len, 3, 5);
    let factor = map(len, 0, 50, 0, 200);
    // let factor = 10;

    let pA = p2.sub( v1.mul(rotor).div( factor ) );
    let pB = p2.sub( v1.div(rotor).div( factor ) );
    let newP2 = pA.add(pB).div(2);

    let _col = col || 255;

    this.drawSegment(cp1, newP2, _col, sw, 50);
    this.drawTriangle(p2, pA, pB, _col, 1, _col);

  }

  drawSimpleArrow(cp1, cp2, col, nrm) {

    let p1 = cp1;
    let p2 = cp2;
    let isNorm = Boolean(nrm);
    let v1 = p2.sub(p1);
    let len = ( isNorm ) ? v1.abs() : 1;

    v1 = v1.div(len);

    let rotor = new Complex({
      arg: PI / 8,
      abs: 1
    });

    // let sw = clip(len, 3, 5);
    let factor = map(len, 0, 50, 0, 200);
    // let factor = 10;

    let pA = p2.sub( v1.mul(rotor).div( factor ) );
    let pB = p2.sub( v1.div(rotor).div( factor ) );
    let newP2 = pA.add(pB).div(2);

    let sw = pA.sub(pB).abs() / 10;

    let _col = col || 255;

    this.drawSegment(cp1, newP2, _col, sw, 2);

    fill(_col);

    beginShape();
    vertex(p2.re, p2.im);
    vertex(pA.re, pA.im);
    vertex(pB.re, pB.im);
    endShape(CLOSE);

  }

}

function svgToPath(dValue) {
  let d = dValue;

  let log = function() {
    // console.log.apply(null, arguments);
  };

  d = d.replace(/,/gm, ' '); // get rid of all commas

  for (let i = 0; i < 2; i += 1) {
    d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, '$1 $2');
  }
  d = d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, '$1 $2');
  d = d.replace(/([0-9])([+\-])/gm, '$1 $2');

  for (let i = 0; i < 2; i += 1) {
    d = d.replace(/(\.[0-9]*)(\.)/gm, '$1 $2');
  }
  d = d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, '$1 $3 $4 ');
  d = d.replace(/(?!\u3000)\s+/gm, ' ');
  d = d.replace(/^\s+|\s+$/g, '');

  let pp = new (function (d) {
    this.tokens = d.split(' ');

    this.reset = function () {
      this.i = -1;
      this.command = '';
      this.previousCommand = '';
      this.start = new Complex(0, 0);
      this.control = new Complex(0, 0);
      this.current = new Complex(0, 0);
      this.points = [];
      this.angles = [];
    }

    this.isEnd = function () {
      return this.i >= this.tokens.length - 1;
    }

    this.isCommandOrEnd = function () {
      return (this.isEnd()) ? true : this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null;
    }

    this.isRelativeCommand = function () {
      return "mlhvcsqtaz".indexOf(this.command) > -1;
    }

    this.getToken = function () {
      return this.tokens[++this.i];
    }

    this.getScalar = function () {
      return parseFloat(this.getToken());
    }

    this.nextCommand = function () {
      this.previousCommand = this.command;
      this.command = this.getToken();
    }

    this.getPoint = function () {
      return this.makeAbsolute( new Complex(this.getScalar(), this.getScalar()) );
    }

    this.getAsControlPoint = function () {
      return this.control = this.getPoint();
    }

    this.getAsCurrentPoint = function () {
      return this.current = this.getPoint();
    }

    this.getReflectedControlPoint = function () {
      let pc = this.previousCommand.toLowerCase();
      return ( "csqt".indexOf(pc) === -1 ) ? this.current : this.current.mul(2).sub(this.control);
    }

    this.makeAbsolute = function (p) {
      return ( this.isRelativeCommand() ) ? p.add(this.current) : p;
    }

    this.addMarker = function (p, from, priorTo) {
      if (priorTo != null && this.angles.length > 0 && this.angles[this.angles.length - 1] == null) {
        this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(priorTo);
      }
      this.addMarkerAngle(p, from == null ? null : from.angleTo(p));
    }

    this.addMarkerAngle = function (p, a) {
      this.points.push(p);
      this.angles.push(a);
    }

    this.getMarkerPoints = function () {
      return this.points;
    }

    this.getMarkerAngles = function () {
      for (let i = 0, maxi = this.angles.length; i < maxi; i += 1) {
        if (this.angles[i] == null) {
          for (var j = i + 1, maxj = this.angles.length; j < maxj; j += 1) {
            if (this.angles[j] != null) {
              this.angles[i] = this.angles[j];
              break;
            }
          }
        }
      }
      return this.angles;
    }
  })(d);

  pp.reset();

  let result = []
  let ref = new Complex(0, 0);
  let pow = Math.pow;
  let sqrt = Math.sqrt;
  let sin = Math.sin;
  let cos = Math.cos;
  let PI = Math.PI;

  let lineTo = function(pt) {
    log('LINE');
    const STEP = 0.1;
    let vec = pt.sub(ref);
    for (let i = 0; i < 1; i += STEP) {
      result.push( ref.add( vec.mul(i) ) );
    }
    result.push(pt);
    return pt;
  };

  let comb = function(n) {
    let mat = [1];
    for (let i = 1; i <= n; i += 1) {
      mat = mat.map((e, i, a) => (i > 0) ? a[i] + a[i-1] : e );
      mat.push(1);
    }
    return mat;
  };

  let bezierTo = function() {
    log('BEZIER');
    const STEP = 0.001;
    let cant = arguments.length;
    let pts = [];
    let c = comb(cant - 1);

    for (let i = 0; i < cant; i += 1) {
      pts.push( arguments[i] );
    }

    for (let t = 0; t < 1; t += STEP) {
      let fp = new Complex(0, 0);
      for (let i = 0, n = cant - 1; i <= n; i += 1) {
        fp = fp.add( pts[i].mul( c[i] * pow(1 - t, n - i) * pow(t, i) ) );
      }
      result.push(fp);
    }

    return pts[ cant - 1 ];
  };

  let fmod = function(a, b) {
    return (a % b + b) % b;
  };

  let arcTo = function(cx, cy, r, a1, a2, dir) {
    log('ARC');
    // 0, 0, r, a1, a1 + ad, 1 - sweepFlag
    let center = new Complex(cx, cy);

    let aIni = fmod(a1, 2 * PI);
    let aFin = fmod(a2, 2 * PI);
    let PI2 = PI * 2;

    if ( !dir ) {
      if ( aIni > aFin ) {
        aFin += ( ~~( (aIni - aFin) / PI2 + 1 ) * PI2 );
      }
    } else {
      if ( aFin > aIni ) {
        aIni += ( ~~( (aFin - aIni) / PI2 + 1 ) * PI2 );
      }
    }

    let delta = aFin - aIni;
    const STEP = 1 / ( Math.abs(delta) * r * 2);
    let vec = new Complex({ arg: aIni, abs: r });

    for (let i = 0; i < 1; i += STEP) {
      result.push(center.add( vec.mul( new Complex({ arg: delta * i, abs: 1 }) ) ));
    }

    result.push(center.add( vec.mul( new Complex({ arg: delta, abs: 1 }) ) ));

    return result[ result.length - 1 ];

  };

  while ( !pp.isEnd() ) {
    pp.nextCommand();
    log('COMMAND: ', pp.command);
    switch ( pp.command.toLowerCase() ) {
      case 'm': {
        let p = pp.getAsCurrentPoint();
        pp.addMarker(p);
        ref = p;
        pp.start = pp.current;
        while ( !pp.isCommandOrEnd() ) {
          let p = pp.getAsCurrentPoint();
          pp.addMarker(p, pp.start);
          ref = lineTo(p);
        }
        break;
      }
      case 'l': {
        while (!pp.isCommandOrEnd()) {
          var c = pp.current;
          var p = pp.getAsCurrentPoint();
          pp.addMarker(p, c);
          ref = lineTo(p);
        }
        break;
      }
      case 'h': {
        while (!pp.isCommandOrEnd()) {
          var newP = new Complex((pp.isRelativeCommand() ? pp.current.re : 0) + pp.getScalar(), pp.current.im);
          pp.addMarker(newP, pp.current);
          pp.current = newP;
          ref = lineTo(pp.current);
        }
        break;
      }
      case 'v': {
        while (!pp.isCommandOrEnd()) {
          var newP = new Complex(pp.current.re, (pp.isRelativeCommand() ? pp.current.im : 0) + pp.getScalar());
          pp.addMarker(newP, pp.current);
          pp.current = newP;
          ref = lineTo(pp.current);
        }
        break;
      }
      case 'c': {
        while (!pp.isCommandOrEnd()) {
          let curr = pp.current;
          let p1 = pp.getPoint();
          let cntrl = pp.getAsControlPoint();
          let cp = pp.getAsCurrentPoint();
          pp.addMarker(cp, cntrl, p1);
          ref = bezierTo(curr, p1, cntrl, cp);
        }
        break;
      }
      case 's': {
        while (!pp.isCommandOrEnd()) {
          let curr = pp.current;
          let p1 = pp.getReflectedControlPoint();
          let cntrl = pp.getAsControlPoint();
          let cp = pp.getAsCurrentPoint();
          pp.addMarker(cp, cntrl, p1);
          ref = bezierTo(curr, p1, cntrl, cp);
        }
        break;
      }
      case 'q': {
        while (!pp.isCommandOrEnd()) {
          let curr = pp.current;
          let cntrl = pp.getAsControlPoint();
          let cp = pp.getAsCurrentPoint();
          pp.addMarker(cp, cntrl, cntrl);
          ref = bezierTo(curr, cntrl, cp);
        }
        break;
      }
      case 't': {
        while (!pp.isCommandOrEnd()) {
          let curr = pp.current;
          let cntrl = pp.getReflectedControlPoint();
          pp.control = cntrl;
          let cp = pp.getAsCurrentPoint();
          pp.addMarker(cp, cntrl, cntrl);
          ref = bezierTo(curr, cntrl, cp);
        }
        break;
      }
      case 'a': {
        while (!pp.isCommandOrEnd()) {
          let curr = pp.current;
          let rx = pp.getScalar();
          let ry = pp.getScalar();
          let xAxisRotation = pp.getScalar() * (PI / 180.0);
          let largeArcFlag = pp.getScalar();
          let sweepFlag = pp.getScalar();
          let cp = pp.getAsCurrentPoint();

          var currp = new Complex(
            cos(xAxisRotation) * (curr.re - cp.re) / 2.0 + sin(xAxisRotation) * (curr.im - cp.im) / 2.0, -sin(xAxisRotation) * (curr.re - cp.re) / 2.0 + cos(xAxisRotation) * (curr.im - cp.im) / 2.0
          );
          // adjust radii
          var l = pow(currp.re, 2) / pow(rx, 2) + pow(currp.im, 2) / pow(ry, 2);
          if (l > 1) {
            rx *= sqrt(l);
            ry *= sqrt(l);
          }
          // cx', cy'
          var s = (largeArcFlag == sweepFlag ? -1 : 1) * sqrt(
            ((pow(rx, 2) * pow(ry, 2)) - (pow(rx, 2) * pow(currp.im, 2)) - (pow(ry, 2) * pow(currp.re, 2))) /
            (pow(rx, 2) * pow(currp.im, 2) + pow(ry, 2) * pow(currp.re, 2))
          );
          if (isNaN(s)) s = 0;
          var cpp = new Complex(s * rx * currp.im / ry, s * -ry * currp.re / rx);
          // cx, cy
          var centp = new Complex(
            (curr.re + cp.re) / 2.0 + cos(xAxisRotation) * cpp.re - sin(xAxisRotation) * cpp.im,
            (curr.im + cp.im) / 2.0 + sin(xAxisRotation) * cpp.re + cos(xAxisRotation) * cpp.im
          );
          // vector magnitude
          var m = function (v) { return sqrt(pow(v[0], 2) + pow(v[1], 2)); }
          // ratio between two vectors
          var r = function (u, v) { return (u[0] * v[0] + u[1] * v[1]) / (m(u) * m(v)) }
          // angle between two vectors
          var a = function (u, v) { return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * acos(r(u, v)); }
          // initial angle
          var a1 = a([1, 0], [(currp.re - cpp.re) / rx, (currp.im - cpp.im) / ry]);
          // angle delta
          var u = [(currp.re - cpp.re) / rx, (currp.im - cpp.im) / ry];
          var v = [(-currp.re - cpp.re) / rx, (-currp.im - cpp.im) / ry];
          var ad = a(u, v);
          if (r(u, v) <= -1) ad = PI;
          if (r(u, v) >= 1) ad = 0;

          // for markers
          var dir = 1 - sweepFlag ? 1.0 : -1.0;
          var ah = a1 + dir * (ad / 2.0);
          var halfWay = new Complex(
            centp.re + rx * cos(ah),
            centp.im + ry * sin(ah)
          );
          pp.addMarkerAngle(halfWay, ah - dir * PI / 2);
          pp.addMarkerAngle(cp, ah - dir * PI);

          if ( !isNaN(a1) && !isNaN(ad) ) {
            var r = rx > ry ? rx : ry;
            var sx = rx > ry ? 1 : rx / ry;
            var sy = rx > ry ? ry / rx : 1;

            // ctx.translate(centp.re, centp.im);
            // ctx.rotate(xAxisRotation);
            // ctx.scale(sx, sy);
            arcTo(centp.re, centp.im, r, a1, a1 + ad, 1 - sweepFlag);
            // ctx.scale(1 / sx, 1 / sy);
            // ctx.rotate(-xAxisRotation);
            // ctx.translate(-centp.re, -centp.im);
          }
        }
        break;
      }
      case 'z': {
        pp.current = pp.start;
      }
    }
  }

  this.getMarkers = function () {
    var points = this.PathParser.getMarkerPoints();
    var angles = this.PathParser.getMarkerAngles();

    var markers = [];
    for (var i = 0; i < points.length; i++) {
      markers.push([points[i], angles[i]]);
    }
    return markers;
  }

  return result;

}

class Numeric {

  static integrate(f, a, b, e) {
    return Numeric.integrateC( function() {
      return new Complex(f.apply(null, arguments), 0);
    }, a, b, e).re;
  }

  static integrateC(f, a, b, e) {
    /// Romberg's integration
    let R = [
      [],
      []
    ];
    let cErr = Infinity; /// Current Error
    let acc = e || 1e-10;
    let cr = 0; /// Current R (R[0], R[1])

    let h = b - a;

    R[ 1 - cr ][0] = f(a).add(f(b)).mul(h * 0.5); /// First step

    let max_steps = 20;

    for (let i = 1; i <= max_steps; i += 1) {
      h /= 2;
      let c = new Complex(0, 0);
      let ep = Math.pow(2, (i - 1));

      for (let j = 1; j <= ep; j += 1) {
        c = c.add( f(a + (j * 2 - 1) * h ) );
      }

      R[ cr ][0] = c.mul(h).add( R[ 1 - cr ][0].div(2) );

      for (let j = 1; j <= i; j += 1) {
        let n_k = Math.pow(4, j);
        R[ cr ][j] = (R[ cr ][j - 1].mul(n_k).sub(R[ 1 - cr ][j - 1])).div(n_k - 1);
      }

      cErr = R[ 1 - cr ][i - 1].sub(R[ cr ][i] ).abs();

      if (i > 1 && cErr < acc ) {
        return R[ cr ][i - 1];
      }

      cr = 1 - cr;

    }

    return R[ 1 - cr ][ max_steps - 1 ];

  }

}