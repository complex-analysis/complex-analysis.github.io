
var defaultDecimals = 18;

var pi = Math.PI;

var eulerGamma = .5772156649015329;

var constants = {

  decimals: 50, precisionScale: 10n**50n,

  e: 271828182845904523536028747135266249775724709369995n,

  eulerGamma: 57721566490153286060651209008240243104215933593992n,

  ln10: 230258509299404568401799145468436420760110148862877n,

  pi: 314159265358979323846264338327950288419716939937510n

};

function getConstant( name ) {

  return constants[name] * precisionScale / constants.precisionScale;

}


// oeis.org/A000367
bernoulli2nN = [ 1n, 1n, -1n, 1n, -1n, 5n, -691n, 7n, -3617n, 43867n, -174611n, 854513n, -236364091n, 8553103n, -23749461029n, 8615841276005n, -7709321041217n, 2577687858367n, -26315271553053477373n, 2929993913841559n, -261082718496449122051n, 1520097643918070802691n, -27833269579301024235023n, 596451111593912163277961n, -5609403368997817686249127547n, 495057205241079648212477525n, -801165718135489957347924991853n, 29149963634884862421418123812691n, -2479392929313226753685415739663229n, 84483613348880041862046775994036021n, -1215233140483755572040304994079820246041491n, 12300585434086858541953039857403386151n, -106783830147866529886385444979142647942017n, 1472600022126335654051619428551932342241899101n, -78773130858718728141909149208474606244347001n, 1505381347333367003803076567377857208511438160235n, -5827954961669944110438277244641067365282488301844260429n, 34152417289221168014330073731472635186688307783087n, -24655088825935372707687196040585199904365267828865801n, 414846365575400828295179035549542073492199375372400483487n, -4603784299479457646935574969019046849794257872751288919656867n, 1677014149185145836823154509786269900207736027570253414881613n, -2024576195935290360231131160111731009989917391198090877281083932477n, 660714619417678653573847847426261496277830686653388931761996983n, -1311426488674017507995511424019311843345750275572028644296919890574047n, 1179057279021082799884123351249215083775254949669647116231545215727922535n, -1295585948207537527989427828538576749659341483719435143023316326829946247n, 1220813806579744469607301679413201203958508415202696621436215105284649447n, -211600449597266513097597728109824233673043954389060234150638733420050668349987259n, 67908260672905495624051117546403605607342195728504487509073961249992947058239n, -94598037819122125295227433069493721872702841533066936133385696204311395415197247711n ];

// oeis.org/A002445
bernoulli2nD = [ 1n, 6n, 30n, 42n, 30n, 66n, 2730n, 6n, 510n, 798n, 330n, 138n, 2730n, 6n, 870n, 14322n, 510n, 6n, 1919190n, 6n, 13530n, 1806n, 690n, 282n, 46410n, 66n, 1590n, 798n, 870n, 354n, 56786730n, 6n, 510n, 64722n, 30n, 4686n, 140100870n, 6n, 30n, 3318n, 230010n, 498n, 3404310n, 6n, 61410n, 272118n, 1410n, 6n, 4501770n, 6n, 33330n ];


var factorialCache = [ 1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800 ];


function complex( x, y=0 ) {

  if ( y === 0 && isArbitrary(x) ) y = 0n;

  return { re: x, im: y };

}

var C = complex;

function isComplex( x ) { return typeof x === 'object' && 're' in x; }


var decimals = [], precisionScale;
var arb1, arb2, onePi, twoPi, halfPi, ln10;

function setPrecisionScale( n ) {

  if ( n === 'reset' ) decimals.shift();
  else decimals.unshift( n );

  precisionScale = 10n**BigInt( decimals[0] );

  // set some commonly used constants
  arb1 = arbitrary(1);
  arb2 = 2n * arb1;
  onePi = getConstant( 'pi' );
  twoPi = 2n * onePi;
  halfPi = onePi / 2n;
  ln10 = getConstant( 'ln10' );

}

function resetPrecisionScale() { setPrecisionScale( 'reset' ); }

setPrecisionScale( defaultDecimals );

function arbitrary( x ) {

  if ( isComplex(x) ) return { re: arbitrary( x.re ), im: arbitrary( x.im ) };

  if ( isArbitrary(x) ) return Number(x) / 10**decimals[0];

  // BigInt from exponential form includes wrong digits
  // manual construction from string more accurate

  var parts = x.toExponential().split( 'e' );
  var mantissa = parts[0].replace( '.', '' );
  var digits = mantissa.length - ( mantissa[0] === '-' ? 2 : 1 )
  var padding = +parts[1] + decimals[0] - digits;

  if ( padding < 0 ) return BigInt( Math.round( x * 10**decimals[0] ) );

  return BigInt( mantissa + '0'.repeat(padding) );

}

var A = arbitrary;

function isArbitrary( x ) { return typeof x === 'bigint' || typeof x.re === 'bigint'; }


function isZero( x ) {

  if ( isComplex(x) ) return x.re === 0 && x.im === 0;
  return x === 0;

}

function isUnity( x ) {

  if ( isComplex(x) ) return x.re === 1 && x.im === 0;
  return x === 1;

}

function isReal( x ) {

  if ( isComplex(x) ) return x.im === 0;
  return true;

}

function isInteger( x ) {

  if ( isComplex(x) ) return Number.isInteger(x.re) && x.im === 0;
  return Number.isInteger(x);

}

function isPositiveInteger( x ) {

  if ( isComplex(x) ) return Number.isInteger(x.re) && x.re > 0 && x.im === 0;
  return Number.isInteger(x) && x > 0;

}

function isPositiveIntegerOrZero( x ) {

  if ( isComplex(x) ) return Number.isInteger(x.re) && x.re >= 0 && x.im === 0;
  return Number.isInteger(x) && x >= 0;

}

function isNegativeInteger( x ) {

  if ( isComplex(x) ) return Number.isInteger(x.re) && x.re < 0 && x.im === 0;
  return Number.isInteger(x) && x < 0;

}

function isNegativeIntegerOrZero( x ) {

  if ( isComplex(x) ) return Number.isInteger(x.re) && x.re <= 0 && x.im === 0;
  return Number.isInteger(x) && x <= 0;

}

function isEqualTo( x, y ) {

  if ( isComplex(x) || isComplex(y) ) {
    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);
    return x.re === y.re && x.im === y.im;
  }

  return x === y;

}


function re( x ) {

  if ( isComplex(x) ) return x.re;
  return x;

}

var real = re;

function im( x ) {

  if ( isComplex(x) ) return x.im;
  return 0;

}

var imag = im;

function abs( x ) {

  if ( isComplex(x) ) {

    if ( isArbitrary(x) ) {

      if ( x.im === 0n ) return abs(x.re);

      if ( x.re === 0n ) return abs(x.im);

      if ( abs(x.re) < abs(x.im) )

        return mul( abs(x.im), sqrt( arb1 + div( div( mul(x.re,x.re), x.im ), x.im ) ) );

      else

         return mul( abs(x.re), sqrt( arb1 + div( div( mul(x.im,x.im), x.re ), x.re ) ) );

    }

    if ( x.im === 0 ) return Math.abs(x.re);

    if ( x.re === 0 ) return Math.abs(x.im);

    if ( Math.abs(x.re) < Math.abs(x.im) )

      return Math.abs(x.im) * Math.sqrt( 1 + ( x.re / x.im )**2 );

    else

      return Math.abs(x.re) * Math.sqrt( 1 + ( x.im / x.re )**2 );

  }

  if ( isArbitrary(x) )
    if ( x < 0n ) return -x;
    else return x;

  return Math.abs(x);

}

function arg( x ) {

  // adding zero prevents unexpected behavior for -0

  if ( isComplex(x) ) return Math.atan2( x.im + 0, x.re + 0 );

  return Math.atan2( 0, x + 0 );

}


// JavaScript does not support operator overloading

function add( x, y ) {

  if ( arguments.length > 2 ) {

    var z = add( x, y );
    for ( var i = 2 ; i < arguments.length ; i++ ) z = add( z, arguments[i] );
    return z; 

  }

  if ( isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    return { re: x.re + y.re, im: x.im + y.im };

  }

  return x + y;

}

function sub( x, y ) {

  if ( isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    return { re: x.re - y.re, im: x.im - y.im };

  }

  return x - y;

}

function mul( x, y ) {

  if ( arguments.length > 2 ) {

    var z = mul( x, y );
    for ( var i = 2 ; i < arguments.length ; i++ ) z = mul( z, arguments[i] );
    return z; 

  }

  if ( isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    if ( isArbitrary(x) )

      return { re: ( x.re * y.re - x.im * y.im ) / precisionScale,
               im: ( x.im * y.re + x.re * y.im ) / precisionScale };

    return { re: x.re * y.re - x.im * y.im,
             im: x.im * y.re + x.re * y.im };

  }

  if ( isArbitrary(x) ) return x * y / precisionScale;

  return x * y;

}

function neg( x ) {

  if ( isComplex(x) ) return { re: -x.re, im: -x.im };

  return -x;

}

function div( x, y ) {

  if ( isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    if ( y.re === 0 && y.im === 0 || y.re === 0n && y.im === 0n ) // operator precedence
      throw Error( 'Division by zero' );

    if ( isArbitrary(x) ) {

      var N = { re: x.re * y.re + x.im * y.im,
                im: x.im * y.re - x.re * y.im };
      var D = y.re * y.re + y.im * y.im;

      return { re: precisionScale * N.re / D,
               im: precisionScale * N.im / D };

    }

    if ( Math.abs(y.re) < Math.abs(y.im) ) {

      var f = y.re / y.im;
      return { re: ( x.re * f + x.im ) / ( y.re * f + y.im ),
               im: ( x.im * f - x.re ) / ( y.re * f + y.im ) };

    } else {

      var f = y.im / y.re;
      return { re: ( x.re + x.im * f ) / ( y.re + y.im * f ),
               im: ( x.im - x.re * f ) / ( y.re + y.im * f ) };

    }

  }

  if ( y === 0 || y === 0n ) throw Error( 'Division by zero' );

  if ( isArbitrary(x) ) return precisionScale * x / y;

  return x / y;

}

function inv( x ) {

  if ( isArbitrary(x) ) return div( arb1, x );

  return div( 1, x );

}

function pow( x, y ) {

  if ( isArbitrary(x) || isArbitrary(y) ) {

    if ( !isArbitrary(x) ) x = arbitrary(x);
    if ( !isArbitrary(y) ) y = arbitrary(y);

    return exp( mul( y, ln(x) ) );

  }

  if ( isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    if ( x.re === 0 && x.im === 0 && y.re > 0 )
      return complex(0);
    if ( x.re === 0 && x.im === 0 && y.re === 0 && y.im === 0 )
      return complex(1);
    if ( x.re === 0 && x.im === 0 && y.re < 0 )
      throw Error( 'Power singularity' );

    return exp( mul( y, log(x) ) );

  }

  if ( x === 0 && y < 0 ) throw Error( 'Power singularity' );

  if ( x < 0 && !Number.isInteger(y) ) return pow( complex(x), y );

  return x**y;

}

function root( x, y ) { return pow( x, div( 1, y ) ); }

function surd( x, n ) {

  if ( isComplex(x) || isComplex(n) ) throw Error( 'Surd requires real inputs' );

  if ( !isInteger(n) ) throw Error( 'Second parameter of surd must be integer' );

  if ( n & 1 ) {
    var sign = Math.sign(x); // zero at origin anyway
    return sign * root( sign*x, n );
  }

  if ( x < 0 ) throw Error( 'First parameter of surd must be positive for even integers' );

  return root( x, n );

}

function sqrt( x ) {

  if ( isComplex(x) ) {

    if ( isArbitrary(x) ) {

      if ( x.im === 0n )
        if ( x.re < 0n ) return { re: 0n, im: sqrt(-x.re) };
        else return { re: sqrt(x.re), im: 0n };

      // need evaluation independent of natural logarithm

      var c = abs(x);
      var sign = x.im < 0n ? -1n : 1n;

      return { re: sqrt( div( c + x.re, arb2 ) ), im: sign * sqrt( div( c - x.re, arb2 ) ) }

    }

    if ( x.im === 0 )
      if ( x.re < 0 ) return { re: 0, im: Math.sqrt(-x.re) };
      else return { re: Math.sqrt(x.re), im: 0 };

    // expression above suffers from rounding errors when not arbitrary,
    //   especially affecting elliptic integral of third kind

    return exp( mul( .5, log(x) ) );

  }

  if ( isArbitrary(x) ) {

    if ( x === 0n ) return 0n;

    if ( x < 0n ) throw Error( 'Cannot evaluate real square root of ' + x );

    // Brent, Modern Computer Arithmetic, SqrtInt algorithm

    var u = x, s, t;

    while ( u !== s ) {
      s = u;
      t = s + div( x, s );
      u = div( t, arb2 );
    }

    return s;

  }

  if ( x < 0 ) return { re: 0, im: Math.sqrt(-x) };

  return Math.sqrt(x);

}


function complexAverage( f, x, offset=1e-5 ) {

  return div( add( f(add(x,offset)), f(sub(x,offset)) ), 2 );

}


function complexFromString( s, returnAsString=false ) {

  var lead = '', real, imag;

  if ( s[0] === '+' || s[0] === '-' ) {
    lead = s[0];
    s = s.slice(1);
  }

  if ( s.includes('+') || s.includes('-') ) {
    if ( s.includes('+') ) {
      real = lead + s.slice( 0, s.indexOf('+') );
      imag = s.slice( s.indexOf('+') + 1, s.length - 1 );
    } else {
      real = lead + s.slice( 0, s.indexOf('-') );
      imag = s.slice( s.indexOf('-'), s.length - 1 );
    }
  } else {
    if ( s.includes('i') ) {
      real = '0';
      imag = lead + s.slice( 0, s.length - 1 );
    } else {
      real = lead + s;
      imag = '0';
    }
  }

  if ( imag === '' || imag === '-' ) imag += '1';

  if ( returnAsString ) return `{ re: ${real}, im: ${imag} }`;

  return { re: +real, im: +imag };

}

function output() {

  for ( var i = 0 ; i < arguments.length ; i++ ) console.log( arguments[i] );

}


function besselJ( n, x ) {

  if ( isComplex(n) || isComplex(x) ) {

    if ( isNegativeInteger(n) ) return mul( pow(-1,n), besselJ( neg(n), x ) );

    var product = div( pow( div(x,2), n ), gamma( add(n,1) ) );
    return mul( product, hypergeometric0F1( add(n,1), mul(-.25, pow(x,2) ) ) );

  } 

  if ( isNegativeInteger(n) ) return (-1)**n * besselJ( -n, x );

  if ( !Number.isInteger(n) && x < 0 ) return besselJ( n, complex(x) );

  return (x/2)**n * hypergeometric0F1( n+1, -.25*x**2 ) / gamma(n+1);

}

function besselJZero( n, m, derivative=false ) {

  if ( isComplex(n) || isComplex(m) )
    throw Error( 'Complex arguments not supported in Bessel zero' );

  if ( !isPositiveInteger(m) ) throw Error( 'Unsupported index for Bessel zero' );

  // approximations from dlmf.nist.gov/10.21#vi
  var delta = pi/4;

  if ( derivative ) {

    if ( n === 0 && m === 1 ) return 0;

    var b = ( m + Math.abs(n)/2 - 3/4 ) * pi;
    var e = b - ( 4*n**2 + 3 ) / ( 8*b );

    // Zeros not simple to enumerate for negative order
    // Odd double zero for small range of n to be investigated
    if ( n < 0 ) throw Error( 'Negative order for Bessel derivative zero not supported' );

    return findRoot( x => diff( x => besselJ(n,x), x ), [ e-delta < 0 ? 0 : e-delta, e+delta ] );

  } else {

    var a = ( m + Math.abs(n)/2 - 1/4 ) * pi;
    var e = a - ( 4*n**2 - 1 ) / ( 8*a );

    if ( n < 0 ) e += fractionalPart(n) * pi;

    return findRoot( x => besselJ(n,x), [ m === 1 ? 1e-10 : e-delta, e+delta ] );

  }

}

function besselY( n, x ) {

  if ( isComplex(n) || isComplex(x) ) {

    if ( isZero(x) ) {
      if ( !isComplex(n) ) n = complex(n);
      if ( fractionalPart(n.re) === -.5 && n.im === 0 ) return complex(0);
    }

    // dlmf.nist.gov/10.2.4
    if ( isInteger(n) )
      return div( add( diff( n => besselJ(n,x), n ),
                       mul( pow(-1,n), diff( n => besselJ(n,x), neg(n) ) ) ), pi );

    var s = sub( mul( besselJ(n,x), cos( mul(n,pi) ) ), besselJ( neg(n), x ) );
    return div( s, sin( mul(n,pi) ) );

  }

  if ( x < 0 ) return besselY( n, complex(x) );

  if ( x === 0 )
    if ( fractionalPart(n) === -.5 ) return 0;

  // dlmf.nist.gov/10.2.4
  if ( Number.isInteger(n) )
    return ( diff( n => besselJ(n,x), n ) + (-1)**n * diff( n => besselJ(n,x), -n ) ) / pi;

  return ( besselJ(n,x) * cos(n*pi) - besselJ(-n,x) ) / sin(n*pi);

}

function besselYZero( n, m, derivative=false ) {

  if ( isComplex(n) || isComplex(m) )
    throw Error( 'Complex arguments not supported in Bessel zero' );

  if ( !isPositiveInteger(m) ) throw Error( 'Unsupported index for Bessel zero' );

  // approximations from dlmf.nist.gov/10.21#vi
  var delta = pi/4;

  if ( derivative ) {

    var b = ( m + Math.abs(n)/2 - 1/4 ) * pi;
    var e = b - ( 4*n**2 + 3 ) / ( 8*b );

    // Zeros not simple to enumerate for negative order
    // Odd double zero for small range of n to be investigated
    if ( n < 0 ) throw Error( 'Negative order for Bessel derivative zero not supported' );

    return findRoot( x => diff( x => besselY(n,x), x ), [ e-delta, e+delta ] );

  } else {

    var a = ( m + Math.abs(n)/2 - 3/4 ) * pi;
    var e = a - ( 4*n**2 - 1 ) / ( 8*a );

    if ( n < 0 )
      if ( fractionalPart(n) > -.5 ) e += fractionalPart(n) * pi;
      else e += ( 1 + fractionalPart(n) ) * pi;

    return findRoot( x => besselY(n,x), [ m === 1 && fractionalPart(n) > -.5 ? 1e-10 : e-delta, e+delta ] );

  }

}

function besselI( n, x ) {

  if ( isComplex(n) || isComplex(x) ) {

    if ( isNegativeInteger(n) ) return besselI( neg(n), x );

    var product = div( pow( div(x,2), n ), gamma( add(n,1) ) );
    return mul( product, hypergeometric0F1( add(n,1), mul(.25, pow(x,2) ) ) );

  }

  if ( isNegativeInteger(n) ) return besselI( -n, x );

  if ( !Number.isInteger(n) && x < 0 ) return besselI( n, complex(x) );

  return (x/2)**n * hypergeometric0F1( n+1, .25*x**2 ) / gamma(n+1);

}

function besselK( n, x ) {

  var useAsymptotic = 10;

  if ( isComplex(n) || isComplex(x) ) {

    // asymptotic form as per Johansson arxiv.org/abs/1606.06977
    if ( abs(x) > useAsymptotic ) {

      var t1 = mul( sqrt( div( pi/2, x ) ), exp( neg(x) ) );
      var t2 = hypergeometric2F0( add(n,.5), sub(.5,n), div(-.5,x) );

      return mul( t1, t2 );

    }

    // dlmf.nist.gov/10.27.5
    if ( isInteger(n) )
      return mul( pow(-1,add(n,1)), .5,
                  add( diff( n => besselI(n,x), n ), diff( n => besselI(n,x), neg(n) ) ) );

    var product = div( pi/2, sin( mul(n,pi) ) );
    return mul( product, sub( besselI( neg(n), x ), besselI(n,x) ) );

  }

  if ( x > useAsymptotic )
    return sqrt(pi/2/x) * exp(-x) * hypergeometric2F0( n+.5, .5-n, -.5/x );

  if ( x < 0 ) return besselK( n, complex(x) );

  // dlmf.nist.gov/10.27.5
  if ( Number.isInteger(n) )
    return (-1)**(n+1)/2 * ( diff( n => besselI(n,x), n ) + diff( n => besselI(n,x), -n ) );

  return pi/2 * ( besselI(-n,x) - besselI(n,x) ) / sin(n*pi);

}

