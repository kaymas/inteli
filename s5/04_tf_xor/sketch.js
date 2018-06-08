let model

let res = 30
let cols 
let rows

let xs

const train_xs = tf.tensor2d([
    [0,0],
    [1,0],
    [0,1],
    [1,1]
])

const train_ys = tf.tensor2d([
    [0],
    [1],
    [1],
    [0]
])

function setup(){
    createCanvas(600,600) 
    cols = width / res  
    rows = height / res 

    let inputs = []
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x1 = i / cols
            let x2 = j / rows
            inputs.push([x1,x2])
        }
    }

    xs = tf.tensor2d(inputs)

    model = tf.sequential()
    let hidden = tf.layers.dense({
        inputShape: [2],
        units: 4,
        activation: 'sigmoid'
    })
    let output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    })
    model.add(hidden)
    model.add(output)

    const learningRate = 0.03

    model.compile({
        optimizer : tf.train.adam(learningRate),
        loss : 'meanSquaredError'
    })

    console.log(tf.memory().numTensors);
    setTimeout(train, 10)
}

function train(){
    trainModel().then(() => setTimeout(train,100))
}

function trainModel() {
    return model.fit(train_xs, train_ys, {shuffle: true, epochs: 10})
}

function draw(){
    background(51)

    tf.tidy(() => {
        let ys = model.predict(xs)
        let y_val = ys.dataSync()
        
        let index = 0
        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                let br = y_val[index] * 255
                fill(br)
                rect(i * res, j * res, res, res)
                fill(255 - br)
                textSize(12)
                textAlign(CENTER,CENTER)
                text(nf(y_val[index], 1, 2), i * res + res / 2, j * res + res / 2)
                index++
            }
        }
    })
}