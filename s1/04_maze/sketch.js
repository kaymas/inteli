var cols,rows
var w = 20
var grid = []
var current
var stack = []

function setup(){
    createCanvas(400,400)
    background(51)
    cols = floor(width / w)
    rows = floor(height / w)

    for(var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            var cell = new Cell(i,j)
            grid.push(cell)
        }
    }
    current = grid[0]
}

function draw(){
    background(51)

    for(var i = 0; i < grid.length; i++){
        grid[i].show()
    }

    console.log(current)
    current.visited = true
    current.highlight()
    var next = current.checkNeighbours()
    if(next){
        next.visited = true
        stack.push(current)
        removeWalls(current,next)
        current = next
    }else if(stack.length > 0){
        current = stack.pop()
    }else{
        noLoop()
    }
}

Cell = function(i,j){
    this.i = i
    this.j = j
    this.walls = [true,true,true,true] //[top,right,bottom,left]
    this.visited = false
}

Cell.prototype.highlight = function(){
    var x = this.i * w
    var y = this.j * w
    noStroke()
    fill(200,100,250,255)
    rect(x,y,w,w)
}

Cell.prototype.show = function(){
    var x = this.i * w
    var y = this.j * w
    stroke(255)
    if(this.walls[0]){
        line(x,y,x+w,y) //top edge
    }
    if(this.walls[1]){
        line(x+w,y,x+w,y+w) //right edge
    }
    if(this.walls[2]){
        line(x+w,y+w,x,y+w) //bottom edge
    }
    if(this.walls[3]){
        line(x,y+w,x,y) //left edge
    }
    

    if(this.visited){
        noStroke()
        fill(255,0,255,100)
        rect(x,y,w,w)
    }
}

var index = function(i,j){

    if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
        return -1
    }
    return i + j * cols
}

Cell.prototype.checkNeighbours = function(){
    var neighbours = []
    var top = grid[index(this.i, this.j - 1)]
    var right = grid[index(this.i + 1, this.j)]
    var bottom = grid[index(this.i, this.j + 1)]
    var left = grid[index(this.i - 1, this.j)]

    if(top && !top.visited) neighbours.push(top)
    if(right && !right.visited) neighbours.push(right)
    if(bottom && !bottom.visited) neighbours.push(bottom)
    if(left && !left.visited) neighbours.push(left)

    if(neighbours.length > 0){
        var r = floor(random(0,neighbours.length))
        return neighbours[r]
    }else return undefined
}


removeWalls = function(a,b){
    
    var x = a.i - b.i
    if(x == 1){
        //remove left wall of a and right wall of b
        a.walls[3] = false
        b.walls[1] = false
    }else if(x == -1){
        //remove right wall of a and left wall of b
        a.walls[1] = false
        b.walls[3] = false
    }

    var y = a.j - b.j
    if(y == 1){
        //remove top wall of a and bottom wall of b
        a.walls[0] = false
        b.walls[2] = false
    }else if(y == -1){
        //remove bottom wall of a and top wall of b
        a.walls[2] = false
        b.walls[0] = false
    }

}