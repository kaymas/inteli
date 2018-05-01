let tree

function setup(){
    createCanvas(800,600)
    background(51)
    tree = new Tree()
    for(var i = 0; i < floor(random(10,20)); i++){
        tree.addValue(floor(random(0,100)))
    }
    console.log(tree)
    tree.traverse()
}



