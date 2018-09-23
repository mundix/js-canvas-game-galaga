// export default 'app.js';
// Variables 
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const stageWidth = canvas.width;
const stageHeight = canvas.height;
const brick_with = 100;

let collection = [];
let speed = 10;
let offset = 2;

// RequestAnimateFreame FPS
let dropCounter = 0;
let dropInterval = 1000; //milliseconds
let lastTime = 0;

// ctx.scale(10,10);
/**
 * Classes
 */
class Base {
    collision(obj) {
        
    }
    
}
//Shoot Class
class Shoot extends Base {
    constructor(size = 10,bgColor = "#fff",canvas) {
        super();
        this.size = size || 25;
        
        // this.x = Math.floor(Math.random() *(stageWidth - this.size));
        this.x = stageWidth/2;
        // this.y = Math.floor(Math.random() *(stageHeight - this.size));
        this.y = stageHeight - 10;
        this.bgColor = bgColor;
        this.shoot = canvas.getContext("2d");
        // this.xdir = speed;
        // this.ydir = speed;
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

    collision(key)
    {
        //if hits the stage above
        if(this.y < 0)
        {
            collection[key] = null;
            delete this;
            delete collection[key];
        }
    }

    move(key = 0) {
        this.y -= speed ;
        this.collision(key);
    }
}
//Ship class 
class Ship extends Base {
    constructor(bgColor = "red",width = 10,height = 50,canvas)
    {
        super();
        this.height = height;
        this.width = width;
        this.bgColor = bgColor;
        this.x = stageWidth/2;
        this.y = stageHeight - this.height - 10;
        this.bodyCtx = canvas.getContext("2d");
        this.wingsCtx = canvas.getContext("2d");

    }
    draw(){
        this.bodyCtx.fillRect(this.x,this.y,this.width,this.height);
        this.bodyCtx.fillStyle = "red";
    }

    move() {
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
        this.fillStyle = this.bgColor;
    }
    move(key = 0)
    {
        
    }
}

/**
 * Functions
 */

function collision()
{

}
/**
 * 
 */
function draw()
{
    ctx.clearRect(0,0,stageWidth,stageHeight);
    collection.forEach((obj,key) => {
        obj.draw();
        obj.move(key);
    })
    ship.draw();
}

/**
 * Animate
 */
function frame(time = 0) 
{
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if(dropCounter > dropInterval) {
        draw();
    }
    
    requestAnimationFrame(frame);
}
/**
 * Start Play
 */
function init() 
{
    // ship.draw();
    // collection.push(ship);
    create_bricks();
    frame();   
}
/**
 * Build the bricks on the wall  by loop
 */
function create_bricks()
{
    total = (stageWidth/brick_with)  - 1;
    for(let i = 0; i < total; i ++)
    {
        if(i%2==0)
        {
            const b = new Bricks(canvas,i*brick_with+50,stageHeight/2);
            collection.push(b);
        }

    }
    for(let i = 0; i < total; i ++)
    {
        if(i%2!=0)
        {
            const b = new Bricks(canvas,(i*brick_with/2)+50,stageHeight/2+20,"blue");
            collection.push(b);
        }

    }
    
    
}

// Game functions 
function shoot()
{
    const shoot = new Shoot(3,"#fff",canvas);
    shoot.x = ship.x+ ship.width/2; //position of the ship
    collection.push(shoot);
}
// Set objs


//Set Ship 
const ship = new Ship("blue",10,40,canvas);
init();

/**
 * Constrols <- (move to left) space (Shoot) (move to right)->
 */
document.addEventListener('keydown',event => {
    // console.log(event.keyCode);
    if(event.keyCode === 32)
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