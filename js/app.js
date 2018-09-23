/**
 * @author Clemente E. Pichardo <ce.pichardo@gmail.com>
 * @since 2018-09-22
 * @name "Galaga Canvas Game"
 * @description https://github.com/mundix/js-canvas-game-galaga
 * 
 * @see http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
 * @see https://nickturner.wordpress.com/2013/12/10/galaga-sprite-sheet/
 */

//Set the Ship 
const ship = new Ship(canvas);
init();

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