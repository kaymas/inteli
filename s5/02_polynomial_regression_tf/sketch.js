let X = []
let Y = []

let a,b,c

const learningRate = 0.1
const optimizer = tf.train.adam(learningRate)

function setup(){
    createCanvas(400,400)
    background(51)

    //made tensors so that they are modified when optimizer is called (check doc of minimize)
    a = tf.variable(tf.scalar(random(-1,1)))
    b = tf.variable(tf.scalar(random(-1,1)))
    c = tf.variable(tf.scalar(random(-1,1)))
}

function predict(xValues){
    const xArr = tf.tensor1d(xValues)
    //temp_yarr = bx + c
    let temp_yarr = xArr.mul(b).add(c)
    //yarr = ax^2 + bx + c
    const yArr = xArr.square().mul(a).add(temp_yarr)
    return yArr
}

function loss(pred, label){
    //calculate mean squared error
    return pred.sub(label).square().mean()    
}

function draw(){
    background(51)

    tf.tidy(() => {
        if(X.length > 0){
            //train
            let yArr = tf.tensor1d(Y)
            optimizer.minimize(() => loss(predict(X),yArr))
        }
    })

    stroke(255)
    strokeWeight(8)
    for(let i = 0; i < X.length; i++){
        let px = map(X[i], -1, 1, 0, width)
        let py = map(Y[i], -1, 1, height, 0)
        point(px,py)
    }

    const curveX = []
    for(let i = -1; i < 1; i += 0.1){
        curveX.push(i)
    }
    
    const y_norm = tf.tidy(() => predict(curveX))
    const curveY = y_norm.dataSync()
    y_norm.dispose()
    
    beginShape()
    strokeWeight(2)
    noFill()
    for(let i = 0; i < curveX.length; i++){
        let x1 = map(curveX[i],-1,1,0,width)
        let y1 = map(curveY[i],-1,1,height,0)
        vertex(x1,y1)
    }
    endShape()
}

function mousePressed(){
    let x = map(mouseX, 0, width, -1, 1)
    let y = map(mouseY, 0, height, 1, -1)
    X.push(x)
    Y.push(y)
}