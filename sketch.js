const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;

var star, star2,starS,starS2,starIMG,dStarIMG;

var bg_img;
var food;
var rabbit;

var button2
var button, blower;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr, rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  starIMG = loadAnimation('star.png');
  dStarIMG = loadAnimation('g_star1.png')

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(700, 700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);
  
  button2 = createImg('cut_btn.png');
  button2.position(412, 30);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  mute = createImg("mute.png");
  mute.position(630,30);
  mute.size(60,60);
  mute.mouseClicked(muteSound);

  starS = createSprite(40,40,40,40);
  starS2 = createSprite(100,40,40,40);
  starS.addAnimation("fill",starIMG);
  starS.changeAnimation("empty",dStarIMG);
  starS.scale = 0.07;
  starS2.addAnimation("fill",starIMG);
  starS2.changeAnimation("empty",dStarIMG);
  starS2.scale = 0.07;
  
  star = createSprite(200,450,40,40);
  star2 = createSprite(650,400,40,40);
  star.addAnimation(starIMG);
  star.scale = 0.02;
  star2.addAnimation(starIMG);
  star2.scale = 0.02;

  blower = createImg('balloon.png');
  blower.position(50, 480);
  blower.size(130,100);
  blower.mouseClicked(blow);

  rope2 = new Rope(8, { x: 430, y: 30 });
  rope = new Rope(11, { x: 245, y: 30 });
  ground = new Ground(350, 690, 700, 20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(500, 620, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, 700 ,690);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  rope2.show();
  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(fruit, bunny, 80) == true) {
    bunny.changeAnimation('eating');
    World.remove(engine.world, fruit);
      fruit = null;
  }


  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    fruit = null;

  }
  //if (collide(fruit,star,20) == true) {
   // starS.changeAnimation("fill");
   // star.visible = false;
 // }
  if (collide(fruit,star2,20) == true) {
    starS2.changeAnimation("fill");
    star2.visible = false;
  }
}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2() {
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}


function collide(body, sprite, x) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x) {
      
      return true;
    }
    else {
      return false;
    }
  }
}

function muteSound(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}

function blow (){
Matter.Body.applyForce( fruit,{x:0,y:0},{x:0.05,y:0} );
air.play();

}