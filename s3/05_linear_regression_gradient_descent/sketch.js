let data = []

let slope = 0
let intercept = 0

function setup(){
    createCanvas(600,600)
}

function draw(){
    background(51)
    frameRate(10)
    for(let i = 0; i < data.length; i++){
        let point = data[i]
        //mapping to pixel coordinates
        let x = map(point.x, 0, 1, 0, width)
        let y = map(point.y, 0, 1, height, 0)
        fill(255)
        stroke(255)
        ellipse(x,y,4,4)
    }
    if(data.length > 1){
        drawLine()
        gradientDescent()
    }
}

function gradientDescent(){

    let learning_rate = 0.05
    
    for(let i = 0; i < data.length; i++){
       
        let x = data[i].x
        let y = data[i].y

        let guess = slope * x + intercept
        let error = y - guess

        //doing some calculus gave us this new slope and intercept
        //calculus used to calculate the slope of the cost function
        //slope gives us which direction to change the slope in 
        //and by how much we should shift the intercept by
        // del(cost) / del(slope) = what to change in slope
        // del(cost) / del(intercept) = what to change in intercept
    
        slope += (error * x) * learning_rate
        intercept += error * learning_rate

        console.log(slope, intercept);
        
    }
}

function mousePressed(){
    let x = map(mouseX, 0, width, 0, 1)
    let y = map(mouseY, 0, height, 1, 0) // we want the bottom left of canvas to be origin
    let point = createVector(x,y)
    data.push(point)
}

function drawLine(){
    let xmin = 0
    let ymin = slope * xmin + intercept
    let xmax = 1
    let ymax = slope * xmax + intercept

    //mapping to pixel coordinates
    xmin = map(xmin, 0, 1, 0, width)
    xmax = map(xmax, 0, 1, 0, width)
    ymin = map(ymin, 0, 1, height, 0)
    ymax = map(ymax, 0, 1, height, 0)

    stroke(255,0,255,100)
    strokeWeight(4)
    line(xmin,ymin,xmax,ymax)
}