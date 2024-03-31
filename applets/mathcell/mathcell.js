
window.onerror = function( message ) {
  document.getElementById( window.id + 'output' ).innerHTML = message;
}

function MathCell( id, inputs, config={} ) {

  function labeledInteract( input ) {

    var label = 'label' in input ? input.label : '';
    if ( label.length === 1 ) label = `<i>${label}</i>`;

    return `
<div style="white-space: nowrap" onclick="window.id='${id}'">
<div style="min-width: .5in; display: inline-block">${label}</div>
<div style="width: 100%; display: inline-block; white-space: nowrap">
  ${interact( id, input )} </div>
</div>`;

  }

  function inputTable( inputs ) {

    var t = '';

    if ( !Array.isArray(inputs[0]) ) inputs = [ inputs ];

    inputs.forEach( row => {

      t += '<tr>';
      row.forEach( column => {

        t += '<td>';
        if ( Array.isArray(column) )  t += inputTable( column );
        else t += labeledInteract( column );
        t += '</td>';

      } );
      t += '</tr>';

    } );

    return `
<table style="width: 100%; line-height: inherit">
${t}
</table>`;

  }

  var s = '';
  // process array of dictionaries
  for ( var i = 0 ; i < inputs.length ; i++ ) {

    var input = inputs[i];

    if ( Array.isArray(input) ) s += inputTable( input );
    else s += labeledInteract( input );

  }

  s += `
<div style="height: .25in"></div>
<div id=${id}wrapper style="width: 100%; flex: 1; position: relative">`;

  var outputIndex = 1;

  function outputTable( outputs ) {

    // table inside flex box grows on each update, divs do not!
    var t = '';

    if ( !Array.isArray(outputs[0]) ) outputs = [ outputs ];

    outputs.forEach( row => {

      t += `
<div style="width: 100%; height: ${100/outputs.length}%; white-space: nowrap">`;
      row.forEach( column => {

        if ( Array.isArray(column) )  t += outputTable( column );
        else {
          t += `
<div id=${id}output${outputIndex} style="width: ${100/outputs[0].length}%; height: calc(100% - 5px);
                                         border: 1px solid black; display: inline-block"></div>`;
          outputIndex++;
        }

      } );
      t += `
</div>`;

    } );

    return `
<div style="width: 100%; height: 100%; position: absolute">
${t}
</div>`;

  }

  if ( 'multipleOutputs' in config ) s += outputTable( config.multipleOutputs );

  else s += `
<div id=${id}output style="width: 100%; height: 100%; position: absolute"></div>`;

  s += `
</div>`;

  var cell = document.createRange().createContextualFragment( s )
  document.getElementById( id ).appendChild( cell );

}


function interact( id, input ) {

  switch ( input.type ) {

    case 'slider':

      var name = 'name' in input ? input.name : '';
      var min = 'min' in input ? input.min : 0;
      var max = 'max' in input ? input.max : 1;
      var step = 'step' in input ? input.step : .01;
      var value = 'default' in input ? input.default : min;

      return `
<input id=${id + name} type=range min=${min} max=${max} step=${step} value=${value}
       style="vertical-align: middle; width: calc(100% - 1.2in)"
       onchange="${id + name}Box.value=${id + name}.value;${id}.update('${id}')"/>
<input id=${id + name}Box type=number min=${min} max=${max} step=${step} value=${value}
       title="" style="width: .5in"
       onchange="${id + name}.value=${id + name}Box.value;${id}.update('${id}')"/>`;

    case 'buttons':

      var name = 'name' in input ? input.name : '';
      var values = 'values' in input ? input.values : [1,2,3];
      var labels = 'labels' in input ? input.labels : false;
      var select = 'default' in input ? input.default : values[0];

      var style = input.width ? 'style="width: ' + input.width + '"' : '';

      var s = '';
      for ( var i = 0 ; i < values.length ; i++ )
        s += `
<input id=${id + name}_${i} name=${id + name} type=radio
       value=${values[i]} ${ values[i] === select ? 'checked' : '' }
       onchange="${id}.update('${id}')"/>
<label for=${id + name}_${i} ${style}> ${ labels ? labels[i] : values[i] } </label> &nbsp; </input>`;

      return s;

    case 'number':

      var name = 'name' in input ? input.name : '';
      var min = 'min' in input ? input.min : 0;
      var max = 'max' in input ? input.max : 1;
      var step = 'step' in input ? input.step : .01;
      var value = 'default' in input ? input.default : min;

      return `
<input id=${id + name} type=number min=${min} max=${max} step=${step} value=${value}
       style="width: 1in" title="" onload=this.onchange
       onchange="if (+this.value < +this.min) this.value=this.min;
                 if (+this.value > +this.max) this.value=this.max;${id}.update('${id}')"/>`;

    case 'checkbox':

      var name = 'name' in input ? input.name : '';
      var checked = 'default' in input ? input.default : '';

      return `
<input id=${id + name} type=checkbox ${ checked ? 'checked' : '' }
       onchange="${id}.update('${id}')"/>`;

    default:

      return 'Unsupported input type';

  }

}


function graphic( id, data, config ) {

  switch ( config.type ) {

    case 'svg':

      return svgPlot( id, data, config );

    case 'threejs':

      return threejsPlot( id, data, config );

    case 'x3d':

      return x3dPlot( id, data, config );

    case 'text':

      // need JSON stringify to render objects
      // explicit double quotes removed by default
      // if needed in output use &quot;

      var center = config.center ? 'text-align: center' : '';

      return `<div style="white-space: nowrap; overflow-x: auto; ${center}">
              ${JSON.stringify( data ).replace( /\"/g, '' )} </div>`;

    case 'matrix':

      s = '<table class="matrix" style="width: 95%; margin: auto; \
                                        line-height: 1.5; text-align: center">';

      for ( var i = 0 ; i < data.length ; i++ ) {
        s += '<tr>';
        for ( var j = 0 ; j < data[i].length ; j++ ) {
          s += '<td>' + data[i][j] + '</td>';
        }
        s += '</tr>';
      }

      return s + '</table>';

    default:

      return 'Unsupported graphic type';

  }

}


function generateId() {

  return 'id' + Math.floor( 10**10 * Math.random() );

}


function getVariable( id, name ) {

  // plus sign invokes Number object to ensure numeric result
  // input type already validated on creation

  var input = document.getElementById( id + name );

  if ( input ) switch ( input.type ) {

    case 'number':
    case 'range':

      return +input.value;

    case 'checkbox':

      return input.checked;

  } else {

    var value = document.querySelector( 'input[name=' + id + name + ']:checked' ).value;

    if ( isNaN(value) ) return value;
    else return +value;

  }

}


function setLimit( id, name, end, value ) {

  var input = document.getElementById( id + name );

  switch( end ) {

    case 'min' :

      input.min = value;
      if ( input.value < value ) input.value = value;
      break;

    case 'max' :

      input.max = value;
      if ( input.value > value ) input.value = value;

  }

  if ( input.type === 'range' ) {
    // update slider box
    var box = document.getElementById( id + name + 'Box' );
    box.min = input.min;
    box.max = input.max;
    box.value = input.value;
  }

}


function evaluate( id, data, config ) {

  var outputs = document.querySelectorAll( '[id^=' + id + 'output]' );

  if ( outputs.length === 1 ) {

    var output = outputs[0];
    output.innerHTML = graphic( id, data, config );
    if ( config.type === 'threejs' ) iOSFix( output );

  } else {

    for ( var i = 0 ; i < outputs.length ; i ++ ) {

      var output = outputs[i];
      var n = output.id.substr( output.id.indexOf('output') + 6 );

      var c = Array.isArray(config) ? config[i] : config;
      c.output = n;
      c.no3DBorder = true;

      output.innerHTML = graphic( id, data[i], c );
      if ( c.type === 'threejs' ) iOSFix( output );

    }

  }

  function iOSFix( output ) {

    var iframe = output.children[0];

    if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {
      iframe.style.width = getComputedStyle( iframe ).width;
      iframe.style.height = getComputedStyle( iframe ).height;
    }

  }

}


function minMax( d, index ) {

  var min = Number.MAX_VALUE;
  var max = -Number.MAX_VALUE;

  for ( var i = 0 ; i < d.length ; i++ ) {
    if ( d[i][index] < min ) min = d[i][index];
    if ( d[i][index] > max ) max = d[i][index];
  }

  return { min: min, max: max };

}


function linspace( a, b, points ) {

  var result = [];
  var step = ( b - a ) / ( points - 1 );
  for ( var i = 0 ; i < points - 1 ; i++ ) result.push( a + i * step );
  result.push( b );

  return result;

}

// rounding functions

function roundTo( x, n, significant=true ) {

  if ( x === 0 ) return x;

  if ( Array.isArray(x) ) {
    var v = [];
    for ( var i = 0 ; i < x.length ; i++ ) v[i] = roundTo( x[i], n, significant );
    return v;
  }

  if ( significant ) {
    var exponent = Math.floor( Math.log10( Math.abs(x) ) );
    n = n - exponent - 1;
  }

  return Math.round( 10**n * x ) / 10**n;

}

function ceilTo( x, n, significant=true ) {

  if ( x === 0 ) return x;

  if ( Array.isArray(x) ) {
    var v = [];
    for ( var i = 0 ; i < x.length ; i++ ) v[i] = ceilTo( x[i], n, significant );
    return v;
  }

  if ( significant ) {
    var exponent = Math.floor( Math.log10( Math.abs(x) ) );
    n = n - exponent - 1;
  }

  return Math.ceil( 10**n * x ) / 10**n;

}

function floorTo( x, n, significant=true ) {

  if ( x === 0 ) return x;

  if ( Array.isArray(x) ) {
    var v = [];
    for ( var i = 0 ; i < x.length ; i++ ) v[i] = floorTo( x[i], n, significant );
    return v;
  }

  if ( significant ) {
    var exponent = Math.floor( Math.log10( Math.abs(x) ) );
    n = n - exponent - 1;
  }

  return Math.floor( 10**n * x ) / 10**n;

}

// transformation functions

function normalize( vector ) {

  var len = 0;
  for ( i = 0 ; i < vector.length ; i++ ) len += vector[i]**2;
  len = Math.sqrt( len );
  for ( i = 0 ; i < vector.length ; i++ ) vector[i] /= len;
  return vector;

}

function translate( points, vector ) {

  for ( var i = 0 ; i < points.length ; i++ )
    for ( var j = 0 ; j < vector.length ; j++ )
      points[i][j] += vector[j];

  return points;

}

