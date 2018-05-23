let vehicles = []
let food = []
let poison = []

function setup(){
    createCanvas(600,400)
    for(var i = 0; i < 10; i++){
        vehicles[i] = new Vehicle(random(width), random(height))
    }
    for(let i = 0; i < 50; i++){
        food.push(createVector(random(width), random(height)))
    }
    for(let i = 0; i < 10; i++){
        poison.push(createVector(random(width), random(height)))
    }
}

function draw(){
    background(51)
    frameRate(30)

    //add extra food
    if(random(1) < 0.09){
        food.push(createVector(random(width), random(height)))
    }
    if(vehicles.length == 0){
        noLoop()
    }

    food.forEach(element => {
        fill(0,255,0)
        noStroke()
        ellipse(element.x, element.y, 8,8)
    })
    poison.forEach(element => {
        fill(255,0,0)
        noStroke()
        ellipse(element.x, element.y, 8,8)
    })

    for(let i = vehicles.length - 1; i >= 0; i--){
        vehicles[i].behaviours(food,poison)
        vehicles[i].update()
        vehicles[i].display()
    
        if(vehicles[i].isDead()){
            vehicles.splice(i,1)
        }
    }
}