let vals = [0,1,2,4,5,9]

function setup(){
    createCanvas(400,400)
    background(51)
}

function draw(){
    background(51)
    console.log(vals);

    let largestX = -1
    for(var i = 0; i < vals.length - 1; i++){
        if(vals[i] < vals[i + 1]) largestX = i
    }
    if(largestX == -1){
        console.log('finished')
        noLoop()
    }

    let largestY = -1
    for(var i = 0; i < vals.length; i++){
        if(vals[largestX] < vals[i]) largestY = i
    }

    swap(vals,largestX,largestY)

    let endArr = vals.splice(largestX + 1)
    endArr.reverse()
    vals = vals.concat(endArr)

    //display
    textSize(64)
    let s = ''
    for(var i = 0; i < vals.length; i++){
        s += vals[i]
    }
    fill(255)
    text(s,20,height/2)
}

let swap = function(a,i,j){
    temp = a[i]
    a[i] = a[j]
    a[j] = temp
}