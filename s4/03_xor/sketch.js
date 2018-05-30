let nn
let lr_slider
let print_output
let outputs

let trainingData = [
    {
        input : [0,0],
        output : [0]
    },
    {
        input : [0,1],
        output : [1]
    },
    {
        input : [1,0],
        output : [1]
    },
    {
        input : [1,1],
        output : [0]
    }
]

function setup(){
    createCanvas(400,400)
    nn = new NeuralNetwork(2,4,1)
    createP("set learning rate(0.01 - 0.5)")
    lr_slider = createSlider(0.01, 0.5, 0.1, 0.01)
    print_output = createDiv(`<br>XOR Outputs : `)
    outputs = createDiv()
    outputs.parent(print_output)
}

function draw(){
    background(51)
    for(let i = 0; i < 100; i++){
        let data = random(trainingData)
        nn.train(data.input, data.output)
    }

    nn.setLearningRate(lr_slider.value())

    let res = 10
    let cols = width / res
    let rows = height / res

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x1 = i / cols
            let x2 = j / rows
            let input = [x1,x2]
            let y = nn.predict(input)
            noStroke()
            fill(y * 255)
            rect(i * res, j * res, res, res)
        }
    }

    let outputs_array = []
    for(let i = 0; i < trainingData.length; i++){
        let data = trainingData[i]
        let out = nn.predict(data.input)        
        outputs_array.push({
            input : data.input, 
            predicted : out
        })
    }
    let str = ''
    outputs_array.forEach(element => {
        str += `Predicted value for [${element.input}] is ${nf(element.predicted,1,3)} <br>`
    })
    outputs.html(str)
}