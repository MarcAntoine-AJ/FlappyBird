/*eslint-env browser*/
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



//Charger les images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

//Audio

var fly = new Audio();
var scoreSound = new Audio();
var gameOver = new Audio();

fly.src="sounds/fly.mp3";
scoreSound.src ="sounds/score.mp3";
gameOver.src = "sounds/gameover.mp3";

// Ajouter les sources des images
bird.src = "images/bird.png";
bg.src ="images/bg.png";
fg.src="images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src= "images/pipeSouth.png";

//Variables pour le trou de passage

var gap =95;
var constant;

//Variables de position

var bX =10;
var bY = 150;
var gravity = 1.5;
var score=0;
var pipe = [];
pipe[0]= { x: cvs.width, y:0};

// Gestion evenement
function moveUp(){
    bY -= 30;
    fly.play();
}
document.addEventListener("keydown",moveUp);



function draw() {
    ctx.drawImage(bg,0,0);
    constant= pipeNorth.height + gap;
    for(var i=0;i<pipe.length;i++){
        
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        
        pipe[i].x--;
        
        if(pipe[i].x==125){
            pipe.push({
                x:cvs.width,
                y: (Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height)
            });
        }
        if(bY+bird.height>=cvs.height-fg.height){
            gameOver.play();
            alert("Game Over");
            location.reload();
        }
        
        if(bX+bird.width>=pipe[i].x && bX<=pipe[i].x+pipeNorth.width){
           if(bY+bird.height>=pipe[i].y+constant || bY<=pipe[i].y+pipeNorth.height){
            gameOver.play();
            alert("Game Over");
            location.reload();
            
        }
           
        }
        
        if(pipe[i].x==5){
            score++;
            scoreSound.play();
            
        }
    }
  
    ctx.drawImage(fg,0,cvs.height-fg.height);
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    ctx.fillStyle="#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}
draw();