function rotate( points, angle=0, vector=[0,0,1] ) {

  var dimension = points[0].length;

  switch( dimension ) {

    case 2:

      for ( var i = 0 ; i < points.length ; i++ ) {

        var v = points[i];

        var x = v[0]*Math.cos(angle) - v[1]*Math.sin(angle);
        var y = v[0]*Math.sin(angle) + v[1]*Math.cos(angle);

        points[i] = [ x, y ];

      }

      break;

    case 3:

      var n = vector;
      var norm = Math.sqrt( n[0]*n[0] + n[1]*n[1] + n[2]*n[2] );
      if ( norm === 0 ) break;
      if ( norm !== 1 )
        for ( var i = 0 ; i < 3 ; i++ ) n[i] /= norm;

      var n1 = n[0];
      var n2 = n[1];
      var n3 = n[2];
      var c = Math.cos(angle);
      var s = Math.sin(angle);

      // Rodrigues in matrix form
      var M = [ [ c + (1-c)*n1**2, -s*n3 + (1-c)*n1*n2, s*n2 + (1-c)*n1*n3 ],
                [ s*n3 + (1-c)*n1*n2, c + (1-c)*n2**2, -s*n1 + (1-c)*n2*n3 ],
                [ -s*n2 + (1-c)*n1*n3, s*n1 + (1-c)*n2*n3, c + (1-c)*n3**2 ] ];

      for ( var i = 0 ; i < points.length ; i++ ) {

        var v = points[i];
        var x = 0, y = 0, z = 0;

        for ( var j = 0 ; j < v.length ; j++ ) {
          x += M[0][j]*v[j];
          y += M[1][j]*v[j];
          z += M[2][j]*v[j];
        }

        points[i] = [ x, y, z ];

      }

      break;

    default:

      throw Error( 'Unsupported rotation dimension' );

    }

}

// presentation functions

function getCompleteCode() {

  var cell = document.getElementsByClassName( 'mathcell' )[0]

  var copy = cell.cloneNode( false );
  copy.removeAttribute( 'id' );
  copy.appendChild( cell.children[0] );

  var s = copy.outerHTML.replace( '<script>', '\n<script>' ).replace( '</div>', '\n</div>' );
  document.getElementById( 'codeDisplay' ).innerText = s;

}


var defaultPlotColor = 'rgb(0,127,255)';

var mathcellStyle = document.createElement( 'style' );
mathcellStyle.type = 'text/css';
mathcellStyle.innerHTML = `

input[type=number] {

	-webkit-appearance: none;
	box-shadow: none;
	border: 1px solid black;
	border-radius: 5px;

}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {

    -webkit-appearance: none;
    margin: 0;

}

input[type=number] {

    -moz-appearance:textfield;

}

input[type=radio] {

	display: none;

}

input[type=radio] + label {

	display: inline-block;
	vertical-align: middle;
	min-width: 25px;
	height: 20px;
	line-height: 20px;
	text-align: center;
	border: 1px solid black;
	border-radius: 5px;
	background-color: #eee;

}

input[type=radio]:checked + label {

	border-width: 2px;
	background-color: #fafafa

}

.mathcell {

	width: 5in;
	margin: .25in auto .25in auto;
	border: 2px solid black;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding: .25in .5in .5in .5in;
	line-height: 2.5;

}

/* Courtesy of http://jsfiddle.net/NQ6ww/38/ */

.matrix:before, .matrix:after {

	content: "";
	position: absolute;
	top: 0;
	border: 1.5px solid black;
	width: 10px;
	height: 100%;

}

.matrix:before {

	left: 5px;
	border-right: 0px;

}

.matrix:after {

	right: 5px;
	border-left: 0px;

}

/*
Generated at http://www.cssportal.com/style-input-range/
Thumb is 20px by 25px with 5px radius
Track is 10px high with 3px radius
For MS, 1px margins top and right to avoid cutoffs
Replace when major browsers support common styling
*/

input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #000000;
  height: 20px;
  width: 25px;
  border-radius: 5px;
  background: #eee;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #FFFFFF;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #000000;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #000000;
  height: 20px;
  width: 25px;
  border-radius: 5px;
  background: #eee;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 3px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-fill-upper {
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 3px;
  box-shadow: 0px 0px 0px #000000;
  margin-right: 1px;
}
input[type=range]::-ms-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #000000;
  height: 18px;
  width: 25px;
  border-radius: 5px;
  background: #eee;
  cursor: pointer;
  margin-top: 1px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #FFFFFF;
}
input[type=range]:focus::-ms-fill-upper {
  background: #FFFFFF;
}


/* not in cssportal */
input[type=range]::-moz-focus-outer {
  border: 0;
}

`;

document.getElementsByTagName( 'head' )[0].appendChild( mathcellStyle );


// return arrays of objects for all plots


function plot( f, xRange, options={} ) {

  if ( xRange.length < 3 ) xRange[2] = 200;

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  var points = [];
  linspace( xRange[0], xRange[1], xRange[2] ).forEach(
    x => points.push( [ x, f(x) ] )
  );

  return [ { points: points, options: options, type: 'line' } ];

}


function listPlot( points, options={} ) {

  if ( Array.isArray( arguments[1] ) ) {

    // working copy of points
    points = JSON.parse( JSON.stringify( points ) );

    // assume arrays of same lengths and depths
    var dim = arguments[0][0].length - 1;

    for ( var i = 1 ; i < arguments.length ; i++ )
      if ( Array.isArray( arguments[i] ) )
        for ( var j = 0 ; j < arguments[0].length ; j++ )
          // only add last coordinates together
          points[j][dim] += arguments[i][j][dim];

    if ( !Array.isArray( arguments[ arguments.length - 1 ] ) )
      options = arguments[ arguments.length - 1 ];
    else options = {};

  }

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  return [ { points: points, options: options, type: 'line' } ];

}

function polarPlot( f, aRange, options={} ) {

  if ( aRange.length < 3 ) aRange[2] = 200;

  return parametric( a => [ f(a)*Math.cos(a), f(a)*Math.sin(a) ], aRange, options );

}


function parametric( vector, xRange, yRange, options={} ) {

  var slices = xRange.length < 3 ? 50 : xRange[2];
  var xStep = ( xRange[1] - xRange[0] ) / slices;

  if ( !Array.isArray( yRange ) ) {

    var points = [];
    for ( var i = 0 ; i <= slices ; i++ ) {
      var x = xRange[0] + i * xStep;
      points.push( vector(x) );
    }

    return line( points, yRange );

  }

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;
  if ( !( 'material' in options ) ) options.material = 'phong';

  var stacks = yRange.length < 3 ? 50 : yRange[2];
  var yStep = ( yRange[1] - yRange[0] ) / stacks;

  var vertices = [];
  if ( 'colormap' in options ) options.colors = [];

  for ( var i = 0 ; i <= stacks ; i++ ) {
    var y = yRange[0] + i * yStep;
    for ( var j = 0 ; j <= slices ; j++ ) {
      var x = xRange[0] + j * xStep;
      var v = vector(x,y);

      if ( 'complexFunction' in options )
        switch( options.complexFunction ) {
          case 're':
            vertices.push( [ v[0], v[1], v[2].re ] );
            break;
          case 'im':
            vertices.push( [ v[0], v[1], v[2].im ] );
            break;
          case 'abs':
            vertices.push( [ v[0], v[1], Math.sqrt( v[2].re**2 + v[2].im**2 ) ] );
            break;
          default:
            throw Error( 'Unsupported complex function case' );
        }
      else vertices.push( v );

      if ( 'colormap' in options )
        if ( options.colormap === 'complexArgument' ) {
          var p = Math.atan2( v[2].im, v[2].re ) / Math.PI / 2;
          if ( p < 0 ) p += 1;
          options.colors.push( p );
        }
      else {
        var p = ( options.colormap(x,y) % 1 + 1 ) % 1;
        options.colors.push( p );
      }
    }
  }

  var faces = [];
  var count = slices + 1;
  for ( var i = 0 ; i < stacks ; i++ ) {
    for ( var j = 0 ; j < slices ; j++ ) {
      faces.push( [j+count*i, j+count*i+1, j+count*(i+1)+1, j+count*(i+1)] );
    }
  }

  return [ { vertices: vertices, faces: faces, options: options, type: 'surface' } ];

}


function wireframe( vector, xRange, yRange, options={} ) {

  if ( !options.openEnded ) options.openEnded = true;

  var slices = xRange.length < 3 ? 50 : xRange[2];
  var xStep = ( xRange[1] - xRange[0] ) / slices;

  var stacks = yRange.length < 3 ? 50 : yRange[2];
  var yStep = ( yRange[1] - yRange[0] ) / stacks;

  var lines = [];

  for ( var i = 0 ; i <= slices ; i++ ) {
    var x = xRange[0] + i * xStep;
    var points = [];
    for ( var j = 0 ; j <= stacks ; j++ ) {
      var y = yRange[0] + j * yStep;
      points.push( vector(x,y) );
    }
    line( points, options ).forEach( l => lines.push( l ) );
  }

  for ( var i = 0 ; i <= stacks ; i++ ) {
    var y = yRange[0] + i * yStep;
    var points = [];
    for ( var j = 0 ; j <= slices ; j++ ) {
      var x = xRange[0] + j * xStep;
      points.push( vector(x,y) );
    }
    line( points, options ).forEach( l => lines.push( l ) );
  }

  return lines;

}


function surfaceFromLines( lines, options={} ) {

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;
  if ( !( 'material' in options ) ) options.material = 'phong';

  var vertices = [], faces = [];

  vertices = vertices.concat( lines[0] );
  var l = vertices.length;

  for ( var i = 1 ; i < lines.length ; i++ ) {

    vertices = vertices.concat( lines[i] );

    for ( var j = 0 ; j < l - 1 ; j++ )
      faces.push( [ (i-1)*l + j, (i-1)*l + j + 1, i*l + j + 1, i*l + j ] ); 

  }

  return [ { vertices: vertices, faces: faces, options: options, type: 'surface' } ];

}


function slopeField( f, xRange, yRange, zRange, options={} ) {

  if ( xRange.length < 3 ) xRange[2] = 20;
  if ( yRange.length < 3 ) yRange[2] = 20;

  var xStep = ( xRange[1] - xRange[0] ) / xRange[2];
  var yStep = ( yRange[1] - yRange[0] ) / yRange[2];

  var field = [];

function scale( v, s ) {

  for ( var i = 0 ; i < v.length ; i++ ) v[i] *= s;
  return v;

}

  if ( !Array.isArray( zRange ) ) {

    for ( var i = 0 ; i <= xRange[2] ; i++ ) {
      var x = xRange[0] + i * xStep;
      for ( var j = 0 ; j <= yRange[2] ; j++ ) {
        var y = yRange[0] + j * yStep;
        var v = scale( normalize( [ 1, f(x,y) ] ), .25*Math.min( xStep, yStep ) );
        field.push( line( translate( [ [-v[0],-v[1]], [v[0],v[1]] ], [x,y] ), zRange )[0] );
      }
    }

    return field;

  }

  if ( zRange.length < 3 ) zRange[2] = 20;

  var zStep = ( zRange[1] - zRange[0] ) / zRange[2];

  for ( var i = 0 ; i <= xRange[2] ; i++ ) {
    var x = xRange[0] + i * xStep;
    for ( var j = 0 ; j <= yRange[2] ; j++ ) {
      var y = yRange[0] + j * yStep;
      for ( var k = 0 ; k <= zRange[2] ; k++ ) {
        var z = zRange[0] + k * yStep;
        var v = scale( normalize( [ 1, f(x,y,z)[0], f(x,y,z)[1] ] ), .25*Math.min( xStep, yStep, zStep ) );
        field.push( line( translate( [ [-v[0],-v[1],-v[2]], [v[0],v[1],v[2]] ], [x,y,z] ), options )[0] );
      }
    }
  }

  return field;

}


