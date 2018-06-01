function train_nn(training){
    shuffle(training, true)

    for(let i = 0; i < training.length; i++){
        let data = training[i]
        let inputs = Array.from(data).map(x => x / 255)     //normalizing data
        let label = training[i].label
        let targets = [0,0]
        targets[label] = 1
        nn.train(inputs, targets)
    }
}

function test_all(testing){
    let correct = 0
    for(let i = 0; i < testing.length; i++){
        let data = testing[i]
        let inputs = Array.from(data).map(x => x / 255)
        let label = testing[i].label
        let guess = nn.predict(inputs)

        let m = max(guess)
        let classification = guess.indexOf(m)

        if(classification === label) correct++
    }
    let percent = 100 * correct / testing.length
    return percent
}