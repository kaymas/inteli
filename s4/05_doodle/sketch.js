const len = 784
const total_data = 1000
const train_length = 0.8 * total_data

let trains_data = []
let trains = {}

function preload(){
    trains_data = loadBytes('trains.bin')
}

function setup(){
    createCanvas(280,280)
    background(255)

    trains.training = []
    trains.testing = []

    for(let i = 0; i < total_data; i++){
        let offset = i * len
        if(i < train_length){
            trains.training[i] = trains_data.bytes.subarray(offset, offset + len) 
        }else {
            trains.testing[i - train_length] = trains_data.bytes.subarray(offset, offset + len)
        }
    }

    let totalTrains = 100
    for(let i = 0; i < totalTrains; i++){
        let img = createImage(28,28)
        let offset = i * len
        
        img.loadPixels()
        for(let p = 0; p < len; p++){
            let val = 255 - trains_data.bytes[p + offset]
            img.pixels[p * 4] = val         //r
            img.pixels[p * 4 + 1] = val     //g
            img.pixels[p * 4 + 2] = val     //b
            img.pixels[p * 4 + 3] = 255     //a
        }
        img.updatePixels()

        let x = (i % 10) * 28
        let y = floor(i / 10) * 28
        image(img, x, y)
    }
}

function draw(){
}