// return arrays of objects for all graphics
// face indices always counter-clockwise for consistency


function arrow( begin, end, options={} ) {

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  options.fill = true;

  // assume 2D for now
  var t = normalize( [ end[0]-begin[0], end[1]-begin[1] ] );
  var n = [ t[1], -t[0] ];
  var d = normalize( [ n[0]-t[0], n[1]-t[1] ] );

  size = .05;
  var p1 = [ end[0]+size*d[0], end[1]+size*d[1] ];
  var p2 = [ p1[0]-Math.sqrt(2)*size*n[0], p1[1]-Math.sqrt(2)*size*n[1] ];

  return [ { points: [ begin, end, p1, p2, end ], options: options, type: 'line' } ];

}


function text( string, point, options={} ) {

  if ( !( 'color' in options ) ) options.color = 'black';
  if ( !( 'fontSize' in options ) ) options.fontSize = 14;

  return [ { text: string, point: point, options: options, type: 'text' } ];

}


function point( point, options={} ) {

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;
  if ( !( 'size' in options ) ) options.size = 1;

  return [ { point: point, options: options, type: 'point' } ];

}


function line( points, options={} ) {

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  if ( 'radius' in options ) {

    var segments = [];

    if ( options.endcaps ) {
      options.center = points[0];
      segments.push( sphere( options.radius, options )[0] );
    }

    for ( var i = 1 ; i < points.length ; i++ ) {

      var a = points[i-1];
      var b = points[i];

      var height = Math.sqrt( (b[0]-a[0])**2 + (b[1]-a[1])**2 + (b[2]-a[2])**2 );

      options.axis = [ b[0]-a[0], b[1]-a[1], b[2]-a[2] ];
      options.center = [ (a[0]+b[0])/2, (a[1]+b[1])/2, (a[2]+b[2])/2 ];

      segments.push( cylinder( options.radius, height, options )[0] );

      if ( options.endcaps ) {
        options.center = b;
        segments.push( sphere( options.radius, options )[0] );
      }

    }

    return segments;

  }

  else {

    if ( !( 'linewidth' in options ) ) options.linewidth = 1;

    return [ { points: points, options: options, type: 'line' } ];

  }

}


// simple 3D objects

function box( width, depth, height, options={} ) {

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  var x = width / 2;
  var y = depth / 2;
  var z = height / 2;

  var vertices = [ [x,y,z], [-x,y,z], [-x,-y,z], [x,-y,z],
                   [x,y,-z], [-x,y,-z], [-x,-y,-z], [x,-y,-z] ];

  var faces = [ [0,1,2,3], [4,7,6,5], [0,4,5,1], [2,6,7,3],
                [0,3,7,4], [1,5,6,2] ];

  if ( 'center' in options ) translate( vertices, options.center );

  return [ { vertices: vertices, faces: faces, options: options, type: 'surface' } ];

}

function sphere( radius, options={} ) {

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  var steps = 'steps' in options ? options.steps : 20;
  var r = radius;

  var vertices = [ [ 0, 0, r ], [ 0, 0, -r ] ];
  var faces = [];

  for ( var i = 1 ; i < steps ; i++ ) {

    var a = Math.PI * i / steps;

    for ( var j = 0 ; j <= steps ; j++ ) {

      var b = 2 * Math.PI * j / steps;

      vertices.push( [ r * Math.sin(a) * Math.cos(b),
                       r * Math.sin(a) * Math.sin(b),
                       r * Math.cos(a) ] );

    }

  }

  for ( var i = 2 ; i < steps + 2 ; i++ )
    faces.push( [ 0, i, i+1 ] ); // top

  for ( var i = 1 ; i < steps - 1 ; i++ ) {

    var k = ( i - 1 ) * ( steps + 1 ) + 2;

    for ( var j = 0 ; j < steps ; j++ )

      faces.push( [ k+j, k+j + steps+1, k+j+1 + steps+1, k+j+1 ] );

  }

  for ( var i = vertices.length - steps - 1 ; i < vertices.length - 1 ; i++ )
    faces.push( [ 1, i+1, i ] ); // bottom

  if ( 'center' in options ) translate( vertices, options.center );

  return [ { vertices: vertices, faces: faces, options: options, type: 'surface' } ];

}

function cylinder( radius, height, options={} ) {

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  if ( options.endcaps ) options.openEnded = true;

  var steps = 'steps' in options ? options.steps : 20;
  var r = radius;
  var h = height / 2;

  var vertices = [ [ 0, 0, h ], [ 0, 0, -h ] ];
  var faces = [];

  for ( var i = 0 ; i <= steps ; i++ ) {

    var a = 2 * Math.PI * i / steps;

    vertices.push( [ r * Math.cos(a), r * Math.sin(a), h ],
                   [ r * Math.cos(a), r * Math.sin(a), -h ] );

  }

  if ( !options.openEnded )
   for ( var i = 2 ; i < vertices.length - 3 ; i += 2 )
     faces.push( [ 0, i, i+2 ] );

  for ( var i = 2 ; i < vertices.length - 3 ; i += 2 )
    faces.push( [ i, i+1, i+3, i+2 ] );

  if ( !options.openEnded )
   for ( var i = 2 ; i < vertices.length - 3 ; i += 2 )
     faces.push( [ 1, i+3, i+1 ] );

  if ( 'axis' in options ) {

    var v = options.axis;
    var angle = Math.acos( v[2] / Math.sqrt( v[0]*v[0] + v[1]*v[1] + v[2]*v[2] ) );

    rotate( vertices, angle, [ -v[1], v[0], 0 ] );

  }

  if ( 'center' in options ) translate( vertices, options.center );

  return [ { vertices: vertices, faces: faces, options: options, type: 'surface' } ];

}


