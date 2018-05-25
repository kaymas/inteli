let data
let ratings
let movies

let resultE
let resultP
let dropdowns = []

let k = 5

function  preload() {
    data = loadJSON('movies.json')
}

function setup(){
    //setup
    noCanvas()
    ratings = data.ratings
    users = Object.getOwnPropertyNames(ratings)
    movies = data.movies
    
    //create a form
    for(let i = 0; i < movies.length; i++){
        let movie = movies[i]
        let div = createDiv(movie)
        div.style('padding','4px 0px');

        let dropMovie = createSelect('')
        dropMovie.title = movie
        dropMovie.style('margin','0px 10px');
        dropMovie.parent(div)
        dropdowns.push(dropMovie)
       
        dropMovie.option('not watched')
        for(let i = 1; i < 6; i++){
            dropMovie.option(i)
        }
    }
    
    //initialize stuff
    createP('Select a Users/Critics')
    let simButton = createButton('Calculate Similarity')
    simButton.style('margin','4px 0px')
    simButton.style('padding','4px')
    resultE = createP("")
    resultP = createP("")

    //button mechanics
    simButton.mousePressed(() => {
        
        let user = {}  
        for(let i = 0; i < dropdowns.length; i++){
            let title = dropdowns[i].title
            let value = dropdowns[i].value()
            user[title] = Number(value)
            if(isNaN(user[title])) user[title] = null
        }

        //put it in data
        ratings['user'] = user;

        console.log(user);
        
        let rec = getRecommendations('user', euclidean) 
        console.log(rec);
                  
        for(let i = 0; i < rec['movieList'].length; i++){
            let movie = rec['movieList'][i] 
            let rating = rec['ratings'][movie].ranking
            let para = createP(`${movie} : ${nf(rating,1,1)}`)
            para.parent(resultE)
        }
    })
}

euclidean = function(ratings1,ratings2){

    let sum = 0

    let n = 0 //count number of movies looked at

    for(let i = 0; i < movies.length; i++){
        let movie = movies[i]
        let r1 = ratings1[movie]
        let r2 = ratings2[movie]
        if(r1 != null && r2 != null){
            let diff = r1 - r2
            sum += (diff * diff)
            n++
        }
    }

    //if no ratings
    if(n == 0) return 0

    let d = sqrt(sum)
    let simlilarity = 1 / (1 + d) 
    //inverted bcz we want similar objects to have larger values
    //added one to avoid dividing by zero => hence we get a similarity between 1 and 0
    return simlilarity    
}

pearson = function(ratings1, ratings2){
    
    //sum of ratings
    let sum1 = 0
    let sum2 = 0

    //sum of ratings squared
    let sum1sq = 0
    let sum2sq = 0

    //sum of rating1 * rating2
    let pSum = 0

    let n = 0 //count number of movies looked at

    for(let i = 0; i < movies.length; i++){
        let movie = movies[i]
        let r1 = ratings1[movie]
        let r2 = ratings2[movie]
        if(r1 != null && r2 != null){
            sum1 += r1
            sum2 += r2
            sum1sq += (r1 * r1) 
            sum2sq += (r2 * r2)
            pSum += (r1 * r2)
            n++ 
        }
    }

    //if no ratings
    if(n == 0) return 0

    // Pearson Correlation Coefficient formula
    let num = pSum - (sum1 * sum2 / n);
    let den = sqrt((sum1sq - sum1 * sum1 / n) * (sum2sq - sum2 * sum2 / n));
    if (den == 0) {
        return 0;
    }
    return num / den;

}

getRecommendations = function(user, simMeasure){
    
    let recommendations = {}

    for(let i = 0; i < users.length; i++){
        let other = users[i]        

        if(other != user){
            
            let similarity = simMeasure(ratings[user],ratings[other])                                    
            if(similarity <= 0) continue
                        
            let otherMovies = Object.keys(ratings[other]) // get movie names rated by other
            
            for(let j = 0; j < otherMovies.length; j++){
                let otherMovie = otherMovies[j]                                

                if(!ratings[user][otherMovie]){ //if I haven't rated this movie
                   
                    if(recommendations[otherMovie] == undefined){ // if I haven't seen this movie with someone else
                        recommendations[otherMovie] = { //initialize it then
                            total : 0,  //sum of ratings weighted by similarity
                            simSum : 0, //similarity sum
                            ranking : 0
                        }
                    }
                    recommendations[otherMovie].total += ratings[other][otherMovie]  * similarity
                    recommendations[otherMovie].simSum += similarity
                }
            }
        }
    }

    //Calculate the estimated star rating for each movie
    let tempMovies = Object.keys(recommendations)
    for(let i = 0; i < tempMovies.length; i++){
        let movie = tempMovies[i]             
        recommendations[movie].ranking = recommendations[movie].total / recommendations[movie].simSum
    }

    //Sort movies by ranking
    tempMovies.sort((a,b) => {
        return recommendations[b].ranking - recommendations[a].ranking
    })        

    return {
        movieList : tempMovies,
        ratings : recommendations
    }
    
}