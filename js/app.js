// export default 'app.js';
// Variables 
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const stageWidth = canvas.width;
const stageHeight = canvas.height;
const brick_with = 50;

let collection = [];
let collectionShoots = [];
let collectionBricsk = [];
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

    collision(key,obj = null)
    {
        //if hits the stage above
        if(this.y < 0)
        {
            this.destroy(key);
        }

        //Object in  question "Shoot"
                // Verify the heigt
        if(obj != null)
        {
            if(this.y > obj.y && this.y < obj.y + obj.height
               && this.x > obj.x && this.x < obj.x + obj.width
                )
            {
                this.destroy(key);
            }
        }

    }

    destroy(key)
    {
        collectionShoots[key] = null;
        delete this;
        delete collectionShoots[key];
    }

    move(key = 0) {
        this.y -= speed ;
        this.collision(key);
    }
}
//Ship class 
class Ship extends Base {
    constructor(canvas,width = 10,height = 50,bgColor = "yellow")
    {
        super();
        this.height = height;
        this.width = width;
        this.bgColor = bgColor;
        this.x = stageWidth/2;
        this.y = stageHeight - this.height - 10;
        this.shipCtx = canvas.getContext("2d");
        // this.wingsCtx = canvas.getContext("2d");

    }
    draw(){
        this.shipCtx.fillRect(this.x,this.y,this.width,this.height);
        this.shipCtx.fillStyle = this.bgColor;
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
        this.bodyCtx.fillStyle = this.bgColor;
    }
    move(key = 0)
    {
        
    }
}

/**
 * Functions
 */
/**
 * Assume non objs from the collection array normaly non collide
 */
function collision()
{
    collectionShoots.forEach((shoot,key)=>{
        collectionBricsk.forEach((brick,index) => {
            if(key!= index)
            {
                shoot.collision(key,brick);
            }
        });
    });
}
/**
 * 
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
        collision();
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
    [100,300,500].forEach((posX,index) => {
        const b = new Bricks(canvas,posX,stageHeight/2,"red");
        collectionBricsk.push(b);
    });
    [75,75+brick_with,300-50-25+brick_with,300-50+brick_with,300-50+brick_with+25,500-50-25+brick_with,500-50+brick_with,500-50+brick_with+25].forEach((posX,index) => {
        const b = new Bricks(canvas,posX,stageHeight/2+15,"blue");
        collectionBricsk.push(b);
    });
    
    
}

// Game functions 
function shoot()
{
    const shoot = new Shoot(3,"#fff",canvas);
    shoot.x = ship.x+ ship.width/2; //position of the ship
    collectionShoots.push(shoot);
}
// Set objs


//Set Ship 
const ship = new Ship(canvas,10,40,"yellow");
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