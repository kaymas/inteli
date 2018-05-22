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

    //create a new generation based on current population (consider their fitness)
    generate(){

        // normalizing the fitness of current generation
        let sum = 0
        let normalized = []
        this.population.forEach(element => {
            sum += element.fitness
        })
        for(let i = 0; i < this.population.length; i++) {
            normalized[i] = this.population[i].fitness / sum
        }
        
        let newPopulation = []

        for(let i = 0; i < this.population.length; i++){
            let parentA = this.selectOne(normalized)
            let parentB = this.selectOne(normalized)
            let child = parentA.crossover(parentB)
            child.mutate(this.mutationRate)
            newPopulation[i] = child
        }
        this.population = newPopulation
        this.generations++
    }

    //selecting a partner to mate with using simplified rejection sampling procedure
    selectOne(normalized){ 
        let index = 0
        let r = random(1)

        while(r > 0){
            r = r - normalized[index]
            index++
        }
        index--
        return this.population[index]
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