function hankel1( n, x, tolerance=1e-10 ) {

  var useAsymptotic = 11;

  // dlmf.nist.gov/10.17
  if ( x.im > 0 && abs(x) > useAsymptotic ) {

    var w = add( x, mul(n,-pi/2), -pi/4 );

    var s = complex(1);
    var plusI = complex(0,1);
    var p = complex(1);
    var i = 1;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      p = mul( p, plusI, sub( mul(4,n,n), (2*i-1)**2 ), 1/i, 1/8, inv(x) );
      s = add( s, p );
      i++;
    }

    return mul( div( Math.sqrt(2/pi), sqrt(x) ), exp( mul(plusI,w) ), s );

  }

  // not duplicate special case
  if ( isInteger(n) )
    return add( besselJ(n,x), mul( complex(0,1), besselY(n,x) ) );

  // one less call to besselJ
  var s = sub( mul( besselJ(n,x), exp( mul(n,complex(0,-pi)) ) ), besselJ( neg(n), x ) );
  return div( mul( complex(0,1), s ), sin( mul(n,pi) ) );

}

function hankel2( n, x, tolerance=1e-10 ) {

  var useAsymptotic = 11;

  // dlmf.nist.gov/10.17
  if ( x.im < 0 && abs(x) > useAsymptotic ) {

    var w = add( x, mul(n,-pi/2), -pi/4 );

    var s = complex(1);
    var minusI = complex(0,-1);
    var p = complex(1);
    var i = 1;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      p = mul( p, minusI, sub( mul(4,n,n), (2*i-1)**2 ), 1/i, 1/8, inv(x) );
      s = add( s, p );
      i++;
    }

    return mul( div( Math.sqrt(2/pi), sqrt(x) ), exp( mul(minusI,w) ), s );

  }

  // not duplicate special case
  if ( isInteger(n) )
    return sub( besselJ(n,x), mul( complex(0,1), besselY(n,x) ) );

  // one less call to besselJ
  var s = sub( mul( besselJ(n,x), exp( mul(n,complex(0,pi)) ) ), besselJ( neg(n), x ) );
  return div( mul( complex(0,-1), s ), sin( mul(n,pi) ) );

}


// dlmf.nist.gov/9.2.ii and dlmf.nist.gov/9.6.i

function airyAi( x ) {

  if ( isComplex(x) ) {

    if ( isZero(x) ) return complex( 1 / 3**(2/3) / gamma(2/3) );

    if ( x.re < 0 ) {

      var z = mul( 2/3, pow( neg(x), 3/2 ) );
      return mul( 1/3, sqrt(neg(x)), add( besselJ( 1/3, z ), besselJ( -1/3, z ) ) );

    }

    var z = mul( 2/3, pow( x, 3/2 ) );
    return mul( 1/pi, sqrt( div( x, 3 ) ), besselK( 1/3, z ) );

  }

  if ( x === 0 ) return 1 / 3**(2/3) / gamma(2/3);

  if ( x < 0 ) {

    var z = 2/3 * (-x)**(3/2);
    return sqrt(-x) / 3 * ( besselJ( 1/3, z ) + besselJ( -1/3, z ) );

  }

  var z = 2/3 * x**(3/2);
  return 1/pi * sqrt(x/3) * besselK( 1/3, z );

}

function airyAiPrime( x ) {

  if ( isComplex(x) ) {

    if ( isZero(x) ) return complex( -1 / 3**(1/3) / gamma(1/3) );

    if ( x.re < 0 ) {

      var z = mul( 2/3, pow( neg(x), 3/2 ) );
      return mul( 1/3, x, sub( besselJ( -2/3, z ), besselJ( 2/3, z ) ) );

    }

    var z = mul( 2/3, pow( x, 3/2 ) );
    return mul( -1/pi/sqrt(3), x, besselK( 2/3, z ) );

  }

  if ( x === 0 ) return -1 / 3**(1/3) / gamma(1/3);

  if ( x < 0 ) {

    var z = 2/3 * (-x)**(3/2);
    return x/3 * ( besselJ( -2/3, z ) - besselJ( 2/3, z ) );

  }

  var z = 2/3 * x**(3/2);
  return -1/pi/sqrt(3) * x * besselK( 2/3, z );

}

function airyBi( x ) {

  if ( isComplex(x) ) {

    if ( isZero(x) ) return complex( 1 / 3**(1/6) / gamma(2/3) );

    if ( x.re < 0 ) {

      var z = mul( 2/3, pow( neg(x), 3/2 ) );
      return mul( sqrt( div(neg(x),3) ), sub( besselJ( -1/3, z ), besselJ( 1/3, z ) ) );

    }

    var z = mul( 2/3, pow( x, 3/2 ) );
    return mul( sqrt( div( x, 3 ) ), add( besselI( 1/3, z ), besselI( -1/3, z ) ) );

  }

  if ( x === 0 ) return 1 / 3**(1/6) / gamma(2/3);

  if ( x < 0 ) {

    var z = 2/3 * (-x)**(3/2);
    return sqrt(-x/3) * ( besselJ( -1/3, z ) - besselJ( 1/3, z ) );

  }

  var z = 2/3 * x**(3/2);
  return sqrt(x/3) * ( besselI( 1/3, z ) + besselI( -1/3, z ) );

}

function airyBiPrime( x ) {

  if ( isComplex(x) ) {

    if ( isZero(x) ) return complex( 3**(1/6) / gamma(1/3) );

    if ( x.re < 0 ) {

      var z = mul( 2/3, pow( neg(x), 3/2 ) );
      return mul( 1/sqrt(3), neg(x), add( besselJ( 2/3, z ), besselJ( -2/3, z ) ) );

    }

    var z = mul( 2/3, pow( x, 3/2 ) );
    return mul( 1/sqrt(3), x, add( besselI( 2/3, z ), besselI( -2/3, z ) ) );

  }

  if ( x === 0 ) return 3**(1/6) / gamma(1/3);

  if ( x < 0 ) {

    var z = 2/3 * (-x)**(3/2);
    return -x/sqrt(3) * ( besselJ( 2/3, z ) + besselJ( -2/3, z ) );

  }

  var z = 2/3 * x**(3/2);
  return x/sqrt(3) * ( besselI( 2/3, z ) + besselI( -2/3, z ) );

}


function sphericalBesselJ( n, x ) {

  return mul( div( Math.sqrt(pi/2), sqrt(x) ), besselJ( add( n, .5 ), x ) );

}

function sphericalBesselY( n, x ) {

  return mul( div( Math.sqrt(pi/2), sqrt(x) ), besselY( add( n, .5 ), x ) );

}

function sphericalHankel1( n, x ) {

  return mul( div( Math.sqrt(pi/2), sqrt(x) ), hankel1( add( n, .5 ), x ) );

}

function sphericalHankel2( n, x ) {

  return mul( div( Math.sqrt(pi/2), sqrt(x) ), hankel2( add( n, .5 ), x ) );

}


function struveH( n, x ) {

  return mul( pow( x, add(n,1) ), inv( mul( pow(2,n), sqrt(pi), gamma( add(n,3/2) ) ) ),
              hypergeometric1F2( 1, 3/2, add(n,3/2), mul( -1/4, pow(x,2) ) ) );

}

function struveL( n, x ) {

  // one sign different from struveH

  return mul( pow( x, add(n,1) ), inv( mul( pow(2,n), sqrt(pi), gamma( add(n,3/2) ) ) ),
              hypergeometric1F2( 1, 3/2, add(n,3/2), mul( 1/4, pow(x,2) ) ) );

}


function jacobiTheta( n, x, q, tolerance=1e-10 ) {

  if ( abs(q) >= 1 ) throw Error( 'Unsupported elliptic nome' );

  if ( ![1,2,3,4].includes(n) ) throw Error( 'Undefined Jacobi theta index' );

  if ( isComplex(x) || isComplex(q) ) {

    if ( !isComplex(x) ) x = complex(x);

    var piTau = div( log(q), complex(0,1) );

    // dlmf.nist.gov/20.2 to reduce overflow
    if ( Math.abs(x.im) > Math.abs(piTau.im) || Math.abs(x.re) > Math.PI ) {

      // use floor for consistency with fundamentalParallelogram
      var pt = Math.floor( x.im / piTau.im );
      x = sub( x, mul( pt, piTau ) );

      var p = Math.floor( x.re / Math.PI );
      x = sub( x, p * Math.PI );

      var qFactor = pow( q, -pt*pt );
      var eFactor = exp( mul( -2 * pt, x, complex(0,1) ) );

      // factors can become huge, so chop spurious parts first
      switch( n ) {

        case 1:

          return mul( (-1)**(p+pt), qFactor, eFactor, chop( jacobiTheta( n, x, q ), tolerance ) );

        case 2:

          return mul( (-1)**p, qFactor, eFactor, chop( jacobiTheta( n, x, q ), tolerance ) );

        case 3:

          return mul( qFactor, eFactor, chop( jacobiTheta( n, x, q ), tolerance ) );

        case 4:

          return mul( (-1)**pt, qFactor, eFactor, chop( jacobiTheta( n, x, q ), tolerance ) );

      }

    }

    switch( n ) {

      case 1:

        var s = complex(0);
        var p = complex(1);
        var i = 0;

        while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
          p = mul( (-1)**i, pow( q, i*i+i ), sin( mul(2*i+1,x) ) );
          s = add( s, p );
          i++;
        }

        return mul( 2, pow( q, 1/4 ), s );

      case 2:

        var s = complex(0);
        var p = complex(1);
        var i = 0;

        while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
          p = mul( pow( q, i*i+i ), cos( mul(2*i+1,x) ) );
          s = add( s, p );
          i++;
        }

        return mul( 2, pow( q, 1/4 ), s );

      case 3:

        var s = complex(0);
        var p = complex(1);
        var i = 1;

        while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
          p = mul( pow( q, i*i ), cos( mul(2*i,x) ) );
          s = add( s, p );
          i++;
        }

        return add( 1, mul(2,s) );

      case 4:

        var s = complex(0);
        var p = complex(1);
        var i = 1;

        while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
          p = mul( pow( neg(q), i*i ), cos( mul(2*i,x) ) );
          s = add( s, p );
          i++;
        }

        return add( 1, mul(2,s) );

      }

  } else {

    switch( n ) {

      case 1:

        if ( q < 0 ) return jacobiTheta( n, x, complex(q) );

        var s = 0;
        var p = 1;
        var i = 0;

        while ( Math.abs(p) > tolerance ) {
          p = (-1)**i * q**(i*i+i) * sin( (2*i+1) * x );
          s += p;
          i++;
        }

        return 2 * q**(1/4) * s;

      case 2:

        if ( q < 0 ) return jacobiTheta( n, x, complex(q) );

        var s = 0;
        var p = 1;
        var i = 0;

        while ( Math.abs(p) > tolerance ) {
          p = q**(i*i+i) * cos( (2*i+1) * x );
          s += p;
          i++;
        }

        return 2 * q**(1/4) * s;

      case 3:

        var s = 0;
        var p = 1;
        var i = 1;

        while ( Math.abs(p) > tolerance ) {
          p = q**(i*i) * cos( 2*i * x );
          s += p;
          i++;
        }

        return 1 + 2 * s;

      case 4:

        var s = 0;
        var p = 1;
        var i = 1;

        while ( Math.abs(p) > tolerance ) {
          p = (-q)**(i*i) * cos( 2*i * x );
          s += p;
          i++;
        }

        return 1 + 2 * s;

    }

  }

}


function ellipticNome( m ) {

  if ( isComplex(m) ) return exp( div( mul( -pi, ellipticK( sub(1,m) ) ), ellipticK(m) ) );

  if ( m > 1 ) return ellipticNome( complex(m) );

  if ( m < 0 ) return -exp( -pi * ellipticK( 1/(1-m) ) / ellipticK( m/(m-1) ) );

  return exp( -pi * ellipticK(1-m) / ellipticK(m) );

}

function fundamentalParallelogram( x, p1, p2 ) {

  // x = m p1 + n p2, solve for m, n

  var m = ( x.re * p2.im - x.im * p2.re ) / ( p1.re * p2.im - p1.im * p2.re );
  var n = ( x.im * p1.re - x.re * p1.im ) / ( p1.re * p2.im - p1.im * p2.re );

  return add( x, mul( -Math.floor(m), p1 ), mul( -Math.floor(n), p2 ) );

}


function sn( x, m ) {

  if ( m > 1 || isComplex(x) || isComplex(m) ) {

    if ( !isComplex(m) ) m = complex(m); // ensure K complex

    // dlmf.nist.gov/22.17
    if ( abs(m) > 1 ) return mul( inv(sqrt(m)), sn( mul(sqrt(m),x), inv(m) ) ); 

    // periods 4K, 2iK'
    var p1 = mul( 4, ellipticK(m) );
    var p2 = mul( complex(0,2), ellipticK( sub(1,m) ) );

    x = fundamentalParallelogram( x, p1, p2 );

    var q = ellipticNome(m);
    var t = div( x, pow( jacobiTheta(3,0,q), 2 ) );

    return mul( div( jacobiTheta(3,0,q), jacobiTheta(2,0,q) ),
                div( jacobiTheta(1,t,q), jacobiTheta(4,t,q) ) );

  }

  // dlmf.nist.gov/22.5.ii
  if ( m === 0 ) return sin(x);
  if ( m === 1 ) return tanh(x);

  var q = ellipticNome(m);
  var t = x / jacobiTheta(3,0,q)**2;

  if ( m < 0 )
    return jacobiTheta(3,0,q) / jacobiTheta(4,t,q)
           * div( jacobiTheta(1,t,q), jacobiTheta(2,0,q) ).re;

  return jacobiTheta(3,0,q) / jacobiTheta(2,0,q)
         * jacobiTheta(1,t,q) / jacobiTheta(4,t,q);

}

function cn( x, m ) {

  if ( m > 1 || isComplex(x) || isComplex(m) ) {

    if ( !isComplex(m) ) m = complex(m); // ensure K complex

    // dlmf.nist.gov/22.17
    if ( abs(m) > 1 ) return dn( mul(sqrt(m),x), inv(m) ); 

    // periods 4K, 2K + 2iK'
    var p1 = mul( 4, ellipticK(m) );
    var p2 = add( div(p1,2), mul( complex(0,2), ellipticK( sub(1,m) ) ) );

    x = fundamentalParallelogram( x, p1, p2 );

    var q = ellipticNome(m);
    var t = div( x, pow( jacobiTheta(3,0,q), 2 ) );

    return mul( div( jacobiTheta(4,0,q), jacobiTheta(2,0,q) ),
                div( jacobiTheta(2,t,q), jacobiTheta(4,t,q) ) );

  }

  // dlmf.nist.gov/22.5.ii
  if ( m === 0 ) return cos(x);
  if ( m === 1 ) return sech(x);

  var q = ellipticNome(m);
  var t = x / jacobiTheta(3,0,q)**2;

  if ( m < 0 )
    return jacobiTheta(4,0,q) / jacobiTheta(4,t,q)
           * div( jacobiTheta(2,t,q), jacobiTheta(2,0,q) ).re;

  return jacobiTheta(4,0,q) / jacobiTheta(2,0,q)
         * jacobiTheta(2,t,q) / jacobiTheta(4,t,q);

}

function dn( x, m ) {

  if ( m > 1 || isComplex(x) || isComplex(m) ) {

    if ( !isComplex(m) ) m = complex(m); // ensure K complex

    // dlmf.nist.gov/22.17
    if ( abs(m) > 1 ) return cn( mul(sqrt(m),x), inv(m) ); 

    // periods 2K, 4iK'
    var p1 = mul( 2, ellipticK(m) );
    var p2 = mul( complex(0,4), ellipticK( sub(1,m) ) );

    x = fundamentalParallelogram( x, p1, p2 );

    var q = ellipticNome(m);
    var t = div( x, pow( jacobiTheta(3,0,q), 2 ) );

    return mul( div( jacobiTheta(4,0,q), jacobiTheta(3,0,q) ),
                div( jacobiTheta(3,t,q), jacobiTheta(4,t,q) ) );

  }

  // dlmf.nist.gov/22.5.ii
  if ( m === 0 ) return 1;
  if ( m === 1 ) return sech(x);

  var q = ellipticNome(m);
  var t = x / jacobiTheta(3,0,q)**2;

  return jacobiTheta(4,0,q) / jacobiTheta(3,0,q)
         * jacobiTheta(3,t,q) / jacobiTheta(4,t,q);

}

function am( x, m ) {

  if ( m > 1 || isComplex(x) || isComplex(m) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(m) ) m = complex(m);

    if ( m.im === 0 && m.re <= 1 ) {

      var K = ellipticK( m.re );
      var n = Math.round( x.re / 2 / K );
      x = sub( x, 2 * n * K );

      if ( m.re < 0 ) {

        var Kp = ellipticK( 1 - m.re );
        var p = Math.round( x.im / 2 / Kp.re );

        // bitwise test for odd integer
        if ( p & 1 ) return sub( n * pi, arcsin( sn(x,m) ) );

      }

      return add( arcsin( sn(x,m) ), n * pi );

    }

    return arcsin( sn(x,m) );

  } else {

    var K = ellipticK(m);
    var n = Math.round( x / 2 / K );
    x = x - 2 * n * K;

    return Math.asin( sn(x,m) ) + n * pi;

  }

}


function weierstrassRoots( g2, g3 ) {

  function cubicTrigSolution( p, q, n ) {

    // p, q both negative in defining cubic

    return mul( 2/sqrt(3), sqrt(p),
                cos( sub( div( arccos( mul( 3*sqrt(3)/2, q, pow(p,-3/2) ) ), 3 ),
                          2*pi*n/3 ) ) );
  }

  g2 = div( g2, 4 );
  g3 = div( g3, 4 );

  var e1 = cubicTrigSolution( g2, g3, 0 );
  var e2 = cubicTrigSolution( g2, g3, 1 );
  var e3 = cubicTrigSolution( g2, g3, 2 );

  return [ e1, e2, e3 ];

}

function weierstrassHalfPeriods( g2, g3 ) {

  // Davis, Intro to Nonlinear Diff. & Integral Eqs., pp.157-8
  // consistent with periods of Jacobi sine in weierstrassP
  // not consistent with Mathematica

  var [ e1, e2, e3 ] = weierstrassRoots( g2, g3 );

  var lambda = sqrt( sub(e1,e3) );
  var m = div( sub(e2,e3), sub(e1,e3) );

  var w1 = div( ellipticK(m), lambda );
  var w3 = div( mul( complex(0,1), ellipticK( sub(1,m) ) ), lambda );

  return [ w1, w3 ];

}

function weierstrassInvariants( w1, w3 ) {

  if ( !isComplex(w1) ) w1 = complex(w1);
  if ( !isComplex(w3) ) w3 = complex(w3);

  // order half periods by complex slope
  if ( w3.im/w3.re < w1.im/w1.re ) [ w1, w3 ] = [ w3, w1 ];

  var ratio =  div( w3, w1 ), conjugate;

  if ( ratio.im < 0 ) {
    ratio.im = -ratio.im;
    conjugate = true;
  }

  var q = exp( mul( complex(0,1), pi, ratio ) );

  // en.wikipedia.org/wiki/Weierstrass's_elliptic_functions
  // modified for input of half periods

  var a = jacobiTheta( 2, 0, q );
  var b = jacobiTheta( 3, 0, q );

  var g2 = mul( 4/3*pi**4, pow( mul(2,w1), -4 ),
                add( pow(a,8), mul( -1, pow(a,4), pow(b,4) ), pow(b,8) ) );

  var g3 = mul( 8/27*pi**6, pow( mul(2,w1), -6 ),
                add( pow(a,12), mul( -3/2, pow(a,8), pow(b,4) ),
                                mul( -3/2, pow(a,4), pow(b,8) ), pow(b,12) ) );

  if ( conjugate ) {
    g2.im = -g2.im;
    g3.im = -g3.im;
  }

  return [ g2, g3 ];

}


function weierstrassP( x, g2, g3 ) {

  if ( !isComplex(x) ) x = complex(x);

  var [ e1, e2, e3 ] = weierstrassRoots( g2, g3 );

  // Whittaker & Watson, Section 22.351

  var m = div( sub(e2,e3), sub(e1,e3) );

  return add( e3, mul( sub(e1,e3), pow( sn( mul( x, sqrt(sub(e1,e3)) ), m ), -2 ) ) );

}

function weierstrassPPrime( x, g2, g3 ) {

  if ( !isComplex(x) ) x = complex(x);

  var [ e1, e2, e3 ] = weierstrassRoots( g2, g3 );

  // Whittaker & Watson, Section 22.351

  var m = div( sub(e2,e3), sub(e1,e3) );

  var argument = mul( x, sqrt(sub(e1,e3)) );

  return mul( -2, pow( sub(e1,e3), 3/2 ), cn( argument, m ), dn( argument, m ),
              pow( sn( argument, m ), -3 ) );

}

