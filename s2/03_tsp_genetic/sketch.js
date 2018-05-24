let cities = []
let totalCities = 8
let recordDistance = Infinity
let bestPath

let popSize = 300
let population = []
let fitness = []

function setup(){
    createCanvas(500,700)
    background(51)

    let order = [] // 0:(totalCities - 1)

    for(let i = 0; i < totalCities; i++){
        let v = createVector(random(25,width-25),random(25, height - 25))
        cities[i] = v
        order[i] = i
    }

    for(let i = 0; i < popSize; i++){
        population[i] = shuffleArray(order.slice()) //random population order
    }    
}

function draw(){
    background(51)

    //genetic algo
    calcFitness()
    normFitness()
    nextGeneration()

    fill(255)
    cities.forEach(city => ellipse(city.x, city.y, 10, 10))

    stroke(255,0,255,100)
    strokeWeight(5)
    noFill()
    beginShape()
    bestPath.forEach(cityId => vertex(cities[cityId].x, cities[cityId].y))
    endShape() 
}

let shuffleArray = function(arr){
    let shuffled = arr.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return shuffled
}

let calcDistance = function(points,order){    
    let sum = 0
    for(let i = 0; i < order.length - 1; i++){
        let cityA = points[order[i]]
        let cityB = points[order[i+1]]
        let d = dist(cityA.x, cityA.y, cityB.x, cityB.y)
        sum += d
    }
    return sum
}