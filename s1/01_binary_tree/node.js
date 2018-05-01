function Node(val,x,y){
    this.value = val    
    this.left = null
    this.right = null
    this.x = x
    this.y = y
    this.distance = 2 //how far apart nodes are on a children level
}

Node.prototype.addNode = function(n){
    if(n.value < this.value){
        if(this.left == null){
           this.left = n
           //position of left node respect to parent
           this.left.x = this.x - (width / pow(2,n.distance))
           this.left.y = this.y + (height / 12)
        }else{
            n.distance++
            this.left.addNode(n)
        }
    }else if(n.value > this.value){
        if(this.right == null){
            this.right = n
            //position of right node respect to parent
            this.right.x = this.x + (width / pow(2,n.distance))
            this.right.y = this.y + (height / 10)
        }else{
            n.distance++
            this.right.addNode(n)
        }
    }
}

Node.prototype.visit = function(parent){
    //go left
    if(this.left != null){
        this.left.visit(this)
    }

    //display node circle and line from parent
    fill(255)
    noStroke()
    ellipse(this.x,this.y,30,30)
    stroke(255)
    line(parent.x,parent.y,this.x,this.y)
    noStroke()

    //display node value
    fill(51)
    textAlign(CENTER)
    text(this.value,this.x,this.y)

    console.log(this.value)

    //go right
    if(this.right != null){
        this.right.visit(this)
    }
}


Node.prototype.search = function(val) {
    if (this.value == val) {
        return this
    } else if (val < this.value && this.left != null) {
        return this.left.search(val)
    } else if (val > this.value && this.right != null) {
        return this.right.search(val)
    }
    return null
}