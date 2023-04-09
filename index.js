var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var img1 = new Image();
img1.src = './assets/cactus.png';

var img2 = new Image();
img2.src = './assets/dino.png';

var img3 = new Image();
img3.src = './assets/dinodown.png';

var img4 = new Image();
img4.src = './assets/background.png'

var dino = {
    x:10,
    y:490,
    width: 50,
    height: 50,
    draw(){
        ctx.drawImage(img2, this.x,this.y,this.width,this.height)
    }
}

var dinodown = {
    x:10,
    y:515,
    width: 75,
    height: 25,
    draw(){
        ctx.drawImage(img3, this.x,this.y,this.width,this.height)
    }
}

class Cactus {
    constructor(){
        this.x = 1920;
        this.y = 495;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.drawImage(img1, this.x,this.y,this.width,this.height);
    }
}

var background = {
    x:20,
    y:-110,
    width:1920,
    height: 640,
    draw(){
        ctx.drawImage(img4, this.x,this.y,this.width,this.height)
    }
}


var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusmix = [];
var jumpingTime=0;
var animation;
var jumping = false; 
var down = false; 

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
        a.x-=6;
        a.draw();

        collision(dino, a);
    });
    if(jumping==true){
        dino.y-=4;
        jumpingTime++;
    }

    if(jumping==false){
        if(dino.y<490)
            dino.y+=4;
    }

    if(jumpingTime > 25){
        jumping = false;
        jumpingTime = 0
    }


    if(down == true) {
        dinodown.draw();
        if(timer%6==0) {
            img3.src = './assets/dinodown(2).png';
        } else if(timer%6==1) {
            img3.src = './assets/dinodown.png';
        }
    }
    else {
        dino.draw();
    }
    
}

actionPerFrame(); 

document.addEventListener('keydown',function(e){
    if((e.code==='ArrowUp' || e.code==='Space')&& dino.y == 490){
        jumping = true;
        down = false;
    }
    
    if(e.code==='ArrowDown') {
        down = true;
        jumping = false;

    }
});

document.addEventListener("keyup", function(e){
    if(e.code === 'ArrowDown') {
        down = false;
        jumping = false;
    }
});

function collision(dino, cactus){
    var xDifference = cactus.x - (dino.x+dino.width);
    var yDifference = cactus.y - (dino.y+dino.height);

    if(xDifference < 0 && yDifference < 0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
    };
}

// 
// 1. 다른 선인장 등장
// 2. 점수
// 3. 다시하기
// 4. 공중에서 잠깐 멈추기
