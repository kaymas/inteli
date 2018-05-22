function randomChar(){
    let c = floor(random(63,122)) //ascii from ? to z
    if(c == 92) c = 32 //ascii for space
    if(c == 64) c = 46 //ascii for period
    if(c == 91) c = 44 //ascii for comma
    if(c == 93) c = 33 //ascii for exclamation mark
    if(c == 94) c = 39 //ascii for apostrophe


    return String.fromCharCode(c)
}

class DNA {
    
    constructor(num){ //num is length of sequence
        this.genes = []
        this.fitness = 0
        
        for(let i = 0; i < num; i++){
            this.genes[i] = randomChar() //create a random genetic sequence
        }
    }

    //converts genetic sequence to a string
    getPhrase(){
        return this.genes.join("")
    }

    //compares target to gene and returns % of similarity
    calcFitness(target){
        let score = 0
        for(let i = 0; i < this.genes.length; i++){
            if(this.genes[i] == target.charAt(i)) score++
        }
        this.fitness = score / target.length
        this.fitness = pow(this.fitness,3)
    }

    //crossover : mate DNA with another DNA
    crossover(partner){
        let child = new DNA(this.genes.length)

        //using midpoint technique for mating
        //where we pick half of child from one parent and other half from other parent

        let midpoint = floor(random(this.genes.length))
        for(let i = 0; i < this.genes.length; i++){
            if(i > midpoint) child.genes[i] = this.genes[i]
            else child.genes[i] = partner.genes[i]
        }

        return child
    } 

    //mutate DNA based on mutation rate (mutation : pick random character)
    mutate(mutationRate){
        for(let i = 0; i < this.genes.length; i++){
            if(random(1) < mutationRate){
                this.genes[i] = randomChar()
            }
        }
    }
}