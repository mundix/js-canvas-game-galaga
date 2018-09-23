// export default 'app.js';
// Variables 
const c = document.getElementById("stage");
const ctx = c.getContext("2d");
const stageWidth = c.width;
const stageHeight = c.height;

let collection = [];
let speed = 5;
let offset = 5;

ctx.clearRect(0,0,stageWidth,stageHeight);
// ctx.scale(10,10);
/**
 * Classes
 */
class Base {
    collision(obj) {
        
    }
}

class Shoot extends Base {
    constructor(size = 10,bgColor = "black",canvas) {
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
        // ctx.fillRect(this.x,this.y,this.size,this.size);
        
        this.shoot.beginPath();
        this.shoot.arc(
            this.x,
            this.y,
            this.size,this.size,this.size*Math.PI);
            this.shoot.fillStyle = this.bgColor;
            this.shoot.fill();
            this.shoot.stroke();
    }

    collision()
    {
        if(this.y < 0)
            delete this;
    }

    move() {
        this.y -= speed /100;
    }
}

class Ship extends Base {
    constructor(bgColor = "blue",width = 10,height = 50,canvas)
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
        this.bodyCtx.fillStyle = this.bgColor;

        this.wingsCtx.fillRect(this.x+10,this.y+20,this.width,this.height-20);
        this.wingsCtx.fillRect(this.x-10,this.y+20,this.width,this.height-20);
        this.wingsCtx.fillStyle = "red";
    }

    move() {
        // this.y -= speed;
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
    collection.forEach((obj,x) => {
        obj.draw();
        obj.move();
    })
    ship.draw();
}

/**
 * Animate
 */
function frame() 
{
    // ball.draw();
    // collection.forEach((obj,x) => {
    //     obj.draw();
    //     obj.move();
    // })
    
    draw();
    setInterval(frame,10);
    // requestAnimationFrame(frame);
}
/**
 * Start Play
 */
function init() 
{
    // ship.draw();
    // collection.push(ship);
    frame();   
}

// Game functions 
function shoot()
{
    const shoot = new Shoot(3,"black",c);
    shoot.x = ship.x; //position of the ship
    collection.push(shoot);
}
// Set objs
// let loops = Math.floor(Math.random() * 500);
// console.log(loops);
// for(let i = 0; i < loops; i++)
// {
    // const shoot = new Shoot(3,"red");
    // collection.push(shoot);
// }

// const shoot1 = new Shoot(3,"red");
// const shoot2 = new Shoot(3,"green");
// collection.push(shoot1);
// collection.push(shoot2);
const ship = new Ship("blue",10,50,c);
init();

document.addEventListener('keydown',event => {
    console.log(event.keyCode);
    
    if(event.keyCode === 32)
    {
        shoot();
    }
    if(event.keyCode === 37){
        ship.x-=speed*offset;
        
    }else if(event.keyCode === 39){ //izq
        ship.x+=speed*offset;
    }

    // ctx.rotate(0.17);
    
});