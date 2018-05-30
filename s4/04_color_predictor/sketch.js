let r,g,b
let nn

let answer = "black"

function pickColor(show = true){
    r = random(255)
    g = random(255)
    b = random(255)
    if(show) redraw()
}

function colorPredictor(r, g, b){
    let inputs = [r / 255, g / 255, b / 255]
    let outputs = nn.predict(inputs)
    console.log(outputs);
    if(outputs[0] > outputs[1]){
        return "black"
    }else{
        return "white"
    }
}

function setup(){
    createCanvas(600,400)
    noLoop()
    nn = new NeuralNetwork(3,3,2)

    //initial training
    for(let i = 0; i < 10000; i++){
        pickColor(show = false)
        let inputs = [r / 255, g / 255, b / 255]
        let target = (r + g + b > 300) ? [1,0] : [0,1] 
        nn.train(inputs, target)
    }
    createP("click on side of the window that you think corresponds to a more appropriate color")

    pickColor()
}

function mousePressed(){
    let inputs = [r / 255, g / 255, b / 255]
    let target
    if(mouseX > width / 2){
        target = [0,1]
    }else{
        target = [1,0]
    }
    nn.train(inputs, target)
    pickColor()
}

function draw(){
    background(r, g, b)

    strokeWeight(4)
    stroke(0)
    line(width / 2, 0, width / 2, height)

    textSize(64)
    textAlign(CENTER,CENTER)
    noStroke()
    fill(0)
    text("Black",150,200)
    fill(255)
    text("White",450,200)

    answer = colorPredictor(r,g,b)
    if(answer == 'black'){
        fill(0)
        ellipse(150,100,60)
    }else{
        fill(255)
        ellipse(450, 100, 60)
    }
}