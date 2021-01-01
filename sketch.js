var dog , dogImage , happyDogImage;
var database;
var foodS , foodStock;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(600,600);
  
  database = firebase.database();

  dog = createSprite(300,350);
  dog.addImage(dogImage);
  dog.scale = 0.3
   
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
 
  background(46, 139, 87);
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
   
  }
 
  drawSprites();

  textSize(25);
  fill("brown");
  text("Food Remaining"+foodS,100,75);
  text("NOTE:Press Up Arrow Key To Feed Dog",100,30);

  if(foodS === 0){
    dog.addImage(happyDogImage)
  }
}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0
  }else{
    x -= 1;
  }
database.ref('/').update({
  Food : x
})
}