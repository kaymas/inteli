let data = []

let slope = 1
let intercept = 0

function setup(){
    createCanvas(600,600)
}

function draw(){
    background(51)
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
        linearRegression()
        drawLine()
    }
}

function linearRegression(){

    //calculate x and y means
    let xsum = 0
    let ysum = 0
    for(let i = 0; i < data.length; i++){
        let point = data[i]
        xsum += point.x
        ysum += point.y
    }
    xmean = xsum / data.length
    ymean = ysum / data.length

    //calculate the slope based on formula
    //sum((x - xmean)(y - ymean)) / sum((x - xmean)(x - xmean))
    let num = 0
    let den = 0
    for(let i = 0; i < data.length; i++){
        let point = data[i]
        num += (point.x - xmean) * (point.y - ymean)
        den += (point.x - xmean) * (point.x - xmean)
    }
    slope = num / den
    intercept = ymean - slope * xmean
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