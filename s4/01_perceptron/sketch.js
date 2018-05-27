let perceptron
let training = new Array(200)

//coordinate space
let xmin = -1
let ymin = -1
let xmax = 1
let ymax = 1

let count = 0 //will train perceptron with one point input at a time

function f(x) {
    let y = 0.5 * x  + 0.3 //line equation
    return y
}

function setup(){
    createCanvas(600,600)

    //perceptron has 3 inputs : x,y,bias
    perceptron = new Perceptron(3, 0.01)

    for(let i = 0; i < training.length; i++){
        let x = random(xmin,xmax)
        let y = random(ymin,ymax)
        let answer = 1
        if(y < f(x)) answer = -1 //below line f(x) then assign -1 as class label
        training[i] = {
            input : [x,y,1], //bias is one for the special case of origin(since weights dont matter when multipled by 0,0)
            label: answer
        }
    }
    
}

function draw(){
    background(51)

    //line on main diagonal
    stroke(255)
    strokeWeight(3)
    let x1 = map(xmin, xmin, xmax, 0, width)
    let y1 = map(f(xmin), ymin, ymax, height, 0)
    let x2 = map(xmax, xmin, xmax, 0, width)
    let y2 = map(f(xmax), ymin, ymax, height, 0)
    line(x1,y1,x2,y2)

    //draw line based on current weights using formula
    //weight[0] * x + weight[1] * y + weight[2] = 0 (ax + by + c = 0)
    stroke(0,255,0,100)
    strokeWeight(3)

    let weights = perceptron.getWeights()
    x1 = xmin
    y1 = (-weights[2] - weights[0] * x1) / weights[1]
    x2 = xmax
    y2 = (-weights[2] - weights[0] * x2) / weights[1]

    x1 = map(x1, xmin, xmax, 0, width)
    y1 = map(y1, ymin, ymax, height, 0)
    x2 = map(x2, xmin, xmax, 0, width)
    y2 = map(y2, ymin, ymax, height, 0)
    line(x1, y1, x2, y2)

    //train the perceptron
    perceptron.train(training[count].input, training[count].label)
    count = (count + 1) % training.length

    for(let i = 0; i < training.length; i++){
    
        stroke(255)
        strokeWeight(1)
        fill(255,0,0,100)

        let guess = perceptron.feedforward(training[i].input)
        if(guess > 0) fill(0,255,0,100) //if class label 1 then fill green

        let x = map(training[i].input[0], xmin, xmax, 0, width)
        let y = map(training[i].input[1], ymin, ymax, height, 0)
        ellipse(x, y, 8, 8)
    }

}