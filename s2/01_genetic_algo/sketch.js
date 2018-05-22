// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat


let target
let popmax //population max
let population
let mutationRate

let bestPhrase
let allPhrases
let stats


function setup(){
    bestPhrase = createP("Best Phrase: ")
    allPhrases = createP("All Phrases: ")
    allPhrases.position(600,10)
    stats = createP("Stats")

    target = "Hey there, I am Kaymas."
    popmax = 500
    mutationRate = 0.01 // 1%

    population = new Population(target, mutationRate, popmax)
}

function draw(){
    
    population.naturalSelection() //generate mating pool
    population.generate() //generate next generation
    population.calcFitness()

    population.evaluate()

    if(population.isFinished()){
        noLoop()
    }

    displayInfo()
}

function displayInfo(){
    
    let answer = population.getBest()
    bestPhrase.html("Best phrase:<br>" + answer)

    let statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:      " + popmax + "<br>";
    statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";
    stats.html(statstext);

    allPhrases.html("All phrases:<br>" + population.allPhrases())
}

