class Activation{
    constructor(func, dfunc){ //dfunc is the derivative of func
        this.func = func
        this.dfunc = dfunc
    }
}

let sigmoid = new Activation(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
)

class NeuralNetwork{
    constructor(input, hidden, output, learning_rate = 0.1){
        this.input_nodes = input
        this.hidden_nodes = hidden
        this.output_nodes = output
        this.learning_rate = learning_rate

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

    setLearningRate(lr){
        this.learning_rate = lr
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
        
        // Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        // activation function
        hidden.map(sigmoid.func);

        // Generating the output's output!
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid.func);

        // Convert array to matrix object
        let targets = Matrix.fromArray(target_array);

        //--------------adjusting hidden-output weights--------------
        //output layer error
        let output_errors = Matrix.subtract(targets, outputs)

        //output gradient
        let output_gradient = Matrix.map(outputs, sigmoid.dfunc)
        output_gradient.multiply(output_errors)
        output_gradient.multiply(this.learning_rate)
        //hidden-output delta
        let hidden_t = Matrix.transpose(hidden)
        let weights_ho_deltas = Matrix.multiply(output_gradient, hidden_t)

        //adjust weights of hidden-output
        this.weights_ho.add(weights_ho_deltas)
        this.bias_o.add(output_gradient) //adjust by just the gradient and not using hidden vlaues

        //--------------adjusting input-hidden weights--------------
        //hidden layer error
        let weights_ho_t = Matrix.transpose(this.weights_ho)
        let hidden_errors = Matrix.multiply(weights_ho_t, output_errors)

        //hidden gradient
        let hidden_gradient = Matrix.map(hidden, sigmoid.dfunc)
        hidden_gradient.multiply(hidden_errors)
        hidden_errors.multiply(this.learning_rate)
        //input-hidden delta
        let input_t = Matrix.transpose(inputs)
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, input_t)

        //adjust weights of input-hidden
        this.weights_ih.add(weights_ih_deltas)
        this.bias_h.add(hidden_gradient)
    }
}