function inverseWeierstrassP( x, g2, g3 ) {

  if ( !isComplex(x) ) x = complex(x);

  var [ e1, e2, e3 ] = weierstrassRoots( g2, g3 );

  // Johansson arxiv.org/pdf/1806.06725.pdf p.17
  // sign of imaginary part on real axis differs from Mathematica

  return carlsonRF( sub(x,e1), sub(x,e2), sub(x,e3) );

}


function kleinJ( x ) {

  // from mpmath / elliptic.py

  var q = exp( mul( complex(0,pi), x ) );
  var t2 = chop( jacobiTheta(2,0,q) );
  var t3 = chop( jacobiTheta(3,0,q) );
  var t4 = chop( jacobiTheta(4,0,q) );
  var P = pow( add( pow(t2,8), pow(t3,8), pow(t4,8) ), 3 );
  var Q = mul( 54, pow( mul(t2,t3,t4), 8 ) );

  return div( P, Q );

}


// Carlson symmetric integrals

function carlsonRC( x, y ) {

  if ( x < 0 || y < 0 || isComplex(x) || isComplex(y) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);

    if ( x.re === y.re && x.im === y.im ) return inv( sqrt(x) );

    // return value by continuity

    return div( arccos( div( sqrt(x), sqrt(y) ) ), mul( sqrt(y), sqrt( sub( 1, div(x,y) ) ) ) );

  }

  if ( x === y ) return 1 / Math.sqrt(x);

  if ( x < y ) return Math.acos( Math.sqrt(x/y) ) / Math.sqrt(y-x);

  return Math.acosh( Math.sqrt(x/y) ) / Math.sqrt(x-y);

}

function carlsonRD( x, y, z ) {

  return carlsonRJ( x, y, z, z );

}

function carlsonRF( x, y, z, tolerance=1e-10 ) {

  if ( isComplex(x) || isComplex(y) || isComplex(z) ) {

    var xm = x;
    var ym = y;
    var zm = z;

    var Am = A0 = div( add( x, y, z ), 3 );
    var Q = Math.pow( 3*tolerance, -1/6 )
            * Math.max( abs( sub(A0,x) ), abs( sub(A0,y) ), abs( sub(A0,z) ) );
    var g = .25;
    var pow4 = 1;

    while ( true ) {
      var xs = sqrt(xm);
      var ys = sqrt(ym);
      var zs = sqrt(zm);
      var lm = add( mul(xs,ys), mul(xs,zs), mul(ys,zs) );
      var Am1 = mul( add(Am,lm), g );
      xm = mul( add(xm,lm), g );
      ym = mul( add(ym,lm), g );
      zm = mul( add(zm,lm), g );
      if ( pow4 * Q < abs(Am) ) break;
      Am = Am1;
      pow4 *= g;
    }

    var t = div( pow4, Am );
    var X = mul( sub(A0,x), t );
    var Y = mul( sub(A0,y), t );
    var Z = neg( add(X,Y) );
    var E2 = sub( mul(X,Y), mul(Z,Z) );
    var E3 = mul(X,Y,Z);

    return mul( pow( Am, -.5 ),
             add( 9240, mul(-924,E2), mul(385,E2,E2), mul(660,E3), mul(-630,E2,E3) ), 1/9240 );

  } else {

    if ( y === z ) return carlsonRC( x, y );
    if ( x === z ) return carlsonRC( y, x );
    if ( x === y ) return carlsonRC( z, x );

    if ( x < 0 || y < 0 || z < 0 ) return carlsonRF( complex(x), y, z );

    // adapted from mpmath / elliptic.py

    var xm = x;
    var ym = y;
    var zm = z;

    var Am = A0 = (x + y + z) / 3;
    var Q = Math.pow( 3*tolerance, -1/6 )
            * Math.max( Math.abs(A0-x), Math.abs(A0-y), Math.abs(A0-z) );
    var g = .25;
    var pow4 = 1;

    while ( true ) {
      var xs = Math.sqrt(xm);
      var ys = Math.sqrt(ym);
      var zs = Math.sqrt(zm);
      var lm = xs*ys + xs*zs + ys*zs;
      var Am1 = (Am + lm) * g;
      xm = (xm + lm) * g;
      ym = (ym + lm) * g;
      zm = (zm + lm) * g;
      if ( pow4 * Q < Math.abs(Am) ) break;
      Am = Am1;
      pow4 *= g;
    }

    var t = pow4 / Am;
    var X = (A0-x) * t;
    var Y = (A0-y) * t;
    var Z = -X-Y;
    var E2 = X*Y - Z**2;
    var E3 = X*Y*Z;

    return Math.pow( Am, -.5 )
           * ( 9240 - 924*E2 + 385*E2**2 + 660*E3 - 630*E2*E3 ) / 9240;

  }

}

function carlsonRG( x, y, z ) {

  var t1 = mul( z, carlsonRF(x,y,z) );
  var t2 = mul( -1/3, sub(x,z), sub(y,z), carlsonRD(x,y,z) );
  var t3 = sqrt( mul( x, y, inv(z) ) );

  return mul( .5, add( t1, t2, t3 ) );

}

function carlsonRJ( x, y, z, p, tolerance=1e-10 ) {

  if ( isComplex(x) || isComplex(y) || isComplex(z) || isComplex(p) ) {

    var xm = x;
    var ym = y;
    var zm = z;
    var pm = p;

    var A0 = Am = div( add( x, y, z, mul(2,p) ), 5 );
    var delta = mul( sub(p,x), sub(p,y), sub(p,z) );
    var Q = Math.pow( .25*tolerance, -1/6 )
            * Math.max( abs( sub(A0,x) ), abs( sub(A0,y) ), abs( sub(A0,z) ), abs( sub(A0,p) ) );
    var g = .25;
    var pow4 = 1;
    var S = complex(0);

    while ( true ) {
      var sx = sqrt(xm);
      var sy = sqrt(ym);
      var sz = sqrt(zm);
      var sp = sqrt(pm);
      var lm = add( mul(sx,sy), mul(sx,sz), mul(sy,sz) );
      var Am1 = mul( add(Am,lm), g );
      xm = mul( add(xm,lm), g );
      ym = mul( add(ym,lm), g );
      zm = mul( add(zm,lm), g );
      pm = mul( add(pm,lm), g );
      var dm = mul( add(sp,sx), add(sp,sy), add(sp,sz) );
      var em = mul( delta, pow4**3, inv(dm), inv(dm) );
      if ( pow4 * Q < abs(Am) ) break;
      var T = mul( carlsonRC( 1, add(1,em) ), pow4, inv(dm) );
      S = add( S, T );
      pow4 *= g;
      Am = Am1;
    }

    var t = div( pow4, Am );
    var X = mul( sub(A0,x), t );
    var Y = mul( sub(A0,y), t );
    var Z = mul( sub(A0,z), t );
    var P = div( add(X,Y,Z), -2 );
    var E2 = add( mul(X,Y), mul(X,Z), mul(Y,Z), mul(-3,P,P) );
    var E3 = add( mul(X,Y,Z), mul(2,E2,P), mul(4,P,P,P) );
    var E4 = mul( add( mul(2,X,Y,Z), mul(E2,P), mul(3,P,P,P) ), P );
    var E5 = mul(X,Y,Z,P,P);
    P = add( 24024, mul(-5148,E2), mul(2457,E2,E2), mul(4004,E3), mul(-4158,E2,E3), mul(-3276,E4), mul(2772,E5) );
    var v1 = mul( pow4, pow( Am, -1.5 ), P, 1/24024 );
    var v2 = mul(6,S);

    return add( v1, v2 );

  } else {

    if ( x < 0 || y < 0 || z < 0 || p < 0 ) return carlsonRJ( complex(x), y, z, p );

    // adapted from mpmath / elliptic.py

    var xm = x;
    var ym = y;
    var zm = z;
    var pm = p;

    var A0 = Am = (x + y + z + 2*p) / 5;
    var delta = (p-x) * (p-y) * (p-z);
    var Q = Math.pow( .25*tolerance, -1/6 )
            * Math.max( Math.abs(A0-x), Math.abs(A0-y), Math.abs(A0-z), Math.abs(A0-p) );
    var g = .25;
    var pow4 = 1;
    var S = 0;

    while ( true ) {
      var sx = Math.sqrt(xm);
      var sy = Math.sqrt(ym);
      var sz = Math.sqrt(zm);
      var sp = Math.sqrt(pm);
      var lm = sx*sy + sx*sz + sy*sz;
      var Am1 = (Am + lm) * g;
      xm = (xm + lm) * g;
      ym = (ym + lm) * g;
      zm = (zm + lm) * g;
      pm = (pm + lm) * g;
      var dm = (sp+sx) * (sp+sy) * (sp+sz);
      var em = delta * pow4**3 / dm**2;
      if ( pow4 * Q < Math.abs(Am) ) break;
      var T = carlsonRC( 1, 1 + em ) * pow4 / dm;
      S += T;
      pow4 *= g;
      Am = Am1;
    }

    var t = pow4 / Am;
    var X = (A0-x) * t;
    var Y = (A0-y) * t;
    var Z = (A0-z) * t;
    var P = (-X-Y-Z) / 2;
    var E2 = X*Y + X*Z + Y*Z - 3*P**2;
    var E3 = X*Y*Z + 2*E2*P + 4*P**3;
    var E4 = ( 2*X*Y*Z + E2*P + 3*P**3 ) * P;
    var E5 = X*Y*Z*P**2;
    P = 24024 - 5148*E2 + 2457*E2**2 + 4004*E3 - 4158*E2*E3 - 3276*E4 + 2772*E5;
    var v1 = pow4 * Math.pow( Am, -1.5 ) * P / 24024;
    var v2 = 6*S;

    return v1 + v2;

  }

}


// elliptic integrals

function ellipticF( x, m ) {

  if ( arguments.length === 1 ) {
    m = x;
    x = pi/2;
  }

  if ( isComplex(x) || isComplex(m) ) {

    if ( !isComplex(x) ) x = complex(x);

    var period = complex(0);
    if ( Math.abs(x.re) > pi/2 ) {
      var p = Math.round( x.re / pi );
      x.re = x.re - p * pi;
      period = mul( 2 * p, ellipticK( m ) );
    }

    return add( mul( sin(x), carlsonRF( mul(cos(x),cos(x)), sub( 1, mul(m,sin(x),sin(x)) ), 1 ) ), period );

  } else {

    if ( m > 1 && Math.abs(x) > Math.asin( 1 / Math.sqrt(m) ) ) return ellipticF( complex(x), m );

    var period = 0;
    if ( Math.abs(x) > pi/2 ) {
      var p = Math.round( x / pi );
      x = x - p * pi;
      period = 2 * p * ellipticK( m );
    }

    return sin(x) * carlsonRF( cos(x)**2, 1 - m * sin(x)**2, 1 ) + period;

  }

}

function ellipticK( m ) {

  return ellipticF( m );

}

function ellipticE( x, m ) {

  if ( arguments.length === 1 ) {
    m = x;
    x = pi/2;
  }

  if ( isComplex(x) || isComplex(m) ) {

    if ( !isComplex(x) ) x = complex(x);

    var period = complex(0);
    if ( Math.abs(x.re) > pi/2 ) {
      var p = Math.round( x.re / pi );
      x.re = x.re - p * pi;
      period = mul( 2 * p,  ellipticE( m ) );
    }

    return add( mul( sin(x), carlsonRF( mul(cos(x),cos(x)), sub( 1, mul(m,sin(x),sin(x)) ), 1 ) ),
                mul( -1/3, m, pow(sin(x),3), carlsonRD( mul(cos(x),cos(x)), sub( 1, mul(m,sin(x),sin(x)) ), 1 ) ),
                period );

  } else {

    if ( m > 1 && Math.abs(x) > Math.asin( 1 / Math.sqrt(m) ) ) return ellipticE( complex(x), m );

    var period = 0;
    if ( Math.abs(x) > pi/2 ) {
      var p = Math.round( x / pi );
      x = x - p * pi;
      period = 2 * p * ellipticE( m );
    }

    return sin(x) * carlsonRF( cos(x)**2, 1 - m * sin(x)**2, 1 )
           - m / 3 * sin(x)**3 * carlsonRD( cos(x)**2, 1 - m * sin(x)**2, 1 )
           + period;

  }

}

function ellipticPi( n, x, m ) {

  if ( arguments.length === 2 ) {
    m = x;
    x = pi/2;
  }

  // x outside period and abs(n)>1 agrees with mpmath, differs from Mathematica

  if ( isComplex(n) || isComplex(x) || isComplex(m) ) {

    if ( !isComplex(x) ) x = complex(x);

    var period = complex(0);
    if ( Math.abs(x.re) > pi/2 ) {
      var p = Math.round( x.re / pi );
      x.re = x.re - p * pi;
      period = mul( 2 * p, ellipticPi( n, m ) );
    }

    return add( mul( sin(x), carlsonRF( mul(cos(x),cos(x)), sub( 1, mul(m,sin(x),sin(x)) ), 1 ) ),
                mul( 1/3, n, pow(sin(x),3),
                  carlsonRJ( mul(cos(x),cos(x)), sub( 1, mul(m,sin(x),sin(x)) ), 1,
                                 sub( 1, mul(n,sin(x),sin(x)) ) ) ),
                period );

  } else {

    if ( n > 1 && Math.abs(x) > Math.asin( 1 / Math.sqrt(n) ) ) return ellipticPi( n, complex(x), m );

    if ( m > 1 && Math.abs(x) > Math.asin( 1 / Math.sqrt(m) ) ) return ellipticPi( n, complex(x), m );

    var period = 0;
    if ( Math.abs(x) > pi/2 ) {
      var p = Math.round( x / pi );
      x = x - p * pi;
      period = 2 * p * ellipticPi( n, m );
    }

    return sin(x) * carlsonRF( cos(x)**2, 1 - m * sin(x)**2, 1 )
           + n / 3 * sin(x)**3
             * carlsonRJ( cos(x)**2, 1 - m * sin(x)**2, 1, 1 - n * sin(x)**2 )
           + period;

  }

}


function jacobiZeta( x, m ) {

  // using definition matching elliptic integrals
  // alternate definition replaces x with am(x,m)

  return sub( ellipticE( x, m ), mul( ellipticF(x,m), ellipticE(m), inv( ellipticK(m) ) ) );

}


function factorial( n ) {

  if ( isComplex(n) ) {

    if ( isPositiveIntegerOrZero(n) ) return complex( factorial(n.re) );

    return gamma( add(n,1) );

  }

  if ( isPositiveIntegerOrZero(n) ) {

    if ( factorialCache[n] ) return factorialCache[n];

    var last = factorialCache.length - 1;
    var result = factorialCache[last];

    for ( var i = last + 1 ; i <= n ; i++ ) {
      result *= i;
      factorialCache[i] = result;
    }

    return result;

  }

  return gamma( n+1 );

}

function factorial2( n ) {

  if ( isComplex(n) ) {

    if ( isPositiveIntegerOrZero(n) ) return complex( factorial2(n.re) );

    var p1 = pow( 2, div(n,2) );
    var p2 = pow( pi/2, div( sub( cos(mul(pi,n)), 1 ), 4 ) );
    var p3 = gamma( add( div(n,2) , 1 ) );

    return mul( p1, p2, p3 );

  }

  if ( n === 0 ) return 1;

  if ( isPositiveInteger(n) ) {

    // bitwise test for odd integer, upward recursion for possible caching
    var result = n & 1 ? 1 : 2;
    for ( var i = result + 2 ; i <= n ; i += 2 ) result *= i;
    return result;

  }

  // github.com/sympy/sympy/pull/10362#issuecomment-170344298
  
  return 2**(n/2) * (pi/2)**((cos(pi*n)-1)/4) * gamma( n/2+1 );

}

function binomial( n, m ) {

  if ( isComplex(n) || isComplex(m) )
    return div( factorial(n), mul( factorial( sub(n,m) ), factorial(m) ) );

  if ( Number.isInteger(m) && m < 0 && n >= 0 ) return 0;

  if ( Number.isInteger(n) && Number.isInteger(m) && n >= 0 && m > n ) return 0;

  return factorial(n) / factorial(n-m) / factorial(m);

}

function multinomial( n ) {

  if ( arguments.length === 1 ) return isComplex(n) ? complex(1) : 1;

  var s = 0, p = 1, nNeg = 0;

  for ( var i = 0 ; i < arguments.length ; i++ ) {

    var ni = arguments[i];
    s = add( s, ni );

    // catch negative integers for cancellation in ratio
    // reduce all to factorial(-1) divided by factor
    // extra overhead with pow() keeps complex in complex out

    if ( isNegativeInteger( ni ) ) {
      var k = sub( -1, ni );
      p = div( p, mul( chop(pow(-1,k)), factorial(k) ) );
      nNeg++;
    } else
      // standard factorial
      p = mul( p, factorial( arguments[i] ) );

  }

  if ( isNegativeInteger(s) ) {
    nNeg--;
    if ( nNeg > 0 ) return isComplex(s) ? complex(0) : 0;
    var k = sub( -1, s );
    return inv( mul( p, chop(pow(-1,k)), factorial(k) ) );
  }

  if ( nNeg > 0 ) return isComplex(s) ? complex(0) : 0;

  return div( factorial(s), p );

}

function pochhammer( x, n ) {

  var one = isArbitrary(x) ? arb1 : 1;

  if ( isZero(n) ) {
    if ( isComplex(x) || isComplex(n) ) return complex(one);
    return one;
  }

  if ( isComplex(n) ) {

    if ( isPositiveInteger(n) ) {
      var result = pochhammer( x, n.re );
      if ( isComplex(result) ) return result;
      return complex(result);
    }

    if ( isArbitrary(x) && !isArbitrary(n) ) n = arbitrary(n);

    return div( gamma( add(x,n) ), gamma(x) );

  }

  if ( isPositiveInteger(n) ) {

    var result = x, current = one, count = 1;

    while ( count < n ) {
      result = mul( result, add( x, current ) );
      current = add( current, one );
      count++;
    }

    return result;

  }

  if ( isArbitrary(x) && !isArbitrary(n) ) n = arbitrary(n);

  return div( gamma( add(x,n) ), gamma(x) );

}


