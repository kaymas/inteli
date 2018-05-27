let data
let training

let slope = 0
let intercept = 0

var learning_rate = 0.0001;

let index = 0
let iterations = 0
let totalIterations = 10

//initial values are these but are calculated in setup
let minX = Infinity
let minY = Infinity
let maxX = 0
let maxY = 0

function preload(){
    data = loadJSON('cricket.json')
}

function setup(){
    createCanvas(600,600)

    training = data.samples
    
    //calculate min and max to map in pixel space
    for(let i = 0; i < training.length; i++){
        let x = training[i].chirps
        let y = training[i].temp
        minX = min(x,minX)
        minY = min(y,minY)
        maxX = max(x,maxX)
        maxY = max(y,maxY)
    }    
}

function draw(){
    background(51)

    let cumulativeError = calculateError()

    drawPoints()
    drawLine()

    let x = training[index].chirps
    let y = training[index].temp

    let guess = slope * x + intercept
    let error = y - guess    

    let deltaSlope = x * error * learning_rate
    let deltaIntercept = error * learning_rate
    slope += deltaSlope
    intercept += deltaIntercept

    index++
    if(index == training.length){
        index = 0
        iterations++
        if(iterations == totalIterations) noLoop()
    }
}

function calculateError(){
    let sum = 0
    for(let i = 0; i < training.length; i++){
        let x = training[i].chirps
        let y = training[i].temp
        let guess = slope * x + intercept
        let error = guess - y
        sum += error * error
    }
    let avg = sum / training.length
    return avg
}

function drawLine(){    
    let x1 = minX
    let y1 = slope * x1 + intercept
    let x2 = maxX
    let y2 = slope * x2 + intercept

    //mapping to pixel coordinates
    x1 = map(x1, minX, maxX, 0, width);
    x2 = map(x2, minX, maxX, 0, width);
    y1 = map(y1, minY, maxY, height, 0);
    y2 = map(y2, minY, maxY, height, 0);

    stroke(255,0,255,100)
    strokeWeight(4)
    line(x1,y1,x2,y2)
}

function drawPoints(){
    stroke(0)
    fill(0)      
    for(let i = 0; i < training.length; i++){
        //mapping to pixel space
        let x = map(training[i].chirps, minX, maxX, 0, width)
        let y = map(training[i].temp, minY, maxY, height, 0)
        ellipse(x,y,4,4)
    }
}