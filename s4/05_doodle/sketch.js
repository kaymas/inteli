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

function preload(){
    cats_data = loadBytes('cats.bin')
    trains_data = loadBytes('trains.bin')
}

function setup(){
    createCanvas(280,280)
    background(51)

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

    //testing
    console.log("initial testing without training");
    let test_result = test_all(testing)
    console.log("% correct: ", test_result);

    //iterative training
    for(let i = 0; i < 5; i++){
        //training 
        train_nn(training)
        console.log("trained");

        //testing
        let test_result = test_all(testing)
        console.log("% correct: ", test_result);
        
    }
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
}