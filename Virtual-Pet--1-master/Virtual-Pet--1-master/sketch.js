//Create variables here
var dog,dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  happyDog=loadImage('./images/dogImg1.png');
  dogImg=loadImage('./images/dogImg.png');
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,250);
  dog.addImage('running',dogImg);
  dog.scale=0.2;
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage('running',happyDog);
    foodS=foodS-1
  }
  if(foodS<=0){
    console.log("out of stock");
      dog.addImage('running',dogImg);
      textSize(50);
      fill("WHITE");
      text("Out Of Stock",100,250);
  }
 
textSize(10);
fill("blue");
text(" PRESS UP ARROW",30,30);
}

function readStock(data){
foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}

