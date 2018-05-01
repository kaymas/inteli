let data
let graph

//these are p5 methods
function preload(){
    data = loadJSON('bacon.json')
}

function setup(){
    noCanvas()

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
            }
            graph.addNode(actorNode)     
            movieNode.addEdge(actorNode)       
        }
    }
    console.log(graph)
}