function svgPlot( id, data, config ) {

  if ( JSON.stringify( data ).includes( 'null' ) ) throw Error( 'Infinity or NaN in input data' );

  function parsedLength( input ) {

    var frag = new DOMParser().parseFromString( input, 'text/html' );
    return frag.documentElement.textContent.length;

  }

  function decimalsInNumber( x ) {

    for ( var i = 0 ; i < 100 ; i++ ) {
      if ( roundTo( x, i, false ) === x ) break;
    }
    return i;

  }

  function chop( x, tolerance=1e-10 ) {

    if ( Math.abs(x) < tolerance ) x = 0;
    return x;

  }

  var n = 'output' in config ? config.output : '';
  var output = document.getElementById( id + 'output' + n );

  var width = output.offsetWidth;
  var height = output.offsetHeight;
  var ext = 20; // axis extension

  if ( config.includeOrigin ) data.push( [ { points: [[0,0]], options: { color: '' }, type: 'line' } ] );

  var texts = [], points = [], lines = [];

  for ( var i = 0 ; i < data.length ; i++ )
    for ( var j = 0 ; j < data[i].length ; j++ ) {
      var d = data[i][j];
      if ( d.type === 'text' ) texts.push( d );
      if ( d.type === 'point' ) points.push( d );
      if ( d.type === 'line' ) lines.push( d );
    }

  var all = [];
  for ( var i = 0 ; i < texts.length ; i++ ) all.push( texts[i].point );
  for ( var i = 0 ; i < points.length ; i++ ) all.push( points[i].point );
  for ( var i = 0 ; i < lines.length ; i++ ) lines[i].points.forEach( p => all.push( p ) );

  var xMinMax = minMax( all, 0 );
  var yMinMax = minMax( all, 1 );

  // rounding currently to remove excessive decimals
  // add option when needed for rounding to significant digits

  var xMin = 'xMin' in config ? config.xMin : floorTo( xMinMax.min, 4, false );
  var xMax = 'xMax' in config ? config.xMax : ceilTo( xMinMax.max, 4, false );
  var yMin = 'yMin' in config ? config.yMin : floorTo( yMinMax.min, 4, false );
  var yMax = 'yMax' in config ? config.yMax : ceilTo( yMinMax.max, 4, false );

  if ( xMin === xMax ) { xMin -= 1; xMax += 1; }
  if ( yMin === yMax ) { yMin -= 1; yMax += 1; }

  if ( config.equalLimits ) {

    if ( xMin < yMin ) yMin = xMin;
    else xMin = yMin;

    if ( xMax > yMax ) yMax = xMax;
    else xMax = yMax;

  }

  var xRange = xMax - xMin;
  var yRange = yMax - yMin;

  var xScale = width / xRange;
  var yScale = height / yRange;
  if ( config.equalAspect ) yScale = xScale;

  var axes = 'axes' in config ? config.axes : true;
  if ( !axes ) config.ticks = false;

  var ticks = 'ticks' in config ? config.ticks : [ 'auto', 'auto' ];
  if ( ticks === 'auto' ) ticks = [ 'auto', 'auto' ];
  if ( ticks === 'none' ) ticks = false;
  var tickSize = 5;

  if ( ticks[0] === 'auto' ) {
    ticks[0] = Math.pow( 10, Math.floor( Math.log10(xRange) ) );
    if ( 3*ticks[0] > xRange ) ticks[0] /= 2;
    if ( 4*ticks[0] > xRange ) ticks[0] /= 2;
  }
  if ( ticks[1] === 'auto' ) {
    ticks[1] = Math.pow( 10, Math.floor( Math.log10(yRange) ) );
    if ( 3*ticks[1] > yRange ) ticks[1] /= 2;
    if ( 4*ticks[1] > yRange ) ticks[1] /= 2;
  }

  var xTickDecimals = decimalsInNumber( ticks[0] );
  var yTickDecimals = decimalsInNumber( ticks[1] );

  // size of largest y-axis tick label
  var yNumSize = 10 * Math.max( roundTo( yMin, yTickDecimals, false ).toString().length,
                                roundTo( yMax, yTickDecimals, false ).toString().length,
                                roundTo( 3*ticks[1], yTickDecimals, false ).toString().length  );

  // offsets of numbers from axes, inverted when on right/top
  var xOffset = 10;
  var yOffset = 16;

  var xAxisLabel = 'axesLabels' in config ? config.axesLabels[0] : '';
  var xLabel = xAxisLabel.length > 0 ? Math.max( 20, 15 * parsedLength( xAxisLabel ) ) : 0;
  var yAxisLabel = 'axesLabels' in config ? config.axesLabels[1] : '';
  var yLabelSize = 4.5 * parsedLength( yAxisLabel );
  var yLabel = yAxisLabel.length > 0 ? 20 : 0;

  // mathematical origin vs. location of axis
  var xOrigin = Math.round( -xMin * xScale );
  var xAxis = xOrigin;
  var gutter = ticks ? Math.max( ext, yNumSize + xOffset - xOrigin, yLabelSize - xOrigin ) : ext;
  var xTotal = width + gutter + ext + xLabel;
  var xShift = gutter;

  if ( xOrigin < 0 ) {
    xAxis = -1.5*ext;
    gutter = ticks ? Math.max( ext, yNumSize + xOffset, yLabelSize ) : ext;
    xTotal = width + gutter + 2.5*ext + xLabel;
    xShift = gutter + 1.5*ext;
  }
  if ( xOrigin > width ) {
    xAxis = width + 1.5*ext;
    gutter = ticks ? Math.max( yNumSize, yLabelSize, xLabel ) : xLabel;
    xTotal = width + gutter + 2.5*ext;
    xOffset = ticks ? -yNumSize : ext;
  }

  // mathematical origin vs. location of axis
  var yOrigin = Math.round( yMax * yScale );
  var yAxis = yOrigin;
  var yTotal = height + 2*ext + yLabel;
  var yShift = ext + yLabel;

  if ( yOrigin < 0 ) {
    yAxis = -1.5*ext;
    yTotal += .5*ext + yOffset;
    yShift = 1.5*ext + yOffset;
    yOffset = -6;
    if ( yLabel > 0 ) yLabel += 12;
  }
  if ( yOrigin > height ) {
    yAxis = height + 1.5*ext;
    yTotal += .5*ext + 1.5*yOffset;
  }

  var svg = `
<svg width="${width}" height="${height}" preserveAspectRatio="none"
     viewBox="${-xShift} ${-yShift} ${xTotal} ${yTotal}"
     xmlns="http://www.w3.org/2000/svg">`;

  if ( axes ) {

    svg += `<path d="M ${-ext} ${yAxis} L ${width + ext} ${yAxis}" stroke="black"/>`;
    svg += `<path d="M ${xAxis} ${-ext} L ${xAxis} ${height + ext}" stroke="black"/>`;

    if ( ticks ) {

      var xStart = ticks[0] * Math.ceil( xMin / ticks[0] );
      for ( var i = xStart ; i <= xMax ; i += ticks[0] ) {
        if ( chop(i) !== 0 || ( yOrigin !== yAxis && yLabel === 0 ) ) {
          var x = Math.round( xOrigin + xScale*i );
          svg += `<path d="M ${x} ${yAxis} L ${x} ${yAxis - Math.sign(yOffset)*tickSize}"
                        stroke="black" />`;
          svg += `<text x="${x}" y="${yAxis + yOffset}"
                        font-family="monospace" text-anchor="middle">
                  ${+i.toFixed(xTickDecimals)}</text>`;
        }
      }

      var yStart = ticks[1] * Math.ceil( yMin / ticks[1] );
      for ( var i = yStart ; i <= yMax ; i += ticks[1] ) {
        if ( chop(i) !== 0 || ( xOrigin !== xAxis && xLabel === 0 ) ) {
          var y = Math.round( yOrigin - yScale*i );
          svg += `<path d="M ${xAxis} ${y} L ${xAxis + Math.sign(xOffset)*tickSize} ${y}"
                        stroke="black" />`;
          svg += `<text x="${xAxis - xOffset}" y="${y}"
                        font-family="monospace" text-anchor="end" dominant-baseline="central">
                  ${+i.toFixed(yTickDecimals)}</text>`;
        }
      }

    }

    svg += `<text x="${width + ext + Math.abs(xOffset)}" y="${yAxis}"
            font-family="monospace" font-size="110%" font-weight="bold"
            dominant-baseline="central">${xAxisLabel}</text>`;
    svg += `<text x="${xAxis}" y="${-ext - yLabel/2}"
            font-family="monospace" font-size="110%" font-weight="bold"
            text-anchor="middle">${yAxisLabel}</text>`;

  }


  function xPos( x ) { return roundTo( xOrigin + xScale*x, 2, false ); }

  function yPos( y ) { return roundTo( yOrigin - yScale*y, 2, false ); }


  for ( var i = 0 ; i < lines.length ; i++ ) {

    // working copy of line
    var l = JSON.parse( JSON.stringify( lines[i] ) );

    l.points.forEach( p => {
      // set possibly huge values to just beyond limits
      if ( p[1] < yMin ) p[1] = yMin - 1;
      if ( p[1] > yMax ) p[1] = yMax + 1;
    } );

    var x = l.points[0][0];
    var y = l.points[0][1];

    svg += `<path d="M ${ xPos(x) } ${ yPos(y) }`;
    var lastX = x;
    var lastY = y;

    for ( var k = 1 ; k < l.points.length ; k++ ) {

      x = l.points[k][0];
      y = l.points[k][1];

      function intercept( u ) {
        return (u - lastY) / (y - lastY) * (x - lastX) + lastX;
      }

      // both points inside bounds
      if ( ( lastY >= yMin && y >= yMin ) && ( lastY <= yMax && y <= yMax) )
        svg += ` L ${ xPos(x) } ${ yPos(y) }`;

      // both points outside bounds
      if ( ( lastY < yMin && y < yMin ) || ( lastY > yMax && y > yMax) )
        svg += ` M ${ xPos(x) } ${ yPos(y) }`;
      if ( lastY < yMin && y > yMax ) {
        if ( config.includeVerticals ) {
          svg += ` M ${ xPos( intercept(yMin) ) } ${ yPos(yMin) }`;
          svg += ` L ${ xPos( intercept(yMax) ) } ${ yPos(yMax) }`;
          svg += ` M ${ xPos(x) } ${ yPos(y) }`;
        }
        else svg += ` M ${ xPos(x) } ${ yPos(y) }`;
      }
      if ( lastY > yMax && y < yMin ) {
        if ( config.includeVerticals ) {
          svg += ` M ${ xPos( intercept(yMax) ) } ${ yPos(yMax) }`;
          svg += ` L ${ xPos( intercept(yMin) ) } ${ yPos(yMin) }`;
          svg += ` M ${ xPos(x) } ${ yPos(y) }`;
        }
        else svg += ` M ${ xPos(x) } ${ yPos(y) }`;
      }

      // line between points crosses bounds
      if ( lastY < yMin && y >= yMin && y < yMax ) {
        svg += ` M ${ xPos( intercept(yMin) ) } ${ yPos(yMin) }`;
        svg += ` L ${ xPos(x) } ${ yPos(y) }`;
      }
      if ( lastY >= yMin && lastY < yMax && y < yMin ) {
        svg += ` L ${ xPos( intercept(yMin) ) } ${ yPos(yMin) }`;
        svg += ` M ${ xPos(x) } ${ yPos(y) }`;
      }
      if ( lastY <= yMax && lastY > yMin && y > yMax ) {
        svg += ` L ${ xPos( intercept(yMax) ) } ${ yPos(yMax) }`;
        svg += ` M ${ xPos(x) } ${ yPos(y) }`;
      }
      if ( lastY > yMax && y <= yMax && y > yMin ) {
        svg += ` M ${ xPos( intercept(yMax) ) } ${ yPos(yMax) }`;
        svg += ` L ${ xPos(x) } ${ yPos(y) }`;
      }

      var lastX = x;
      var lastY = y;

    }

    svg += `" stroke="${l.options.color}" stroke-width="1.5" fill="${l.options.fill ? l.options.color : 'none'}"/>`;

  }

  // draw points on top of lines for now

  for ( var i = 0 ; i < points.length ; i++ ) {

    var c = points[i];
    svg += `<circle cx="${ xPos(c.point[0]) }" cy="${ yPos(c.point[1]) }"
                    r="${ 3 * c.options.size }" fill="${ c.options.color }"/>`;

  }

  for ( var i = 0 ; i < texts.length ; i++ ) {

    var t = texts[i];
    svg += `<text x="${ xPos(t.point[0]) }" y="${ yPos(t.point[1]) }"
                  fill="${ t.options.color }" font-size="${ t.options.fontSize }"
                  text-anchor="middle" dominant-baseline="central">
            ${t.text}</text>`;

  }

  return svg + '</svg>';

}


function threejsPlot( id, data, config ) {

  if ( JSON.stringify( data ).includes( 'null' ) ) throw Error( 'Infinity or NaN in input data' );

  if ( !( 'ambientLight' in config ) ) config.ambientLight = 'rgb(127,127,127)';
  if ( !( 'animate' in config ) ) config.animate = false;
  if ( !( 'aspectRatio' in config ) ) config.aspectRatio = [1,1,1];
  if ( !( 'axes' in config ) ) config.axes = false;
  if ( !( 'axesLabels' in config ) ) config.axesLabels = ['x','y','z'];
  if ( !( 'clearColor' in config ) ) config.clearColor = 'white';
  if ( !( 'decimals' in config ) ) config.decimals = 2;
  if ( !( 'frame' in config ) ) config.frame = true;
  if ( !( 'viewpoint' in config ) ) config.viewpoint = 'auto';

  if ( !config.frame ) config.axesLabels = false;

  var n = 'output' in config ? config.output : '';
  var output = document.getElementById( id + 'output' + n );

  if ( output.children.length > 0 && output.children[0].contentWindow ) {

    var cw = output.children[0].contentWindow;
    var v = cw.camera.position;

    // only direction of viewpoint meaningful, not normalization
    config.viewpoint = [ v.x - cw.xMid, v.y - cw.yMid, v.z - cw.zMid ];

  }

  var texts = [], points = [], lines = [], surfaces = [];

  for ( var i = 0 ; i < data.length ; i++ )
    for ( var j = 0 ; j < data[i].length ; j++ ) {
      var d = data[i][j];
      if ( d.type === 'text' ) texts.push( d );
      if ( d.type === 'point' ) points.push( d );
      if ( d.type === 'line' ) lines.push( d );
      if ( d.type === 'surface' ) {
        d.vertices = roundTo( d.vertices, 3, false ); // reduce raw data size
        if ( 'colors' in d.options ) d.options.colors = roundTo( d.options.colors, 3 );
        surfaces.push( d );
      }
    }

  var all = [];
  for ( var i = 0 ; i < texts.length ; i++ ) all.push( texts[i].point );
  for ( var i = 0 ; i < points.length ; i++ ) all.push( points[i].point );
  for ( var i = 0 ; i < lines.length ; i++ ) lines[i].points.forEach( p => all.push( p ) );
  for ( var i = 0 ; i < surfaces.length ; i++ ) surfaces[i].vertices.forEach( p => all.push( p ) );

  var xMinMax = minMax( all, 0 );
  var yMinMax = minMax( all, 1 );
  var zMinMax = minMax( all, 2 );

  if ( !( 'xMin' in config ) ) config.xMin = xMinMax.min;
  if ( !( 'yMin' in config ) ) config.yMin = yMinMax.min;
  if ( !( 'zMin' in config ) ) config.zMin = zMinMax.min;

  if ( !( 'xMax' in config ) ) config.xMax = xMinMax.max;
  if ( !( 'yMax' in config ) ) config.yMax = yMinMax.max;
  if ( !( 'zMax' in config ) ) config.zMax = zMinMax.max;

  var border = config.no3DBorder ? 'none' : '1px solid black';

  config = JSON.stringify( config );

  var lights = JSON.stringify( [ { position: [-5,3,0], color: 'rgb(127,127,127)', parent: 'camera' } ] );

  texts = JSON.stringify( texts );
  points = JSON.stringify( points );
  lines = JSON.stringify( lines );
  surfaces = JSON.stringify( surfaces );

  var html = threejsTemplate( config, lights, texts, points, lines, surfaces );

  return `<iframe style="width: 100%; height: 100%; border: ${border};"
                  srcdoc="${html.replace( /\"/g, '&quot;' )}" scrolling="no"></iframe>`;

}


