/*
  Airy function Bi(z)
  https://en.wikipedia.org/wiki/Airy_function
  Written by Juan Carlos Ponce Campuzano
  https://jcponce.github.io/
  https://mathcell.org/
  04 Feb 2021
*/

var parent = document.currentScript.parentNode;

var id = generateId();
parent.id = id;

MathCell(id, [{
  type: 'buttons',
  values: ['abs', 're', 'im'],
  default: 'abs',
  width: '0.5in',
  name: 'opt',
  label: ' - Plotting option:'
}]);

parent.update = function (id) {

  var opt = getVariable(id, 'opt');


  /*
  Confluent Hypergeometric function
  https://mathworld.wolfram.com/ConfluentHypergeometricLimitFunction.html

  Pochhammer symbol
  https://mathworld.wolfram.com/PochhammerSymbol.html
  */

  function pochhammer(z, n) {
    var cz = z;
    var cn = complex(n, 0);
    var plus = add(cz, cn);
    var val = div(gamma(plus), gamma(cz));
    return val;
  }


  function hyperGeomgetric0F1(cnt, z, max) {
    var sum = complex(0, 0);
    var cz = z;
    for (var n = 0; n <= max; ++n) {
      var next = div(
        pow(cz, complex(n, 0)),
        mul(pochhammer(cnt, n), gamma(complex(n + 1, 0)))
      );
      sum = add(sum, next);
    }
    return sum;
  }

  //debugging
  //console.log(pochhammer(complex(1,0), 3));

  function Biry(x, y) {

    var onesix = complex(1 / 6, 0);
    var twothree = complex(2 / 3, 0);
    var onethree = complex(1 / 3, 0);
    var cthree = complex(3, 0);
    var fcnt = inv(mul(pow(cthree, onesix), gamma(twothree)));
    var scnt = div(complex(x, y), mul(pow(cthree, onesix), gamma(onethree)));

    var onenine = complex(1 / 9, 0);
    var cz = mul(onenine, pow(complex(x, y), cthree));
    var n = 16;
    var term1 = hyperGeomgetric0F1(2 / 3, cz, n);
    var term2 = hyperGeomgetric0F1(4 / 3, cz, n);

    return sub(mul(fcnt, term1), mul(scnt, term2));

  }

  var p = parametric(
    (x, y) => [
      x,
      y,
      Biry(x, y)
    ], [-5, 5, 201], [-5, 5, 150], {
      complexFunction: opt,
      colormap: 'complexArgument'
    }
  );

  var zcMin, zcMax;
  if (opt === 'abs') {
    zcMin = 0;
    zcMax = 8;
  } else {
    zcMin = -5;
    zcMax = 5;
  }

  var config = {
    type: 'threejs',
    zMin: zcMin,
    zMax: zcMax,
    viewpoint: [0.9, -1, 1]
  };

  evaluate(id, [p], config);

}

parent.update(id);