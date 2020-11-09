const Engine = Matter.Engine;

const World = Matter.World;

const Bodies = Matter.Bodies;

const Constraint = Matter.Constraint;

//Create variables here

var dog;

var happyDog;

var database;

var foodS;

var foodStock;

function preload()
{
  //load images here
  
  dogimg=loadImage("images/dogImg.png");

  happyDogimg=loadImage("images/dogImg1.png");

}

function setup() 
{

  createCanvas(900,750);
 
  engine=Engine.create();

  world=engine.world;

  dog = Bodies.circle(50,200,220);

  World.add(world,dog);

  happyDog = Bodies.circle(50,200,220);

  World.add(world,happyDog);

  database=firebase.database();
  
  foodStock=database.ref('food');

  foodStock.on("value",readStock);

}


function draw() 
{  

  background(46,139,87);

  imageMode(CENTER);

  image(dogimg,dog.position.x,dog.position.y,150,150);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  //add styles here

    stroke(4);
    textSize(35);
    fill("black");
    text("Note:Press UP_ARROW KEY to Feed Drago Milk!",100,50);
}
//Function to read values from DB

function readStock(data)
{
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x)
{
  database.ref('/').update
  ({
    food:x
  })
}