function threejsTemplate( config, lights, texts, points, lines, surfaces ) {

  return `
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta charset="utf-8">
<meta name=viewport content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<style>

     body { margin: 0px; overflow: hidden; }

</style>
</head>

<body>

<script src="https://cdn.jsdelivr.net/gh/mrdoob/three.js@r100/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/mrdoob/three.js@r100/examples/js/controls/OrbitControls.js"></script>

<script>

var config = ${config};
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( config.clearColor, 1 );
document.body.appendChild( renderer.domElement );

var a = config.aspectRatio; // aspect multipliers
var animate = config.animate;

var xMin = config.xMin, yMin = config.yMin, zMin = config.zMin;
var xMax = config.xMax, yMax = config.yMax, zMax = config.zMax;

if ( xMin === xMax ) { xMin -= 1; xMax += 1; }
if ( yMin === yMax ) { yMin -= 1; yMax += 1; }
if ( zMin === zMax ) { zMin -= 1; zMax += 1; }

// apply aspect multipliers for convenience
xMin *= a[0]; yMin *= a[1]; zMin *= a[2];
xMax *= a[0]; yMax *= a[1]; zMax *= a[2];

var xRange = xMax - xMin;
var yRange = yMax - yMin;
var zRange = zMax - zMin;
var rRange = Math.sqrt( xRange*xRange + yRange*yRange );

if ( zRange > rRange && a[2] === 1 ) {
  a[2] = rRange / zRange;
  zMin *= a[2];
  zMax *= a[2];
  zRange *= a[2];
}

var xMid = ( xMin + xMax ) / 2;
var yMid = ( yMin + yMax ) / 2;
var zMid = ( zMin + zMax ) / 2;

var box = new THREE.Geometry();
box.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );
box.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );
var boxMesh = new THREE.Line( box );
if ( config.frame ) scene.add( new THREE.BoxHelper( boxMesh, 'black' ) );

if ( config.axesLabels ) {

  var d = config.decimals; // decimals
  var offsetRatio = 0.1;
  var al = config.axesLabels;

  var offset = offsetRatio * ( yMax - yMin );
  var xm = ( xMid/a[0] ).toFixed(d);
  if ( /^-0.?0*$/.test(xm) ) xm = xm.substr(1);
  addLabel( al[0] + '=' + xm, xMid, yMax+offset, zMin );
  addLabel( ( xMin/a[0] ).toFixed(d), xMin, yMax+offset, zMin );
  addLabel( ( xMax/a[0] ).toFixed(d), xMax, yMax+offset, zMin );

  var offset = offsetRatio * ( xMax - xMin );
  var ym = ( yMid/a[1] ).toFixed(d);
  if ( /^-0.?0*$/.test(ym) ) ym = ym.substr(1);
  addLabel( al[1] + '=' + ym, xMax+offset, yMid, zMin );
  addLabel( ( yMin/a[1] ).toFixed(d), xMax+offset, yMin, zMin );
  addLabel( ( yMax/a[1] ).toFixed(d), xMax+offset, yMax, zMin );

  var offset = offsetRatio * ( yMax - yMin );
  var zm = ( zMid/a[2] ).toFixed(d);
  if ( /^-0.?0*$/.test(zm) ) zm = zm.substr(1);
  addLabel( al[2] + '=' + zm, xMax, yMin-offset, zMid );
  addLabel( ( zMin/a[2] ).toFixed(d), xMax, yMin-offset, zMin );
  addLabel( ( zMax/a[2] ).toFixed(d), xMax, yMin-offset, zMax );

}

function addLabel( text, x, y, z, color='black', fontsize=14 ) {

  var canvas = document.createElement( 'canvas' );
  var pixelRatio = Math.round( window.devicePixelRatio );
  canvas.width = 128 * pixelRatio;
  canvas.height = 32 * pixelRatio; // powers of two
  canvas.style.width = '128px';
  canvas.style.height = '32px';

  var context = canvas.getContext( '2d' );
  context.scale( pixelRatio, pixelRatio );
  context.fillStyle = color;
  context.font = fontsize + 'px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText( text, canvas.width/2/pixelRatio, canvas.height/2/pixelRatio );

  var texture = new THREE.Texture( canvas );
  texture.needsUpdate = true;

  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: texture } ) );
  sprite.position.set( x, y, z );
  sprite.scale.set( 1, .25 ); // ratio of width to height
  scene.add( sprite );

}

if ( config.axes ) scene.add( new THREE.AxesHelper( Math.min( xMax, yMax, zMax ) ) );

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.up.set( 0, 0, 1 );

// default auto position, followed by rotation to viewpoint direction
camera.position.set( xMid, yMid, zMid );
var defaultOffset = new THREE.Vector3( xRange, yRange, zRange );

if ( config.viewpoint !== 'auto' ) {
  var v = config.viewpoint;
  var t = new THREE.Vector3( v[0], v[1], v[2] );
  var phi = defaultOffset.angleTo( t );
  var n = t.cross( defaultOffset ).normalize();
  defaultOffset.applyAxisAngle( n, -phi );
}

camera.position.add( defaultOffset );

var lights = ${lights};

for ( var i = 0 ; i < lights.length ; i++ ) {
  var light = new THREE.DirectionalLight( lights[i].color, 1 );
  var v = lights[i].position;
  light.position.set( a[0]*v[0], a[1]*v[1], a[2]*v[2] );
  if ( lights[i].parent === 'camera' ) {
    light.target.position.set( xMid, yMid, zMid );
    scene.add( light.target );
    camera.add( light );
  } else scene.add( light );
}
scene.add( camera );

scene.add( new THREE.AmbientLight( config.ambientLight, 1 ) );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target.set( xMid, yMid, zMid );
controls.addEventListener( 'change', function() { if ( !animate ) render(); } );

window.addEventListener( 'resize', function() {

  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if ( !animate ) render();

} );

window.addEventListener( 'mousedown', suspendAnimation );
window.addEventListener( 'mousemove', suspendAnimation );
window.addEventListener( 'mousewheel', suspendAnimation );

window.addEventListener( 'touchstart', suspendAnimation );
window.addEventListener( 'touchmove', suspendAnimation );
window.addEventListener( 'touchend', suspendAnimation );

var suspendTimer;

function suspendAnimation() {
  clearInterval( suspendTimer );
  animate = false;
  suspendTimer = setTimeout( function() { if ( config.animate ) { animate = true; render(); } }, 5000 );
}

var texts = ${texts};

for ( var i = 0 ; i < texts.length ; i++ ) {
  var t = texts[i];
  addLabel( t.text, t.point[0], t.point[1], t.point[2], t.options.color, t.options.fontSize );
}

var points = ${points};

for ( var i = 0 ; i < points.length ; i++ ) addPoint( points[i] );

function addPoint( p ) {

  var geometry = new THREE.Geometry();
  var v = p.point;
  geometry.vertices.push( new THREE.Vector3( a[0]*v[0], a[1]*v[1], a[2]*v[2] ) );

  var canvas = document.createElement( 'canvas' );
  canvas.width = 128;
  canvas.height = 128;

  var context = canvas.getContext( '2d' );
  context.arc( 64, 64, 64, 0, 2 * Math.PI );
  context.fillStyle = p.options.color;
  context.fill();

  var texture = new THREE.Texture( canvas );
  texture.needsUpdate = true;

  var transparent = p.options.opacity < 1 ? true : false;
  var material = new THREE.PointsMaterial( { size: p.options.size/20, map: texture,
                                             transparent: transparent, opacity: p.options.opacity,
                                             alphaTest: .1 } );

  var c = new THREE.Vector3();
  geometry.computeBoundingBox();
  geometry.boundingBox.getCenter( c );
  geometry.translate( -c.x, -c.y, -c.z );

  var mesh = new THREE.Points( geometry, material );
  mesh.position.set( c.x, c.y, c.z );
  scene.add( mesh );

}

var lines = ${lines};

for ( var i = 0 ; i < lines.length ; i++ ) addLine( lines[i] );

function addLine( l ) {

  var geometry = new THREE.Geometry();
  for ( var i = 0 ; i < l.points.length ; i++ ) {
    var v = l.points[i];
    geometry.vertices.push( new THREE.Vector3( a[0]*v[0], a[1]*v[1], a[2]*v[2] ) );
  }

  var transparent = l.options.opacity < 1 ? true : false;
  var material = new THREE.LineBasicMaterial( { color: l.options.color, linewidth: l.options.linewidth,
                                                transparent: transparent, opacity: l.options.opacity } );

  var c = new THREE.Vector3();
  geometry.computeBoundingBox();
  geometry.boundingBox.getCenter( c );
  geometry.translate( -c.x, -c.y, -c.z );

  var mesh = new THREE.Line( geometry, material );
  mesh.position.set( c.x, c.y, c.z );
  scene.add( mesh );

}

var surfaces = ${surfaces};

for ( var i = 0 ; i < surfaces.length ; i++ ) addSurface( surfaces[i] );

function addSurface( s ) {

  // apply aspect multipliers for convenience
  s.vertices.forEach( v => { v[0] *= a[0]; v[1] *= a[1]; v[2] *= a[2]; } );

  // remove faces completely outside vertical range
  for ( var i = s.faces.length - 1 ; i >= 0 ; i-- ) {
    var f = s.faces[i];
    var check = true;
    f.forEach( index => check &= s.vertices[index][2] < zMin );
    if ( check ) s.faces.splice( i, 1 );
    var check = true;
    f.forEach( index => check &= s.vertices[index][2] > zMax );
    if ( check ) s.faces.splice( i, 1 );
  }

  // constrain vertices to vertical range
  for ( var i = 0 ; i < s.vertices.length ; i++ ) {
    if ( s.vertices[i][2] < zMin ) s.vertices[i][2] = zMin;
    if ( s.vertices[i][2] > zMax ) s.vertices[i][2] = zMax;
  }

  // no appreciable speedup with BufferGeometry
  var geometry = new THREE.Geometry();
  for ( var i = 0 ; i < s.vertices.length ; i++ ) {
    var v = s.vertices[i];
    geometry.vertices.push( new THREE.Vector3( v[0], v[1], v[2] ) );
  }
  for ( var i = 0 ; i < s.faces.length ; i++ ) {
    var f = s.faces[i];
    for ( var j = 0 ; j < f.length - 2 ; j++ )
      geometry.faces.push( new THREE.Face3( f[0], f[j+1], f[j+2] ) );
  }

  geometry.mergeVertices(); // only need for lazy constructions
  geometry.computeVertexNormals();

  var side = s.options.singleSide ? THREE.FrontSide : THREE.DoubleSide;
  var transparent = s.options.opacity < 1 ? true : false;
  var material;

  switch ( s.options.material ) {

    case 'normal':

      material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } );
      break;

    case 'standard':

      material = new THREE.MeshStandardMaterial( {
                               color: s.options.color, side: side,
                               transparent: transparent, opacity: s.options.opacity } );
      break;

    case 'phong':
    default:

      material = new THREE.MeshPhongMaterial( {
                               color: s.options.color, side: side,
                               transparent: transparent, opacity: s.options.opacity,
                               shininess: 20 } );

  }

  if ( 'colors' in s.options ) {
    for ( var i = 0 ; i < geometry.vertices.length ; i++ )
      geometry.colors.push( new THREE.Color().setHSL( s.options.colors[i], 1, .5 ) );
    for ( var i = 0 ; i < geometry.faces.length ; i++ ) {
      var f = geometry.faces[i];
      f.vertexColors = [ geometry.colors[f.a], geometry.colors[f.b], geometry.colors[f.c] ];
    }
    material.vertexColors = THREE.VertexColors;
    material.color.set( 'white' ); // crucial!
  }

  var c = new THREE.Vector3();
  geometry.computeBoundingBox();
  geometry.boundingBox.getCenter( c );
  geometry.translate( -c.x, -c.y, -c.z );

  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( c.x, c.y, c.z );
  if ( s.options.renderOrder ) mesh.renderOrder = s.options.renderOrder;
  if ( s.options.rotationAxisAngle ) {
    mesh.userData.rotateOnAxis = true;
    var v = s.options.rotationAxisAngle[0];
    mesh.userData.axis = new THREE.Vector3( v[0], v[1], v[2] ).normalize();
    mesh.userData.angle = s.options.rotationAxisAngle[1];
  }

  if ( 'group' in s.options ) {

    var group = scene.getObjectByName( s.options.group );
    if ( !group ) {
      group = new THREE.Group();
      group.name = s.options.group;
      scene.add( group );
    }
    group.add( mesh );

    if ( mesh.userData.rotateOnAxis ) {
      mesh.userData.rotateOnAxis = false;
      group.userData.rotateOnAxis = true;
      group.userData.axis = mesh.userData.axis;
      group.userData.angle = mesh.userData.angle;
    }

  } else scene.add( mesh );

}

if ( config.clippingPlane ) {

  var v = config.clippingPlane[0];
  var d = config.clippingPlane[1];
  var plane = new THREE.Plane( new THREE.Vector3(v[0],v[1],v[2]).normalize(), d );
  renderer.clippingPlanes = [ plane ];

}

var scratch = new THREE.Vector3();

function render() {

  if ( animate ) requestAnimationFrame( render );
  renderer.render( scene, camera );

  scene.children.forEach( child => {

    if ( child.type === 'Sprite' ) {
      var adjust = scratch.addVectors( child.position, scene.position )
                          .sub( camera.position ).length() / 5;
      child.scale.set( adjust, .25*adjust ); // ratio of canvas width to height
    }

    if ( child.userData.rotateOnAxis && animate )
      child.rotateOnAxis( child.userData.axis, child.userData.angle );

  } );

}

render();
controls.update();
if ( !animate ) render();

</script>

</body>
</html>`;

}


