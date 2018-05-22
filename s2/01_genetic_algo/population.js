class Population {
   
    constructor(p,m,num){ //target-phrase,mutation,max-population
        this.population = []
        this.matingPool = []
        this.generations = 0
        this.finished = false //finished evolving
        this.target = p
        this.mutationRate = m
        this.perfectScore = 1

        this.best = ""

        for(let i = 0; i < num; i++){
            this.population[i] = new DNA(this.target.length)
        }
        this.calcFitness()
    }   
    
    //calculate the fitness of each DNA in the population
    calcFitness(){
        this.population.forEach(element => element.calcFitness(target))
    }

    //generate mating pool
    naturalSelection(){
        this.matingPool = []
        
        let maxFitness = 0
        this.population.forEach(element => {
            if(element.fitness > maxFitness) maxFitness = element.fitness
        })

        //add elements of the population to the mating pool based on their fitness. 
        //higher fitness = more entries in mating pool = more likely to be picked as a parent
        //lower fitness = fewer entries in mating pool = less likely to be picked as a parent

        this.population.forEach(element => {            
            let fitness = map(element.fitness, 0, maxFitness, 0, 1)
            let n = floor(fitness * 100)
            for(let i = 0; i < n; i++){
                this.matingPool.push(element)
            }
        })        
    }

    //create a new generation based on current mating pool
    generate(){
        for(let i = 0; i < this.population.length; i++){
            let a = floor(random(this.matingPool.length))
            let b = floor(random(this.matingPool.length))
            let parentA = this.matingPool[a]
            let parentB = this.matingPool[b]
            let child = parentA.crossover(parentB)
            child.mutate(this.mutationRate)
            this.population[i] = child
        }
        this.generations++
    }

    getBest(){        
        return this.best
    }

    //compute the most fit member of the current population
    evaluate(){
        let worldRecord = 0.0
        let index = 0
        for(let i = 0; i < this.population.length; i++){
            if(this.population[i].fitness > worldRecord){
                index = i
                worldRecord = this.population[i].fitness
            }
        }

        this.best = this.population[index].getPhrase()
        if(worldRecord == this.perfectScore) this.finished = true
    }

    isFinished(){
        return this.finished
    }

    getGenerations(){
        return this.generations
    }

    //compute average fitness for the population
    getAverageFitness(){
        let total = 0
        this.population.forEach(element => total += element.fitness)
        return total / this.population.length
    }

    allPhrases(){
        let everything = ""
        let displayLimit = min(this.population.length, 50)
        for(let i = 0; i < displayLimit; i++){
            everything += this.population[i].getPhrase() + "<br>"
        }
        return everything
    }

}