function logGamma( x ) {

  if ( isArbitrary(x) ) {

    var useAsymptotic = 10n * arb1;

    if ( isNegativeIntegerOrZero( arbitrary(x) ) ) throw Error( 'Gamma function pole' );

    if ( abs(x) < useAsymptotic ) {

      // slightly faster to get smaller integer near transition circle
      var xRe = isComplex(x) ? x.re : x;
      var n = Math.ceil( arbitrary(useAsymptotic) - arbitrary(xRe) );

      // ln(pochhammer(x,n))
      var lnPochhammer = ln(x), current = arb1, count = 1;

      while ( count < n ) {
        lnPochhammer = add( lnPochhammer, ln( add( x, current ) ) );
        current = add( current, arb1 );
        count++;
      }

      return sub( logGamma(add(x,arbitrary(n))), lnPochhammer );

    }

    if ( x < 0n ) x = complex(x);

    // reflection formula with non-Hare correction to imaginary part
    if ( x.re < 0n ) {

      // expand sine as exponentials for more accurate result
      var t, e, p, k = arb1;

      if ( abs(x.im) === 0 ) {

        t = neg( ln( sin( mul( x, onePi ) ) ) );

      } else if ( x.im < 0n ) {

        e = exp( mul( x, complex(0n,-twoPi) ) );
        p = complex( e.re, e.im );
        t = complex( e.re, e.im );
        while ( p.re !== 0n || p.im !== 0n ) {
          k += arb1;
          p = mul( p, e );
          t = add( t, div( p, k ) );
        }
        t = add( t, mul( x, complex(0n,-onePi) ), ln(arb2) );

      } else {

        e = exp( mul( x, complex(0n,twoPi) ) );
        p = complex( e.re, e.im );
        t = complex( e.re, e.im );
        while ( p.re !== 0n || p.im !== 0n ) {
          k += arb1;
          p = mul( p, e );
          t = add( t, div( p, k ) );
        }
        t = add( t, mul( x, complex(0n,onePi) ), complex(0n,-onePi), ln(arb2) );

      }

      return add( t, ln(onePi), neg( logGamma( sub(arb1,x) ) ), complex(0n,halfPi) );

    }

    // Johansson arxiv.org/abs/2109.08392

    var k = 1, K = arb1, y, p = 1n, s = 0n;

    if ( isComplex(x) ) {
      function compare() { return p.re !== 0n || p.im !== 0n; };
      y = complex( x.re, x.im );
    } else {
      function compare() { return p !== 0n; };
      y = x;
    }

    while ( compare() ) {

      if ( k === bernoulli2nN.length ) {
        console.log( 'Not enough Bernoulli numbers for logGamma' );
        break;
      }

      p = div( div( bernoulli2nN[k], bernoulli2nD[k] ),
               mul( K+arb1, K, y ) );
      s = add( s, p );

      y = mul( y, x, x );
      K += arb2;
      k++;

    }

    return add( mul( sub(x,arb1/2n), ln(x) ), neg(x), div(ln(twoPi),arb2), s );

  }

  // log of gamma less likely to overflow than gamma
  // Lanczos approximation as evaluated by Paul Godfrey

  var c = [ 57.1562356658629235, -59.5979603554754912, 14.1360979747417471,
            -.491913816097620199, .339946499848118887e-4, .465236289270485756e-4,
            -.983744753048795646e-4, .158088703224912494e-3, -.210264441724104883e-3,
            .217439618115212643e-3, -.164318106536763890e-3, .844182239838527433e-4,
            -.261908384015814087e-4, .368991826595316234e-5 ];

  if ( isNegativeIntegerOrZero(x) ) throw Error( 'Gamma function pole' );

  if ( isComplex(x) ) {

    // reflection formula with modified Hare correction to imaginary part
    if ( x.re < 0 ) {

      var logRatio = log( div( pi, sin( mul(pi,x) ) ) );
      // rounding errors can lead to wrong side of branch point
      if ( isNegativeIntegerOrZero( ( x.re + .5 ) / 2 ) )
        logRatio.im = pi * ( x.im > 0 ? 1 : -1 ); // avoid Math.sign(0) = 0

      var t = sub( logRatio, logGamma( sub(1,x) ) );
      var s = x.im < 0 ? -1 : 1;
      var d = x.im === 0 ? 1/4 : 0;
      var k = Math.ceil( x.re/2 - 3/4 + d );

      return add( t, complex( 0, 2*s*k*pi ) );

    }

    var t = add( x, 5.24218750000000000 );
    t = sub( mul( add( x, .5 ), log(t)), t );
    var s = .999999999999997092;
    for ( var j = 0 ; j < 14 ; j++ ) s = add( s, div( c[j], add( x, j+1 ) ) );
    var u = add( t, log( mul( 2.5066282746310005, div( s, x ) ) ) );

    // adjustment to keep imaginary part on same sheet
    if ( s.re < 0 ) {
      if( x.im < 0 && div(s,x).im < 0 ) u = add( u, complex(0,2*pi) );
      if( x.im > 0 && div(s,x).im > 0 ) u = add( u, complex(0,-2*pi) );
    }

    return u;

  } else {

    if ( x < 0 ) return logGamma( complex(x) ); 

    var t = x + 5.24218750000000000;
    t = ( x + .5 ) * log(t) - t;
    var s = .999999999999997092;
    for ( var j = 0 ; j < 14 ; j++ ) s += c[j] / (x+j+1);
    return t + log( 2.5066282746310005 * s / x );

  }

}

function gamma( x, y, z ) {

  if ( arguments.length === 2 ) {

    if ( isZero(x) ) {

      if ( isZero(y) ) throw Error( 'Gamma function pole' );

      var result = neg( expIntegralEi( neg(y), true ) );

      // complex on negative real axis
      if ( y < 0 || y.re < 0 && y.im === 0 ) result = sub( result, complex(0,pi) );

      return result;

    }

    // dlmf.nist.gov/8.4.15
    if ( isNegativeInteger(x) ) {

      var n = isComplex(x) ? -x.re : -x;
      var s = inv(y), p = s; // mul returns new object

      for ( var k = 1 ; k < n ; k++ ) {
        p = mul( p, -k, inv(y) );
        s = add( s, p );
      }

      var t = mul( exp(neg(y)), s );

      // dlmf.nist.gov/8.4.4
      var result = sub( neg( expIntegralEi( neg(y), true, 1e-14 ) ), t )

      // complex on negative real axis
      if ( y < 0 || y.re < 0 && y.im === 0 ) result = sub( result, complex(0,pi) );

      result = mul( (-1)**n/factorial(n), result );

      if ( isComplex(x) && !isComplex(result) ) return complex(result); // complex in, complex out

      return result;

    }

    return mul( exp(neg(y)), hypergeometricU( sub(1,x), sub(1,x), y ) );

  }

  if ( arguments.length === 3 ) {

    if ( !isZero(y) ) return sub( gamma(x,0,z), gamma(x,0,y) );

    return mul( pow(z,x), inv(x), hypergeometric1F1( x, add(x,1), neg(z) ) );

  }

  if ( isPositiveInteger(x) ) return factorial( sub(x,1) );

  // logGamma complex on negative axis
  if ( !isComplex(x) && x < 0 ) return exp( logGamma( complex(x) ) ).re;

  return exp( logGamma(x) );

}

function gammaRegularized( x, y, z ) {

  if ( arguments.length === 3 ) return div( gamma(x,y,z), gamma(x) );

  return div( gamma(x,y), gamma(x) );

}

function beta( x, y, z, w ) {

  if ( arguments.length === 4 )

    return sub( beta(y,z,w), beta(x,z,w) );

  if ( arguments.length === 3 )

    return mul( pow(x,y), inv(y), hypergeometric2F1( y, sub(1,z), add(y,1), x ) );

  return div( mul( gamma(x), gamma(y) ), gamma( add(x,y) ) ); 

}

function betaRegularized( x, y, z, w ) {

  if ( arguments.length === 4 )

    return div( beta(x,y,z,w), beta(z,w) );

  return div( beta(x,y,z), beta(y,z) );

}

function polygamma( n, x ) {

  if ( arguments.length === 1 ) return digamma(x);

  if ( !isPositiveInteger(n) ) throw Error( 'Unsupported polygamma index' );

  return mul( (-1)**(n+1) * factorial(n), hurwitzZeta( n+1, x ) );

}


function digamma( x ) {

  return diff( x => logGamma(x), x );

}


function erf( x ) {

  var useAsymptotic = 5;

  var absArg = Math.abs( arg(x) );

  if ( abs(x) > useAsymptotic && ( absArg < pi/4 || absArg > 3*pi/4 ) )

    return sub( 1, erfc(x) );

  return mul( 2/sqrt(pi), x, hypergeometric1F1( .5, 1.5, neg(mul(x,x)) ) );

}

function erfc( x ) {

  var useAsymptotic = 5;

  var absArg = Math.abs( arg(x) );

  if ( abs(x) > useAsymptotic && ( absArg < pi/4 || absArg > 3*pi/4 ) ) {

    // as per dlmf.nist.gov/7.12.1 this could be an independent sum for minor improvement
    // these numbers are tiny and need to stay in this function even though
    //   there is some code duplication with erf

    var t = mul( 1/sqrt(pi), exp( neg(mul(x,x)) ), inv(x),
                 hypergeometric2F0( .5, 1, neg(inv(mul(x,x))) ) );

    if ( x.re < 0 || x < 0 ) return add( 2, t );

    return t;

  }

  return sub( 1, erf(x) );

}

function erfi( x ) {

  return mul( complex(0,-1), erf( mul( complex(0,1), x ) ) );

}


function fresnelS( x ) {

  // can also be evaluated with hypergeometric1F2

  var m1 = hypergeometric1F1( .5, 1.5, mul( complex(0,pi/2), pow(x,2) ) );
  var m2 = hypergeometric1F1( .5, 1.5, mul( complex(0,-pi/2), pow(x,2) ) );

  var result = mul( x, sub( m1, m2 ), complex(0,-.5) );

  if ( isComplex(x) ) return result;

  return result.re;

}

function fresnelC( x ) {

  // can also be evaluated with hypergeometric1F2

  var m1 = hypergeometric1F1( .5, 1.5, mul( complex(0,pi/2), pow(x,2) ) );
  var m2 = hypergeometric1F1( .5, 1.5, mul( complex(0,-pi/2), pow(x,2) ) );

  var result = mul( x, add( m1, m2 ), .5 );

  if ( isComplex(x) ) return result;

  return result.re;

}


function expIntegralEi( x, adjustImForGamma=false, tolerance=1e-10 ) {

  // direct series hangs at -1 and +i/-i
  // complex average until investigate further

  if ( isUnity(neg(x)) ) return complexAverage( x => expIntegralEi(x,adjustImForGamma,tolerance), x );

  var ix = mul( x, complex(0,1) );
  if ( isUnity(ix) || isUnity(neg(ix)) )
    return complexAverage( x => expIntegralEi(x,adjustImForGamma,tolerance), x, complex(0,1e-5) );

  var useAsymptotic = 26;

  if ( isComplex(x) ) {

    if ( abs(x) > useAsymptotic ) {

      var s = complex(1);
      var p = complex(1), pLast = p; // mul returns new object
      var i = 1;

      while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {

        p = mul( p, i, inv(x) );
        if ( abs(p) > abs(pLast) ) break;

        s = add( s, p );
        i++;
        pLast = p;

      }

      if ( adjustImForGamma )

        return mul( s, exp(x), inv(x) );

      else {

        // combination of logarithms adds/subtracts complex(0,pi)
        var sign = x.im > 0 ? 1 : x.im < 0 ? -1 : 0;

        return add( mul( s, exp(x), inv(x) ), complex(0,sign*pi) );

      }

    }

    // determined from pattern on test page
    var distanceScale = abs( sub(x,useAsymptotic) ) / useAsymptotic;
    var useArbitrary = distanceScale > 1;

    // arbitrary precision series is unstable around the origin but not needed

    if ( useArbitrary && abs(x) > 1.5 ) {

      // use only decimals needed
      var n = 17 + Math.round( 10 * ( distanceScale - 1 ) );
      setPrecisionScale( n );

      var y = arbitrary( x );

      var s = arbitrary( complex(0) );
      var p = arbitrary( complex(1) );
      var i = arb1;

      while ( div(p.re,i) !== 0n || div(p.im,i) !== 0n ) {
        p = div( mul(p,y), i );
        s = add( s, div(p,i) );
        i = add( i, arb1 );
      }

      s = add( s, getConstant( 'eulerGamma' ), ln(y) );

      if ( adjustImForGamma ) {
        var sign = x.im > 0n ? -1n : x.im < 0n ? 1n : 0n;
        s = add( s, complex(0n,sign*onePi) );
      }

      s = arbitrary( s );

      resetPrecisionScale();

      // adjust phase on positive imaginary axis according to test
      if ( x.im > 0 && x.re === 0 ) s.im += pi;

    } else {

      var s = complex(0);
      var p = complex(1);
      var i = 1;

      while ( Math.abs(p.re/i) > tolerance || Math.abs(p.im/i) > tolerance ) {
        p = mul( p, x, 1/i );
        s = add( s, div(p,i) );
        i++;
      }

      s = add( s, eulerGamma, log(x) );

      if ( adjustImForGamma ) {
        var sign = x.im > 0 ? -1 : x.im < 0 ? 1 : 0;
        s = add( s, complex(0,sign*pi) );
      }

    }

    // real on negative real axis, set phase explicitly rather than log combo
    if ( x.re < 0 && x.im === 0 ) s.im = 0;

    return s;

  } else {

    if ( x < 0 ) return expIntegralEi( complex(x) ).re;

    if ( Math.abs(x) > useAsymptotic ) {

      var s = 1;
      var p = 1, pLast = p;
      var i = 1;

      while ( Math.abs(p) > tolerance ) {

        p *= i / x;
        if ( Math.abs(p) > Math.abs(pLast) ) break;

        s += p;
        i++;
        pLast = p;

      }

      return s * Math.exp(x) / x;

    }

    var s = 0;
    var p = 1;
    var i = 1;

    while ( Math.abs(p/i) > tolerance ) {
      p *= x / i;
      s += p / i;
      i++;
    }

    return s + eulerGamma + Math.log(x);

  }

}

function logIntegral( x ) {

  return expIntegralEi( log(x) );

}

function sinIntegral( x ) {

  if ( isZero(x) ) return isComplex(x) ? complex(0) : 0;

  var ix = mul( complex(0,1), x );

  var result = mul( complex(0,.5), add( gamma(0,neg(ix)), neg(gamma(0,ix)),
                                        log(neg(ix)), neg(log(ix)) ) );

  if ( isComplex(x) ) return result;

  return result.re;

}

function cosIntegral( x ) {

  // complex for negative real argument

  var ix = mul( complex(0,1), x );

  var result = sub( log(x), mul( .5, add( gamma(0,neg(ix)), gamma(0,ix),
                                     log(neg(ix)), log(ix) ) ) );

  // real for positive real argument
  if ( x > 0 ) return result.re;
  if ( x.re > 0 && x.im === 0 ) result.im = chop( result.im );

  return result;

}

function sinhIntegral( x ) {

  if ( isZero(x) ) return isComplex(x) ? complex(0) : 0;

  var result = mul( .5, add( gamma(0,x), neg(gamma(0,neg(x))), log(x), neg(log(neg(x))) ) );

  if ( isComplex(x) ) return result;

  return result.re;

}

function coshIntegral( x ) {

  // complex for negative real argument

  return mul( -.5, add( gamma(0,x), gamma(0,neg(x)), neg(log(x)), log(neg(x)) ) );

}

function expIntegralE( n, x ) {

  if ( isZero(n) ) return div( exp(neg(x)), x );

  if ( isZero(x) && ( n > 1 || n.re > 1 ) ) return inv( sub(n,1) );

  var p = pow( x, sub(n,1) );

  // real on negative real axis for integer powers
  if ( isInteger(n) && x.re < 0 ) p.im = chop( p.im );

  return mul( p, gamma( sub(1,n), x ) );

}


function hypergeometric0F1( a, x, tolerance=1e-10 ) {

  var useAsymptotic = 100;

  if ( isNegativeIntegerOrZero(a) ) throw Error( 'Hypergeometric function pole' );

  if ( isComplex(a) || isComplex(x) ) {

    // asymptotic form as per Johansson arxiv.org/abs/1606.06977
    if ( abs(x) > useAsymptotic ) {

      if ( isNegativeIntegerOrZero( sub(a,.5) ) ) {
        var result = complexAverage( a => hypergeometric0F1(a,x), a );
        if ( isReal(x) ) result.im = 0;
        return result;
      }

      // transform variables for convenience
      var b = sub( mul(2,a), 1 );
      a = sub( a, .5 );
      x = mul( 4, sqrt(x) );

      // copied from hypergeometric1F1
      var t1 = mul( gamma(b), pow( neg(x), neg(a) ), inv( gamma(sub(b,a)) ) );
      t1 = mul( t1, hypergeometric2F0( a, add(a,neg(b),1), div(-1,x) ) );

      var t2 = mul( gamma(b), pow( x, sub(a,b) ), exp(x), inv( gamma(a) ) );
      t2 = mul( t2, hypergeometric2F0( sub(b,a), sub(1,a), div(1,x) ) );

      var result = mul( exp( div(x,-2) ), add( t1, t2 ) );

      // real for real arguments
      if ( isReal(a) && isReal(x) ) result.im = 0;

      return result;

    }

    var s = complex(1);
    var p = complex(1);
    var i = 1;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      p = mul( p, x, inv(a), 1/i );
      s = add( s, p );
      a = add( a, 1 );
      i++;
    }

    return s;

  } else {

    // asymptotic form is complex
    if ( Math.abs(x) > useAsymptotic ) return hypergeometric0F1( a, complex(x) ).re;

    var s = 1;
    var p = 1;
    var i = 1;

    while ( Math.abs(p) > tolerance ) {
      p *= x / a / i;
      s += p;
      a++;
      i++;
    }

    return s;

  }

}


function hypergeometric1F1( a, b, x, tolerance=1e-10 ) {

  if ( isEqualTo(a,b) ) return exp(x);

  if ( isArbitrary(x) ) {

    if ( !isArbitrary(a) ) a = arbitrary(a);
    if ( !isArbitrary(b) ) b = arbitrary(b);

    if ( isNegativeIntegerOrZero(arbitrary(b)) ) throw Error( 'Hypergeometric function pole' );

    // asymptotic forms not yet implemented

    if ( isComplex(x) ) {

      // Kummer transformation
      if ( x.re < 0n ) return mul( exp(x), hypergeometric1F1( sub(b,a), b, neg(x) ) );

      var s = complex(arb1);
      var p = complex(arb1);
      var i = arb1;

      while ( abs(p.re) !== 0n || abs(p.im) !== 0n ) {
        p = mul( p, x, a, inv(b), inv(i) );
        s = add( s, p );
        a = add( a, arb1 );
        b = add( b, arb1 );
        i += arb1;
      }

      return s;

    } else {

      // Kummer transformation
      if ( x < 0n ) return mul( exp(x), hypergeometric1F1( b-a, b, -x ) );

      var s = arb1;
      var p = arb1;
      var i = arb1;

      while ( abs(p) !== 0n ) {
        p = mul( p, x, a, inv(b), inv(i) );
        s += p;
        a += arb1;
        b += arb1;
        i += arb1;
      }

      return s;

    }

  }

  var useAsymptotic = 30;

  if ( isNegativeIntegerOrZero(b) ) throw Error( 'Hypergeometric function pole' );

  if ( isComplex(a) || isComplex(b) || isComplex(x) ) {

    if ( isZero(a) ) return complex(1);

    if ( !isComplex(x) ) x = complex(x);

    // Kummer transformation
    if ( x.re < 0 ) return mul( exp(x), hypergeometric1F1( sub(b,a), b, neg(x) ) );

    // asymptotic form as per Johansson arxiv.org/abs/1606.06977
    if ( abs(x) > useAsymptotic ) {

      if ( isZero(a) || isNegativeIntegerOrZero(sub(b,a)) )
        return complexAverage( a => hypergeometric1F1(a,b,x), a );

      var t1 = mul( gamma(b), pow( neg(x), neg(a) ), inv( gamma(sub(b,a)) ),
                    hypergeometric2F0( a, add(a,neg(b),1), div(-1,x) ) );

      var t2 = mul( gamma(b), pow( x, sub(a,b) ), exp(x), inv( gamma(a) ),
                    hypergeometric2F0( sub(b,a), sub(1,a), div(1,x) ) );

      var result = add( t1, t2 );

      // real for real arguments
      if ( isReal(a) && isReal(b) && isReal(x) ) result.im = 0;

      return result;

    }

    // function to describe wedges along imaginary axis inside
    //   direct region as per test pages
    function wedge( x ) {
      var slope = Math.sqrt(3) - 1;
      if ( x.re > 0 ) {
        var test = slope*x.re + useAsymptotic/2;
        return x.im > test || x.im < -test;
      } else {
        var test = -slope*x.re + useAsymptotic/2;
        return x.im > test || x.im < -test;
      }
    }

    if ( wedge(x) ) {
      setPrecisionScale( 22 );
      var result = arbitrary( hypergeometric1F1( a, b, arbitrary(x) ) );
      resetPrecisionScale();
      return result;
    }

    var s = complex(1);
    var p = complex(1);
    var i = 1;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      p = mul( p, x, a, inv(b), 1/i );
      s = add( s, p );
      a = add( a, 1 );
      b = add( b, 1 );
      i++;
    }

    return s;

  } else {

    if ( isZero(a) ) return 1;

    // Kummer transformation
    if ( x < 0 ) return exp(x) * hypergeometric1F1( b-a, b, -x );

    // asymptotic form is complex
    if ( Math.abs(x) > useAsymptotic ) return hypergeometric1F1( a, b, complex(x) ).re;

    var s = 1;
    var p = 1;
    var i = 1;

    while ( Math.abs(p) > tolerance ) {
      p *= x * a / b / i;
      s += p;
      a++;
      b++;
      i++;
    }

    return s;

  }

}


function hypergeometricU( a, b, x ) {

  if ( isEqualTo( add(a,1), b ) ) return pow( x, neg(a) );

  if ( isZero(a) )
    if ( isComplex(a) || isComplex(b) || isComplex(x) ) return complex(1);
    else return 1;

  var useAsymptotic = 25;

  // asymptotic form as per Johansson arxiv.org/abs/1606.06977
  if ( abs(x) > useAsymptotic ) {

    return mul( pow( x, neg(a) ), hypergeometric2F0( a, add(a,neg(b),1), neg(inv(x)) ) );

  }

  // special case through independent expIntegralEi for speed
  if ( isUnity(a) && isUnity(b) ) return mul( exp(x), gamma(0,x) );

  if ( isUnity(b) ) return complexAverage( b => hypergeometricU(a,b,x), b );

  if ( isPositiveInteger(a) && isEqualTo(a,b) ) return mul( exp(x), gamma(sub(1,a),x) );

  var t1 = mul( gamma(sub(b,1)), inv( gamma(a) ), pow( x, sub(1,b) ),
                hypergeometric1F1( add(a,neg(b),1), sub(2,b), x ) );

  var t2 = mul( gamma(sub(1,b)), inv( gamma(add(a,neg(b),1)) ), hypergeometric1F1( a, b, x ) );

  var max = Math.max( abs(t1), abs(t2) );
  if ( max < 100 ) return add( t1, t2 );

  var extraDecimals = +max.toExponential().split( 'e' )[1];
  setPrecisionScale( defaultDecimals + extraDecimals );

  a = arbitrary(a);
  b = arbitrary(b);
  x = arbitrary(x);

  t1 = mul( gamma(sub(b,arb1)), inv( gamma(a) ), pow( x, sub(arb1,b) ),
            hypergeometric1F1( add(a,neg(b),arb1), sub(arb2,b), x ) );

  t2 = mul( gamma(sub(arb1,b)), inv( gamma(add(a,neg(b),arb1)) ), hypergeometric1F1( a, b, x ) );

  var result = arbitrary( add( t1, t2 ) );

  resetPrecisionScale();

  return result;

}

