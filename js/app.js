/**
 * @author Clemente E. Pichardo <ce.pichardo@gmail.com>
 * @since 2018-09-22
 * @name "Galaga Canvas Game"
 * @description https://github.com/mundix/js-canvas-game-galaga
 * 
 * @see http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
 * @see https://nickturner.wordpress.com/2013/12/10/galaga-sprite-sheet/
 */

// ============ Variables  ====================//
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const stageWidth = canvas.width;
const stageHeight = canvas.height;
const brick_with = 25;
const ship_img = document.getElementById("ship_image");

let collection = [];
let collectionAliens = [];
let collectionShoots = [];
let collectionBricsk = [];
let speed = 10;

const aliensId = ['alien_boss_img','alien_1_img','alien_2_img'];

// RequestAnimateFreame FPS
let dropCounter = 0;
let dropInterval = 1000; //milliseconds
let lastTime = 0;

// ============ End Variables  ====================//
// ctx.scale(10,10);

/**
 * **** *** **** *** **** *** **** *** ****
 *                  Classes
 * **** *** **** *** **** *** **** *** ****
 */
class Base {
    collision(obj) {

        /**     this.x > obj.x && this.x < obj.x + obj.width
         * 0,0  areaX Between Obj.x and Obj.x + Obj.width
         * + ----------->
         * |           | 
         * |           |  areaY Between Obj.y and Obj.y + Obj.height 
         * |           |
         * V           |
         *  -----------
         *              x,y
         *  this.y > obj.y && this.y < obj.y + obj.height
         */
        if(
            (this.y >= obj.y && this.y <= obj.y + obj.height  //Vertical Collision
            && 
            this.x >= obj.x && this.x <= obj.x + obj.width)
            )
        {
            return true;
        }else{
            // console.log("collisin");

            return false;
        }
    }
    destroy(key,type = null)
    {
        if(type ==="shoot")
        {

            collectionShoots[key] = null;
            delete this;
            delete collectionShoots[key];
        }
        if(type ==="brick")
        {

            collectionBricsk[key] = null;
            delete this;
            delete collectionBricsk[key];
        }

    }
    
}
//Shoot Class
class Shoot extends Base {
    constructor(canvas,size = 10,bgColor = "#fff") {
        super();
        this.size = size || 25;
        this.x = stageWidth/2;
        this.y = stageHeight - 10;
        this.bgColor = bgColor;
        this.shoot = canvas.getContext("2d");
    }
    draw(){
        this.shoot.beginPath();
        this.shoot.arc(
            this.x,
            this.y,
            this.size,this.size,this.size*Math.PI);
            this.shoot.fillStyle = this.bgColor;
            this.shoot.fill();
            this.shoot.stroke();
    }

    verticalCollision(key){
        if(this.y < 0)
        {
            this.destroy(key);
        }
    }

    move(key = 0) {
        this.y -= speed ;
        this.verticalCollision(key);
    }
}
//Ship class 
class Ship extends Base {
    constructor(canvas,width = 50,height = 50)
    {
        super();
        this.height = height;
        this.width = width;
        // this.bgColor = bgColor;
        this.x = stageWidth/2;
        this.y = stageHeight - this.height - 10;
        this.shipCtx = canvas.getContext("2d");
        this.img = ship_img;

    }
    draw(){
        this.shipCtx.drawImage(this.img, this.x,this.y,40,40 );
    }

    horizontalCollision(){
        // Stage Collision
        if(this.x <= 0 ){
            this.x = 2;
        }
        if(this.x >= stageWidth - this.width) {
            this.x = stageWidth - this.width;
        }
    }

    move(key = 0) {
        this.horizontalCollision();
    }
}

//Bricks class
class Bricks extends Base {
    constructor (canvas,x=0,y=0,bgColor = "blue") {
        super();
        this.width = brick_with;
        this.height = 10;
        this.bodyCtx = canvas.getContext("2d");
        this.x = x;
        this.y = y; 
        this.bgColor = bgColor;
    }

    draw() {
        this.bodyCtx.fillRect(this.x,this.y,this.width,this.height);
        this.bodyCtx.fillStyle = this.bgColor;
    }
    move(key = 0)
    {
        
    }
}

//Star Class
class Star extends Base {
    constructor()
    {
        super();
        this.x = 0;
        this.y = 0;
    }
}

//Alien Class
class Alien extends Base {
    constructor(canvas,imageId = null,x=0,y=0,type = 1) //type = 1; boss alien type 0 normal
    {
        super();
        this.x = x;
        this.y = y;
        this.xdir = speed;
        if(imageId !== null)
            this.img = document.getElementById(imageId);
        else
            this.img = null;
        this.size = type? 50:90;
        this.type = type;
        this.alienCtx = canvas.getContext("2d");
        this.randN = this.getRandomN();
        console.log(this.randN);

    }

