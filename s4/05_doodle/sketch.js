const len = 784
const total_data = 1000
let train_length = 0.8 * total_data

const CAT = 0
const TRAIN = 1

let cats_data
let trains_data

let cats = {}
let trains = {}

let nn

let message = document.querySelector('#message')

function preload(){
    cats_data = loadBytes('cats.bin')
    trains_data = loadBytes('trains.bin')
}

function setup(){
    createCanvas(280,280)
    background(255)

    train_length = floor(train_length)

    //preparing data
    prepareData(cats, cats_data, CAT)
    prepareData(trains, trains_data, TRAIN)

    //creating neural network
    nn = new NeuralNetwork(len,64,2)

    //mixing data
    let training = []
    training = training.concat(cats.training)
    training = training.concat(trains.training)

    let testing = []
    testing = testing.concat(cats.testing)
    testing = testing.concat(trains.testing)

    //train buttom
    let trainButton = select('#trainBtn')
    let trainGeneration = 0
    trainButton.mousePressed(() => {  
        console.log("training...");
        train_nn(training)
        trainGeneration++
        console.log("Generation : ", trainGeneration)
        message.innerHTML = `Finished training generation ${trainGeneration}.`
    })

    //test button
    let testButton = select('#testBtn')
    testButton.mousePressed(() => {
        let test_result = test_all(testing)
        console.log("% correct: ", nf(test_result,2,2))
        message.innerHTML = `% of correctness: ${nf(test_result,2,2)}`
    })

    //guess button
    let guessButton = select('#guessBtn')
    guessButton.mousePressed(() => {
        let inputs = []
        let img = get() //grabs pixesl from canvas
        img.resize(28,28)
        img.loadPixels()
        for(let i = 0; i < len; i++){
            let brightness = img.pixels[i * 4]
            inputs[i] = (255 - brightness) / 255.0
        }
        // console.log(inputs);
        
        let guess = nn.predict(inputs)
        console.log(guess);
        let m = max(guess)
        let classification = guess.indexOf(m)
        if(classification === CAT){
            console.log("cat");
            message.innerHTML = "Guessed Cat."
        }else if(classification === TRAIN){
            console.log("train");
            message.innerHTML = "Guessed Train."
        }
    })

    //clear button
    let clearButton = select('#clearBtn');
    clearButton.mousePressed(function() {
        message.innerHTML = ""
        background(255);
    });
    
}


function prepareData(category, data, label){
    category.training = []
    category.testing = []

    for(let i = 0; i < total_data; i++){
        let offset = i * len
        if(i < train_length){
            category.training[i] = data.bytes.subarray(offset, offset + len)
            category.training[i].label = label
        }else {
            category.testing[i - train_length] = data.bytes.subarray(offset, offset + len)
            category.testing[i - train_length].label = label
        }
    }
}

function draw(){
    strokeWeight(8)
    stroke(0)
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }    
}