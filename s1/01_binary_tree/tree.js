function Tree(){
    this.root = null
}


Tree.prototype.addValue = function(val){
    let node = new Node(val)
    if(this.root == null){
        this.root = node
        //position of root node in canvas
        this.root.x = width / 2
        this.root.y = 16
    }else{
        this.root.addNode(node)
    }
}

Tree.prototype.traverse = function(){
    this.root.visit(this.root)
}

Tree.prototype.search = function(val){
    let found = this.root.search(val)
    return found
}