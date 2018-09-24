/**
 * @author Clemente E. Pichardo <ce.pichardo@gmail.com>
 * @since 2018-09-22
 * @name "Galaga Canvas Game"
 * @description https://github.com/mundix/js-canvas-game-galaga
 * 
 * @see http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
 * @see https://nickturner.wordpress.com/2013/12/10/galaga-sprite-sheet/
 * @copyright Edmundo Pichardo @2018
 * @example http://cpichardo.com
 */

//Set the Ship 
// const ship = new Ship(canvas);
// init();

// let imageSprite = new Image();
// imageSprite.src = "../img/spritestrip.png";
// imageSprite.src = "../img/alien-virus.png";
// console.log(imageSprite.width,);




const mf = new MillenialFalcon(stageWidth/2-50/2,stageHeight-60-10,50,60);
$(function(){
    // let millenialFalcon = new Image();
    // bossAlien = document.getElementById("aliens_sprite");
    // alienSpawn1 = document.getElementById("aliens_sprite");

    // millenialFalcon.onload = function()
    // {
    //     // ctx.drawImage(millenialFalcon,0,0,millenialFalcon.width/3,millenialFalcon.height/3);
    //     width = millenialFalcon.width*0.25;
    //     height = millenialFalcon.height*0.25;
    //     ctx.drawImage(millenialFalcon,stageWidth/2,stageHeight-height,width,height);
    // }
    // millenialFalcon.src = "../img/millenial-falcon-283x354.png";

    

    
    
    let milenialFalconInterval = setInterval(()=>{
        // console.log("Move");
        // ctx.clearRect(0,0,stageWidth,stageHeight);
        // mf.draw();
        mf.move();    
    },100 );
    
    
    
    // sW = 20;
    // sH = 20;
    // dW = 0;
    // dH = 0;

    // ctx.drawImage(alienSpawn1, 23, 23,sW ,sW, dW, dH+100,100 ,100); 
    // ctx.drawImage(alienSpawn1, 0, 23,sW ,sW, dW+5, dH + 5 + 100,100 ,100); 
    
    let i = 0;
    bossAnimate =[23,23,23,23,0,0,0,23,23,23 ];
    // ctx.drawImage(bossAlien, 23, 0,sW ,sW, dW, dH,100 ,100); ;
    // ctx.drawImage(bossAlien, 0, 0,sW ,sW, dW+5, dH + 5,100 ,100); 
    // var interval = setInterval(() => {
    //     ctx.clearRect(0,0,stageWidth,stageHeight);

    //     // if(i%2==0)
    //         ctx.drawImage(bossAlien, bossAnimate[i], 0,sW ,sW, dW, dH,100 ,100); 
    //     // else
    //         // ctx.drawImage(bossAlien, 0, 0,sW ,sW, dW+5, dH + 5,100 ,100); 

    //     if(i%2==0)
    //         ctx.drawImage(alienSpawn1, 23, 23,sW ,sW, dW, dH+100,100 ,100);
    //     else
    //         ctx.drawImage(alienSpawn1, 0, 23,sW ,sW, dW+5, dH + 5 + 100,100 ,100); 

    //     if(i++===8)
    //         i=0;
    // },
    // 300);

    /**
 * Event's listener
 * Constrols <- (move to left) space (Shoot) (move to right)->
 */
document.addEventListener('keydown',event => {
    const offset = 2;

    if(event.keyCode === 32) //IF press "space key"
    {
        shoot();
    }
    if(event.keyCode === 37){ //move to the right
        // ship.x-=speed*offset;
        mf.x-=speed*offset;
    }else if(event.keyCode === 39){ //move to the left
        // ship.x+=speed*offset;
        mf.x+=speed*offset;
    }

    // ship.ctx.rotate(0.17);
    
});
    
});

