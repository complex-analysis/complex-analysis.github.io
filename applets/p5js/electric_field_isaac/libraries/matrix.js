/**
 * @author Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 */

class Row {
  constructor(size, vals) {
    let len = ~~Math.abs(size);
    this.data = [];
    this.size = len;
    for (let i = 0; i < len; i += 1) {
      this.data[i] = vals || 0;
    }
    this.normalize();
  }

  static EPS() {
    return 1e-9;
  }

  get(i) {
    return this.data[i];
  }

  set(i, val) {
    return this.data[i] = val;
  }

  size() {
    return this.size;
  }

  length() {
    return this.size;
  }

  clone() {
    let r = new Row(this.size);
    for (let i = 0; i < r.size; i += 1) {
      r.set(i, this.get(i));
    }
    return r;
  }

  normalize() {
    this.clz = 0;
    for (let i = 0; i < this.size && Math.abs( this.get(i) ) < Row.EPS() ; i += 1) {
      this.clz = i + 1;
    }
  }

  delAt(pos) {
    if ( pos >= 0 && pos < this.size ) {
      this.data.splice(pos, 1);
      this.size -= 1;
    }
  }

  add(n, thisRow) {
    let r = ( thisRow ) ? this : this.clone();
    let isRow = (n instanceof Row);
    if ( isRow && n.size != this.size ) {
      throw new TypeError('Lengths does not match');
    }
    for (let i = 0; i < r.size; i += 1) {
      r.set(i, r.get(i) + (( isRow ) ? n.get(i) : n) );
    }
    return r;
  }

  sub(n, thisRow) {
    return this.add(( n instanceof Row ) ? n.mul(-1) : -n, thisRow);
  }

  mul(n, thisRow) {
    let r = ( thisRow ) ? this : this.clone();
    let isRow = (n instanceof Row);
    if ( isRow && n.size != this.size ) {
      throw new TypeError('Lengths does not match');
    }
    for (let i = 0; i < r.size; i += 1) {
      r.set(i, r.get(i) * (( isRow ) ? n.get(i) : n));
    }
    return r;
  }

  div(n, thisRow) {
    let r = ( thisRow ) ? this : this.clone();
    for (let i = 0; i < r.size; i += 1) {
      r.set(i, r.get(i) / n);
    }
    return r;
  }

  append(n, thisRow) {
    let r = ( thisRow ) ? this : this.clone();
    if ( n instanceof Row ) {
      for (let i = 0; i < n.size; i += 1) {
        r.data.push( n.get(i) );
      }
      r.size += n.size;
    } else {
      r.data.push( n );
      r.size += 1;
    }
    return r;
  }

  prepend(n, thisRow) {
    let r = ( thisRow ) ? this : this.clone();
    if ( n instanceof Row ) {
      for (let i = n.size - 1; i >= 0; i -= 1) {
        r.data.unshift( n.get(i) );
      }
      r.size += n.size;
    } else {
      r.data.unshift( n );
      r.size += 1;
    }
    return r;
  }
}

class Matrix {

