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

        this.size = type? 40:60;
        this.type = type;
        this.alienCtx = canvas.getContext("2d");
        this.randN = this.getRandomN();

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
 * Millenial Falcon 
 */
class MillenialFalcon extends Base {
    constructor(x=0,y=0,width = 100,height = 100)
    {
        super();
        this.img = new Image();
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.ydir = speed*0.1;
        
    }

    draw() {
        let image = this.img;
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        image.onload = function () {
            ctx.drawImage(image,x,y,width,height);
        }
        image.src = "../img/millenial-falcon-283x354.png";
    }

    move()
    {   
        if(this.y <= stageHeight - this.height-10)
            this.ydir = - this.ydir;

        if(this.y >= stageHeight - 60 -5)
            this.ydir = - this.ydir;
        this.y-=this.ydir;
    }
}
/**
 * **** *** **** *** **** *** **** *** ****
 *                  Classes Finale
 * **** *** **** *** **** *** **** *** ****
 */