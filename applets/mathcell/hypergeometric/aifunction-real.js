/*
  Airy function Ai(z)
  https://en.wikipedia.org/wiki/Airy_function
  Written by Juan Carlos Ponce Campuzano
  https://jcponce.github.io/
  https://mathcell.org/
  04 Feb 2021
*/

var parent = document.currentScript.parentNode;

var id = generateId();
parent.id = id;

MathCell(id, []);

parent.update = function (id) {

  

  //debugging
  //console.log(pochhammer(complex(1,0), 3));

  function Airy(x, y) {

    var twothree = complex(2 / 3, 0);
    var onethree = complex(1 / 3, 0);
    var cthree = complex(3, 0);
    var fcnt = inv(mul(pow(cthree, twothree), gamma(twothree)));
    var scnt = div(complex(x, y), mul(pow(cthree, onethree), gamma(onethree)));

    var onenine = complex(1 / 9, 0);
    var cz = mul(onenine, pow(complex(x, y), cthree));
    var n = 16;
    var term1 = hyperGeomgetric0F1(2 / 3, cz, n);
    var term2 = hyperGeomgetric0F1(4 / 3, cz, n);

    return sub(mul(fcnt, term1), mul(scnt, term2));

  }

  var data = [];
  var p = plot(x => airyAi(x), [-15, 6]);
  var q = plot(x => airyBi(x), [-15, 6], { color: 'red' } );
  
  data = [p, q]

  var config = {
    type: 'svg',
    yMin: -1,
    yMax: 1
  };

  evaluate(id, data, config);

}

parent.update(id);