function whittakerM( k, m, x ) {

  return mul( exp( mul(-.5,x) ), pow( x, add(m,.5) ),
              hypergeometric1F1( add(m,neg(k),.5), add(mul(2,m),1), x ) );

}

function whittakerW( k, m, x ) {

  return mul( exp( mul(-.5,x) ), pow( x, add(m,.5) ),
              hypergeometricU( add(m,neg(k),.5), add(mul(2,m),1), x ) );

}


function hypergeometric2F0( a, b, x, tolerance=1e-10 ) {

  var terms = 50;

  if ( isComplex(a) || isComplex(b) || isComplex(x) ) {

    var s = complex(1);
    var p = complex(1), pLast = p; // mul returns new object
    var converging = false; // first few terms can be larger than unity
    var i = 1;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {

      p = mul( p, x, a, b, 1/i );

      if ( abs(p) > abs(pLast) && converging ) break; // prevent runaway sum
      if ( abs(p) < abs(pLast) ) converging = true;
      if ( i > terms ) throw Error( 'Not converging after ' + terms + ' terms' );

      s = add( s, p );
      a = add( a, 1 );
      b = add( b, 1 );
      i++;
      pLast = p;

    }

    return s;

  } else {

    var s = 1;
    var p = 1, pLast = p;
    var converging = false; // first few terms can be larger than unity
    var i = 1;

    while ( Math.abs(p) > tolerance ) {

      p *= x * a * b / i;

      if ( Math.abs(p) > Math.abs(pLast) && converging ) break; // prevent runaway sum
      if ( Math.abs(p) < Math.abs(pLast) ) converging = true;
      if ( i > terms ) throw Error( 'Not converging after ' + terms + ' terms' );

      s += p;
      a++;
      b++;
      i++;
      pLast = p;

    }

    return s;

  }

}


function hypergeometric2F1( a, b, c, x, tolerance=1e-10 ) {

  if ( isEqualTo(a,c) ) return pow( sub(1,x), neg(b) );

  if ( isEqualTo(b,c) ) return pow( sub(1,x), neg(a) );

  if ( !isUnity(neg(x)) && abs(add(x,1)) < tolerance )
    return hypergeometric2F1( a, b, c, isComplex(x) ? complex(-1) : -1 );

  if ( isNegativeIntegerOrZero(c) ) throw Error( 'Hypergeometric function pole' );

  if ( isComplex(a) || isComplex(b) || isComplex(c) || isComplex(x) ) {

    if ( isZero(a) || isZero(b) ) return complex(1);

    // choose smallest absolute value of transformed argument
    // transformations from Abramowitz & Stegun p.559
    // fewer operations compared to dlmf.nist.gov/15.8

    var absArray = [ abs(x), abs(div(x,sub(x,1))), abs(sub(1,x)),
                     abs(inv(x)), abs(inv(sub(1,x))), abs(sub(1,inv(x))) ];

    var index = absArray.indexOf( Math.min.apply( null, absArray ) );

    switch( index ) {

      case 0:

        break;

      case 1:

        return mul( pow( sub(1,x), neg(a) ), hypergeometric2F1( a, sub(c,b), c, div(x,sub(x,1)) ) );

      case 2:

        if ( isInteger(sub(c,add(a,b))) || isNegativeIntegerOrZero(sub(c,a)) )
          return complexAverage( a => hypergeometric2F1(a,b,c,x), a );

        if ( isNegativeIntegerOrZero(sub(c,b)) )
          return complexAverage( b => hypergeometric2F1(a,b,c,x), b );

        var t1 = mul( gamma(c), gamma( sub(c,add(a,b)) ), 
                      inv( gamma(sub(c,a)) ), inv( gamma(sub(c,b)) ),
                      hypergeometric2F1( a, b, add(a,b,neg(c),1), sub(1,x) ) );

        var t2 = mul( pow( sub(1,x), sub(c,add(a,b)) ),
                      gamma(c), gamma( sub(add(a,b),c) ), inv( gamma(a) ), inv( gamma(b) ),
                      hypergeometric2F1( sub(c,a), sub(c,b), add(c,neg(a),neg(b),1), sub(1,x) ) );

        return add( t1, t2 );

      case 3:

        if ( isInteger(sub(a,b)) || isNegativeIntegerOrZero(sub(c,a)) )
          return complexAverage( a => hypergeometric2F1(a,b,c,x), a );

        if ( isNegativeIntegerOrZero(sub(c,b)) )
          return complexAverage( b => hypergeometric2F1(a,b,c,x), b );

        var t1 = mul( gamma(c), gamma(sub(b,a)), inv( gamma(b) ),
                      inv( gamma(sub(c,a)) ), pow( neg(x), neg(a) ),
                      hypergeometric2F1( a, add(1,neg(c),a), add(1,neg(b),a), inv(x) ) );

        var t2 = mul( gamma(c), gamma(sub(a,b)), inv( gamma(a) ),
                      inv( gamma(sub(c,b)) ), pow( neg(x), neg(b) ),
                      hypergeometric2F1( b, add(1,neg(c),b), add(1,neg(a),b), inv(x) ) );

        return add( t1, t2 );

      case 4:

        if ( isInteger(sub(a,b)) || isNegativeIntegerOrZero(sub(c,a)) )
          return complexAverage( a => hypergeometric2F1(a,b,c,x), a );

        if ( isNegativeIntegerOrZero(sub(c,b)) )
          return complexAverage( b => hypergeometric2F1(a,b,c,x), b );

        var t1 = mul( pow( sub(1,x), neg(a) ), gamma(c), gamma(sub(b,a)),
                      inv( gamma(b) ), inv( gamma(sub(c,a)) ),
                      hypergeometric2F1( a, sub(c,b), add(a,neg(b),1), inv(sub(1,x)) ) );

        var t2 = mul( pow( sub(1,x), neg(b) ), gamma(c), gamma(sub(a,b)),
                      inv( gamma(a) ), inv( gamma(sub(c,b)) ),
                      hypergeometric2F1( b, sub(c,a), add(b,neg(a),1), inv(sub(1,x)) ) );

        return add( t1, t2 );

      case 5:

        if ( isInteger(sub(c,add(a,b))) || isNegativeIntegerOrZero(sub(c,a)) )
          return complexAverage( a => hypergeometric2F1(a,b,c,x), a );

        if ( isNegativeIntegerOrZero(sub(c,b)) )
          return complexAverage( b => hypergeometric2F1(a,b,c,x), b );

        var t1 = mul( gamma(c), gamma( sub(c,add(a,b)) ), inv( gamma(sub(c,a)) ),
                      inv( gamma(sub(c,b)) ), pow( x, neg(a) ),
                      hypergeometric2F1( a, add(a,neg(c),1), add(a,b,neg(c),1), sub(1,inv(x)) ) );

        var t2 = mul( gamma(c), gamma( sub(add(a,b),c) ), inv( gamma(a) ), inv( gamma(b) ),
                      pow( sub(1,x), sub(c,add(a,b)) ), pow( x, sub(a,c) ),
                      hypergeometric2F1( sub(c,a), sub(1,a), add(c,neg(a),neg(b),1), sub(1,inv(x)) ) );

        return add( t1, t2 );

    }

    var s = complex(1);
    var p = complex(1);
    var i = 1;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      p = mul( p, x, a, b, inv(c), 1/i );
      s = add( s, p );
      a = add( a, 1 );
      b = add( b, 1 );
      c = add( c, 1 );
      i++;
    }

    return s;

  } else {

    if ( isZero(a) || isZero(b) ) return 1;

    // transformation from Abramowitz & Stegun p.559
    if ( x < -1 ) {

      var t1 = gamma(c) * gamma(b-a) / gamma(b) / gamma(c-a)
                 * (-x)**(-a) * hypergeometric2F1( a, 1-c+a, 1-b+a, 1/x );
      var t2 = gamma(c) * gamma(a-b) / gamma(a) / gamma(c-b)
                 * (-x)**(-b) * hypergeometric2F1( b, 1-c+b, 1-a+b, 1/x );

      return t1 + t2;

    }

    if ( x === -1 ) return hypergeometric2F1( a, b, c, complex(x) ).re;

    if ( x === 1 )
      if ( c - a - b > 0 ) return gamma(c) * gamma(c-a-b) / gamma(c-a) / gamma(c-b);
      else throw Error( 'Divergent Gauss hypergeometric function' );

    if ( x > 1 ) return hypergeometric2F1( a, b, c, complex(x) );

    var s = 1;
    var p = 1;
    var i = 1;

    while ( Math.abs(p) > tolerance ) {
      p *= x * a * b / c / i;
      s += p;
      a++;
      b++;
      c++;
      i++;
    }

    return s;

  }

}


function hypergeometric1F2( a, b, c, x, tolerance=1e-10 ) {

  var useAsymptotic = 150;

  if ( isComplex(a) || isComplex(b) || isComplex(c) || isComplex(x) ) {

    // functions.wolfram.com/HypergeometricFunctions/Hypergeometric1F2/06/02/03/0002/

    if ( abs(x) > useAsymptotic ) {

      var aNegbNegc = add( a, neg(b), neg(c) );

      var p = div( add( aNegbNegc, 1/2 ), 2 );

      var ck = [ 1 ];

      ck[1] = add( mul( add(mul(3,a),b,c,-2), aNegbNegc, 1/2 ), mul(2,b,c), -3/8 );

      var toSquare = add( mul(b,c), mul( aNegbNegc, add(mul(3,a),b,c,-2), 1/4 ), -3/16 );

      ck[2] = add( mul( 2, toSquare, toSquare ),
                   neg( mul( sub(mul(2,a),3), b, c ) ),
                   mul( aNegbNegc, add( mul(-8,mul(a,a)), mul(11,a), b, c, -2 ), 1/4 ),
                   -3/16 );

      var plusI = complex(0,1), minusI = complex(0,-1);

      function w( k ) { return mul( 1/2**k, ck[k], pow(neg(x),-k/2) ); }

      var w1 = w(1), w2 = w(2);

      var s1 = add( 1, mul(minusI,w1), neg(w2) );
      var s2 = add( 1, mul(plusI,w1), neg(w2) );

      var k = 2, wk = w(k), powPlusI = powMinusI = -1;

      // wk not always complex
      while ( abs(wk) > tolerance ) {

        k++;
        powPlusI = mul( powPlusI, plusI );
        powMinusI = mul( powMinusI, minusI );

        var t1 = mul( add( 3*k**2, mul( 2*k, add(mul(-3,a),b,c,-2) ),
                               mul(3,mul(a,a)), neg(mul(sub(b,c),sub(b,c))),
                               neg(mul(2,a,add(b,c,-2))), 1/4 ),
                      ck[k-1] );

        var t2 = mul( add(k,neg(a),b,neg(c),-1/2), add(k,neg(a),neg(b),c,-1/2),
                      add(k,neg(a),b,c,-5/2), ck[k-2] );

        ck[k] = div( sub( t1, t2 ), 2*k );

        wk = w(k);

        s1 = add( s1, mul( powMinusI, wk ) );
        s2 = add( s2, mul( powPlusI, wk ) );

      }

      var exponent = add( mul(pi,p), mul(2,sqrt(neg(x))) );

      var u1 = exp( mul( plusI, exponent ) );
      var u2 = exp( mul( minusI, exponent ) );

      var s = add( mul(u1,s1), mul(u2,s2) );

      var t1 = mul( 1/(2*sqrt(pi)), inv(gamma(a)), pow(neg(x),p), s );

      var t2 = mul( inv(gamma(sub(b,a))), inv(gamma(sub(c,a))), pow(neg(x),neg(a)),
                    hypergeometricSeries( [ a, add(a,neg(b),1), add(a,neg(c),1) ], [], inv(x), true ) );

      return mul( gamma(b), gamma(c), add( t1, t2 ) );

    }

    return hypergeometricSeries( [a], [b,c], x, true );

  } else {

    // asymptotic form is complex
    if ( Math.abs(x) > useAsymptotic ) return hypergeometric1F2( a, b, c, complex(x) ).re;

    return hypergeometricSeries( [a], [b,c], x );

  }

}


// convenience function for less-used hypergeometrics
// accessing array slower than local variables
// for loops faster than forEach or reduce

function hypergeometricSeries( A, B, x, complexArguments=false, tolerance=1e-10 ) {

  if ( complexArguments ) {

    var s = complex(1);
    var p = complex(1);
    var i = 1;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {

      for ( var j = 0 ; j < A.length ; j++ ) {
        p = mul( p, A[j] );
        A[j] = add( A[j], 1 );
      }

      for ( var j = 0 ; j < B.length ; j++ ) {
        p = div( p, B[j] );
        B[j] = add( B[j], 1 );
      }

      p = mul( p, x, 1/i );
      s = add( s, p );
      i++;

    }

    return s;

  } else {

    var s = 1;
    var p = 1;
    var i = 1;

    while ( Math.abs(p) > tolerance ) {

      for ( var j = 0 ; j < A.length ; j++ ) {
        p *= A[j];
        A[j]++;
      }

      for ( var j = 0 ; j < B.length ; j++ ) {
        p /= B[j];
        B[j]++;
      }

      p *= x / i;
      s += p;
      i++;

    }

    return s;

  }

}


function hypergeometricPFQ( A, B, x ) {

  // dlmf.nist.gov/16.11 for general transformations

  // for B.length > A.length terms can get very large
  // roundoff errors even for formally convergent series

  if ( abs(x) > 1 ) throw Error( 'General hypergeometric argument currently restricted' );

  // check for complex parameters
  var cp = false;
  A.forEach( a => cp = cp || isComplex(a) );
  B.forEach( b => cp = cp || isComplex(b) );

  if ( cp || isComplex(x) ) return hypergeometricSeries( A, B, x, true );

  return hypergeometricSeries( A, B, x );

}


function exp( x ) {

  if ( isArbitrary(x) ) {

    if ( isComplex(x) ) {

      var expXre = exp(x.re);

      return { re: mul( expXre, cos(x.im) ),
               im: mul( expXre, sin(x.im) ) };

    }

    var m = div( x, ln10 ) / precisionScale;

    x -= m * ln10;

    // direct sum faster than function inversion
    var s = arb1;
    var p = arb1;
    var i = arb1;

    while ( p !== 0n ) {
      p = div( mul( p, x ), i );
      s += p;
      i += arb1;
    }

    if ( m > 0n ) s *= 10n**m;
    if ( m < 0n ) s /= 10n**-m; // value approaches zero for fixed decimals

    // could also return as mantissa/exponent
    return s;

  }

  if ( isComplex(x) )

    return { re: Math.exp(x.re) * Math.cos(x.im),
             im: Math.exp(x.re) * Math.sin(x.im) };

  return Math.exp(x);

}


function log( x, base ) {

  if ( isComplex(x) ) {

    if ( isComplex(base) ) return div( log(x), log(base) );

    return { re: log( abs(x), base ), im: log( Math.E, base ) * arg(x) };

  }

  if ( x < 0 ) return log( complex(x), base );

  if ( base === undefined ) return Math.log(x);

  return Math.log(x) / Math.log(base);

}

function ln( x ) {

  // Brent, Modern Computer Arithmetic, second AGM algorithm

  function arbitraryAGM( x, y ) {

    var t, u;

    if ( isComplex(x) ) {

      var maxIter = 20, i = 0;

      while( x.re !== y.re || x.im !== y.im ) {
        t = x, u = y;
        x = div( add( t, u ), arb2 );
        y = sqrt( mul( t, u ) );
        i++;
        if ( i > maxIter ) break; // convergence on complex plane not assured...
      }

    } else {

      while( x !== y ) {
        t = x, u = y;
        x = div( t + u, arb2 );
        y = sqrt( mul( t, u ) );
      }

    }

    return x;

  }

  function arbitraryTheta2( x ) {

    var p = mul( arb2, x );
    var s = p;
    var i = 1;

    if ( isComplex(x) ) {

      while ( p.re !== 0n || p.im !== 0n ) {
        for ( var j = 0 ; j < 8*i ; j++ ) p = mul( p, x );
        s = add( s, p );
        i++;
      }

    } else {

      while ( p !== 0n ) {
        for ( var j = 0 ; j < 8*i ; j++ ) p = mul( p, x );
        s = s + p;
        i++;
      }

    }

    return s;

  }

  function arbitraryTheta3( x ) {

    var p = arb2;
    var s = arb1;
    var i = 1;

    if ( isComplex(x) ) {

      while ( p.re !== 0n || p.im !== 0n ) {
        for ( var j = 0 ; j < 4*(2*i-1) ; j++ ) p = mul( p, x );
        s = add( s, p );
        i++;
      }

    } else {

      while ( p !== 0n ) {
        for ( var j = 0 ; j < 4*(2*i-1) ; j++ ) p = mul( p, x );
        s = s + p;
        i++;
      }

    }

    return s;

  }

  if ( isArbitrary(x) ) {

    if ( !isComplex(x) ) {

      if ( x < 0n ) return { re: ln( -x ), im: getConstant( 'pi' ) };

      if ( x === arb1 ) return 0n;

      if ( x < arb1 ) return -ln( div( arb1, x ) );

    }

    if ( abs(x) < arb1 ) return neg( ln( div( arb1, x ) ) );

    x = div( arb1, x );

    var t2 = arbitraryTheta2(x);
    var t3 = arbitraryTheta3(x);

    var result = div( onePi, mul( arbitrary(4), arbitraryAGM( mul(t2,t2), mul(t3,t3) ) ) );

    // adjust imaginary part
    if ( x.re < 0n ) {
      if ( result.im > 0n ) result.im -= onePi;
      else result.im += onePi;
    }

    return result;

  }

  return log(x);

}


function lambertW( k, x, tolerance=1e-10 ) {

  if ( arguments.length === 1 ) {
    x = k;
    k = 0;
  }

  // restrict to real integers for convenience
  if ( !Number.isInteger(k) ) throw Error( 'Unsupported Lambert W index' );

  if ( isZero(x) )
    if ( k === 0 ) return x;
    else throw Error( 'Lambert W pole' );

  var expMinusOne = Math.exp(-1);

  if ( ( k === 0 || k === -1 ) && abs( add( x, expMinusOne ) ) < tolerance*tolerance )
    if ( isComplex(x) ) return complex(-1);
    else return -1;

  // handle real cases separately, complex otherwise

  if ( !isComplex(x) ) {
    if ( k === 0 && x > -expMinusOne )
      return findRoot( w => w * Math.exp(w) - x, [-1,1000], { tolerance: tolerance } );
    if ( k === -1 && x > -expMinusOne && x < 0 )
      return findRoot( w => w * Math.exp(w) - x, [-1000,-1], { tolerance: tolerance } );
    x = complex(x);
  }

  // inversion by complex root finding with custom Newton's method
  var maxIter = 100;

  if ( k === 0 && abs(x) < 1.25 ) {
    // unstable along branch cut, add small complex part to avoid error
    if ( x.im === 0 &&  x.re < -expMinusOne ) x.im = tolerance;
    // based on test page: unstable region jumps between sheets
    var w = x.re < .5 ? complex( 0, .5*Math.sign(x.im) ) : complex(0);
  } else {
    var L = add( log(x), complex(0,2*pi*k) );
    var w = sub( L, log(L) );
  }

  for ( var i = 0; i < maxIter ; i++ ) {
     var delta = div( sub( mul(w,exp(w)), x ), mul( exp(w), add(w,1) ) );
     w = sub( w, delta );
     if ( abs(delta) < tolerance ) return w;
  }

  throw Error( 'No Lambert W root found at ' + JSON.stringify(x) );

}

function inverseLambertW( x ) { return mul( x, exp(x) ); }


function chop( x, tolerance=1e-10 ) {

  if ( Array.isArray(x) ) {
    var v = vector( x.length );
    for ( var i = 0 ; i < x.length ; i++ ) v[i] = chop( x[i] );
    return v;
  }

  if ( isComplex(x) ) return complex( chop(x.re), chop(x.im) );

  if ( Math.abs(x) < tolerance ) x = 0;

  return x;

}