function x3dPlot( id, data, config ) {

  if ( JSON.stringify( data ).includes( 'null' ) ) throw Error( 'Infinity or NaN in input data' );

  function compositeRotation( first, second ) {

    var a = first[0], na = first[1];
    var b = second[0], nb = second[1];

    var dot = na[0]*nb[0] + na[1]*nb[1] + na[2]*nb[2];
    var cross = [ na[1]*nb[2] - na[2]*nb[1],
                  na[2]*nb[0] - na[0]*nb[2],
                  na[0]*nb[1] - na[1]*nb[0]  ];

    var c = 2 * Math.acos( Math.cos(a/2) * Math.cos(b/2)
                           - dot * Math.sin(a/2) * Math.sin(b/2) );

    var nc = [];
    for ( var i = 0 ; i < 3 ; i++ )
      nc[i] = na[i] * Math.sin(a/2) * Math.cos(b/2) / Math.sin(c/2)
              + nb[i] * Math.cos(a/2) * Math.sin(b/2) / Math.sin(c/2)
              - cross[i] * Math.sin(a/2) * Math.sin(b/2) / Math.sin(c/2);

    return [ c, nc ];

  }

  var frame = 'frame' in config ? config.frame : true;

  var n = 'output' in config ? config.output : '';
  var output = document.getElementById( id + 'output' + n );

  var width = output.offsetWidth;
  var height = output.offsetHeight;

  var texts = [], points = [], lines = [], surfaces = [];

  for ( var i = 0 ; i < data.length ; i++ )
    for ( var j = 0 ; j < data[i].length ; j++ ) {
      var d = data[i][j];
      if ( d.type === 'text' ) texts.push( d );
      if ( d.type === 'point' ) points.push( d );
      if ( d.type === 'line' ) lines.push( d );
      if ( d.type === 'surface' ) {
        d.vertices = roundTo( d.vertices, 3, false ); // reduce raw data size
        surfaces.push( d );
      }
    }

  var all = [];
  for ( var i = 0 ; i < texts.length ; i++ ) all.push( texts[i].point );
  for ( var i = 0 ; i < points.length ; i++ ) all.push( points[i].point );
  for ( var i = 0 ; i < lines.length ; i++ ) lines[i].points.forEach( p => all.push( p ) );
  for ( var i = 0 ; i < surfaces.length ; i++ ) surfaces[i].vertices.forEach( p => all.push( p ) );

  var xMinMax = minMax( all, 0 );
  var yMinMax = minMax( all, 1 );
  var zMinMax = minMax( all, 2 );

  var xMin = 'xMin' in config ? config.xMin : xMinMax.min;
  var yMin = 'yMin' in config ? config.yMin : yMinMax.min;
  var zMin = 'zMin' in config ? config.zMin : zMinMax.min;

  var xMax = 'xMax' in config ? config.xMax : xMinMax.max;
  var yMax = 'yMax' in config ? config.yMax : yMinMax.max;
  var zMax = 'zMax' in config ? config.zMax : zMinMax.max;

  var xRange = xMax - xMin;
  var yRange = yMax - yMin;
  var zRange = zMax - zMin;

  var xMid = ( xMax + xMin ) / 2;
  var yMid = ( yMax + yMin ) / 2;
  var zMid = ( zMax + zMin ) / 2;

  var boxHelper = [ [ [xMin,yMin,zMin],[xMax,yMin,zMin] ],
                    [ [xMin,yMin,zMin],[xMin,yMax,zMin] ],
                    [ [xMin,yMin,zMin],[xMin,yMin,zMax] ],
                    [ [xMax,yMin,zMin],[xMax,yMax,zMin] ],
                    [ [xMax,yMin,zMin],[xMax,yMin,zMax] ],
                    [ [xMin,yMax,zMin],[xMax,yMax,zMin] ],
                    [ [xMin,yMax,zMin],[xMin,yMax,zMax] ],
                    [ [xMin,yMin,zMax],[xMax,yMin,zMax] ],
                    [ [xMin,yMin,zMax],[xMin,yMax,zMax] ],
                    [ [xMax,yMax,zMin],[xMax,yMax,zMax] ],
                    [ [xMax,yMin,zMax],[xMax,yMax,zMax] ],
                    [ [xMin,yMax,zMax],[xMax,yMax,zMax] ] ];

  // default orientation is looking down z-axis, even after displacement
  // need to rotate viewpoint back to origin with composite orientation

  var zRotation = [ Math.PI/2 + Math.atan(yRange/xRange), [ 0, 0, 1 ] ];

  var norm1 = Math.sqrt( xRange**2 + yRange**2 + zRange**2 );
  var norm2 = Math.sqrt( xRange**2 + yRange**2 );

  var xyRotation = [ Math.acos( zRange/norm1 ),
                               [ -yRange/norm2, xRange/norm2, 0 ] ];

  var cr = compositeRotation( zRotation, xyRotation );

  var html = `
<html>
<head>
<title></title>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="https://www.x3dom.org/download/x3dom.css">
</head>

<body style="margin: 0px">

<script src="https://www.x3dom.org/download/x3dom.js"></script>

<X3D width="${width}" height="${height}" style="border: none">
<Scene>
<Viewpoint position="${xRange+xMid} ${yRange+yMid} ${zRange+zMid}"
           orientation="${cr[1].join(' ')} ${cr[0]}"
           centerOfRotation="${xMid} ${yMid} ${zMid}"></Viewpoint>`;

  if ( frame ) boxHelper.forEach( a =>
    html += `
<Shape>
<LineSet>
<Coordinate point="${a[0].join(' ')} ${a[1].join(' ')}"/>
</LineSet>
</Shape>` );

  for ( var i = 0 ; i < surfaces.length ; i++ ) {

    var s = surfaces[i];

    // remove faces completely outside vertical range
    for ( var j = s.faces.length - 1 ; j >= 0 ; j-- ) {
      var f = s.faces[j];
      var check = true;
      f.forEach( index => check &= s.vertices[index][2] < zMin );
      if ( check ) s.faces.splice( j, 1 );
      var check = true;
      f.forEach( index => check &= s.vertices[index][2] > zMax );
      if ( check ) s.faces.splice( j, 1 );
    }

    // constrain vertices to vertical range
    for ( var j = 0 ; j < s.vertices.length ; j++ ) {
      if ( s.vertices[j][2] < zMin ) s.vertices[j][2] = zMin;
      if ( s.vertices[j][2] > zMax ) s.vertices[j][2] = zMax;
    }

    var indices = '';
    for ( var j = 0 ; j < s.faces.length ; j++ )
      indices += s.faces[j].join(' ') + ' -1 ';

    var points = '';
    for ( var j = 0 ; j < s.vertices.length ; j++ )
      points += s.vertices[j].join(' ') + ' ';

    var p = document.createElement( 'p' );
    p.style.color = s.options.color;
    var rgb = p.style.color.replace( /[^\d,]/g, '' ).split(',');
    rgb.forEach( (e,i,a) => a[i] = a[i] / 255 );
    var color = rgb.join(' '); 

    html += `
<Shape>
<Appearance>
<TwoSidedMaterial diffuseColor="${color}" transparency="${1-s.options.opacity}"/>
</Appearance>
<IndexedFaceSet coordIndex="${indices}">
<Coordinate point="${points}"></Coordinate>`;

    if ( 'colors' in s.options ) {
      var colors = '';
      for ( var j = 0 ; j < s.options.colors.length ; j++ ) {
        p.style.color = 'hsl(' + 360*s.options.colors[j] + ',100%,50%)';
        rgb = p.style.color.replace( /[^\d,]/g, '' ).split(',');
        rgb.forEach( (e,i,a) => a[i] = a[i] / 255 );
        rgb = roundTo( rgb, 3 );
        colors +=  rgb.join(' ') + ' ';
      }
      html += `
<Color color="${colors}"></Color>`;
    }

    html += `
</IndexedFaceSet>
</Shape>`;

  }

  html += `
</Scene>
</X3D>

</body>
</html>`;

  var border = config.no3DBorder ? 'none' : '1px solid black';

  return `<iframe style="width: ${output.offsetWidth}px; height: ${output.offsetHeight}px; border: ${border}"
                  srcdoc="${html.replace( /\"/g, '&quot;' )}" scrolling="no"></iframe>`;

}