  constructor(rows, cols, val) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for (let i = 0; i < rows; i += 1) {
      this.matrix[i] = new Row(cols, val);
    }
  }

  static EPS() {
    return 1e-9;
  }

  static Identity(n) {
    let res = new Matrix(n, n);
    for (let i = 0; i < n; i += 1) {
      res.set(i, i, 1);
      res.matrix[i].clz = i;
    }
    return res;
  }

  static toFlatArray(arr) {
    let res = [];

    let Q = [];

    Q.push(arr);

    while( Q.length > 0 ) {
      let elem = Q.shift();

      if ( Array.isArray( elem ) ) {
        elem.forEach(e => Q.push(e));
      } else {
        res.push(elem);
      }
    }

    return res;

  }

  static fromArray(arr, shape) {
    if ( shape.length < 2 ) {
      throw new TypeError('Invalid shape. Must have a length >= 2');
    }

    let tot = shape[0] * shape[1];
    let arrF = Matrix.toFlatArray(arr);

    if ( arrF.length < tot ) {
      throw new TypeError(`Expected to have an array with length ${tot} but is has only ${arrF.length}`);
    }

    let res = new Matrix(shape[0], shape[1]);
    let idx = 0;
    for (let i = 0; i < shape[0]; i += 1) {
      for (let j = 0; j < shape[1]; j += 1) {
        res.set(i, j, arrF[idx++]);
      }
    }
    return res;
  }

  dims() {
    return [ this.rows, this.cols ];
  }

  toArray() {
    let res = [];
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        res.push( this.get(i, j) );
      }
    }
    return res;
  }

  get(i, j) {
    if ( typeof j === 'undefined' ) {
      return this.matrix[i];
    }
    return this.matrix[i].get(j);
  }

  set(i, j, value) {
    if ( (typeof value === 'undefined') && (j instanceof Row) && (j.size === this.cols) ) {
      let val = j;
      for (let c = 0; c < val.size; c += 1) {
        this.get(i).set(c, val.get(c));
        // this.matrix[i].data[c] = value.data[c];
      }
      return this.get(i);
    }
    return this.get(i).set(j, Math.abs(value) < Matrix.EPS() ? 0 : value );
  }

  add(m, thisMatrix) {
    let isMatrix = (m instanceof Matrix);
    if ( isMatrix && (m.rows != this.rows || m.cols != this.cols) ) {
      throw new TypeError(`Dimensions does not match ${this.rows}x${this.cols} ${m.rows}x${m.cols}`);
    }

    let result = ( thisMatrix ) ? this : this.clone();

    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      result.set(i, result.get(i).add( ( isMatrix ) ? m.get(i) : m ));
    }

    return result;
  }

  sub(m, thisMatrix) {
    return this.add( ( m instanceof Matrix ) ? m.mul(-1) : -m, thisMatrix );
  }

  mul(m) {
    let isMatrix = (m instanceof Matrix);
    if ( isMatrix && this.cols != m.rows ) {
      throw new TypeError(
        `Can not multiply those matrices ${this.rows}x${this.cols}  ${m.rows}x${m.cols}`
      );
    }

    let result;

    if ( isMatrix ) {

      result = new Matrix(this.rows, m.cols);
      let EPS = Matrix.EPS();

      for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
        for (let j = 0, maxj = m.cols; j < maxj; j += 1) {
          let sum = 0;
          for (let k = 0, maxk = this.cols; k < maxk; k += 1) {
            sum += this.get(i, k) * m.get(k, j);
          }
          result.set(i, j, sum);
        }
      }

    } else {
      result = this.clone();
      for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
        for (let j = 0, maxj = this.cols; j < maxj; j += 1) {
          result.set(i, j, result.get(i, j) * m);
        }
      }
    }

    return result;
  }

  div(m, thisMatrix) {
    if ( m instanceof Matrix ) {
      throw new TypeError('Matrix division is not defined');
    }

    let result = ( thisMatrix ) ? this : this.clone();

    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      for (let j = 0, maxj = this.cols; j < maxj; j += 1) {
        result.set(i, j, result.get(i, j) / m);
      }
    }

    return result;
  }

  transpose() {
    let result = new Matrix(this.cols, this.rows);

    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      for (let j = 0, maxj = this.cols; j < maxj; j += 1) {
        result.set(j, i, this.get(i, j));
      }
    }

    return result;
  }

  clone() {
    let result = new Matrix(this.rows, this.cols);
    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      for (let j = 0, maxj = this.cols; j < maxj; j += 1) {
        result.set(i, j, this.get(i, j));
      }
    }
    return result;
  }

  setCol(col, c) {
    if ( c < 0 || c >= this.cols ) {
      throw new TypeError(`Column ${c} does not exists`);
    }

    if ( col.length != this.rows ) {
      throw new TypeError('The length of this column does not match');
    }

    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      this.set(i, c, col[i]);
    }
  }

  setRow(row, r) {
    if ( r < 0 || r >= this.rows ) {
      throw new TypeError(`Row ${r} does not exists`);
    }

    if ( ( Array.isArray(row) && row.length != this.cols) ||
         ( row instanceof Row && row.size != this.cols ) ) {
      throw new TypeError('The length of this row does not match');
    }

    if ( Array.isArray(row) ) {
      for (let i = 0, maxi = this.cols; i < maxi; i += 1) {
        this.set(r, i, row[i]);
      }
    } else if ( row instanceof Row ) {
      this.set(r, row);
    }

  }

  delRow(r, thisMatrix) {
    if ( r < 0 || r >= this.rows ) {
      throw new TypeError(`Row ${r} does not exists`);
    }

    let result = ( thisMatrix ) ? this : this.clone();

    result.matrix.splice(r, 1);
    result.rows -= 1;

    return result;
  }

  delCol(c, thisMatrix) {
    if ( c < 0 || c >= this.cols ) {
      throw new TypeError(`Column ${c} does not exists`);
    }

    let result = ( thisMatrix ) ? this : this.clone();

    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      result.get(i).delAt(c);
    }

    result.cols -= 1;

    return result;
  }

  det() {
    if ( this.cols !== this.rows ) {
      throw new TypeError('Undefined determinant of a non-squared matrix');
    }

    if ( this.rows === 1 ) {
      return this.get(0, 0);
    }

    if ( this.rows === 2 ) {
      return this.get(0, 0) * this.get(1, 1) - this.get(1, 0) * this.get(0, 1);
    }

    let res = 0;

    let m1 = this.clone();
    let m2;

    // console.log('M1, M2');

    m1.delRow(0, true);
    m2 = m1.clone();
    // m1.print();

    // m2.print();
    // console.log('/M1, M2');

    for(let i = 0, j = 1; i < this.cols; i += 1, j = -j) {
      res = res + m2.delCol(i).det() * this.get(0, i) * j;
    }

    return res;

  }

  randomize(a, b, isInt) {
    let A = a || 0;
    let B = b || 1;
    let I = isInt || false;
    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      for (let j = 0, maxj = this.cols; j < maxj; j += 1) {
        this.set(i, j, A + Math.random() * (B - A));
        if ( I ) {
          this.set(i, j, ~~this.get(i, j));
        }
      }
    }
  }

  print(label) {
    let table = this.matrix.map(r => r.data);
    if ( typeof label === 'string' ) {
      console.info(label);
    }
    console.table(table);
  }

  appendRight(m, thisMatrix) {
    if ( !(m instanceof Matrix) ) {
      throw new TypeError('Only can append a matrix');
    }

    if ( this.rows != m.rows ) {
      throw new TypeError('Can not append that matrix. Rows does not match');
    }

    let res = ( thisMatrix ) ? this : this.clone();

    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      res.get(i).append( m.get(i), true );
    }

    res.cols += m.cols;

    return res;

  }

  appendLeft(m, thisMatrix) {
    if ( !(m instanceof Matrix) ) {
      throw new TypeError('Only can append a matrix');
    }

    if ( this.rows != m.rows ) {
      throw new TypeError('Can not append that matrix. Rows does not match');
    }

    let res = ( thisMatrix ) ? this : this.clone();

    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      res.get(i).prepend( m.get(i), true );
    }

    res.cols += m.cols;

    return res;

  }

  appendBottom(m, thisMatrix) {
    if ( !(m instanceof Matrix) ) {
      throw new TypeError('Only can append a matrix');
    }

    if ( this.cols != m.cols ) {
      throw new TypeError('Can not append that matrix. Rows does not match');
    }

    let res = ( thisMatrix ) ? this : this.clone();

    for (let i = 0, maxi = m.rows; i < maxi; i += 1) {
      res.matrix.push( m.get(i).clone() );
    }

    res.rows += m.rows;

    return res;

  }

  appendTop(m, thisMatrix) {
    if ( !(m instanceof Matrix) ) {
      throw new TypeError('Only can append a matrix');
    }

    if ( this.cols != m.cols ) {
      throw new TypeError('Can not append that matrix. Rows does not match');
    }

    let res = ( thisMatrix ) ? this : this.clone();

    for (let i = m.rows - 1; i >= 0; i -= 1) {
      res.matrix.unshift( m.get(i).clone() );
    }

    res.rows += m.rows;

    return res;

  }

  normalize() {
    for (let i = 0, maxi = this.rows; i < maxi; i += 1) {
      this.get(i).normalize();
    }
  }

  to_esc(thisMatrix) {

    let res = ( thisMatrix ) ? this : this.clone();

    res.normalize();

    while(true) {

      res.matrix.sort((a, b) => a.clz - b.clz);
      // sort(m.begin(), m.end(), cmp_clz<T>);

      let ok = true;

      for(let i = 1; i < res.rows && ok; i += 1) {
        if( res.get(i).clz === res.get(i - 1).clz && res.get(i).clz != res.cols) {

          ok = false;

          let a = 0, b = 0;

          a = res.get(i - 1, res.get(i).clz );
          b = res.get(i, res.get(i).clz);

          res.set(i, res.get(i - 1).mul(b).sub( res.get(i).mul(a) ) );

          res.get(i).normalize();

        }
      }

      if(ok) {
        break;
      }

    }

    return res;

  }

  exchangeRows(i, j) {
    if ( i < 0 || i >= this.rows || j < 0 || j >= this.rows ) {
      throw new ReferenceError('Out of range indexes');
    }

    for (let c = 0; c < this.cols; c += 1) {
      let temp = this.get(i, c);
      this.set(i, c, this.get(j, c));
      this.set(j, c, temp);
    }
  }

  GaussJordan() {
    if ( this.rows > this.cols ) {
      throw new TypeError('Can not apply Gauss-Jordan Elimination to this matrix');
    }

    let m = this.clone();

    for (let i = 0; i < m.cols && i < m.rows; i += 1) {
      // console.log("I = %d", i);
      // m.clone().print();
      let maxv = Math.abs( m.get(i, i) );
      let maxp = i;
      for (let j = i; j < m.rows; j += 1) {
        if ( Math.abs( m.get(j, i) ) > maxv ) {
          maxv = Math.abs( m.get(j, i) );
          maxp = j;
        }
      }

      if ( maxp != i ) {
        m.exchangeRows(i, maxp);
      }

      // console.log('MAX_VALUE ', maxv, ' at ', maxp);
      // m.clone().print();

      if ( maxv > Matrix.EPS() ) {
        let r = m.get(i);
        let v = r.get(i);
        for (let j = 0; j < m.rows; j += 1) {
          if ( Math.abs( m.get(j, i) ) > Matrix.EPS() ) {
            if ( j < i ) {
              // console.log('ADJUST %d %d', j, i, v, m.get(j, i), m.get(j).sub( r.div(v) ));
              // m.clone().print();
              m.set(j, m.get(j).sub( r.mul( m.get(j, i) / v ) ) );
              // m.clone().print();
            } else if ( j > i ) {
              // console.log('ADJUST %d %d', j, i, v, m.get(j, i), m.get(j).mul( v ).sub( r.mul( m.get(j, i) )));
              // m.clone().print();
              let mv = Math.max(v, m.get(j, i));
              m.set(j, m.get(j).mul( v / mv ).sub( r.mul( m.get(j, i) / mv )) );
              // m.clone().print();
            }
          }
        }

        r.div(v, true);
        // console.log('FINAL ADJUST FOR COL %d', i);
        // m.clone().print();
      } else {
        return new Matrix(m.rows, m.cols);
      }
    }

    return m;

  }

  inv() {
    if ( this.rows != this.cols ) {
      throw new TypeError('Only NxN matrices have an inverse');
    }

    let mat = this.appendRight( Matrix.Identity( this.rows ) ).GaussJordan();

    let v;

    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.rows; j += 1) {
        v = ( i === j ) ? 1 : 0;
        if ( Math.abs(mat.get(i, j) - v) > Matrix.EPS() ) {
          return new Matrix(this.rows, this.cols);
        }
      }
    }
    // console.log('GAUSS JORDAN');

    // mat.print();

    for(let i = 0; i < mat.rows; i += 1) {
      mat.delCol(0, true);
    }

    return mat;
    // return new Matrix(this.rows, this.cols);
  }

  dot(m, thisMatrix) {
    if ( this.rows != m.rows || this.cols != m.cols ) {
      throw new TypeError('Dot product does not apply on different sizes matrices');
    }

    let result = ( thisMatrix ) ? this : this.clone();

    for (let i = 0; i < m.rows; i += 1) {
      for (let j = 0; j < m.cols; j += 1) {
        result.set(i, j, result.get(i, j) * m.get(i, j));
      }
    }

    return result;
  }

  npdot(m) {
    let prod = this.mul(m);
    let res = new Matrix(prod.rows, 1);
    for (let i = 0; i < prod.rows; i += 1) {
      let sum = 0;
      for (let j = 0; j < prod.cols; j += 1) {
        sum += prod.get(i, j);
      }
      res.set(i, 0, sum);
    }
    return res;
  }

  agregate(fn) {
    let func = ( typeof fn === 'function' ) ? fn : x => x;
    let res = 0;
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        res += func( this.get(i, j) );
      }
    }
    return res;
  }

  forEach(fn, thisMatrix) {
    let func = ( typeof fn === 'function' ) ? fn : (x => x);
    let result = this.clone();

    for (let i = 0; i < result.rows; i += 1) {
      for (let j = 0; j < result.cols; j += 1) {
        result.set(i, j, func(this.get(i, j), i, j));
      }
    }

    if ( thisMatrix ) {
      for (let i = 0; i < result.rows; i += 1) {
        for (let j = 0; j < result.cols; j += 1) {
          this.set(i, j, result.get(i, j));
        }
      }
      return this;
    }

    return result;
  }

  subCols(c1, c2) {
    let ini = Math.max(0, Math.min( c1 || 0, c2 || this.cols ));
    let fin = Math.min(this.cols, Math.max( c1 || 0, c2 || this.cols ));
    let res = new Matrix(this.rows, fin - ini);

    for (let i = 0; i < this.rows; i += 1) {
      for (let j = ini; j < fin; j += 1) {
        res.set(i, j - ini, this.get(i, j));
      }
    }

    return res;
  }

  subRows(r1, r2) {
    let ini = Math.max(0, Math.min( r1 || 0, r2 || this.rows ));
    let fin = Math.min(this.rows, Math.max( r1 || 0, r2 || this.rows ));
    // console.log('SubRows: ', ini, fin);
    let res = new Matrix(fin - ini, this.cols);

    for (let i = ini; i < fin; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        res.set(i - ini, j, this.get(i, j));
      }
    }

    return res;
  }

  submat(x1, y1, x2, y2) {
    return this.subRows(x1, x2).subCols(y1, y2);
  }
}