function calcFitness(){ 
    let currentRecord = Infinity   
    for(let i = 0; i < population.length; i++){        
        let d = calcDistance(cities,population[i])
        if(d < recordDistance){
            recordDistance = d
            bestPath = population[i]
        }
        if(d < currentRecord){
            currentRecord = d
            currentPath = population[i]
        }
        fitness[i] = 1 / (d + 1)
    }        
    console.log(recordDistance);
    recordDistP.html(`Total Distance = ${recordDistance}`)
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
        let orderA = selectOne(population, fitness)
        let orderB = selectOne(population, fitness)
        let order = crossOver(orderA, orderB)
        mutate(order,0.03)
        newPopulation.push(order)
    })
    population = newPopulation
}

function mutate(order, mutationRate = 0.1){
    for(let i = 0; i < totalCities; i++){
       if(random(1) < mutationRate){
            let indexA = floor(random(order.length))
            let indexB = (indexA + 1) % totalCities
            swap(order,indexA,indexB)
       } 
    }
}

function crossOver(orderA, orderB){
    let start = floor(random(orderA.length))
    let end = floor(random(start + 1, orderA.length))
    let newOrder = orderA.slice(start, end)

    for(let i = 0; i < orderB.length; i++){
        let city = orderB[i]
        if(!newOrder.includes(city)){
            newOrder.push(city)
        }
    }
    return newOrder
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