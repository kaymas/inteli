class Vehicle {

    constructor(x,y){
        this.acceleration = createVector(0,0)
        this.velocity = createVector(0,-2)
        this.position = createVector(x,y)
        this.r = 6
        this.maxspeed = 4
        this.maxforce = 0.4
    }

    //update position
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxspeed)
        this.position.add(this.velocity)
        this.acceleration.mult(0) //reset acceleration to zero
    }

    applyForce(force){
        this.acceleration.add(force)
    }

    //calculate steering force (desired - current) towards a target
    seek(target){
        
        let desired = p5.Vector.sub(target, this.position) //vector from location to target
        desired.setMag(this.maxspeed)
        
        let steer = p5.Vector.sub(desired, this.velocity)
        steer.limit(this.maxforce)

        this.applyForce(steer)
    }

    eat(food){
        //calculate closest food distance
        let closestDist = Infinity
        let closest = null
        food.forEach(element => {
            let distance = this.position.dist(element)
            if(distance < closestDist) {
                closestDist = distance
                closest = element
            }
        });

        if(closestDist < 5){
            let index = food.indexOf(closest)
            food.splice(index, 1)
        }

        this.seek(closest)
    }

    display(){
        let theta = this.velocity.heading() + PI / 2
        fill(120)
        stroke(200)
        strokeWeight(1)
        push()
        translate(this.position.x, this.position.y)
        rotate(theta)
        beginShape()
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
}