let cities = []
let totalCities = 6
let recordDistance
let bestPath

let order = []
let totalPermutations
let count = 0

function setup(){
    createCanvas(500,700)
    background(51)

    for(var i = 0; i < totalCities; i++){
        var v = createVector(random(width),random(height/2))
        cities[i] = v
        order[i] = i
    }

    recordDistance = calcDistance(cities,order)  
    bestPath = order.slice()

    totalPermutations = factorial(totalCities)
    console.log(totalPermutations);
    
}

function draw(){
    background(51)
    fill(255)
    cities.forEach(city => ellipse(city.x, city.y, 10, 10))

    textSize(18)
    fill(255)
    let percent = 100 * (count / totalPermutations)
    text(nf(percent,0,2) + " completed",width / 2 + 100,height - 30)


    stroke(255,0,255,100)
    strokeWeight(5)
    noFill()
    beginShape()
    bestPath.forEach(cityId => vertex(cities[cityId].x, cities[cityId].y))
    endShape() 

    translate(0,height/2)
    stroke(255,255,255,100)
    strokeWeight(1)
    noFill()
    beginShape()
    order.forEach(cityId => vertex(cities[cityId].x, cities[cityId].y))
    endShape()  

    // order = shuffleArray(order)
    let d = calcDistance(cities,order)  
    if(d < recordDistance){
        recordDistance = d
        bestPath = order.slice()
        console.log(recordDistance);
    }

    
    nextOrder()
}

let swap = function(a,i,j){
    let temp = a[i]
    a[i] = a[j]
    a[j] = temp
}

let factorial = function(n){
    if(n == 1) return 1
    return n * factorial(n - 1)
}

let shuffleArray = function(arr){
    let shuffled = arr.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return shuffled
}

let calcDistance = function(points,order){
    let sum = 0
    for(var i = 0; i < order.length - 1; i++){
        let cityA = points[order[i]]
        let cityB = points[order[i+1]]
        let d = dist(cityA.x, cityA.y, cityB.x, cityB.y)
        sum += d
    }
    return sum
}

//lexical order permutation algo

let nextOrder = function(){

    let largestX = -1
    for(var i = 0; i < order.length - 1; i++){
        if(order[i] < order[i + 1]) largestX = i
    }
    if(largestX == -1){
        console.log('finished')
        noLoop()
    }

    let largestY = -1
    for(var i = 0; i < order.length; i++){
        if(order[largestX] < order[i]) largestY = i
    }

    swap(order,largestX,largestY)

    let endArr = order.splice(largestX + 1)
    endArr.reverse()
    order = order.concat(endArr)

    count++
}