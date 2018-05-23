let mr = 0.01 //mutation rate

class Vehicle {

    constructor(x,y,dna){
        this.acceleration = createVector(0,0)
        this.velocity = createVector(0,-2)
        this.position = createVector(x,y)
        this.r = 4
        this.maxspeed = 3
        this.maxforce = 0.5
        this.dna = []
        if(dna === undefined){
            this.dna[0] = random(-3,3) //food weight
            this.dna[1] = random(-3,3) //poison weight
            this.dna[2] = random(5,100) //food perception
            this.dna[3] = random(5,100) //poison perception
            //perception is just how close(radius) a vehicle can see food(dont want to be affected by far away items)
        }else{
            //mutation
            this.dna[0] = dna[0]
            if(random(1) < mr){
                this.dna[0] += random(-0.2,0.2)
            }
            this.dna[1] = dna[1]
            if(random(1) < mr){
                this.dna[1] += random(-0.2,0.2)
            }
            this.dna[2] = dna[2]
            if(random(1) < mr){
                this.dna[2] += random(-10,10)
            }
            this.dna[3] = dna[3]
            if(random(1) < mr){
                this.dna[3] += random(-10,10)
            }
        }
        this.health = 1
    }

    //update position
    update(){
        this.health -= 0.002 //slowly die

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
        let steerG = this.eat(good, 0.3, this.dna[2])
        let steerB = this.eat(bad, -0.75, this.dna[3])
    
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

    clone(){
        if(random(1) < 0.001){ //the longer a vehicle lives more chance we get a number less than 0.01
            return new Vehicle(this.position.x, this.position.y, this.dna)
        }else{
            return null
        }
    }

    eat(food, nutrition, perception){
        //calculate closest food 
        let closestDist = Infinity
        let closest = null
        for(let i = food.length - 1; i >= 0; i--){
            let distance = this.position.dist(food[i])
            if(distance < this.maxspeed){     
                food.splice(i, 1)
                this.health += nutrition 
            }else{
                if(distance < closestDist && distance < perception) {
                    closestDist = distance
                    closest = food[i]
                }
            }
        }

        if(closest != null){
            return this.seek(closest)
        }

        return createVector(0,0)
    }

    boundaries() {

        let desired = null
        let d = 10 // distance from edge at which we want to return to center of canvas

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y)
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y)
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed)
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxspeed)
        }

        if (desired !== null) {
            desired.normalize()
            desired.mult(this.maxspeed)
            let steer = p5.Vector.sub(desired, this.velocity)
            steer.limit(this.maxforce)
            this.applyForce(steer)
        }
    }

    display(){
        let angle = this.velocity.heading() + PI / 2
        push()
        translate(this.position.x, this.position.y)
        rotate(angle)

        // noFill()
    
        // stroke(0,255,0)
        // ellipse(0,0,this.dna[2]*2)
        // strokeWeight(3)
        // line(0,0,0,-this.dna[0]*20)
        // strokeWeight(1)

        // stroke(255,0,0)
        // ellipse(0,0,this.dna[3]*2)
        // line(0,0,0,-this.dna[1]*20)
        

        let green = color(0,255,0)
        let red = color(255,0,0)
        let col = lerpColor(red,green,this.health) //linear interpolation of color between red(0) and green(1)

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