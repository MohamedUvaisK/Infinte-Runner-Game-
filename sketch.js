var score=0;
var Money=0;
var PLAY=1;
var END=0;
var jake,jakeImg;
var BG,groundImg,BGImg,invisible_ground;
var logi,logImg,logG,plant1,plant2,plant3,plant4;
var coin,bronze,silver,coinImg,goldbar,greeni,purplei,redi,coing,cloud,cloudImage,cloudsGroup,jake_collided;
var crystle,crystleGroup;
var gameOver,gameOverImg,restart,restartImg;
var gamestate="play";

  
function preload(){
jakeImg=loadAnimation("jake1.png","jake2.png","jake3.png","jake4.png","jake5.png","jake6.png");

BGImg=loadImage("background.png");

groundImg=loadImage("ground.png");

logImg=loadImage("log.png");

plant1=loadImage("plants1.png");

plant2=loadImage("plants2.png");

plant3=loadImage("plants3.png");

plant4=loadImage("plants4.png");

goldbar=loadImage("goldbar.png");

greeni=loadImage("green.png");

redi=loadImage("redcrystal.png");

gameOverImg=loadImage("gameOver.png");

restartImg=loadImage("restart.png");

cloudImage=loadImage("cloud.png");

coinImg=loadImage("coin1.png");

purplei=loadImage("purplediamond.png");

bronze=loadImage("coin2.png");

Curioussound=loadSound("Curious.wav");

jumpsound=loadSound("jump.wav");

collidesound=loadSound("collided.wav");
}

function setup() {
 //creating background   
 createCanvas(windowWidth,windowHeight);
 Curioussound.loop();
 //moving path
 BG= createSprite(width/2,height,width,2);
 BG.addImage("ground",groundImg);
 BG.x = width/2
 BG.velocityX = -(6 + 3*score/100);
//making jake
 jake=createSprite(width/20,height-60,80,80);
 jake.addAnimation("jake",jakeImg);
 jake.scale=1.8;

jake.setCollider('circle',0,0,25)
jake.debug=false;

//creating invisble ground
 invisible_ground=createSprite(120,720,300,30);
 invisible_ground.visible=false;

 gameOver=createSprite(width/2,height/2.5- 50);
 gameOver.addImage(gameOverImg);
 gameOver.scale=5.5;

 restart=createSprite(width/2,height/1.7- 20);
 restart.addImage(restartImg);
 restart.scale=3;



 logG=new Group();
 coing=new Group();
 cloudsGroup=new Group();
 crystleGroup=new Group();

score = 0;
Money=0;
}

function draw() {
  background(BGImg);
  textSize(20);
  fill("purple");
  text("Score: "+ score,90,50);

  textSize(20);
  fill("purple");
  text("Money: "+ Money,90,70);

  if(gamestate==="play"){
 gameOver.visible=false;
 restart.visible=false;
 score = score + Math.round(getFrameRate()/60);
 BG.velocityX = -(6 + 3*score/100);

 //make jake to jump
if((touches.length > 0 ||keyDown("space"))&&jake.y >= height-150){
       jumpsound.play();
       jake.velocityY=-15;
       touches = [];
   }
   //giving gravity to jake
jake.velocityY = jake.velocityY +0.8;

if(BG.x<600){
       BG.x=BG.width/2
  }  

  if(logG.isTouching(coing)){
       coing.destroyEach();
   }

  if(crystleGroup.isTouching(coing)){
       crystleGroup.destroyEach();
   }

  if(coing.isTouching(jake)){
     Money=Money+10;
     coing.destroyEach();    
  } 

  if(crystleGroup.isTouching(jake)){
       Money=Money+20;
       crystleGroup.destroyEach();    
    } 
  //make jake collide to invisibleground
 jake.collide(invisible_ground);
 spawnlog();
 spwancoin();
 crystle();
 clouds();

 if(logG.isTouching(jake)){
     collidesound.play();
     gamestate = END;   
 }
}
else if(gamestate === END){
    gameOver.visible = true;
    restart.visible = true;
    
 //set velcity of each game object to 0
 BG.velocityX=0;
 jake.velocityY=0;
 logG.setVelocityEach(0);
 coing.setVelocityEach(0);
 crystleGroup.setVelocityEach(0);
 cloudsGroup.setVelocityEach(0);

 //jake.changeAnimation("jake",jake_collided);
jake.pause();

//set lifetime of the game objects so that they are never destroyed
logG.setLifetimeEach(-1);
coing.setLifetimeEach(-1);
crystleGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

if(touches.length>0 || mousePressedOver(restart)){
    reset(); 
    touches=[];  
}
}
 drawSprites();
}

function spawnlog(){
    if(frameCount%280===0){
    var logi=createSprite(1500,height-85,500,20,30);
    logi.setCollider('circle',0,0,45)
    logi.debug=false;
   logi.velocityX=-(10+score/100);
   //generate random obstacles
   var rand = Math.round(random(1,5));
   switch(rand){
       case 1: logi.addImage(logImg);
               break;
        case 2: logi.addImage(plant1);
               break;
        case 3: logi.addImage(plant2);
               break;
        case 4: logi.addImage(plant3);
               break;            
        case 5: logi.addImage(plant4);
               break;  
        default:break;       
   }
   logG.add(logi);
   logi.depth=jake.depth;
   jake.depth+=1;

   logi.lifetime=400;
   logi.scale=0.3;
    }
}

function spwancoin(){
  if(frameCount%70===0){
    var coin=createSprite(1500,height-75,500,20,30);
    coin.setCollider('circle',0,0,45)
    coin.debug=false;
    coin.velocityX=-(10+score/100);
    //generate random coins
    var rand =Math.round(random(1,2));
    switch(rand){
        case 1: coin.addImage(bronze);
               break;
        case 2:  coin.addImage(coinImg);
               break;  
        case 3:  coin.addImage(goldbar);
               break;               
    }
    coing.add(coin)
    coin.lifetime=500;
    coin.scale=1;
    coin.depth=jake.depth;
   jake.depth+=1;
  }  
}

function clouds(){
if (frameCount % 60 === 0) {
      var cloud = createSprite(width+20,height-300,40,10);
       cloud.y = Math.round(random(100,220));
       cloud.addImage(cloudImage);
       cloud.scale = 0.5;
       cloud.velocityX = -(3+score/100);
              
        //assign lifetime to the variable
       cloud.lifetime = 500;
              
       //adjust the depth
       cloud.depth = jake.depth;
       jake.depth = jake.depth+1;
              
       //add each cloud to the group
        cloudsGroup.add(cloud);
 }
}

function crystle(){
  if(frameCount%300===0){
   var crystle =createSprite(1500,height-75,500,20,30)  
   crystle.setCollider('circle',0,0,45)
   crystle.debug=false;
   crystle.velocityX=-(10+score/100);

    //generate random coins
    var rand =Math.round(random(1,3));
    switch(rand){
        case 1: crystle.addImage(redi);
               break;
        case 2:  crystle.addImage(greeni);
               break;  
        case 3:  crystle.addImage(greeni);
               break;                
    }

    crystleGroup.add(crystle)
    crystle.lifetime=500;
    crystle.scale=0.2;
    crystle.depth=jake.depth;
   jake.depth+=1;
  }     
}

function reset(){
   gamestate = "play";
   gameOver.visible=false;
   restart.visible=false;
   
   logG.destroyEach();
   coing.destroyEach();
   crystleGroup.destroyEach();
   cloudsGroup.destroyEach(); 

   //jake.changeAnimation("jake",jakeImg);
   jake.play();

   score=0;
   Money=0;
}