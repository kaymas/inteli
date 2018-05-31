//static methods here return a new class and don't modify the current class
//The map functions used everywhere with Matrix has been explicitly defined
//and is not to be confused with the map function for Arrays in js

class Matrix{
    constructor(rows,cols){
        this.rows = rows
        this.cols = cols
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0)) //fill with zeroes
    }

    copy(){
        let m = new Matrix(this.rows, this.cols)
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                m.data[i][j] = this.data[i][j] 
            }
        }
        return m
    }

    map(func) {
        // Apply a function to every element of matrix
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            let val = this.data[i][j]
            this.data[i][j] = func(val, i, j)
          }
        }
        return this;
    }

    static map(matrix, func) {
        //use the above defined method map
        return new Matrix(matrix.rows, matrix.cols).map((e, i, j) => func(matrix.data[i][j], i, j))
    }

    //convert from 1d array to matrix with 1 column 
    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((e, i) => arr[i]);
    }
    

    static subtract(a,b){
        if(a.rows !== b.rows || a.cols !== b.cols){
            console.log('Columns and Rows of A and B must match');
            return
        }

        return new Matrix(a.rows, a.cols).map((_,i,j) => a.data[i][j] - b.data[i][j])
    }

    //convert matrix (2d array) to 1d array
    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    randomize(){
        return this.map(e => Math.random() * 2 - 1) //random value between -1 and 1
    }

    add(a){
        if(a instanceof Matrix){ //if a is a matrix
            if(a.rows !== this.rows || a.cols !== this.cols){
                console.log('Columns and Rows of A and B must match');
                return
            }
            return this.map((e,i,j) => e + a.data[i][j])
        }else{
            return this.map(e => e + a)
        }
    }

    static transpose(mat){
        return new Matrix(mat.cols, mat.rows).map((_,i,j) => mat.data[j][i])
    }

    static multiply(a,b){ //matrix multiplication
        if(a.cols !== b.rows){
            console.log("Number of Columns of A must match that of Rows of B");
            return
        }

        return new Matrix(a.rows, b.cols).map((e,i,j) => {
            let sum = 0
            for(let k = 0; k < a.cols; k++){
                sum += a.data[i][k] * b.data[k][j]
            }
            return sum
        })
    }

    //hadamard product (element-wise)
    multiply(n){
        if(n instanceof Matrix){
            if(this.rows !== n.rows || this.cols !== n.cols){
                console.log('Columns and Rows of A must match Columns and Rows of B.');
                return;
            }
            return this.map((e,i,j) => e * n.data[i][j])
        }else{
            //scalar product
            return this.map(e => e * n)
        }
    }

    print() {
        console.table(this.data)
        return this //chaining
    }
    
    serialize() {
        return JSON.stringify(this)
    }

    static deserialize(data) {
        if (typeof data == 'string') {
          data = JSON.parse(data);
        }
        let matrix = new Matrix(data.rows, data.cols)
        matrix.data = data.data
        return matrix
    }
}