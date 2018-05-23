let v
let food = []
let poison = []

function setup(){
    createCanvas(600,400)
    v = new Vehicle(width / 2, height / 2)
    for(let i = 0; i < 10; i++){
        food.push(createVector(random(width), random(height)))
    }
    for(let i = 0; i < 10; i++){
        poison.push(createVector(random(width), random(height)))
    }
}

function draw(){
    background(51)

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

    v.eat(food)
    v.update()
    v.display()
}