function round( x, y ) {

  if ( arguments.length === 2 ) return mul( y, round( div(x,y) ) );

  if ( isComplex(x) ) return complex( Math.round(x.re), Math.round(x.im) );

  return Math.round(x);

}

function ceiling( x ) {

  if ( isComplex(x) ) return complex( Math.ceil(x.re), Math.ceil(x.im) );

  return Math.ceil(x);

}

function floor( x ) {

  if ( isComplex(x) ) return complex( Math.floor(x.re), Math.floor(x.im) );

  return Math.floor(x);

}

function sign( x ) {

  if ( isZero(x) ) return x;

  return div( x, abs(x) );

}

function integerPart( x ) {

  if ( isComplex(x) ) return complex( Math.trunc(x.re), Math.trunc(x.im) );

  return Math.trunc(x);

}

function fractionalPart( x ) { return sub( x, integerPart(x) ); }


function random( x, y ) {

  if ( arguments.length === 0 ) return Math.random();

  if ( arguments.length === 1 )
    if ( isComplex(x) )
      return { re: x.re * Math.random(), im: x.im * Math.random() };
    else return x * Math.random();

  if ( isComplex(x) || isComplex(y) ) {
    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(y) ) y = complex(y);
    return { re: random( x.re, y.re ), im: random( x.im, y.im ) };
  }

  return Math.abs(x-y) * Math.random() + ( x > y ? y : x );

}


function kronecker( i, j ) {

  if ( arguments.length === 2 ) {

    if ( isComplex(i) || isComplex(j) ) {

      if ( !isComplex(i) ) i = complex(i);
      if ( !isComplex(j) ) j = complex(j);

      return kronecker( i.re, j.re) * kronecker( i.im, j.im );

    }

    return i === j ? 1 : 0;

  }

  var result = kronecker( i, j );

  for ( var k = 2 ; k < arguments.length ; k++ )
    result *= kronecker( i, arguments[k] );

  return result;

}


function piecewise() {

  var pieces = arguments;

  return function( x ) {

    for ( var i = 0 ; i < pieces.length ; i++ ) {
      var domain = pieces[i][1];
      if ( x >= domain[0] && x <= domain[1] ) return pieces[i][0](x);
    }

    return 0;

  }

}


function hermite( n, x ) {

  function coefficients( n ) {

    var minus2 = [ 1 ];
    var minus1 = [ 2, 0 ];
    var t, current;

    if ( n === 0 ) return minus2;
    if ( n === 1 ) return minus1;

    for ( var i = 2 ; i <= n ; i++ ) {
      current = [];
      t = minus1.slice();
      t.push( 0 );
      minus2.unshift( 0, 0 );
      for ( var k = 0 ; k < t.length ; k++ )
        current.push( 2*t[k] - 2*(i-1)*minus2[k] );
      minus2 = minus1;
      minus1 = current;
    }

    return current;

  }

  if ( isComplex(n) || isComplex(x) ) {

    if ( !isComplex(n) ) n = complex(n);
    if ( Number.isInteger(n.re) && n.re >= 0 && n.im === 0 )
      return polynomial( x, coefficients(n.re) );

    var a = div( n, -2 );
    var b = div( sub(1,n), 2 );

    var s = sub( div( hypergeometric1F1( a, .5, pow(x,2) ), gamma( b ) ),
                 mul( 2, x, div( hypergeometric1F1( b, 1.5, pow(x,2) ), gamma( a ) ) ) );

    return mul( pow(2,n), sqrt(pi), s );

  }

  if ( Number.isInteger(n) && n >= 0 ) return polynomial( x, coefficients(n) );

  var s = hypergeometric1F1( -n/2, .5, x**2 ) / gamma( (1-n)/2 )
          - 2 * x * hypergeometric1F1( (1-n)/2, 1.5, x**2 ) / gamma( -n/2 );

  return 2**n * sqrt(pi) * s;

}


function laguerre( n, a, x ) {

  // explict recursion unnecessary: hypergeometric series handles integers

  if ( arguments.length < 3 ) {
    x = a;
    a = 0
  }

  return mul( binomial( add(n,a), n ), hypergeometric1F1( neg(n), add(a,1), x ) ); 

}


function chebyshevT( n, x ) {

  return cos( mul( n, arccos(x) ) );

}

function chebyshevU( n, x ) {

  return div( sin( mul( add(n,1), arccos(x) ) ), sin( arccos(x) ) );

}


function legendreP( l, m, x, renormalized=false ) {

  if ( arguments.length < 3 ) {
    x = m;
    m = 0;
  }

  if ( Number.isInteger(l) && Number.isInteger(m) && Math.abs(x) <= 1 ) {

    var mm = Math.abs(m);
    if ( mm > l ) throw Error( 'Invalid spherical harmonic indices' );

    if ( !renormalized ) {
      var norm = 1;
      for ( var i = l-m+1 ; i <= l+m ; i++ ) norm *= i;
      norm = Math.sqrt( 4 * pi * norm / (2*l+1) );
    }

    var legendre1 = (-1)**mm * Math.sqrt( (2*mm+1) / 4 / pi / factorial(2*mm) )
                    * factorial2( 2*mm-1 ) * ( 1 - x*x )**(mm/2);

    if ( mm === l ) 
      if ( renormalized ) return legendre1;
      else return norm * legendre1;

    var ll = mm + 1;
    var factor1 = Math.sqrt( 2*mm+3 );
    var legendre2 = factor1 * x * legendre1;

    if ( ll === l )
      if ( renormalized ) return legendre2;
      else return norm * legendre2;

    while ( ll < l ) {
      ll++
      var factor2 = Math.sqrt( ( 4*ll*ll - 1 ) / ( ll*ll - mm*mm ) );
      var legendre3 = factor2 * ( x*legendre2 - legendre1/factor1 );
      legendre1 = legendre2;
      legendre2 = legendre3;
      factor1 = factor2;
    }

    if ( renormalized ) return legendre3;
    else return norm * legendre3;

  }

  // dlmf.nist.gov/14.3.5
  if ( isPositiveInteger(m) )
    return mul( pow(-1,m), inv( gamma( add(m,1) ) ),
                gamma( add(l,m,1) ), inv( gamma( add(l,neg(m),1) ) ),
                pow( add(1,x), div(m,-2) ), pow( sub(1,x), div(m,2) ),
                hypergeometric2F1( neg(l), add(l,1), add(m,1), div(sub(1,x),2) ) );

  return mul( inv( gamma( sub(1,m) ) ),
              pow( add(1,x), div(m,2) ), pow( sub(1,x), div(m,-2) ),
              hypergeometric2F1( neg(l), add(l,1), sub(1,m), div(sub(1,x),2) ) );

}

function sphericalHarmonic( l, m, theta, phi ) {

  var renormalizedLegendre = legendreP( l, m, cos(theta), true );

  return mul( Math.sign(m)**m, renormalizedLegendre, exp( complex(0,m*phi) ) );

}

function legendreQ( l, m, x ) {

  if ( arguments.length < 3 ) {
    x = m;
    m = 0;
  }

  function difference( t ) {

    var t1 = mul( cos( mul(pi,t) ), legendreP(l,t,x) );

    var t2 = mul( gamma( add(l,t,1) ), inv( gamma( add(l,neg(t),1) ) ), legendreP(l,neg(t),x) );

    return sub( t1, t2 );

  }

  // l'Hopital's rule decent for small m, more accurate might be
  // functions.wolfram.com/HypergeometricFunctions/LegendreQ2General/26/01/02/0005/

  if ( isInteger(m) ) {

    // legendreP is pure real outside unit circle for even integers
   if ( abs(x) > 1 && !isComplex(m) && !( m & 1 ) ) m = complex(m);

    return mul( .5, pow(-1,m), diff( t => difference(t), m ) );

  }

  return mul( pi/2, inv( sin(mul(pi,m)) ), difference(m) );

}


// This file contains proprietary functions defined on analyticphysics.com
// Before each is the title of a presentation describing the function


// A Generalized Lambert Function of Two Arguments

function doubleLambert( n, x, y, tolerance=1e-10 ) {

  if ( arguments.length === 2 ) {
    y = x;
    x = n;
    n = 0;
  }

  if ( isZero(y) ) return lambertW(n,x);
  if ( isZero(x) ) return neg( lambertW( -n, neg(y) ) );

  function asymptotic( n, x, y ) {

    return add( log(sqrt(x)), neg(log(sqrt(neg(y)))), complex(0,n*pi) );

  }

  function test( n, x, y ) {

    return div( asymptotic(n,x,y), add( 1, mul(2*(-1)**n,sqrt(x),sqrt(neg(y))) ) );

  }

  function start( n, x, y, tolerance=1e-3 ) {

    var a = asymptotic(n,x,y), w1, w2;

    var testValue = .9;

    if ( abs(test(n,x,y)) < testValue ) return a;

    if ( n === 0 ) console.log( 'Using Lambert W on principal branch' );

    if ( n & 1 ) {

      if ( n > 0 ) {
        w1 = lambertW( (n+1)/2, x, tolerance );
        w2 = neg( lambertW( -(n+1)/2, neg(y), tolerance ) );
      } else {
        w1 = lambertW( (n-1)/2, x, tolerance );
        w2 = neg( lambertW( -(n-1)/2, neg(y), tolerance ) );
      }

    } else {

      w1 = lambertW( n/2, x, tolerance );
      w2 = neg( lambertW( -n/2, neg(y), tolerance ) );

    }

    if ( Math.abs( w1.im - a.im ) < Math.abs( w2.im - a.im ) )
      return w1;
    else
      return w2;

  }

  var maxIter = 100;
  var root = start(n,x,y);

  for ( var i = 0; i < maxIter ; i++ ) {
    var N = add( mul(x,exp(neg(root))), mul(y,exp(root)), neg(root) );
    var D = add( mul(-1,x,exp(neg(root))), mul(y,exp(root)), -1 );
    var delta = div( N, D );
    root = sub( root, delta );
    if ( abs(delta) < tolerance ) return root;
  }

  throw Error( 'No double Lambert root found for x = ' + JSON.stringify(x)
               + ' and y = ' + JSON.stringify(y) );

}


// complex circular functions

function sin( x ) {

  if ( isArbitrary(x) ) {

    if ( isComplex(x) )

      return { re: mul( sin(x.re), cosh(x.im) ),
               im: mul( cos(x.re), sinh(x.im) ) };

    x = x % twoPi;

    // reduce to [-pi/2,pi/2] with successive reductions
    if ( x > halfPi ) return sin( onePi - x );
    if ( x < -halfPi ) return sin( -onePi - x );

    var s = x;
    var p = x;
    var i = arb2;

    while ( p !== 0n ) {
      p = div( mul( p, -arb1, x, x ), mul( i, i + arb1 ) );
      s += p;
      i += arb2;
    }

    return s;

  }

  if ( isComplex(x) )

    return { re: Math.sin(x.re) * Math.cosh(x.im),
             im: Math.cos(x.re) * Math.sinh(x.im) };

  return Math.sin(x);

}

function cos( x ) {

  if ( isArbitrary(x) ) {

    if ( isComplex(x) )

      return { re: mul( cos(x.re), cosh(x.im) ),
               im: -mul( sin(x.re), sinh(x.im) ) };

    x = x % twoPi;

    // reduce to [-pi/2,pi/2] with successive reductions
    if ( x > halfPi ) return -cos( onePi - x );
    if ( x < -halfPi ) return -cos( -onePi - x );

    var s = arb1;
    var p = arb1;
    var i = arb1;

    while ( p !== 0n ) {
      p = div( mul( p, -arb1, x, x ), mul( i, i + arb1 ) );
      s += p;
      i += arb2;
    }

    return s;

  }

  if ( isComplex(x) )

    return { re: Math.cos(x.re) * Math.cosh(x.im),
             im: -Math.sin(x.re) * Math.sinh(x.im) };

  return Math.cos(x);

}

function tan( x ) {

  if ( isComplex(x) ) return div( sin(x), cos(x) );

  return Math.tan(x);

 }

function cot( x ) {

  if ( isComplex(x) ) return div( cos(x), sin(x) );

  return 1 / Math.tan(x);

}

function sec( x ) {

  if ( isComplex(x) ) return div( 1, cos(x) );

  return 1 / Math.cos(x);

}

function csc( x ) {

  if ( isComplex(x) ) return div( 1, sin(x) );

  return 1 / Math.sin(x);

}


// inverse circular functions

function arcsin( x ) {

  if ( isComplex(x) ) {

    var s = sqrt( sub( 1, mul( x, x ) ) );
    s = add( mul( complex(0,1), x ), s ); 
    return mul( complex(0,-1), log( s ) );

  }

  if ( Math.abs(x) <= 1 ) return Math.asin(x);

  return arcsin( complex(x) );

}

function arccos( x ) {

  if ( isComplex(x) ) {

    return sub( pi/2, arcsin(x) );

  }

  if ( Math.abs(x) <= 1 ) return Math.acos(x);

  return arccos( complex(x) );

}

function arctan( x ) {

  if ( isComplex(x) ) {

    var s = sub( log( sub( 1, mul( complex(0,1), x ) ) ),
                 log( add( 1, mul( complex(0,1), x ) ) ) );
    return mul( complex(0,.5), s );

  }

  return Math.atan(x);

}

function arccot( x ) {

  if ( isComplex(x) ) return arctan( div( 1, x ) );

  return Math.atan( 1/x );

}

function arcsec( x ) {

  if ( isComplex(x) ) return arccos( div( 1, x ) );

  if ( Math.abs(x) >= 1 ) return Math.acos( 1/x );

  return arcsec( complex(x) );

}

function arccsc( x ) {

  if ( isComplex(x) ) return arcsin( div( 1, x ) );

  if ( Math.abs(x) >= 1 ) return Math.asin( 1/x );

  return arccsc( complex(x) );

}


// complex hyperbolic functions

function sinh( x ) {

  if ( isArbitrary(x) ) return div( sub( exp(x), exp(neg(x)) ), arb2 );

  if ( isComplex(x) )

    return { re: Math.sinh(x.re) * Math.cos(x.im),
             im: Math.cosh(x.re) * Math.sin(x.im) };

  return Math.sinh(x);

}

function cosh( x ) {

  if ( isArbitrary(x) ) return div( add( exp(x), exp(neg(x)) ), arb2 );

  if ( isComplex(x) )

    return { re: Math.cosh(x.re) * Math.cos(x.im),
             im: Math.sinh(x.re) * Math.sin(x.im) };

  return Math.cosh(x);

}

function tanh( x ) {

  if ( isComplex(x) ) return div( sinh(x), cosh(x) );

  return Math.tanh(x);

}

function coth( x ) {

  if ( isComplex(x) ) return div( cosh(x), sinh(x) );

  return 1 / Math.tanh(x);

}

function sech( x ) {

  if ( isComplex(x) ) return div( 1, cosh(x) );

  return 1 / Math.cosh(x);

}

function csch( x ) {

  if ( isComplex(x) ) return div( 1, sinh(x) );

  return 1 / Math.sinh(x);

}


// inverse hyperbolic functions

function arcsinh( x ) {

  if ( isComplex(x) ) {

    var s = sqrt( add( mul( x, x ), 1 ) );
    s = add( x, s );
    return log( s );

  }

  return Math.asinh(x);

}

function arccosh( x ) {

  if ( isComplex(x) ) {

    var s = mul( sqrt( add( x, 1 ) ), sqrt( sub( x, 1 ) ) );
    s = add( x, s ); 
    return log( s );

  }

  if ( x >= 1 ) return Math.acosh(x);

  return arccosh( complex(x) );

}

function arctanh( x ) {

  if ( isComplex(x) ) {

    var s = sub( log( add( 1, x ) ), log( sub( 1, x ) ) );
    return mul( .5, s );

  }

  if ( Math.abs(x) <= 1 ) return Math.atanh(x);

  return arctanh( complex(x) );

}

function arccoth( x ) {

  if ( isComplex(x) ) {

    if ( x.re === 0 && x.im === 0 ) throw Error( 'Indeterminate arccoth value' );

    return arctanh( div( 1, x ) );

  }

  if ( Math.abs(x) > 1 ) return Math.atanh( 1/x );

  return arccoth( complex(x) );

}

function arcsech( x ) {

  if ( isComplex(x) ) {

    if ( x.re === 0 && x.im === 0 ) throw Error( 'Indeterminate arcsech value' );

    // adjust for branch cut along negative axis
    if ( x.im === 0 ) x.im = -Number.MIN_VALUE;

    return arccosh( div( 1, x ) );

  }

  if ( x > 0 && x < 1 ) return Math.acosh( 1/x );

  return arcsech( complex(x) );

}

function arccsch( x ) {

  if ( isComplex(x) ) {

    return arcsinh( div( 1, x ) );

  }

  return Math.asinh( 1/x );

}


// miscellaneous

function sinc( x ) {

  if ( isComplex(x) ) {

    if ( x.re === 0 && x.im === 0 ) return complex(1);

    return div( sin(x), x );

  }

  if ( x === 0 ) return 1;

  return Math.sin(x) / x;

}

function haversine( x ) { return div( sub( 1, cos(x) ), 2 ); }

function inverseHaversine( x ) { return arccos( sub( 1, mul(2,x) ) ); }


// analyticphysics.com / The Complex Gudermannian Function

function gudermannian( x ) { return mul( 2, arctan( tanh( div(x,2) ) ) ); }

function inverseGudermannian( x ) { return mul( 2, arctanh( tan( div(x,2) ) ) ); }


function zeta( x, tolerance=1e-10 ) {

  if ( isEqualTo(x,1) ) throw Error( 'Riemann zeta pole' );

  // functional equation dlmf.nist.gov/25.4.2 - connects both half planes
  if ( x < 0 || x.re < 0 )
    return mul( pow(2,x), pow(pi,sub(x,1)), sin( mul(pi/2,x) ), gamma( sub(1,x) ), zeta( sub(1,x) ) );

  // direct summation more accurate in right-hand plane
  var directSummation = 5;

  if ( x > directSummation || x.re > directSummation ) {

    if ( isComplex(x) ) {

      var s = complex(1);
      var p = complex(1);
      var i = 2;

      while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance*tolerance ) {
        p = pow( i, neg(x) );
        s = add( s, p );
        i++;
      }

      return s;

    } else {

      var s = 1;
      var p = 1;
      var i = 2;

      while ( Math.abs(p) > tolerance ) {
        p = 1 / i**x;
        s += p;
        i++;
      }

      return s;

    }

  }

  // Borwein, Efficient Algorithm

  var n = 14; // from error bound for tolerance

  if ( isComplex(x) && x.im !== 0 )
    n = Math.max( n, Math.ceil( log( 2 / abs(gamma(x)) / tolerance ) / log( 3 + sqrt(8) ) ) );

  var d = [ 1 ], prod = n;
  for ( var i = 1 ; i <= n ; i++ ) {
    d.push( d[i-1] + n * prod / factorial( 2*i ) * 4**i );
    // manually evaluate factorial( n+i-1 ) / factorial( n-i ) to avoid overflow
    prod *= (n+i)*(n-i);
  }

  if ( isComplex(x) ) {

    var s = summation( k => div( (-1)**k * ( d[k] - d[n] ), pow( k+1, x ) ), [0,n-1] );

    return div( div( s, -d[n] ), sub( 1, pow( 2, sub(1,x) ) ) );

  } else {

    var s = summation( k => (-1)**k * ( d[k] - d[n] ) / (k+1)**x, [0,n-1] );

    return -s / d[n] / ( 1 - 2**(1-x) );

  }

}

function dirichletEta( x ) { return mul( zeta(x), sub( 1, pow( 2, sub(1,x) ) ) ); }


function bernoulli( n, x ) {

  if ( !Number.isInteger(n) ) throw Error( 'Noninteger index for Bernoulli number' );

  if ( n < 0 ) throw Error( 'Unsupported index for Bernoulli number' );

  if ( arguments.length > 1 && !isZero(x) ) return mul( -n, hurwitzZeta(1-n,x) );

  if ( n === 0 ) return 1;

  if ( n === 1 ) return -.5;

  if ( n & 1 ) return 0;

  return -n * zeta(1-n);

}

function harmonic( n ) {

  if ( !Number.isInteger(n) ) throw Error( 'Noninteger index for harmonic number' );

  if ( n > 1e3 ) return log(n) + eulerGamma + 1/2/n - 1/12/n**2;

  return summation( i => 1/i, [1,n] );

}