function isosurface( f, xRange, yRange, zRange, options={} ) {

  if ( xRange.length < 3 ) xRange[2] = 50;
  if ( yRange.length < 3 ) yRange[2] = 50;
  if ( zRange.length < 3 ) zRange[2] = 50;

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;
  if ( !( 'material' in options ) ) options.material = 'phong';

  var level = 'level' in options ? options.level : 0;

  var xStep = ( xRange[1] - xRange[0] ) / ( xRange[2] - 1 );
  var yStep = ( yRange[1] - yRange[0] ) / ( yRange[2] - 1 );
  var zStep = ( zRange[1] - zRange[0] ) / ( zRange[2] - 1 );

  var d = []; // value data

  for ( var i = 0 ; i < xRange[2] ; i++ ) {
    d[i] = [];
    var x = xRange[0] + i * xStep;
    for ( var j = 0 ; j < yRange[2] ; j++ ) {
      var y = yRange[0] + j * yStep;
      d[i][j] = [];
      for ( var k = 0 ; k < zRange[2] ; k++ ) {
        var z = zRange[0] + k * zStep;
        d[i][j][k] = [ x, y, z, f(x,y,z) ];
      }
    }
  }

  function lerp( u1, u2 ) {

    var m = ( level - u1[3] ) / ( u2[3] - u1[3] );

    var x = u1[0] + m * ( u2[0] - u1[0] );
    var y = u1[1] + m * ( u2[1] - u1[1] );
    var z = u1[2] + m * ( u2[2] - u1[2] );

    return [ x, y, z ];

  }

  var vertices = [], faces = [];

  // adapted from http://paulbourke.net/geometry/polygonise/

  for ( var i = 0 ; i < d.length - 1 ; i++ ) {
    for ( var j = 0 ; j < d[i].length - 1 ; j++ ) {
      for ( var k = 0 ; k < d[i][j].length - 1 ; k++ ) {

        var v0 = d[i][j][k];
        var v1 = d[i][j+1][k];
        var v2 = d[i+1][j+1][k];
        var v3 = d[i+1][j][k];
        var v4 = d[i][j][k+1];
        var v5 = d[i][j+1][k+1];
        var v6 = d[i+1][j+1][k+1];
        var v7 = d[i+1][j][k+1];

        var v = []; // temp list of vertices
        var index = 0;

        if ( v0[3] < level ) index += 1;
        if ( v1[3] < level ) index += 2;
        if ( v2[3] < level ) index += 4;
        if ( v3[3] < level ) index += 8;
        if ( v4[3] < level ) index += 16;
        if ( v5[3] < level ) index += 32;
        if ( v6[3] < level ) index += 64;
        if ( v7[3] < level ) index += 128;

        if ( edgeTable[index] === 0 ) continue;

        if ( edgeTable[index] & 1 )    v[0]  = lerp( v0, v1 );
        if ( edgeTable[index] & 2 )    v[1]  = lerp( v1, v2 );
        if ( edgeTable[index] & 4 )    v[2]  = lerp( v2, v3 );
        if ( edgeTable[index] & 8 )    v[3]  = lerp( v3, v0 );
        if ( edgeTable[index] & 16 )   v[4]  = lerp( v4, v5 );
        if ( edgeTable[index] & 32 )   v[5]  = lerp( v5, v6 );
        if ( edgeTable[index] & 64 )   v[6]  = lerp( v6, v7 );
        if ( edgeTable[index] & 128 )  v[7]  = lerp( v7, v4 );
        if ( edgeTable[index] & 256 )  v[8]  = lerp( v0, v4 );
        if ( edgeTable[index] & 512 )  v[9]  = lerp( v1, v5 );
        if ( edgeTable[index] & 1024 ) v[10] = lerp( v2, v6 );
        if ( edgeTable[index] & 2048 ) v[11] = lerp( v3, v7 );

        for ( var m = 0 ; triangleTable[index][m] != -1 ; m += 3 ) {
          // remove array references for convenience
          vertices.push( v[ triangleTable[index][m]   ].slice(),
                         v[ triangleTable[index][m+1] ].slice(),
                         v[ triangleTable[index][m+2] ].slice() );
          var l = vertices.length;
          faces.push( [ l-3, l-2, l-1 ] );
        }

      }
    }
  }

  return [ { vertices: vertices, faces: faces, options: options, type: 'surface' } ];

}


var edgeTable = [

0x0  , 0x109, 0x203, 0x30a, 0x406, 0x50f, 0x605, 0x70c,
0x80c, 0x905, 0xa0f, 0xb06, 0xc0a, 0xd03, 0xe09, 0xf00,
0x190, 0x99 , 0x393, 0x29a, 0x596, 0x49f, 0x795, 0x69c,
0x99c, 0x895, 0xb9f, 0xa96, 0xd9a, 0xc93, 0xf99, 0xe90,
0x230, 0x339, 0x33 , 0x13a, 0x636, 0x73f, 0x435, 0x53c,
0xa3c, 0xb35, 0x83f, 0x936, 0xe3a, 0xf33, 0xc39, 0xd30,
0x3a0, 0x2a9, 0x1a3, 0xaa , 0x7a6, 0x6af, 0x5a5, 0x4ac,
0xbac, 0xaa5, 0x9af, 0x8a6, 0xfaa, 0xea3, 0xda9, 0xca0,
0x460, 0x569, 0x663, 0x76a, 0x66 , 0x16f, 0x265, 0x36c,
0xc6c, 0xd65, 0xe6f, 0xf66, 0x86a, 0x963, 0xa69, 0xb60,
0x5f0, 0x4f9, 0x7f3, 0x6fa, 0x1f6, 0xff , 0x3f5, 0x2fc,
0xdfc, 0xcf5, 0xfff, 0xef6, 0x9fa, 0x8f3, 0xbf9, 0xaf0,
0x650, 0x759, 0x453, 0x55a, 0x256, 0x35f, 0x55 , 0x15c,
0xe5c, 0xf55, 0xc5f, 0xd56, 0xa5a, 0xb53, 0x859, 0x950,
0x7c0, 0x6c9, 0x5c3, 0x4ca, 0x3c6, 0x2cf, 0x1c5, 0xcc ,
0xfcc, 0xec5, 0xdcf, 0xcc6, 0xbca, 0xac3, 0x9c9, 0x8c0,
0x8c0, 0x9c9, 0xac3, 0xbca, 0xcc6, 0xdcf, 0xec5, 0xfcc,
0xcc , 0x1c5, 0x2cf, 0x3c6, 0x4ca, 0x5c3, 0x6c9, 0x7c0,
0x950, 0x859, 0xb53, 0xa5a, 0xd56, 0xc5f, 0xf55, 0xe5c,
0x15c, 0x55 , 0x35f, 0x256, 0x55a, 0x453, 0x759, 0x650,
0xaf0, 0xbf9, 0x8f3, 0x9fa, 0xef6, 0xfff, 0xcf5, 0xdfc,
0x2fc, 0x3f5, 0xff , 0x1f6, 0x6fa, 0x7f3, 0x4f9, 0x5f0,
0xb60, 0xa69, 0x963, 0x86a, 0xf66, 0xe6f, 0xd65, 0xc6c,
0x36c, 0x265, 0x16f, 0x66 , 0x76a, 0x663, 0x569, 0x460,
0xca0, 0xda9, 0xea3, 0xfaa, 0x8a6, 0x9af, 0xaa5, 0xbac,
0x4ac, 0x5a5, 0x6af, 0x7a6, 0xaa , 0x1a3, 0x2a9, 0x3a0,
0xd30, 0xc39, 0xf33, 0xe3a, 0x936, 0x83f, 0xb35, 0xa3c,
0x53c, 0x435, 0x73f, 0x636, 0x13a, 0x33 , 0x339, 0x230,
0xe90, 0xf99, 0xc93, 0xd9a, 0xa96, 0xb9f, 0x895, 0x99c,
0x69c, 0x795, 0x49f, 0x596, 0x29a, 0x393, 0x99 , 0x190,
0xf00, 0xe09, 0xd03, 0xc0a, 0xb06, 0xa0f, 0x905, 0x80c,
0x70c, 0x605, 0x50f, 0x406, 0x30a, 0x203, 0x109, 0x0

];

