
function setup(){
    createCanvas(600,600)
    background(51)
    let nn = new NeuralNetwork(2,2,1)
    let input = [1,0]
    let output = nn.predict(input)
    console.log(output);
    
}

function draw(){
}