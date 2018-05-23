class Vehicle {

    constructor(x,y){
        this.acceleration = createVector(0,0)
        this.velocity = createVector(0,-2)
        this.position = createVector(x,y)
        this.r = 4
        this.maxspeed = 4
        this.maxforce = 0.4
        this.dna = []
        this.dna[0] = random(-5,5)
        this.dna[1] = random(-5,5)
        this.health = 1
    }

    //update position
    update(){
        this.health -= 0.009

        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxspeed)
        this.position.add(this.velocity)
        this.acceleration.mult(0) //reset acceleration to zero
    }

    applyForce(force){
        this.acceleration.add(force)
    }

    isDead(){
        return (this.health < 0) 
    }

    //calculate steers for food and poison and then apply them based on dna info(weighted)
    behaviours(good,bad){
        let steerG = this.eat(good, 0.1)
        let steerB = this.eat(bad, -0.5)
    
        steerG.mult(this.dna[0])
        steerB.mult(this.dna[1])

        this.applyForce(steerG)
        this.applyForce(steerB)
    }

    //calculate steering force (desired - current) towards a target
    seek(target){
        
        let desired = p5.Vector.sub(target, this.position) //vector from location to target
        desired.setMag(this.maxspeed)
        
        let steer = p5.Vector.sub(desired, this.velocity)
        steer.limit(this.maxforce)

        // this.applyForce(steer)
        return steer
    }

    eat(food, nutrition){
        //calculate closest food 
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
            this.health += nutrition 
        }else if(closest != null){
            return this.seek(closest)
        }

        return createVector(0,0)
    }

    display(){
        let theta = this.velocity.heading() + PI / 2
        push()
        translate(this.position.x, this.position.y)
        rotate(theta)

        // stroke(0,255,0)
        // line(0,0,0,-this.dna[0]*10)
        // stroke(255,0,0)
        // line(0,0,0,-this.dna[1]*10)

        let green = color(0,255,0)
        let red = color(255,0,0)
        let col = lerpColor(red,green,this.health)

        fill(col)
        stroke(col)
        strokeWeight(1)
        beginShape()
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
}