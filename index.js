var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var dino = {
    x:10,
    y:200,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle='green';
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}



class Cactus {
    constructor(){
        this.x = 450;
        this.y = 250;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle='red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
        cactusmix.forEach((a)=>{
            a.x--;
            a.draw();
        })
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusmix = [];

function actionPerFrame(){
    requestAnimationFrame(actionPerFrame);
    timer++;
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if(timer%120===0){
        var cactus = new Cactus();
        cactusmix.push(cactus);
    }
    cactus.draw();
    
    dino.draw();
}

actionPerFrame();