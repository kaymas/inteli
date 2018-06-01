let X = []
let Y = []

let slope, intercept

const learningRate = 0.1
const optimizer = tf.train.sgd(learningRate)

function setup(){
    createCanvas(400,400)
    background(51)

    //made tensors so that they are modified when optimizer is called (check doc of minimize)
    slope = tf.variable(tf.scalar(random(1)))
    intercept = tf.variable(tf.scalar(random(1)))
}

function predict(xValues){
    const xArr = tf.tensor1d(xValues)
    const yArr = xArr.mul(slope).add(intercept)
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
        let px = map(X[i], 0, 1, 0, width)
        let py = map(Y[i], 0, 1, height, 0)
        point(px,py)
    }

    const x_arr = [0, 1]
    const y_norm = tf.tidy(() => predict([0, 1]))
    const y_arr = y_norm.dataSync()
    y_norm.dispose()
    
    let x1 = map(x_arr[0],0,1,0,width)
    let x2 = map(x_arr[1],0,1,0,width)
    let y1 = map(y_arr[0],0,1,height,0)
    let y2 = map(y_arr[1],0,1,height,0)
    stroke(255,0,255,100)
    strokeWeight(4)
    line(x1,y1,x2,y2)
}

function mousePressed(){
    let x = map(mouseX, 0, width, 0, 1)
    let y = map(mouseY, 0, height, 1, 0)
    X.push(x)
    Y.push(y)
}