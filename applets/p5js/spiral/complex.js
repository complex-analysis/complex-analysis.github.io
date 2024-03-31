class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
  }

  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }
  
  exp(c) {
    const re = exp(this.re) * cos(this.im);
    const im = exp(this.re) * sin(this.im);
    return new Complex(re, im);
  }
  
  log(c) {
    const re = log(pow(this.re * this.re + this.im * this.im, 1/2));
    const im = atan2(this.im, this.re);
    return new Complex(re, im);
  }
}