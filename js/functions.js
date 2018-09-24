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
    mf.draw();
    // ship.draw();
    // ship.move();
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

    shoot.x = mf.x + mf.width/2; 
    shoot.y = mf.y - mf.height/2;

    // shoot.x = ship.x + ship.width/2; 
    // shoot.y = ship.y - ship.height/2;
    collectionShoots.push(shoot);
}

/**
 * Start Play
 */
function init() 
{
    // create_aliens();
    // create_bricks();
    frame();   
    
}
// Set objs