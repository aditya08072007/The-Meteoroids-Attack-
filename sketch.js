var back,backImg;
var rocket,rocketImage;
var earth,earthImage;
var meteors,meteorsImage,meteorsGroup;
var gameState="play";
var score=0;
function preload()
{
  backImg=loadImage("background.png");
  rocketImage=loadImage("rocket.png");
  meteorsImage=loadImage("Meteors.png");
  earthImage=loadImage("earth.png");
}
function setup()
{
  createCanvas(1200,600);
  back=createSprite(600,600);
  back.addImage(backImg);
  back.scale=2;
  back.velocityY=1;
  rocket=createSprite(200,370,20,20);
  rocket.addImage(rocketImage);
  rocket.scale=0.25
  earth=createSprite(580,380,200,0);
  earth.addImage(earthImage);
  earth.scale=0.9;

  meteorsGroup=new Group();
  score = 0;
}
function draw()
{
  background("lightYellow");
  
  if (gameState === "play") 
  {
    //score = score + Math.round(frameCount/60);
    rocket.x=World.mouseX;
    rocket.y=World.mouseY;

    if(back.y>300)
    {
      back.y=back.width/2; 
    }
    spawnmeteors();
    if(meteorsGroup.isTouching(earth))
    {
      earth.destroy();
      gameState = "end"
    }
    
    if(meteorsGroup.isTouching(rocket))
    {
      for(var i=0;i<meteorsGroup.length;i++)
      {  
       if(meteorsGroup[i].isTouching(rocket))
       {
            meteorsGroup[i].destroy()
            meteorsGroup.destroyEach()
            score = score+2
            } 
      
      }
    }
  }
    drawSprites();
    fill("white");
    textSize(50);
    text("Score: "+ score, 750,50);
    if (gameState === "end")
    {
      stroke("yellow");
      fill("white");
      textSize(50);
      text("Game Over", 500,250)
    }
}
function spawnmeteors()
{
  if(frameCount%30===0)
  {
    meteors=createSprite(200,10,10,10);
    meteors.addImage(meteorsImage);
    meteors.scale=0.1;
    meteors.velocityY=15;
    meteors.lifetime=800;
    meteors.x=Math.round(random(220,800));
    meteorsGroup.add(meteors); 
  } 
}