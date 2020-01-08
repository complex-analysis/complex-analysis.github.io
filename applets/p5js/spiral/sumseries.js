function sumseries(n){
  let x = [];
  let xSum = [];
  for(let k = 0; k < n; k++){
    let sum = new Complex(0, 0);
  for(let i = 0; i < k; i++) {
    let rex = cos(2 * PI * form(i));
    let imx = sin(2 * PI * form(i));
    x[i] = new Complex(rex, imx);
    sum.add(x[i]);
  }
    xSum[k] = {re: sum.re, im: sum.im};
  }
  return xSum;
}


function form(k) {
  //return pow(log(k + 1), 4);
  //return (k+1)/3+(k+1)*(k+1)/11+(k+1)*(k+1)*(k+1)/79;
  //return k/(11)+k*k/(21)+k*k*k/(31);
  //return k/(3)+k*k/(11)+k*k*k/(79);
  return log(k+1)+(k+1)*(k+1)/100;
  //return sqrt(random(0.1, 50) * k)
}

const arrSum = arr => arr.reduce((a,b) => a + b, 0)
