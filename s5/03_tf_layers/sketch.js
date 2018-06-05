const model = tf.sequential()

// This layer implements the operation: output = activation(dot(input, kernel) + bias)
const hidden = tf.layers.dense({
    units : 4,
    inputShape: [2],
    activation : 'sigmoid'
})
const output = tf.layers.dense({
    units : 1,
    activation: 'sigmoid'
})

model.add(hidden)
model.add(output)

const learningRate = 0.5

model.compile({
    optimizer : tf.train.sgd(learningRate),
    loss : 'meanSquaredError'
})

//shitty data
const inputs = tf.tensor([
    [0,0],
    [0.5,0.5],
    [1,1]
])
const outputs = tf.tensor([
    [1],
    [0.5],
    [0]
])
const predictData = tf.tensor([
    [0.1,0.04],
    [0.29,0.3],
    [0.51,0.43],
    [0.74,0.63],
    [0.98,0.89]
])
model.predict(inputs).print()
async function train() {
    //500 epochs
    for(let i = 0; i < 500; i++){
        let response = await model.fit(inputs, outputs, {shuffle: true})
        console.log(response.history.loss[0])
    }
}
train().then(() => {
    console.log('training completed');
    model.predict(predictData).print()
})
