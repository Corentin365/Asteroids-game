//variables pour créer les sprites
var bg, vaisseau, vi, vigroup, espace, laserg, play;
//variables pour les images
var nebulaImg, vaisseauImg,thrustImg, playImg, vieImg, rockImg, laserImg, explosionImg;

//dimension zone de jeu
var LARGEUR = 400;
var HAUTEUR = 400;

// variables états de jeu
var vie, score, best, phase; 
vie = 3;
score = 0;
best = 0;
phase = "start";
function preload(){
  //télécharger les images ici
  nebulaImg = loadImage("nebula.png");
  vaisseauImg = loadImage("spaceship.png");
  thrustImg = loadImage("thrust.png");
  playImg = loadImage("play.png");
  vieImg = loadImage("vie.png");
  rockImg = loadImage("rock.png");
  laserImg = loadImage("laser.png");
  explosionImg = loadAnimation("explosion300.png", "explosion301.png", "explosion302.png", "explosion303.png", "explosion304.png", "explosion305.png", "explosion306.png", "explosion307.png", "explosion308.png", "explosion309.png", "explosion310.png", "explosion311.png", "explosion312.png", "explosion313.png", "explosion314.png", "explosion315.png");
}

function setup(){
  createCanvas(LARGEUR,HAUTEUR)
 bg = createSprite(200,200,200,200);
  bg.addImage(nebulaImg);
  bg.scale = 1.2;
  
  vaisseau = createSprite(200,200,20,20);
  vaisseau.addAnimation("spaceship",vaisseauImg);
  vaisseau.addAnimation("thrust",thrustImg);
  vaisseau.scale = 0.15;
  vaisseau.debug = false;
  vaisseau.setCollider("rectangle",0,0,450,350);
 vigroup = createGroup();
 laserg = createGroup();
 espace = createGroup();
 play = createSprite(200, 300);
play.addImage(playImg);
play.scale = 0.1;
 vaisseau.rotation = -90;
}
function draw() {
   drawSprites();
   fill("white")
    textSize(20)
  text("best : " + best, 285, 25);
  if(score>best){
    best = score;
  }
   if(phase == "start"){
      play.visible = true;
  if(mousePressedOver(play)){
    phase = "game";
    play.visible = false;
    
  }}
  if(phase == "game"){
   
    text("Score : "+ score, 150, 25);
    if(keyDown("right")){
    vaisseau.rotation += 10;
  }
  if(keyDown("left")){
    vaisseau.rotation -= 10;
  }
    vaisseau.velocityX *= 0.95;
  vaisseau.velocityY *=0.95;
  if (keyDown("up")) {
    vaisseau.changeAnimation("thrust");
  vaisseau.velocityY += 1*Math.sin(radians(vaisseau.rotation)); 
  vaisseau.velocityX += 1*Math.cos(radians(vaisseau.rotation));
  }
  else{
    vaisseau.changeAnimation("spaceship");
  }
lasers();  
teleport(vaisseau);
asteroides();
for(var i = 0; i < espace.length; i ++){
    teleport(espace.get(i));
    if(espace.get(i).isTouching(vaisseau)){
     var explosion1 = createSprite(espace.get(i).x, espace.get(i).y);
      explosion1.addAnimation("explosion", explosionImg);
      explosion1.lifetime = 75;
      espace.get(i).destroy();
      vie -= 1;
      }
}
vies(vie);
for (var s = 0; s < espace.length; s ++){
  for (var j = 0; j < laserg.length; j ++){
    if(espace.get(s).isTouching(laserg.get(j))){
     var explosion2 = createSprite(espace.get(s).x, espace.get(s).y);
    explosion2.addAnimation("explosion300.png", explosionImg);
    explosion2.lifetime = 75;
      score += 1;
    espace.get(s).destroy();
    laserg.get(j).destroy();
 }}
}
    if(vie == 0){
      phase = "end";
    }
  }
  if(phase == "end"){
    textSize(50);
    fill("white");
    textFont("Impact");
    text("GAME OVER", 100, 200);
    play.visible = true;
    if(mousePressedOver(play)){
      phase = "game";
      vie = 3;
      play.visible = false;
      score = 0;
    }
     }
  
  
}
function teleport(sprite){
  if(sprite.x < 0){
    sprite.x = 400;
  }
if(sprite.x > 400){
    sprite.x = 0;
  }if(sprite.y < 0){ 
    sprite.y = 400;
  }if(sprite.y > 400){
    sprite.y = 0;
  }}
function asteroides(){
  if(World.frameCount %90 == 0){
   var positionx = 400*random();    
   var positiony = 400*random();
   while (Math.abs(positionx - vaisseau.x) < 100 && Math.abs(positiony - vaisseau.y) < 100) {
     positionx = 400*random();
     positiony = 400*random();
   }
   var asteroide = createSprite(positionx, positiony);
    asteroide.addAnimation("rock", rockImg);
    asteroide.scale = 0.2;
    asteroide.setCollider("circle", 0, 0, 220);
    asteroide.rotationSpeed = 10*random()-5;
    asteroide.velocityX = 10*random()-5;
    asteroide.velocityY = 10*random()-5;
    asteroide.lifetime = 200;
    espace.add(asteroide);
  }
  }
function lasers(){
  if(keyDown("space")&& laserg.length <= 0){
    var laser = createSprite(vaisseau.x + 45*Math.cos(radians(vaisseau.rotation)), vaisseau.y + 45*Math.sin(radians(vaisseau.rotation)));
    laser.addAnimation("laser.png", laserImg);
    laser.rotation = vaisseau.rotation;
    laser.velocityX = 7*Math.cos(radians(vaisseau.rotation));
    laser.velocityY = 7*Math.sin(radians(vaisseau.rotation));
    laser.lifetime = 50;
    laser.scale = 0.6;
    laser.setCollider("rectangle", -10, 0, 120, 60);
    laserg.add(laser);
  
}}
function vies(vie){
if(vigroup.length > 0){
  vigroup.destroyEach();
}
  for (var t = 0; t < vie ; t++){
   var vi = createSprite(20 + t *40, 20);
   vi.addAnimation("vie", vieImg);
   vi.scale = 0.08;
   vigroup.add(vi);
 } 
}
