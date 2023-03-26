var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var img1 = new Image();
img1.src = './assets/cactus.png';

var img2 = new Image();
img2.src = './assets/dino.png';

var dino = {
    x:10,
    y:230,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle='green';
        ctx.drawImage(img2, this.x,this.y,this.width,this.height)
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
        ctx.drawImage(img1, this.x,this.y,this.width,this.height);
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusmix = [];
var jumpingTime=0;
var animation;

function actionPerFrame(){
    animation = requestAnimationFrame(actionPerFrame);
    timer++;
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    if(timer%120===0){
        var cactus = new Cactus();
        cactusmix.push(cactus);
    }
    cactusmix.forEach((a, i, o)=>{
        if(a.x < 0-a.width ){
           o.splice(i,1);
        }
        a.x--;
        a.draw();

        collision(dino, a);
    });
    if(jumping==true){
        dino.y-=2;
        jumpingTime++;
    }

    if(jumping==false){
        if(dino.y<230)
            dino.y+=2;
    }

    if(jumpingTime > 50){
        jumping = false;
        jumpingTime=0;
    }

    dino.draw();
    
}

actionPerFrame(); 
var jumping = false;
document.addEventListener('keydown',function(e){
    if(e.code==='Space'){
        jumping = true;
    }
})

function collision(dino, cactus){
    var xDifference = cactus.x - (dino.x+dino.width);
    var yDifference = cactus.y - (dino.y+dino.height);

    if(xDifference < 0 && yDifference < 0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
    };
}