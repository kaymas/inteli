let cities = []
let totalCities = 5
let recordDistance
let bestPath


function setup(){
    createCanvas(400,400)
    background(51)

    for(var i = 0; i < totalCities; i++){
        var v = createVector(random(width),random(height))
        cities[i] = v
    }

    recordDistance = calcDistance(cities)  
    bestPath = cities.slice()

}

function draw(){
    background(51)
    fill(255)
    cities.forEach(city => ellipse(city.x, city.y, 10, 10))

    stroke(255)
    strokeWeight(1)
    noFill()
    beginShape()
    cities.forEach(city => vertex(city.x, city.y))
    endShape()  

    stroke(255,0,255,100)
    strokeWeight(3)
    noFill()
    beginShape()
    bestPath.forEach(city => vertex(city.x, city.y))
    endShape() 

    // swap(cities, floor(random(cities.length)), floor(random(cities.length)))
    cities = shuffleArray(cities)
    let d = calcDistance(cities)  
    if(d < recordDistance){
        recordDistance = d
        bestPath = cities.slice()
        console.log(recordDistance);
    }
}

let swap = function(a,i,j){
    let temp = a[i]
    a[i] = a[j]
    a[j] = temp
}

let shuffleArray = function(arr){
    let shuffled = arr.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return shuffled
}

let calcDistance = function(points){
    let sum = 0
    for(var i = 0; i < points.length - 1; i++){
        let d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y)
        sum += d
    }
    return sum
}