function hurwitzZeta( x, a, tolerance=1e-10 ) {

  if ( isEqualTo(x,1) ) throw Error( 'Hurwitz zeta pole' );

  if ( isNegativeIntegerOrZero(a) ) throw Error( 'Hurwitz zeta parameter pole' );

  if ( isComplex(x) || isComplex(a) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(a) ) a = complex(a);

    // direct summation more accurate than dlmf.nist.gov/25.11.4 for positive a

    if ( a.re < 0 ) {
      var m = -Math.floor(a.re);
      return add( hurwitzZeta(x,add(a,m)), summation( i => pow( add(a,i), neg(x) ), [0,m-1] ) );
    }

    // Johansson arxiv.org/abs/1309.2877

    var n = 15; // recommendation of Vepstas, Efficient Algorithm, p.12

    // Euler-Maclaurin has differences of large values in left-hand plane
    var useArbitrary = x.re < 0;

    if ( useArbitrary ) {

      setPrecisionScale( 20 - Math.round(x.re) );

      x = arbitrary(x), a = arbitrary(a);
      var arbN = arbitrary(n), arb3 = arbitrary(3);

      var S = 0n;
      for ( var i = 0 ; i < n ; i++ )
        S = add( S, pow( div( add(a,arbN), add(a,arbitrary(i)) ), x ) );

      var I = div( add(a,arbN), sub(x,arb1) );

      var p = div( mul( arb1/2n, x ), add(a,arbN) );
      var b = div( bernoulli2nN[1], bernoulli2nD[1] );
      var t = mul( b, p );
      var i = arb2;
      var j = 2;

      while ( p.re !== 0n || p.im !== 0n ) {
        if ( j === bernoulli2nN.length ) break;
        p = div( mul( p, add( x, 2n*i - arb2 ), add( x, 2n*i - arb3 ) ),
                 mul( 2n*i, 2n*i - arb1, add(a,arbN), add(a,arbN) ) );
        b = div( bernoulli2nN[j], bernoulli2nD[j] );
        t = add( t, mul( b, p ) );
        i += arb1;
        j++;
      }

      var T = add( arb1/2n, t );

      var result = arbitrary( mul( add( S, I, T ), pow( add(a,arbN), mul(-arb1,x) ) ) );

      resetPrecisionScale();

      return result;

    }

    var S = summation( i => pow( add(a,i), neg(x) ), [0,n-1] );

    var I = div( pow( add(a,n), sub(1,x) ), sub(x,1) );

    var p = mul( .5, x, inv(add(a,n)) );
    var t = mul( bernoulli(2), p );
    var i = 2;

    // converges rather quickly
    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      p = div( mul( p, add( x, 2*i - 2 ), add( x, 2*i - 3 ) ),
               mul( 2*i * (2*i-1), add(a,n), add(a,n) ) );
      t = add( t, mul( bernoulli(2*i), p ) );
      i++;
    }

    var T = div( add( .5, t ), pow( add(a,n), x ) );

    return add( S, I, T );

  } else {

    if ( a < 0 ) return hurwitzZeta( x, complex(a) );

    // direct summation more accurate than dlmf.nist.gov/25.11.4

    // Euler-Maclaurin has differences of large values in left-hand plane
    // switch to different summation: dlmf.nist.gov/25.11.9

    var switchForms = -5;

    if ( x < switchForms ) {

      x = 1 - x;
      var t = Math.cos( pi*x/2 - 2*pi*a );
      var s = t;
      var i = 1;

      while ( Math.abs(t) > tolerance ) {
        i++;
        t = Math.cos( pi*x/2 - 2*i*pi*a ) / i**x;
        s += t;
      }

      return 2 * gamma(x) / (2*pi)**x * s;

    }

    // Johansson arxiv.org/abs/1309.2877

    var n = 15; // recommendation of Vepstas, Efficient Algorithm, p.12

    var S = summation( i => 1 / (a+i)**x, [0,n-1] );

    var I = (a+n)**(1-x) / (x-1);

    var p = x / 2 / (a+n);
    var t = bernoulli(2) * p;
    var i = 2;

    // converges rather quickly
    while ( Math.abs(p) > tolerance ) {
      p *= ( x + 2*i - 2 ) * ( x + 2*i - 3 ) / ( 2*i * (2*i-1) * (a+n)**2 );
      t += bernoulli(2*i) * p;
      i++;
    }

    var T = ( .5 + t ) / (a+n)**x;

    return S + I + T;

  }

}


function polylog( n, x, tolerance=1e-10 ) {

  if ( isEqualTo(x,1) ) return zeta(n);

  if ( isEqualTo(x,-1) ) return neg( dirichletEta(n) );

  if ( isEqualTo(n,1) ) return neg( log( sub(1,x) ) );

  if ( isEqualTo(n,0) ) return div( x, sub(1,x) );

  if ( isEqualTo(n,-1) ) return div( x, mul( sub(1,x), sub(1,x) ) );

  if ( abs(x) >= 1 ) {

    var twoPiI = complex(0,2*pi);

    if ( isPositiveInteger(n) ) {

      // Crandall, Note on Fast Polylogarithm Computation

      var t1 = mul( (-1)**n, polylog( n, inv(x) ) );

      var t2 = mul( div( pow(twoPiI,n), factorial(n) ), bernoulli( n, div(log(x),twoPiI) ) );

      var y = isComplex(x) ? x : complex(x); // just for test
      var t3 = y.im < 0 || ( y.im === 0 && y.re >= 1 ) ?
               mul( twoPiI, div( pow(log(x),n-1), factorial(n-1) ) ) : 0;      

      var result = neg( add( t1, t2, t3 ) );

      // real on negative real axis
      if ( !isComplex(x) && x < 0 ) return result.re;

      return result;

    }

    var v = sub(1,n);
    var I = complex(0,1);
    var L = div( log(neg(x)), twoPiI );

    var z1 = mul( pow(I,v), hurwitzZeta( v, add(.5,L) ) );
    var z2 = mul( pow(I,neg(v)), hurwitzZeta( v, sub(.5,L) ) );

    return mul( gamma(v), pow(2*pi,neg(v)), add(z1,z2) )

  }

  if ( isComplex(n) || isComplex(x) ) {

    var s = x;
    var p = complex(1);
    var i = 2;

    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      p = div( pow(x,i), pow(i,n) );
      s = add( s, p );
      i++;
    }

    return s;

  } else {

    var s = x;
    var p = 1;
    var i = 2;

    while ( Math.abs(p) > tolerance ) {
      p = x**i / i**n;
      s += p;
      i++;
    }

    return s;

  }

}


function ode( f, y, [x0,x1], step=.001, method='runge-kutta' ) {

  if ( x1 < x0 ) {
    var compare = x => x >= x1;
    step *= -1;
  } else
    var compare = x => x <= x1;

  // vectorizing first-order real equation works because +[1] = 1
  // for complex case +[C(1)] = NaN, so explicit array references
  //    are necessary in the input function

  if ( !Array.isArray(y) ) {
    var g = f;
    f = (x,y) => [ g(x,y) ];
    y = [ y ];
  }

  // preparation for complex system
  if ( isComplex(x0) || isComplex(x1) || y.some( e => isComplex(e) )
         || f(x0,y).some( e => isComplex(e) ) ) {

    if ( !isComplex(x0) ) x0 = complex(x0);

    y.forEach( (e,i,a) => { if ( !isComplex(e) ) a[i] = complex(e); } );

    if ( f(x0,y).every( e => !isComplex(e) ) )
      throw Error( 'All functions must handle complex math' );

    var d = sub(x1,x0), absD = abs(d);
    step = mul( step, div( d, absD ) );
    var steps = Math.trunc( absD / abs(step) ), currentStep = 0;

  }

  var points = [ [x0].concat(y) ];
  var size = y.length;

  switch( method ) {

    case 'euler':

      if ( isComplex(x0) ) {

        for ( var x = add(x0,step) ; currentStep < steps ; x = add(x,step) ) {

          var k = f(x,y);

          for ( var i = 0 ; i < size ; i++ ) y[i] = add( y[i], mul( k[i], step ) );

          points.push( [x].concat(y) );

          currentStep++;

        }

        return points;

      } else {

        for ( var x = x0+step ; compare(x) ; x += step ) {

          var k = f(x,y);

          for ( var i = 0 ; i < size ; i++ ) y[i] += k[i] * step;

          points.push( [x].concat(y) );

        }

        return points;

      }

    case 'runge-kutta':

      if ( isComplex(x0) ) {

        var halfStep = div( step, 2 );

        for ( var x = add(x0,step) ; currentStep < steps ; x = add(x,step) ) {

          var y1 = [], y2 = [], y3 = [];

          var k1 = f(x,y);
          for ( var i = 0 ; i < size ; i++ ) y1.push( add( y[i], mul( k1[i], halfStep ) ) );
          var k2 = f( add( x, halfStep ), y1 );
          for ( var i = 0 ; i < size ; i++ ) y2.push( add( y[i], mul( k2[i], halfStep ) ) );
          var k3 = f( add( x, halfStep ), y2 );
          for ( var i = 0 ; i < size ; i++ ) y3.push( add( y[i], mul( k3[i], step ) ) );
          var k4 = f( add( x, step ), y3 );

          for ( var i = 0 ; i < size ; i++ )
            y[i] = add( y[i], mul( add( k1[i], mul(2,k2[i]), mul(2,k3[i]), k4[i] ), step, 1/6 ) );

          points.push( [x].concat(y) );

          currentStep++;

        }

        return points;

      } else {

        for ( var x = x0+step ; compare(x) ; x += step ) {

          var y1 = [], y2 = [], y3 = [];

          var k1 = f(x,y);
          for ( var i = 0 ; i < size ; i++ ) y1.push( y[i] + k1[i]*step/2 );
          var k2 = f( x+step/2, y1 );
          for ( var i = 0 ; i < size ; i++ ) y2.push( y[i] + k2[i]*step/2 );
          var k3 = f( x+step/2, y2 );
          for ( var i = 0 ; i < size ; i++ ) y3.push( y[i] + k3[i]*step );
          var k4 = f( x+step, y3 );

          for ( var i = 0 ; i < size ; i++ )
            y[i] += ( k1[i] + 2*k2[i] + 2*k3[i] + k4[i] ) * step / 6;

          points.push( [x].concat(y) );

        }

        return points;

      }

    default:

      throw Error( 'Unsupported differential equation solver method' );

  }

}


function diff( f, x, n=1, method='ridders' ) {

  if ( isComplex(x) || isComplex(f(x)) ) {

    if ( !isComplex(f(x)) ) throw Error( 'Function must handle complex math' );

    var absX = abs(x);
    var normed = absX === 0 ? complex(1) : div( x, absX );

    var real = diff( t => f( mul(normed,t) ).re, absX, n, method );
    var imag = diff( t => f( mul(normed,t) ).im, absX, n, method );

    return div( complex( real, imag ), normed );

  }

  // central differences have h**2 error but division
  //   by h**n increases roundoff error
  // step sizes chosen as epsilon**(1/(n+2)) to minimize error

  function difference() {

    var s = 0;
    for ( var i = 0 ; i <= n ; i++ )
      s += (-1)**i * binomial(n,i) * f( x + (n-2*i)*h );

    return s / (2*h)**n

  }

  switch( method ) {

    case 'naive':

      // only accurate for first couple derivatives
      var h = (1e-8)**(1/(n+2));
      return difference();

    case 'ridders':

      var h = (1e-5)**(1/(n+2));
      var error = Number.MAX_VALUE;
      var maxIter = 10;
      var result;

      var d = [];
      for ( var i = 0 ; i < maxIter ; i++ ) d.push( [] );

      // Richardson extrapolation as per C. Ridders
      d[0][0] = difference();

      for ( var i = 1 ; i < maxIter ; i++ ) {

        h /= 2;
        d[0][i] = difference();

        for ( var j = 1 ; j <= i ; j++ ) {

          d[j][i] = ( 4**j * d[j-1][i] - d[j-1][i-1] ) / ( 4**j - 1 );

          var delta = Math.max( Math.abs( d[j][i] - d[j-1][i] ),
                                Math.abs( d[j][i] - d[j-1][i-1] ) );
          if ( delta <= error ) {
            error = delta;
            result = d[j][i];
          }

        }

        if ( Math.abs( d[i][i] - d[i-1][i-1] ) > error ) break;

      }

      return result;

    default:

      throw Error( 'Unsupported differentiation method' );

  }

}

var D = diff;


function taylorSeries( f, x0, terms=5 ) {

  var c = [ f(x0) ];
  for ( var i = 1 ; i < terms ; i++ ) c.push( diff( f, x0, i ) );

  return function( x ) {

    var s = 0;
    for ( var i = 0 ; i < c.length ; i++ )
      s = add( s, mul( c[i], pow( sub(x,x0), i ), 1/factorial(i) ) );
    return s;

  }

}


function gradient( f, point ) {

  if ( f.length !== point.length ) throw Error( 'Gradient point length differs from function' );

  var result = [];

  for ( var i = 0 ; i < point.length ; i++ ) {

    var a = point.slice();

    result.push( diff( x => { a[i] = x; return f.apply( null, a ); }, a[i] ) );

  }

  return result;

}

function findExtremum( f, point, options={} ) {

  if ( !Array.isArray(point) ) point = [ point ];

  var sign = options.findMaximum ? 1 : -1;
  var tolerance = 'tolerance' in options ? options.tolerance : 1e-10;

  var maxIter = 1e4;
  var gamma = .01 * sign;
  var grad, step, test;

  for ( var i = 0 ; i < maxIter ; i++ ) {

    grad = gradient( f, point );
    test = true;

    for ( var j = 0 ; j < point.length ; j++ ) {
      step = gamma * grad[j];
      point[j] += step;
      test = test && step < tolerance;
    }

    if ( test )
     if ( point.length === 1 ) return point[0];
     else return point;

  }

  throw Error( 'No extremum found for tolerance ' + tolerance );

}


function integrate( f, [a,b], options={} ) {

  var method = 'method' in options ? options.method : 'adaptive-simpson';
  var tolerance = 'tolerance' in options ? options.tolerance : 1e-10;

  if ( isComplex(a) || isComplex(b) || isComplex(f(a)) ) {

    if ( !isComplex(a) ) a = complex(a);

    if ( !isComplex(f(a)) ) throw Error( 'Function must handle complex math' );

    function lerp( t ) { return add( mul( sub(b,a), t ), a ); }

    var real = integrate( t => f( lerp(t) ).re, [0,1], options );
    var imag = integrate( t => f( lerp(t) ).im, [0,1], options );

    return mul( sub(b,a), complex( real, imag ) );

  }

  if ( options.avoidEndpoints )
    if ( a < b ) { a += tolerance; b -= tolerance; }
    else { a -= tolerance; b += tolerance; }

  function nextEulerIteration() {

      h /= 2;
      var x = a + h;
      while ( x < b ) {
        // only add new function evaluations
        s += f(x);
        x += 2*h;
      }

  }

  switch( method ) {

    case 'euler-maclaurin':

      // Euler-Maclaurin summation formula

      var maxIter = 50;

      var h = ( b - a ) / 2;
      var s = ( f(a) + f(b) ) / 2 + f( (a+b)/2 );
      var result = h * s;
      var previous = result;

      for ( var i = 0 ; i < maxIter ; i++ ) {

        nextEulerIteration();
        result = h * s;
        if ( Math.abs( result - previous ) < tolerance * Math.abs(previous) ) return result;
        previous = result;

      }

      throw Error( 'Maximum interations reached' );

    case 'romberg':

      var error = Number.MAX_VALUE;
      var maxIter = 30;

      var h = ( b - a ) / 2;
      var s = ( f(a) + f(b) ) / 2 + f( (a+b)/2 );
      var result = h * s;

      var d = [];
      for ( var i = 0 ; i < maxIter ; i++ ) d.push( [] );

      // Richardson extrapolation of Euler-Maclaurin trapezoids
      d[0][0] = result;

      for ( var i = 1 ; i < maxIter ; i++ ) {

        nextEulerIteration();
        d[0][i] = h * s;

        for ( var j = 1 ; j <= i ; j++ ) {

          d[j][i] = ( 4**j * d[j-1][i] - d[j-1][i-1] ) / ( 4**j - 1 );

          var delta = Math.max( Math.abs( d[j][i] - d[j-1][i] ),
                                Math.abs( d[j][i] - d[j-1][i-1] ) );
          if ( delta <= error ) {
            error = delta;
            result = d[j][i];
          }

        }

        if ( Math.abs( d[i][i] - d[i-1][i-1] ) > error ) break;

      }

      return result;

    case 'adaptive-simpson':

      // algorithm by Charles Collins

      var maxIter = 50;

      function adaptiveSimpson( a, b, fa, fm, fb, s, tolerance, depth ) {

        var h = b - a;
        var f1 = f( a + h/4 );
        var f2 = f( b - h/4 )

        if ( isNaN(f1) || isNaN(f2) ) throw Error( 'NaN encountered in integration' );

        var s1 = ( fa + 4*f1 + fm ) * h / 12;
        var s2 = ( fm + 4*f2 + fb ) * h / 12;
        var ss = s1 + s2;
        var error = ( ss - s ) / 15;

        if ( Math.abs(error) < tolerance  || depth > maxIter ) return ss + error;
        else {
          var m = a + h/2;
          return adaptiveSimpson( a, m, fa, f1, fm, s1, tolerance/2, depth+1 )
                 + adaptiveSimpson( m, b, fm, f2, fb, s2, tolerance/2, depth+1 );
        }

      }

      var fa = f(a);
      var fm = f( (a+b)/2 );
      var fb = f(a);
      var s = ( fa + 4*fm + fb ) * (b-a) / 6;
      var depth = 0;

      return adaptiveSimpson( a, b, fa, fm, fb, s, tolerance, depth );

    case 'tanh-sinh':

      // based on Borwein & Bailey, Experimentation in Mathematics

      var m = 10;
      var h = 1 / 2**m;
      var x = [], w = [];

      for ( var k = 0 ; k <= 20 * 2**m ; k++ ) {
        var t = k * h;
        x[k] = Math.tanh( Math.PI/2 * Math.sinh(t) );
        w[k] = Math.PI/2 * Math.cosh(t) / Math.cosh( Math.PI/2 * Math.sinh(t) )**2;
        if ( Math.abs(1-x[k]) < tolerance ) break;
      }

      var nt = k;
      var sum = 0;

      // rescale [a,b] to [-1,1]
      var len = ( b - a ) / 2;
      var mid = ( b + a ) / 2;

      for ( var k = 1 ; k <= m ; k++ ) {
        for ( var i = 0 ; i < nt ; i += 2**(m-k) ) {
          if ( i % 2**(m-k+1) !== 0 || k === 1 ) {
            if ( i === 0 ) sum += w[0] * f( mid );
            else sum += w[i] * ( f( mid - len*x[i] ) + f( mid + len*x[i] ) );
          }
        }
      }

      return len * h * sum;

    case 'gaussian':

      // based on Borwein & Bailey, Experimentation in Mathematics

      var m = 10;
      var x = [], w = [];

      var n = 3 * 2**m;

      for ( var j = 1 ; j <= n/2 ; j++ ) {

        var r = Math.cos( Math.PI * (j-.25) / (n+.5) );

        while ( true ) {

          var t1 = 1, t2 = 0;

          for ( var j1 = 1 ; j1 <= n ; j1++ ) {
            t3 = t2;
            t2 = t1;
            t1 = ( (2*j1-1) * r * t2 - (j1-1) * t3 ) / j1;
          }

          var t4 = n * ( r*t1 - t2 ) / ( r**2 - 1 );
          var delta = t1 / t4;
          r -= delta;

          if ( Math.abs( delta ) < tolerance ) break;

        }

        x[j] = r;
        w[j] = 2 / ( 1 - r**2 ) / t4**2

      }

      // rescale [a,b] to [-1,1]
      var len = ( b - a ) / 2;
      var mid = ( b + a ) / 2;

      var sum = 0;

      for ( var j = 1 ; j <= n/2 ; j++ ) 
        sum += w[j] * ( f( mid - len*x[j] ) + f( mid + len*x[j] ) );

      return len * sum;

    default:

      throw Error( 'Unsupported integration method' );

  }

}


function discreteIntegral( values, step ) {

  // composite trapezoidal rule

  var s = ( values[0] + values[ values.length - 1 ] ) / 2;

  for ( var i = 1 ; i < values.length - 1 ; i++ ) s += values[i];

  return s * step;

}


function summation( f, [a,b] ) {

  if ( isComplex( f(a) ) ) {

    var s = complex(0);

    for ( var i = a ; i <= b ; i++ ) s = add( s, f(i) );

    return s;

  } else {

    var s = 0;

    for ( var i = a ; i <= b ; i++ ) s += f(i);

    return s;

  }

}


function polynomial( x, coefficients, derivative=false ) {

  // Horner's method with highest power coefficient first

  var p = coefficients[0];
  var q = 0;

  for ( var i = 1 ; i < coefficients.length ; i++ ) {
    if ( derivative ) q = add( p, mul( q, x ) );
    p = add( coefficients[i], mul( p, x ) );
  }

  if ( derivative ) return { polynomial: p, derivative: q };

  return p;

}


