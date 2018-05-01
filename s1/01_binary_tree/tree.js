function Tree(){
    this.root = null
}


Tree.prototype.addValue = function(val){
    let node = new Node(val)
    if(this.root == null){
        this.root = node
    }else{
        this.root.addNode(node)
    }
}

Tree.prototype.traverse = function(){
    this.root.visit()
}

Tree.prototype.search = function(val){
    let found = this.root.search(val)
    return found
}