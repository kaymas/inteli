let data
let graph
let dropdown

//these are p5 methods
function preload(){
    data = loadJSON('bacon.json')
}

function setup(){
    noCanvas()
    dropdown = createSelect()
    dropdown.changed(bfs)
    //graph contains both actors and movies as nodes from bacon.json
    graph = new Graph()

    //munging data
    let movies = data.movies

    for(var i = 0; i < movies.length; i++){
        let movie = movies[i].title
        let cast = movies[i].cast
        let movieNode = new Node(movie)
        graph.addNode(movieNode)

        for(var j = 0; j < cast.length; j++){
            let actor = cast[j]
            let actorNode = graph.getNode(actor)
            if(actorNode == undefined){
                actorNode = new Node(actor)
                graph.addNode(actorNode)   
                dropdown.option(actor)  
            }
            movieNode.addEdge(actorNode)       
        }
    }

    console.log(graph)

}

function bfs(){
    graph.reset()

    let start = graph.setStart(dropdown.value())
    let end = graph.setEnd("Kevin Bacon")

    let queue = []
    
    start.searched = true
    queue.push(start)

    while(queue.length > 0){
        let current = queue.shift() //removes first element from queue and returns it.
        if(current == end){
            console.log("found " + current.value);
            break
        }
        let edges = current.edges
        for(var i = 0; i < edges.length; i++){
            let neighbour = edges[i]
            if(!neighbour.searched){
                neighbour.searched = true
                neighbour.parent = current
                queue.push(neighbour)
            }
        }
    }

    //Creating the path from end to start
    let path = []
    
    path.push(end)
    let next = end.parent
    while(next != null){
        path.push(next)
        next = next.parent
    }
    console.log(path);
    
    //Displaying the path from start to end
    let txt = ''
    for(var i = path.length - 1; i > 0; i--){
        let node = path[i]
        txt += node.value + ' --> '
    }
    txt += end.value
    createP(txt)

}