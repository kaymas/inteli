function calcFitness(){    
    for(let i = 0; i < population.length; i++){        
        let d = calcDistance(cities,population[i])
        if(d < recordDistance){
            recordDistance = d
            bestPath = population[i]
        }
        fitness[i] = 1 / (d + 1)
    }        
    console.log(recordDistance);
}

function normFitness(){
    let sum = 0
    for(let i = 0; i < fitness.length; i++){
        sum += fitness[i]
    }
    for(let i = 0; i < fitness.length; i++){
        fitness[i] = fitness[i] / sum
    }
}

function nextGeneration(){
    let newPopulation = []
    population.forEach(element => {
        let order = selectOne(population, fitness)
        mutate(order)
        newPopulation.push(order)
    })
    population = newPopulation
}

function mutate(order, mutationRate){
    let indexA = floor(random(order.length))
    let indexB = floor(random(order.length))
    swap(order,indexA,indexB)
}

function selectOne(list, prob){ 
    let index = 0
    let r = random(1)
    
    while(r > 0){
        r -= prob[index]
        index++
    }    
    index--
    return list[index].slice()
}

function swap(list,indexA,indexB){
    let temp = list[indexA]
    list[indexA] = list[indexB]
    list[indexB] = temp
}