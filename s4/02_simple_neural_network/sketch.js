let training_data = [
    {
        input : [0,0],
        target : [0]
    },
    {
        input : [0,1],
        target : [1]
    },
    {
        input : [1,0],
        target : [1]
    },
    {
        input : [1,1],
        target : [0]
    }
]

function setup(){
    createCanvas(600,600)
    background(51)
    
    let nn = new NeuralNetwork(2,2,1,0.1)
    
    for(let i = 0; i < 5000; i++){
        let data = random(training_data)
        nn.train(data.input, data.target)
    
    }
    
    console.log(nn.predict([0,0]))
    console.log(nn.predict([1,1]))
    console.log(nn.predict([0,1]))
    console.log(nn.predict([1,0]))
}

function draw(){
}