var triangleTable = [

[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[9, 2, 10, 0, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1, -1, -1, -1, -1],
[3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 9, 0, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1, -1, -1, -1, -1, -1],
[3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1],
[3, 9, 0, 3, 11, 9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1],
[9, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 1, 9, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 1, 9, 4, 7, 1, 7, 3, 1, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1],
[9, 2, 10, 9, 0, 2, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1],
[2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1, -1, -1, -1],
[8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[11, 4, 7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1],
[9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1],
[4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1, -1],
[3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1],
[1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1],
[4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3, -1, -1, -1, -1],
[4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1],
[9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[9, 5, 4, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[3, 0, 8, 1, 2, 10, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1],
[5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1, -1, -1, -1],
[2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1],
[9, 5, 4, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 11, 2, 0, 8, 11, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1],
[0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1],
[2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1],
[10, 3, 11, 10, 1, 3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1],
[4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10, -1, -1, -1, -1],
[5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1],
[5, 4, 8, 5, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1],
[9, 7, 8, 5, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1, -1, -1],
[0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1],
[1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1, -1, -1, -1, -1, -1],
[10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1],
[8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1],
[2, 10, 5, 2, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1],
[7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1],
[9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1],
[2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7, -1, -1, -1, -1],
[11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1, -1, -1, -1],
[9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1],
[5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1],
[11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0, -1],
[11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 3, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[9, 0, 1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1],
[1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 6, 5, 1, 2, 6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1],
[9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1, -1, -1, -1, -1],
[5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1],
[2, 3, 11, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[11, 0, 8, 11, 2, 0, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1],
[0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1],
[5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1],
[6, 3, 11, 6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6, -1, -1, -1, -1],
[3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1],
[6, 5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1],
[5, 10, 6, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1, -1, -1, -1, -1],
[1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1],
[10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1],
[6, 1, 2, 6, 5, 1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1],
[8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1],
[7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9, -1],
[3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1],
[5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1],
[0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1],
[9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1],
[8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1],
[5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11, -1],
[0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7, -1],
[6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1],
[10, 4, 9, 6, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1],
[10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1],
[8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1],
[1, 4, 9, 1, 2, 4, 2, 6, 4, -1, -1, -1, -1, -1, -1, -1],
[3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1, -1],
[0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[8, 3, 2, 8, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1],
[10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1],
[3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1],
[6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1, -1],
[9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1],
[8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1],
[3, 11, 6, 3, 6, 0, 0, 6, 4, -1, -1, -1, -1, -1, -1, -1],
[6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1],
[0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1],
[10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0, -1, -1, -1, -1],
[10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1],
[2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9, -1],
[7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1],
[7, 3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7, -1, -1, -1, -1],
[2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7, -1],
[1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1],
[11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1, -1, -1, -1, -1],
[8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6, -1],
[0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1],
[7, 11, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 1, 9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[8, 1, 9, 8, 3, 1, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1],
[10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1],
[2, 9, 0, 2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1],
[6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8, -1, -1, -1, -1],
[7, 2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1],
[2, 7, 6, 2, 3, 7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1],
[1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6, -1, -1, -1, -1],
[10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1],
[10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1],
[0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7, -1, -1, -1, -1],
[7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1, -1, -1],
[6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[3, 6, 11, 3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1],
[8, 6, 11, 8, 4, 6, 9, 0, 1, -1, -1, -1, -1, -1, -1, -1],
[9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1],
[6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6, -1, -1, -1, -1],
[4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1, -1, -1, -1],
[10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1],
[8, 2, 3, 8, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1],
[0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1],
[1, 9, 4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1],
[8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1, -1, -1, -1, -1],
[10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1, -1],
[4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1],
[10, 9, 4, 6, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 3, 4, 9, 5, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1],
[5, 0, 1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1],
[11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5, -1, -1, -1, -1],
[9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1],
[6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1],
[7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2, -1, -1, -1, -1],
[3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6, -1],
[7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1],
[9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1],
[3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1, -1, -1, -1],
[6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1],
[9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1],
[1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4, -1],
[4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10, -1],
[7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1],
[6, 9, 5, 6, 11, 9, 11, 8, 9, -1, -1, -1, -1, -1, -1, -1],
[3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1],
[0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1],
[6, 11, 3, 6, 3, 5, 5, 3, 1, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1, -1, -1, -1],
[0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1],
[11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1],
[6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3, -1, -1, -1, -1],
[5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1],
[9, 5, 6, 9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1],
[1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8, -1],
[1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1],
[10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0, -1, -1, -1, -1],
[0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[11, 5, 10, 7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[11, 5, 10, 11, 7, 5, 8, 3, 0, -1, -1, -1, -1, -1, -1, -1],
[5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1, -1, -1, -1],
[10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1],
[11, 1, 2, 11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11, -1, -1, -1, -1],
[9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1],
[7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1],
[2, 5, 10, 2, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1],
[8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1],
[9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1],
[9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2, -1],
[1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1],
[9, 0, 3, 9, 3, 5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1],
[9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1],
[5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1],
[0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5, -1, -1, -1, -1],
[10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4, -1],
[2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1],
[0, 4, 11, 0, 11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11, -1],
[0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5, -1],
[9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1],
[5, 10, 2, 5, 2, 4, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1],
[3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1],
[5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1],
[8, 4, 5, 8, 5, 3, 3, 5, 1, -1, -1, -1, -1, -1, -1, -1],
[0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1],
[9, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 11, 7, 4, 9, 11, 9, 10, 11, -1, -1, -1, -1, -1, -1, -1],
[0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1],
[1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1],
[3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4, -1],
[4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1, -1, -1],
[9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1],
[11, 7, 4, 11, 4, 2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1],
[11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4, -1, -1, -1, -1],
[2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1],
[9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1],
[3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10, -1],
[1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1],
[4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1, -1, -1, -1, -1],
[4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[4, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[9, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[3, 0, 9, 3, 9, 11, 11, 9, 10, -1, -1, -1, -1, -1, -1, -1],
[0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1, -1, -1],
[3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 2, 11, 1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1],
[3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9, -1, -1, -1, -1],
[0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[2, 3, 8, 2, 8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1],
[9, 10, 2, 0, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1, -1],
[1, 10, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[1, 3, 8, 9, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

];


function isoline( f, xRange, yRange, options={} ) {

  if ( xRange.length < 3 ) xRange[2] = 100;
  if ( yRange.length < 3 ) yRange[2] = 100;

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  var level = 'level' in options ? options.level : 0;

  var xStep = ( xRange[1] - xRange[0] ) / ( xRange[2] - 1 );
  var yStep = ( yRange[1] - yRange[0] ) / ( yRange[2] - 1 );

  var d = []; // value data

  for ( var i = 0 ; i < xRange[2] ; i++ ) {
    d[i] = [];
    var x = xRange[0] + i * xStep;
    for ( var j = 0 ; j < yRange[2] ; j++ ) {
      var y = yRange[0] + j * yStep;
      d[i][j] = [ x, y, f(x,y) ];
    }
  }

  function lerp( u1, u2 ) {

    var m = ( level - u1[2] ) / ( u2[2] - u1[2] );

    var x = u1[0] + m * ( u2[0] - u1[0] );
    var y = u1[1] + m * ( u2[1] - u1[1] );

    return [ x, y ];

  }

  var segments = [];

  for ( var i = 0 ; i < d.length - 1 ; i++ ) {
    for ( var j = 0 ; j < d[i].length - 1 ; j++ ) {

      var v0 = d[i][j];
      var v1 = d[i+1][j];
      var v2 = d[i+1][j+1];
      var v3 = d[i][j+1];

      var index = 0;

      if ( v0[2] < level ) index += 1;
      if ( v1[2] < level ) index += 2;
      if ( v2[2] < level ) index += 4;
      if ( v3[2] < level ) index += 8;

      // keep corners below level to left of segments for consistency
      // segments can be determined using lookup tables as
      //   for marching cubes but code would be about same size

      var points = [], points2 = [];

      switch( index ) {

        case 0:
        case 15:

          continue;

        case 1:

          points = [ lerp( v0, v1 ), lerp( v3, v0 ) ];
          break;

        case 2:

          points = [ lerp( v1, v2 ), lerp( v0, v1 ) ];
          break;

        case 3:

          points = [ lerp( v1, v2 ), lerp( v3, v0 ) ];
          break;

        case 4:

          points = [ lerp( v2, v3 ), lerp( v1, v2 ) ];
          break;

        case 5:

          points = [ lerp( v2, v3 ), lerp( v3, v0 ) ];
          points2 = [ lerp( v0, v1 ), lerp( v1, v2 ) ];
          break;

        case 6:

          points = [ lerp( v2, v3 ), lerp( v0, v1 ) ];
          break;

        case 7:

          points = [ lerp( v2, v3 ), lerp( v3, v0 ) ];
          break;

        case 8:

          points = [ lerp( v3, v0 ), lerp( v2, v3 ) ];
          break;

        case 9:

          points = [ lerp( v0, v1 ), lerp( v2, v3 ) ];
          break;

        case 10:

          points = [ lerp( v3, v0 ), lerp( v0, v1 ) ];
          points2 = [ lerp( v1, v2 ), lerp( v2, v3 ) ];
          break;

        case 11:

          points = [ lerp( v1, v2 ), lerp( v2, v3 ) ];
          break;

        case 12:

          points = [ lerp( v3, v0 ), lerp( v1, v2 ) ];
          break;

        case 13:

          points = [ lerp( v0, v1 ), lerp( v1, v2 ) ];
          break;

        case 14:

          points = [ lerp( v3, v0 ), lerp( v0, v1 ) ];

      }

      segments.push( { points: points, options: options, type: 'line' } );

      if ( points2.length > 0 )
        segments.push( { points: points2, options: options, type: 'line' } );

    }
  }

  return segments;

}


function isoband( f, xRange, yRange, options={} ) {

  if ( xRange.length < 3 ) xRange[2] = 75;
  if ( yRange.length < 3 ) yRange[2] = 75;

  if ( !( 'color' in options ) ) options.color = defaultPlotColor;
  if ( !( 'opacity' in options ) ) options.opacity = 1;

  var level = 'level' in options ? options.level : 0;

  var xStep = ( xRange[1] - xRange[0] ) / ( xRange[2] - 1 );
  var yStep = ( yRange[1] - yRange[0] ) / ( yRange[2] - 1 );

  var d = []; // value data

  for ( var i = 0 ; i < xRange[2] ; i++ ) {
    d[i] = [];
    var x = xRange[0] + i * xStep;
    for ( var j = 0 ; j < yRange[2] ; j++ ) {
      var y = yRange[0] + j * yStep;
      d[i][j] = [ x, y, f(x,y) ];
    }
  }

  function lerp( u1, u2 ) {

    var m = ( level - u1[2] ) / ( u2[2] - u1[2] );

    var x = u1[0] + m * ( u2[0] - u1[0] );
    var y = u1[1] + m * ( u2[1] - u1[1] );

    return [ x, y ];

  }

  var segments = [];

  for ( var i = 0 ; i < d.length - 1 ; i++ ) {
    for ( var j = 0 ; j < d[i].length - 1 ; j++ ) {

      var v0 = d[i][j];
      var v1 = d[i+1][j];
      var v2 = d[i+1][j+1];
      var v3 = d[i][j+1];

      var index = 0;

      if ( v0[2] < level ) index += 1;
      if ( v1[2] < level ) index += 2;
      if ( v2[2] < level ) index += 4;
      if ( v3[2] < level ) index += 8;

      // keep corners below level to left of segments for consistency

      var points = [];

      switch( index ) {

        case 0:

          continue;

        case 1:

          points = [ lerp( v0, v1 ), lerp( v3, v0 ), v0 ];
          break;

        case 2:

          points = [ lerp( v1, v2 ), lerp( v0, v1 ), v1 ];
          break;

        case 3:

          points = [ lerp( v1, v2 ), lerp( v3, v0 ), v0, v1 ];
          break;

        case 4:

          points = [ lerp( v2, v3 ), lerp( v1, v2 ), v2 ];
          break;

        case 5:

          points = [ lerp( v2, v3 ), lerp( v3, v0 ), v0,
                     lerp( v0, v1 ), lerp( v1, v2 ), v2 ];
          break;

        case 6:

          points = [ lerp( v2, v3 ), lerp( v0, v1 ), v1, v2 ];
          break;

        case 7:

          points = [ lerp( v2, v3 ), lerp( v3, v0 ), v0, v1, v2 ];
          break;

        case 8:

          points = [ lerp( v3, v0 ), lerp( v2, v3 ), v3 ];
          break;

        case 9:

          points = [ lerp( v0, v1 ), lerp( v2, v3 ), v3, v0 ];
          break;

        case 10:

          points = [ lerp( v3, v0 ), lerp( v0, v1 ), v1,
                     lerp( v1, v2 ), lerp( v2, v3 ), v3 ];
          break;

        case 11:

          points = [ lerp( v1, v2 ), lerp( v2, v3 ), v3, v0, v1 ];
          break;

        case 12:

          points = [ lerp( v3, v0 ), lerp( v1, v2 ), v2, v3 ];
          break;

        case 13:

          points = [ lerp( v0, v1 ), lerp( v1, v2 ), v2, v3, v0 ];
          break;

        case 14:

          points = [ lerp( v3, v0 ), lerp( v0, v1 ), v1, v2, v3 ];
          break;

        case 15:

          points = [ v0, v1, v2, v3 ];

      }

      options.fill = true;

      segments.push( { points: points, options: options, type: 'line' } );

    }
  }

  return segments;

}

