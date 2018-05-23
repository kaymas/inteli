let vehicles = []
let food = []
let poison = []

function setup(){
    createCanvas(600,400)
    for(var i = 0; i < 10; i++){
        vehicles[i] = new Vehicle(random(width), random(height))
    }
    for(let i = 0; i < 40; i++){
        food.push(createVector(random(width), random(height)))
    }
    for(let i = 0; i < 20; i++){
        poison.push(createVector(random(width), random(height)))
    }
}

function draw(){
    background(51)
    // frameRate(30)

    //add extra food
    if(random(1) < 0.1){
        food.push(createVector(random(width), random(height)))
    }
    //add extra poison
    if(random(1) < 0.01){
        poison.push(createVector(random(width), random(height)))
    }
    //exit draw loop
    if(vehicles.length == 0){
        noLoop()
    }

    food.forEach(element => {
        fill(0,255,0)
        noStroke()
        ellipse(element.x, element.y, 4,4)
    })
    poison.forEach(element => {
        fill(255,0,0)
        noStroke()
        ellipse(element.x, element.y, 4,4)
    })

    for(let i = vehicles.length - 1; i >= 0; i--){
        vehicles[i].boundaries()
        vehicles[i].behaviours(food,poison)
        vehicles[i].update()
        vehicles[i].display()
    
        let newVehicle = vehicles[i].clone()
        if(newVehicle != null) vehicles.push(newVehicle)

        if(vehicles[i].isDead()){
            food.push(createVector(vehicles[i].position.x, vehicles[i].position.y))
            vehicles.splice(i,1)
        }
    }
}