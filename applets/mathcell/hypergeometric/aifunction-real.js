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