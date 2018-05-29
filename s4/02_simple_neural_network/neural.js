class Activation{
    constructor(func, dfunc){
        this.func = func
        this.dfunc = dfunc
    }
}

let sigmoid = new Activation(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
)

class NeuralNetwork{
    constructor(input, hidden, output){
        this.input_nodes = input
        this.hidden_nodes = hidden
        this.output_nodes = output

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes)
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes)
        this.weights_ih.randomize()
        this.weights_ho.randomize()

        //bias weights
        this.bias_h = new Matrix(this.hidden_nodes, 1)
        this.bias_o = new Matrix(this.output_nodes, 1)
        this.bias_h.randomize()
        this.bias_o.randomize()
    }

    predict(input_array){
        //hidden layer calculation
        let inputs = Matrix.fromArray(input_array)
        let hidden = Matrix.multiply(this.weights_ih, inputs)
        hidden.add(this.bias_h)
        //activation function
        hidden.map(sigmoid.func)

        let output = Matrix.multiply(this.weights_ho, hidden)
        output.add(this.bias_o)
        //activation function
        output.map(sigmoid.func)

        return output.toArray()
    }

    train(input_array, target_array){
        
    }
}