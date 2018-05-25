let data
let ratings
let movies

let resultE
let resultP


function  preload() {
    data = loadJSON('movies.json')
}

function setup(){
    noCanvas()
    ratings = data.ratings
    users = Object.getOwnPropertyNames(ratings)
    movies = data.movies
    createP('Select 2 Users/Critics')
    let dropdown1 = createSelect() 
    let dropdown2 = createSelect() 
    let simButton = createButton('Calculate Similarity')
    resultE = createP("")
    resultP = createP("")

    users.forEach(user => {
        dropdown1.option(user)
        dropdown2.option(user)
    });
    simButton.mousePressed(() => {
        let ratings1 = ratings[dropdown1.value()]      
        let ratings2 = ratings[dropdown2.value()]      
        let simEuclidean = euclidean(ratings1,ratings2)   
        let simPearson = pearson(ratings1,ratings2)   
        resultE.html(`Euclidean Similarity : ${Number(simEuclidean).toFixed(3)}%`)
        resultP.html(`Pearson Correlation : ${Number(simPearson).toFixed(3)}%`)
    })
}

euclidean = function(ratings1,ratings2){

    let sum = 0

    movies.forEach(movie => {
        let r1 = ratings1[movie]
        let r2 = ratings2[movie]
        if(r1 != undefined && r2 != undefined){
            let diff = r1 - r2
            sum += (diff * diff)
        }
    })
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

    movies.forEach(movie => {
        let r1 = ratings1[movie]
        let r2 = ratings2[movie]
        if(r1 != undefined && r2 != undefined){
            sum1 += r1
            sum2 += r2
            sum1sq += (r1 * r1) 
            sum2sq += (r2 * r2)
            pSum += (r1 * r2)
            n++ 
        }
    })

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