let rows = 25
let cols = 25
let grid = new Array(cols)
let openSet = []
let closedSet = []
let start
let end
let w,h
let path = []


function Spot(x,y){   
    this.x = x
    this.y = y
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbours = []
    this.previous = undefined
} 

Spot.prototype.show = function(color){
    fill(color)
    noStroke()
    rect(this.x * w,this.y * h, w - 1, h - 1)
}

Spot.prototype.addNeighbours = function(grid){
    var x = this.x
    var y = this.y
    if(x < cols - 1){
        this.neighbours.push(grid[x + 1][y])
    }
    if(x > 0){
        this.neighbours.push(grid[x - 1][y])
    }
    if(y < rows - 1){
        this.neighbours.push(grid[x][y + 1])
    }
    if(y > 0){
        this.neighbours.push(grid[x][y - 1])
    }
}


function removeFromArray(arr, ele){
    for(var i = arr.length - 1; i >= 0; i--){
        if(arr[i] == ele){
            arr.splice(i, 1)
        }
    }
}

function heuristic(a,b){
    return abs(a.x - b.x) + abs(a.y - b.y)
    // return dist(a.x,a.y,b.x,b.y)
}

function setup(){
    createCanvas(600,600)
    background(51)

    w = width / cols
    h = width / rows

    for(var i = 0; i < cols; i++){
        grid[i] = new Array(rows)
    }
    
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new Spot(i,j)
        }
    }

    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].addNeighbours(grid)
        }
    }

    start = grid[floor(cols / 2)][floor(rows / 2)]
    end = grid[cols - 1][rows - 1]
    openSet.push(start)
}

function draw(){

    let current

    if(openSet.length > 0){

        //caclulate the current as node in openSet with lowest f value
        current = openSet[0]
        for(var i = 1; i < openSet.length; i++){
            if(openSet[i].f < current.f){
                current = openSet[i]
            }
        }

        if(current == end){
            console.log("Done");
            noLoop()
        }

        removeFromArray(openSet,current)
        closedSet.push(current)

        let neighbours = current.neighbours
        for(var i = 0; i < neighbours.length; i++){
            
            let neighbour = neighbours[i]

            // if(closedSet.includes(neighbour)){
            //     continue
            // }

            // let tempG = current.g + 1

            // if(!openSet.includes(neighbour)){ //this is a new node
            //     openSet.push(neighbour)
            // }else if(tempG >= neighbour.g){
            //     continue //this is not a better path, continue
            // }

            // neighbour.g = tempG
            // neighbour.h = heuristic(neighbour, end)
            // neighbour.f = neighbour.g + neighbour.h
            // neighbour.previous = current

            if(!closedSet.includes(neighbour)){
                
                let tempG = current.g + 1

                if(openSet.includes(neighbour)){
                    if(tempG < neighbour.g){
                        neighbour.g = tempG
                    }
                }else{
                    neighbour.g = tempG
                    openSet.push(neighbour)
                }

                neighbour.h = heuristic(neighbour, end)
                neighbour.f = neighbour.g + neighbour.h
                neighbour.previous = current
            }

        }
    
    }else{
        //no solution
    }

    background(51)

    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show(color(255))
        }
    }

    for(var i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255,0,0))
    }

    for(var i = 0; i < openSet.length; i++){
        openSet[i].show(color(0,255,0))
    }

    //find path
    path = []
    let temp = current //at end of loop current will be end
    path.push(temp)
    while(temp.previous){
        path.push(temp.previous)
        temp = temp.previous
    }
    
    for(var i = 0; i < path.length; i++){
        path[i].show(color(0,0,255))
    }
}