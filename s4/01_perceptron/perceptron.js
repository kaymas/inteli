class Perceptron{
    constructor(n,c){
        this.weights = new Array(n)
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = random(-1,1)
        }

        this.c = c //learning rate
    }

    train(inputs, desired){
        let guess = this.feedforward(inputs)
        let error = desired - guess //this can only jave values 0,-2,2 since labels can be -1 or 1
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] += error * inputs[i] * this.c   //gradient descent
        }
    }

    //guess -1 or +1 for a given input set
    feedforward(inputs){
        let sum = 0
        for(let i = 0; i < this.weights.length; i++){
            sum += inputs[i] * this.weights[i]
        }        
        return this.activation(sum)
    }

    //activation function which currently is the sign function
    activation(sum){
        if(sum > 0) return 1
        else return -1
    }

    getWeights(){
        return this.weights
    }
}