function partialBell( n, k, argumentArray ) {

  if ( n === 0 && k === 0 ) return 1;

  if ( n === 0 || k === 0 ) return 0;

  // evaluate recursively
  var s = 0;
  var p = 1;

  for ( var i = 1 ; i <= n - k + 1 ; i++ ) {

    s += p * argumentArray[i-1] * partialBell( n-i, k-1, argumentArray );
    p *= ( n - i ) / i;

  }

  return s;

}


function findRoot( f, start, options={} ) {

  var tolerance = 'tolerance' in options ? options.tolerance : 1e-10;
  var maxIter = 100;

  if ( Array.isArray(f) ) {

    if ( f.length !== start.length )
      throw Error( 'Mismatch between equations and starting point for root' );

    var root = start;

    for ( var i = 0; i < maxIter ; i++ ) {

      var J = [], F = [];

      for ( var j = 0 ; j < root.length ; j++ ) {
        J.push( gradient( f[j], root ) );
        F.push( f[j].apply( null, root ) );
      }

      var delta = luSolve( J, F );

      for ( var j = 0 ; j < root.length ; j++ ) root[j] -= delta[j];

      if ( delta.every( d => Math.abs(d) < tolerance ) ) return root;

    }

    throw Error( 'No root found for tolerance ' + tolerance );

  }

  if ( !Array.isArray(start) && !options.method ) options.method = 'newton';

  var method = 'method' in options ? options.method : 'bisect';

  switch( method ) {

    case 'bisect':

      var a = start[0];
      var b = start[1];

      var fa = f(a);
      var fb = f(b);

      if ( fa * f(b) >= 0 ) throw Error( 'Change of sign necessary for bisection' );

      var root, h;
      if ( fa < 0 ) {
        root = a;
        h = b - a;
      } else {
        root = b;
        h = a - b;
      }

      for ( var i = 0; i < maxIter ; i++ ) {
        h /= 2;
        var mid = root + h;
        fmid = f(mid);
        if ( fmid <= 0 ) root = mid;
        if ( fmid === 0 || Math.abs(h) < tolerance ) return root;
      }

      throw Error( 'No root found for tolerance ' + tolerance );

    case 'newton':

      var root = start;

      if ( isComplex( f(root) ) ) {

        for ( var i = 0; i < maxIter ; i++ ) {
          var delta = div( f(root), diff( f, root ) );
          root = sub( root, delta );
          if ( abs(delta) < tolerance ) return root;
        }

      } else {

        for ( var i = 0; i < maxIter ; i++ ) {
          var delta = f(root) / diff( f, root );
          root -= delta;
          if ( Math.abs(delta) < tolerance ) return root;
        }

      }

      throw Error( 'No root found for tolerance ' + tolerance );

    default:

      throw Error( 'Unsupported root finding method' );

  }

}


function findRoots( f, point, tolerance=1e-10 ) {

  console.log( 'Renamed to findRoot' );

}


function spline( points, value='function', tolerance=1e-10 ) {

  // adapted from gsl / cspline.c and reference therein

  var a = [], b = [], c = [], d = [];

  for ( var i = 0 ; i < points.length ; i++ ) a[i] = points[i][1];

  c[0] = 0;
  c[ points.length - 1 ] = 0;

  var A = matrix( points.length - 2 );
  var y = vector( points.length - 2 );

  function h( i ) { return points[i+1][0] - points[i][0]; }

  for ( var i = 0 ; i < A.length ; i++ ) {
    A[i][i] = 2 * ( h(i) + h(i+1) );
    y[i] = 3 * ( a[i+2] - a[i+1] ) / h(i+1) - 3 * ( a[i+1] - a[i] ) / h(i);
  }
  for ( var i = 1 ; i < A.length ; i++ ) {
    A[i][i-1] = h(i); 
    A[i-1][i] = h(i); 
  }

  var x = luSolve( A, y );

  for ( var i = 0 ; i < x.length ; i++ ) c[i+1] = x[i];

  for ( var i = 0 ; i < c.length - 1 ; i++ ) {
    b[i] = ( a[i+1] - a[i] ) / h(i) - ( c[i+1] + 2*c[i] ) * h(i) / 3;
    d[i] = ( c[i+1] - c[i] ) / 3 / h(i);
  }

  switch( value ) {

    case 'function':

      return function( x ) {

        if ( x < points[0][0] || x > points[points.length-1][0] )
          throw Error( 'Argument outside spline input domain' );

        for ( var i = 0 ; i < points.length ; i++ )
          if ( x === points[i][0] ) return a[i];

        for ( var i = 0 ; i < points.length - 1 ; i++ )
          if ( x > points[i][0] && x < points[i+1][0] ) {
            var xi = points[i][0];
            return a[i] + b[i] * ( x - xi )
                   + c[i] * ( x - xi )**2 + d[i] * ( x - xi )**3;
          }

      }

    case 'derivative':

      return function( x ) {

        if ( x < points[0][0] || x > points[points.length-1][0] )
          throw Error( 'Argument outside spline input domain' );

        // method does not define b[points.length-1] so fudge endpoint
        if ( x === points[points.length-1][0] ) x -= tolerance;

        for ( var i = 0 ; i < points.length ; i++ )
          if ( x === points[i][0] ) return b[i];

        for ( var i = 0 ; i < points.length - 1 ; i++ )
          if ( x > points[i][0] && x < points[i+1][0] ) {
            var xi = points[i][0];
            return b[i] + 2 * c[i] * ( x - xi ) + 3 * d[i] * ( x - xi )**2;
          }

      }

    case 'integral':

      return function( x ) {

        if ( x < points[0][0] || x > points[points.length-1][0] )
          throw Error( 'Argument outside spline input domain' );

        var sum = 0;

        function F( x, i ) {
          var xi = points[i][0];
          return a[i] * ( x - xi ) + b[i] * ( x - xi )**2 / 2
                   + c[i] * ( x - xi )**3 / 3 + d[i] * ( x - xi )**4 / 4;
        }

        for ( var i = 0 ; i < points.length - 1 ; i++ )
          if ( x < points[i+1][0] ) {
            sum += F( x, i ) - F( points[i][0], i );
            break;
          } else sum += F( points[i+1][0], i ) - F( points[i][0], i );

        return sum;

      }

    default:

      throw Error( 'Unsupported spline value' );

  }

}


function fourierSinCoefficient( f, n, period ) {

  if ( !Number.isInteger(n) ) throw Error( 'Nonintegral Fourier index' );

  if ( n === 0 ) return 0;

  if ( typeof f === 'function' ) {

    var T = period || 2*pi;

    return 2/T * integrate( t => f(t) * sin( 2*n*pi/T * t ), [0,T], { method: 'tanh-sinh' } );

  }

  if ( Array.isArray(f) ) {

    var s = 0, N = f.length;

    for ( var i = 0 ; i < N ; i++ ) s += f[i][1] * sin( 2*n*pi*i/N );

    return 2 * s / N;

  }

  throw Error( 'Unsupported Fourier input' );

}

function fourierCosCoefficient( f, n, period ) {

  if ( !Number.isInteger(n) ) throw Error( 'Nonintegral Fourier index' );

  if ( typeof f === 'function' ) {

    var T = period || 2*pi;

    if ( n === 0 ) return 1/T * integrate( t => f(t), [0,T], { method: 'tanh-sinh' } );

    return 2/T * integrate( t => f(t) * cos( 2*n*pi/T * t ), [0,T], { method: 'tanh-sinh' } );

  }

  if ( Array.isArray(f) ) {

    var s = 0, N = f.length;

    if ( n === 0 ) {

      for ( var i = 0 ; i < N ; i++ ) s += f[i][1];

      return s / N;

    }

    for ( var i = 0 ; i < N ; i++ ) s += f[i][1] * cos( 2*n*pi*i/N );

    return 2 * s / N;

  }

  throw Error( 'Unsupported Fourier input' );

}


function eigensystem( A, symmetric=true ) {

  if ( symmetric ) return tridiagonalQL( tridiagonalForm(A) );
  else throw Error( 'Unsupported eigensystem' );

}

// sourced from http://math.nist.gov/javanumerics/jama/
// no need to reinvent this wheel...

function tridiagonalForm( A ) {

  var n = A.length;
  var V = [];
  for ( var i = 0 ; i < n ; i++ ) V[i] = A[i].slice(); // deeper copy

  var d = vector( n );
  var e = vector( n );

  for ( var j = 0 ; j < n ; j++ ) d[j] = V[n-1][j];

  // Householder reduction to tridiagonal form
   
  for ( var i = n - 1 ; i > 0 ; i-- ) {
   
    // scale to avoid under/overflow
   
    var scale = 0;
    var h = 0;
    for ( var k = 0 ; k < i ; k++ ) scale += Math.abs(d[k]);

    if ( scale === 0 ) {
      e[i] = d[i-1];
      for ( var j = 0 ; j < i ; j++ ) {
        d[j] = V[i-1][j];
        V[i][j] = 0;
        V[j][i] = 0;
      }
    } else {

      // generate Householder vector

      for ( var k = 0 ; k < i ; k++ ) {
        d[k] /= scale;
        h += d[k] * d[k];
      }
      var f = d[i-1];
      var g = Math.sqrt(h);
      if ( f > 0 ) g = -g;
      e[i] = scale * g;
      h = h - f * g;
      d[i-1] = f - g;
      for ( var j = 0; j < i; j++ ) e[j] = 0;

      // apply similarity transformation to remaining columns

      for ( var j = 0 ; j < i ; j++ ) {
        f = d[j];
        V[j][i] = f;
        g = e[j] + V[j][j] * f;
        for ( var k = j + 1 ; k <= i - 1 ; k++ ) {
          g += V[k][j] * d[k];
          e[k] += V[k][j] * f;
        }
        e[j] = g;
      }
      f = 0;
      for ( var j = 0 ; j < i ; j++ ) {
        e[j] /= h;
        f += e[j] * d[j];
      }
      var hh = f / ( h + h );
      for ( var j = 0 ; j < i ; j++ ) {
        e[j] -= hh * d[j];
      }
      for ( var j = 0 ; j < i ; j++ ) {
        f = d[j];
        g = e[j];
        for ( var k = j ; k <= i - 1 ; k++ ) {
          V[k][j] -= f * e[k] + g * d[k];
        }
        d[j] = V[i-1][j];
        V[i][j] = 0;
      }

    }

    d[i] = h;

  }
   
  // accumulate transformations
   
  for ( var i = 0 ; i < n - 1 ; i++ ) {
    V[n-1][i] = V[i][i];
    V[i][i] = 1;
    var h = d[i+1];
    if ( h !== 0 ) {
      for ( var k = 0 ; k <= i ; k++ ) d[k] = V[k][i+1] / h;
      for ( var j = 0 ; j <= i ; j++ ) {
        var g = 0;
        for ( var k = 0 ; k <= i ; k++ ) g += V[k][i+1] * V[k][j];
        for ( var k = 0 ; k <= i ; k++ ) V[k][j] -= g * d[k];
      }
    }
    for ( var k = 0; k <= i; k++) V[k][i+1] = 0;
  }
  for ( var j = 0 ; j < n ; j++ ) {
    d[j] = V[n-1][j];
    V[n-1][j] = 0;
  }
  V[n-1][n-1] = 1;
  e[0] = 0;

  return { diagonal: d, offDiagonal: e, eigenvectors: V };

}


function tridiagonalQL( tridiagonalForm ) {

  var d = tridiagonalForm.diagonal;
  var n = d.length;
  var e = tridiagonalForm.offDiagonal;
  var V = tridiagonalForm.eigenvectors;

  function hypot( a, b) {
    var r;
    if ( Math.abs(a) > Math.abs(b) ) {
      r = b/a;
      r = Math.abs(a) * Math.sqrt( 1 + r*r );
    } else if (b != 0) {
      r = a/b;
      r = Math.abs(b) * Math.sqrt( 1 + r*r );
    } else r = 0;

    return r;

  }

  for ( var i = 1 ; i < n ; i++ ) e[i-1] = e[i];
  e[n-1] = 0;

  var f = 0;
  var tst1 = 0;
  var eps = Math.pow( 2, -52 );

  for ( var l = 0 ; l < n ; l++ ) {

    // find small subdiagonal element

    tst1 = Math.max( tst1, Math.abs(d[l]) + Math.abs(e[l]) );
    var m = l;
    while ( m < n ) {
      if ( Math.abs(e[m]) <= eps*tst1 ) break;
      m++;
    }

    // if m === l, d[l] is an eigenvalue, otherwise iterate

    if ( m > l ) {

      var iter = 0;
      do {

        iter = iter + 1;
        if ( iter > 1000 ) throw Error( 'Eigenvalues not converging...' );

        // compute implicit shift

        var g = d[l];
        var p = ( d[l+1] - g ) / ( 2 * e[l] );
        var r = hypot(p,1);
        if ( p < 0 ) r = -r;
        d[l] = e[l] / ( p + r );
        d[l+1] = e[l] * ( p + r );
        var dl1 = d[l+1];
        var h = g - d[l];
        for ( var i = l + 2 ; i < n ; i++ ) d[i] -= h;
        f = f + h;

        // implicit QL transformation

        p = d[m];
        var c = 1;
        var c2 = c;
        var c3 = c;
        var el1 = e[l+1];
        var s = 0;
        var s2 = 0;
        for ( var i = m - 1 ; i >= l ; i-- ) {
          c3 = c2;
          c2 = c;
          s2 = s;
          g = c * e[i];
          h = c * p;
          r = hypot(p,e[i]);
          e[i+1] = s * r;
          s = e[i] / r;
          c = p / r;
          p = c * d[i] - s * g;
          d[i+1] = h + s * ( c * g + s * d[i] );

          // accumulate transformation

          for ( var k = 0 ; k < n ; k++ ) {
            h = V[k][i+1];
            V[k][i+1] = s * V[k][i] + c * h;
            V[k][i] = c * V[k][i] - s * h;
          }
        }
        p = -s * s2 * c3 * el1 * e[l] / dl1;
        e[l] = s * p;
        d[l] = c * p;
   
        // check for convergence
   
      } while ( Math.abs(e[l]) > eps*tst1 );
    }
    d[l] = d[l] + f;
    e[l] = 0;
  }
   
  // sort eigenvalues and corresponding vectors

  for ( var i = 0 ; i < n - 1 ; i++ ) {
    var k = i;
    var p = d[i];
    for ( var j = i + 1 ; j < n ; j++ ) {
      if ( d[j] < p ) {
        k = j;
        p = d[j];
      }
    }
    if ( k != i ) {
      d[k] = d[i];
      d[i] = p;
      for ( var j = 0 ; j < n ; j++ ) {
        p = V[j][i];
        V[j][i] = V[j][k];
        V[j][k] = p;
      }
    }
  }

  return { eigenvalues: d, eigenvectors: V };

}


function hessenbergForm( A ) {

}


function luDecomposition( A, tolerance=1e-10 ) {

  var size = A.length;
  var LU = [];
  for ( var i = 0 ; i < size ; i++ ) LU[i] = A[i].slice(); // deeper copy

  var P = identity( size );
  pivots = 0;

  for ( var i = 0 ; i < size ; i++ ) {

    var maxValue = 0;
    var maxIndex = i;

    for ( var j = i ; j < size ; j++ ) {
      var element = Math.abs( LU[j][i] );
      if ( element > maxValue ) {
        maxValue = element;
        maxIndex = j;
      }
    }

    if ( maxValue < tolerance ) throw Error( 'Matrix is degenerate' );

    if ( maxIndex !== i ) {

      // pivot matrix rows
      var t = LU[i];
      LU[i] = LU[maxIndex];
      LU[maxIndex] = t;

      // pivot permutation rows
      var t = P[i];
      P[i] = P[maxIndex];
      P[maxIndex] = t;

      pivots++;

    }

    for ( var j = i + 1 ; j < size ; j++ ) {
      LU[j][i] /= LU[i][i];
      for ( var k = i + 1; k < size ; k++ )
        LU[j][k] -= LU[j][i] * LU[i][k];
    }
  }

  var L = identity( size );
  for ( var i = 1 ; i < size ; i++ )
    for ( var j = 0 ; j < i ; j++ ) L[i][j] = LU[i][j];

  var U = matrix( size );
  for ( var i = 0 ; i < size ; i++ )
    for ( var j = i ; j < size ; j++ ) U[i][j] = LU[i][j];

  return { L: L, U: U, P: P, pivots: pivots };

}

function luSolve( A, b ) {

  var size = A.length;
  var lu = luDecomposition(A);

  var x = vector( size );
  var y = vector( size );
  var pb = vector( size );

  for ( var i = 0 ; i < size ; i++ )
    for ( var j = 0 ; j < size ; j++ )
      pb[i] += lu.P[i][j] * b[j];

  // forward solve
  for ( var i = 0 ; i < size ; i++ ) {
    y[i] = pb[i];
    for ( var j = 0 ; j < i ; j++ ) y[i] -= lu.L[i][j] * y[j];
    y[i] /= lu.L[i][i];
  }

  // backward solve
  for ( var i = size - 1 ; i >= 0 ; i-- ) {
    x[i] = y[i];
    for ( var j = i + 1 ; j < size ; j++ ) x[i] -= lu.U[i][j] * x[j];
    x[i] /= lu.U[i][i];
  }

  return x;

}

function determinant( A ) {

  var lu = luDecomposition(A);

  var product = 1;
  for ( var i = 0 ; i < A.length; i++ ) product *= lu.U[i][i];

  return (-1)**lu.pivots * product;

}

function inverse( A ) {

  // calling luSolve for each column is not efficient
  //   but avoids code duplication

  var I = matrix( A.length );

  for ( var i = 0 ; i < A.length ; i++ ) {

    var b = vector( A.length );
    b[i] = 1;

    var x = luSolve( A, b );
    for ( var j = 0 ; j < A.length ; j++ ) I[j][i] = x[j];

  }

  return I;

}



function vector( size, value=0 ) {

  var v = [];
  for ( var i = 0 ; i < size ; i++ )
    if ( Array.isArray(value) ) v.push( random.apply( null, value ) );
    else v.push( value );

  return v;

}

function matrix( rows, columns, value=0 ) {

  var columns = columns || rows;

  var m = [];
  for ( var i = 0 ; i < rows ; i++ ) {
    m.push( [] );
    for ( var j = 0 ; j < columns ; j++ )
      if ( Array.isArray(value) ) m[i].push( random.apply( null, value ) );
      else m[i].push( value );
  }

  return m;

}

function identity( rows, value=1 ) {

  var m = matrix( rows );
  for ( var i = 0 ; i < rows ; i++ ) m[i][i] = value;

  return m;

}

function transpose( A ) {

  var T = matrix( A[0].length, A.length );

  for ( var i = 0 ; i < A.length ; i++ )
    for ( var j = 0 ; j < A[0].length ; j++ )
      T[j][i] = A[i][j];

  return T;

}

function matrixAdd( A, B ) {

  if ( !Array.isArray(A) && !Array.isArray(B) ) throw Error( 'No matrices to add' );
  if ( !Array.isArray(A) ) A = matrix( B.length, B[0].length, A );
  if ( !Array.isArray(B) ) B = matrix( A.length, A[0].length, B );

  var C = matrix( A.length, A[0].length, 0 );

  for ( var i = 0 ; i < A.length ; i++ )
    for ( var j = 0 ; j < A[0].length ; j++ )
      C[i][j] = add( A[i][j], B[i][j] );

  return C;

}

function matrixSub( A, B ) {

  if ( !Array.isArray(A) && !Array.isArray(B) ) throw Error( 'No matrices to subtract' );
  if ( !Array.isArray(A) ) A = matrix( B.length, B[0].length, A );
  if ( !Array.isArray(B) ) B = matrix( A.length, A[0].length, B );

  var C = matrix( A.length, A[0].length, 0 );

  for ( var i = 0 ; i < A.length ; i++ )
    for ( var j = 0 ; j < A[0].length ; j++ )
      C[i][j] = sub( A[i][j], B[i][j] );

  return C;

}

function matrixMul( A, B ) {

  if ( !Array.isArray(A) && !Array.isArray(B) ) throw Error( 'No matrices to multiply' );
  if ( !Array.isArray(A) ) A = identity( B.length, A );
  if ( !Array.isArray(B) ) B = identity( A[0].length, B );
  if ( A[0].length !== B.length ) throw Error( 'Incompatible matrices to multiply' );

  var C = matrix( A.length, B[0].length, 0 );

  for ( var i = 0 ; i < A.length ; i++ )
    for ( var j = 0 ; j < B[0].length ; j++ )
      for ( var k = 0 ; k < A[0].length ; k++ )
        C[i][j] = add( C[i][j], mul( A[i][k], B[k][j] ) );

  return C;

}

