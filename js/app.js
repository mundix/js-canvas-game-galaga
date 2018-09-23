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

// const spriteImage = new Image();
// spriteImage.src = "./img/game-galaga-sprite-376x394.png";
ctx.clearRect(0,0,stageWidth,stageHeight);
// ctx.fillRect(100,100,100,100);
// ctx.fillStyle = "blue";


const alienSprite = document.getElementById("sprite_aliens");
const shipSprite = document.getElementById("ship_image");
// let sx,sy,sw,sh,dx,dy,dw,dh;
// sx = dx= 150;
// sy = dy = 150;
// sw = sh = dw = dh = 300;
ctx.drawImage(alienSprite, 100,100,alienSprite.width,alienSprite.height,0,0,45,89);
ctx.drawImage(shipSprite, 0,0,shipSprite.width,shipSprite.height);

// ctx.drawImage(sprite,sx ,sy, sw, sh,dx,dy,dw,dh);
// ctx.drawImage(sprite,50,50,300,300,50,50,300,300);


// function sprite (options) {
				
//     var that = {};
					
//     that.context = options.context;
//     that.width = options.width;
//     that.height = options.height;
//     that.image = options.image;

//     that.render = function () {
//         // Draw the animation
//         that.context.drawImage(
//            that.image,
//            0, //sx
//            0, //sy
//            that.width,
//            that.height,
//            200, // dh
//            200, // dx
//            that.width,
//            that.height);
//     };

//     return that;
// }

// var ship = sprite({
//     context: canvas.getContext("2d"),
//     width: 100,
//     height: 100,
//     image: spriteImage
// });
// console.log(ship);
// ship.render();

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
        ship.x-=speed*offset;
    }else if(event.keyCode === 39){ //move to the left
        ship.x+=speed*offset;
    }

    // ship.ctx.rotate(0.17);
    
});