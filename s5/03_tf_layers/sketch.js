const model = tf.sequential()

// This layer implements the operation: output = activation(dot(input, kernel) + bias)
const hidden = tf.layers.dense({
    units : 4,
    inputShape: [2],
    activation : 'sigmoid'
})
const output = tf.layers.dense({
    units : 3,
    activation: 'sigmoid'
})

model.add(hidden)
model.add(output)

const learningRate = 0.01

model.compile({
    optimizer : tf.train.sgd(learningRate),
    loss : 'meanSquaredError'
})