    draw() 
    {   
        if(this.img !== null)
            this.alienCtx.drawImage(this.img, this.x,this.y,this.size,this.size);
    }

    horizontalCollision()
    {
        if(this.x  >= (stageWidth - this.size ) )
        {
            this.xdir = -this.xdir;
            
        }
        if(this.x <= 0)
        {
            this.xdir = -this.xdir;
            
        }
        if(this.x  >= (stageWidth - this.size )  || this.x <= 0)
        {
            var interval = setInterval(()=>{
                this.randN = this.getRandomN();
                this.xdir = -this.xdir;
                clearInterval(interval);
            },this.randN);
        }


    }
    move(key = 0){
        if(this.type == 0)
        {
            this.x += this.xdir * 0.1 ;
        }
        this.horizontalCollision();
        // document.getElementById("scoreboard-input").value = this.x;
    }

    getRandomN()
    {
        
        return this.randN = Math.floor(Math.random()*1000*10);
    }
}
/**
 * **** *** **** *** **** *** **** *** ****
 *                  Classes Finale
 * **** *** **** *** **** *** **** *** ****
 */

/**
 * -===== Functions =====- 
 *       *       *
 *        *     *
 *       ********
 *     ***  **  ***
 *     ************
 *   ****************
 *   ** ********** **
 *   **  **    **  **
 *       **    **   
 *        **  **
 * -********************
 */
/**
 * Assume non objs from the collection array normaly non collide
 */
function collision()
{
    collectionShoots.forEach((shoot,shootKey)=>{
        collectionBricsk.forEach((brick,brickKey) => {
            if(shootKey!= brickKey)
            {
                if(shoot.collision(brick))
                {
                    // canvas.style.backgroundColor = "#b9b9b9";
                    canvas.style.backgroundColor = "#bf9595";
                    shoot.destroy(shootKey,"shoot");
                    setInterval(() =>{
                        brick.destroy(brickKey,"brick");
                        canvas.style.backgroundColor = "black";
                    },100);
                }

            }
        });
    });
    // document.getElementById("stage").style.backgroundColor = "black";
}
/**
 * Draw function
 */
function draw()
{
    ctx.clearRect(0,0,stageWidth,stageHeight);
    collectionShoots.forEach((obj,key) => {
        obj.draw();
        obj.move(key);
    })
    collectionBricsk.forEach((obj,key) => {
        obj.draw();
        obj.move(key);
    });

    collectionAliens.forEach((obj,key) => {
        obj.draw();
        obj.move(key);
    });

    ship.draw();
    ship.move();
}

/**
 * Animated Frame
 */
function frame(time = 0) 
{
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if(dropCounter > dropInterval) {
        draw();
        collision();
    }
    requestAnimationFrame(frame);
}
/**
 * Start Play
 */
function init() 
{
    create_aliens();
    create_bricks();
    frame();   
}
/**
 * Build the bricks on the wall  by loop
 */
function create_bricks()
{
    const offset = 5;   
    const limit = stageWidth/brick_with;
    const limits =[];
    const positionStart = 15;

    for(let i=0;i<limit;i++) {
        limits.push(positionStart +(brick_with + offset)*i);
    }
    let colors = ["yellow","red","green"];
    for(let y = 0 ; y < 3 ; y++)
    {
        limits.forEach((posX,index) => {
            if(y%2!=0)
                posX = posX-25;
            const b = new Bricks(canvas,posX,stageHeight/2+(y*15),colors[y]);
            if(b.x> 10 && b.x <= stageWidth - b.width)
                collectionBricsk.push(b);
        });
    }
}

function create_stars()
{
    const total_stars = Math.floor(Math.random()*500)+500;
    for(let i = 0; i < total_stars ; i ++)
    {
        
    }
}

function create_aliens()
{
    // Boss 
    const boss = new Alien(canvas,aliensId[0],stageWidth/2,50,0);
    collectionAliens.push(boss);
    for(let i=0;i<10; i++)
    {
        const alien = new Alien(canvas,aliensId[1],50*i+10,boss.y + boss.size ,1);
        collectionAliens.push(alien);
    }
    for(let i=0;i<5; i++)
    {
        const alien = new Alien(canvas,aliensId[2],100*i+80,80 + 50*2 ,1);
        collectionAliens.push(alien);
    }

    
}

// Game functions 
function shoot()
{
    const shoot = new Shoot(canvas,3,"yellow");
    shoot.x = ship.x + ship.width/2; //position of the ship
    shoot.y = ship.y - ship.height/2;
    collectionShoots.push(shoot);
}
// Set objs


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