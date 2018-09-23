// export default 'app.js';
// Variables 
const c = document.getElementById("stage");
const ctx = c.getContext("2d");
const stageWidth = c.width;
const stageHeight = c.height;

let collection = [];
let speed = 5;

console.log(stageWidth,stageHeight);
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
    constructor(size = 10,bgColor = "black") {
        super();
        this.size = size || 25;
        
        this.x = Math.floor(Math.random() *(stageWidth - this.size));
        this.y = Math.floor(Math.random() *(stageHeight - this.size));
        this.bgColor = bgColor;
        // this.xdir = speed;
        // this.ydir = speed;
    }
    draw(){
        // ctx.fillRect(this.x,this.y,this.size,this.size);
        
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.size,this.size,this.size*Math.PI);
        ctx.fillStyle = this.bgColor;
        ctx.fill();
        ctx.stroke();
    }

    move() {
        // this.y -= speed;
    }
}

class Ship extends Base {
    constructor(bgColor = "blue",width = 10,height = 50)
    {
        super();
        this.height = height;
        this.width = width;
        this.bgColor = bgColor;
        this.x = stageWidth/2;
        this.y = stageHeight - this.height - 10;
        this.ctx = c.getContext("2d");

    }
    draw(){
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.fillRect(this.x+10,this.y+20,this.width,this.height-20);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x-10,this.y+20,this.width,this.height-20);
        ctx.fillStyle = this.bgColor;
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
    })
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
    requestAnimationFrame(frame);
}
/**
 * Start Play
 */
function init() 
{
    const ship = new Ship();
    collection.push(ship);
    frame();   
}

// Game functions 
function shoot()
{
    const shoot = new Shoot(3,"red");
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
init();

document.addEventListener('keydown',event => {
    console.log(event.keyCode);
    if(event.keyCode === 32)
    {
        shoot();
    }
    // if(event.keyCode === 37){
    //     player.pos.x--;
    // }else if(event.keyCode === 39){
    //     player.pos.x++;
    // }else if(event.keyCode === 40){
    //     playerDrop();
    // }
});