var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();

  spookySound.loop();
  
}

function draw() {
  background(0);

  if(gameState=="play")
  {
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown(LEFT_ARROW))
    {
      ghost.x=ghost.x-3
    }

    if(keyDown(RIGHT_ARROW))
    {
      ghost.x=ghost.x+3
    }
    if(keyDown("space"))
    {
      ghost.velocityY=-10

    }
    ghost.velocityY=ghost.velocityY+0.5;

    spawnDoors()
    
    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY=0;
    }
 
    if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600)
    {
      gameState="end";
    }

    drawSprites()
  }


  else if(gameState=="end")
  {
    fill("yellow")
    textSize(30)
    text("GAME OVER",230,300)
  }
  

}
function spawnDoors()
{
  if(frameCount%300==0)
  {
    var door = createSprite(Math.round(random(100,500)),-10)
    var climber =  createSprite(door.x,60)
    var inv =  createSprite(door.x,65,climber.width,2)
     
   door.addImage(doorImg);
   climber.addImage(climberImg)
   
   door.velocityY=1;
   climber.velocityY=1;
   inv.velocityY=1;

   door.lifetime=600;
   climber.lifetime=600;
   inv.lifetime=600;

   inv.visible=false;
   inv.debug=true;

   ghost.depth=door.depth+1;

   doorsGroup.add(door);
   climbersGroup.add(climber);
   invisibleBlockGroup.add(inv);


  }
}
