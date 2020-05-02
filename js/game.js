let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");


let select;
if(localStorage.getItem('Character') == null){
    select = "MaleA";
}
else{
    select = localStorage.getItem('Character');
}

let selectNPC = "Zombie";


let Game = {
    border:0,
    borderFrontGroung: 0,
    borderNPCState:1280,
    borderNotNPCState:853,    
    start:false,
    distance:0,
    toggleZone:false,
    warZone:false,
    blockZone:false,
    distanceBetZone:3000,
    path:0,
    maxPoint:2000,
    over:false,
    victory:false,
    endGame:false,
    laverOver:"You lose!",
}

Game.border = Game.borderNotNPCState;
Game.borderFrontGroung = Game.borderNotNPCState;

let Ground = {
    back: new Image(),
    front: new Image(),
    frontPosX:0,
    frontPosY:570,
    frontWidth:1280,
    frontHeight:150,
}

Ground.back.src = "img/Background/back.png";
Ground.front.src = "img/Background/front.png";

let Sound = {
    theme: new Audio("sounds/theme.mp3"),
    battle: new Audio("sounds/epic.mp3"),
    footstep: new Audio("sounds/footstep03.ogg"),     
    NPC: new Audio("sounds/footstep03.ogg"), 
    monsterDying: new Audio("sounds/ZombieDeath1.ogg"),   
    chew: new Audio("sounds/chew.wav"),  
    victory: new Audio("sounds/victory.mp3"),   
    lose: new Audio("sounds/lose.mp3"),    
}

Sound.theme.volume = "0.5";
Sound.theme.loop = true;
Sound.battle.volume = "0.5";
Sound.battle.loop = true;
Sound.footstep.volume = "0.4";
Sound.monsterDying.volume = "1";
Sound.NPC.volume = "0.4";
Sound.NPC.loop = true;
Sound.chew.volume = "0.9";
Sound.victory.volume = "0.9";
Sound.lose.volume = "0.9";

let Objects = {
    hp: new Image(),
    clock: new Image(),
    score: new Image(),
    panel:new Image(),
    bugle: new Image(),
    Rbugle: new Image(),
    home: new Image(),
    replay: new Image(),
}

Objects.hp.src = "img/hp.png";
Objects.bugle.src = "img/bugle.png";
Objects.Rbugle.src = "img/Rbugle.png";
Objects.home.src = "img/home.png";
Objects.replay.src = "img/replay.png";
Objects.clock.src = "img/clock.png";
Objects.score.src = "img/score.png";
Objects.panel.src = "img/panel.png";

let Player = {
    x: 100,
    y: 360,
    img: new Image(),
    img2: new Image(),
    toggleImage: new Image(),    
    jumping:false,
    onJumpTop:false,
    onPlatform:false,
    width:192,
    height:256,
    speedJump:15,
    jumplenght:200,      
    delayJump:150, 
    fixbottom: 360,
    bottom:360,
    yPosImg: 0,
    xPosImg: 0,
    speed:3,
    heal:5,
    hp:100,
    score:0,
    counterFrame:0,
}

Player.img.src = "img/" + select + "/character.png";
Player.img2.src = "img/" + select + "/character_left.png";
Player.toggleImage.src =  Player.img.src;

let Platform = {
    img: new Image(),
    x:50,
    y:390,
    width:256,
    height:127,
    enebled:false,
        
    collision(Item1,Item2){
        return  ((Item2.x <= (Item1.x+43) && (Item2.x + Item2.width) >= (Item1.x+43)) || (Item2.x <= (Item1.x + Item1.width-70) && (Item2.x + Item2.width) >= (Item1.x + Item1.width-70))) && ((Item1.y+Item1.height) <= Item2.y+Player.speedJump && (Item1.y+Item1.height) >= Item2.y);
        //Для монстров +13 -30
    },
}

Platform.img.src = "img/Background/platform.png";

let NPC = {
    img: new Image(),
    img2: new Image(),
    toggleImage: new Image(),
    aLive:false,
    width:192,
    height:256,
    yPosImg: 0,
    xPosImg: 0,
    speed:1,
    kspeed:0.3,
    x: 900 - 256,
    y: 360,
    counterFrame: 0,
    kill(Item1,Item2){
        return (((Item2.x+13) <= (Item1.x+13) && (Item2.x + Item2.width-30) >= (Item1.x+13)) || (Item2.x+13 <= (Item1.x + Item1.width-30) && (Item2.x + Item2.width-30) >= (Item1.x + Item1.width-30))) && ((Item1.y + Item1.height) >= Item2.y+23 && (Item1.y + Item1.height) <= Item2.y+23 + Player.speedJump)
    },
    collisionDamage(Item1,Item2){
        return  (((Item2.x+13) <= (Item1.x+13) && (Item2.x + Item2.width-30) >= (Item1.x+13)) || (Item2.x+13 <= (Item1.x + Item1.width-30) && (Item2.x + Item2.width-30) >= (Item1.x + Item1.width-30))) && (((Item2.y+40) <= (Item1.y+40) && (Item2.y + Item2.height) >= (Item1.y+40)) || (Item2.y+40 <= (Item1.y + Item1.height) && (Item2.y + Item2.height) >= (Item1.y + Item1.height)));
        //Для монстров +13 -30
    },
}

NPC.img.src = "img/" + selectNPC + "/character.png";
NPC.img2.src = "img/" + selectNPC + "/character_left.png";
NPC.toggleImage.src =  NPC.img2.src;

let Controler ={
    left:false,
    right:false,
    jump:false,
}

let Heal ={
    img:new Image(),
    enebled:false,
    x:0,
    y:0,
    width:78,
    height:72,
    take(Item1,Item2){
        return  (((Item2.x+13) <= (Item1.x) && (Item2.x + Item2.width-30) >= (Item1.x)) || (Item2.x+13 <= (Item1.x + Item1.width) && (Item2.x + Item2.width-30) >= (Item1.x + Item1.width))) && (((Item2.y+40) <= (Item1.y) && (Item2.y + Item2.height) >= (Item1.y)) || (Item2.y+40 <= (Item1.y + Item1.height) && (Item2.y + Item2.height) >= (Item1.y + Item1.height)));
    },
}
Heal.img.src = "img/heal.png";

let bPosX = Player.xPosImg;
let bPosY = Player.yPosImg;
let animationOn = false;

let seconds = 0;
let minutes = 0;
let fixsec;

function startTime(){
    if(!Game.over){
        seconds++;
        if(seconds >= 60){
            seconds = 0;
            minutes++;
        }
        //console.log("Time: " + minutes + " Minutes " + seconds + " Seconds" );
        setTimeout(startTime,1000);
    }
};

function startGame(){
    startTime();
    animationNPC();
    Sound.theme.play();      
}

function watcher() {      
    if(Game.distance >= Game.distanceBetZone){
        //console.log("Zone done!");
        Game.blockZone = true;                
    }
    if(Game.warZone && !NPC.aLive)
    {
        Game.distance = 0;
        Game.border = Game.borderNotNPCState;
        Game.borderFrontGroung = Game.borderNotNPCState;
        Game.toggleZone = false;
        Game.warZone = false;
        NPC.speed += NPC.kspeed;
        Heal.enebled = true;
        Heal.x = Platform.x + 89;
        Heal.y = Platform.y - Heal.height - 5;
        Sound.theme.play();
        Sound.battle.pause();
    }
    if(Player.score >= Game.maxPoint)
    {
        Game.over = true;
        Game.victory = true;
        Game.laverOver = "You win!";
    }
    if(Player.hp <=0)
    {
        Game.over = true;
    }
    if(Heal.enebled && Heal.take(Heal,Player))
    {
        Player.hp += Player.heal;
        Heal.enebled = false;
        Sound.chew.play();
    }
}

function drawPanel(){
    /* ctx.fillStyle = "Red";
    ctx.fillRect(0,0,1280,50);
    ctx.fillStyle = "Black";
    ctx.fillRect(4,4,1272,42); */
    ctx.drawImage(Objects.panel,0,0,canvas.width,50);
    ctx.drawImage(Objects.hp,5,6,40,40);
    ctx.drawImage(Objects.score,500,5,40,40);
    ctx.drawImage(Objects.clock,canvas.width - 45,5,40,40);
}

function drawTime() {    
    if(seconds < 10){
        fixsec = "0" + seconds;
    }
    else{
        fixsec = seconds;
    }   
    ctx.font = "bold 40px Calibri";
    ctx.textBaseline = "top";
    ctx.textAlign = "end";
    ctx.fillStyle = "white";
    ctx.fillText(minutes + ":" + fixsec, canvas.width-50, 8);
}

function drawHp() { 
    /* ctx.fillStyle = "White";    
    ctx.fillRect(60,5,204,40); */ 
    /* ctx.fillStyle = "Red";    
    ctx.fillRect(62,7,Player.hp*2,36);  */ 
    ctx.font = "bold 40px Calibri";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillStyle = "White";
    ctx.fillText(Math.round(Player.hp), 60, 8);  
}

function drawScore() {    
    ctx.font = "bold 40px Calibri";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillStyle = "White";
    ctx.fillText(Player.score, 560, 8);
}

function gameover() {
    //Конец игры
    window.removeEventListener("keydown", keydown);
    window.removeEventListener("keyup", keyup);
    Sound.NPC.pause();
    Sound.battle.pause();
    Sound.theme.pause();
    Platform.enebled = false;
    NPC.alive = false;
    if(!Game.endGame){    
        if(Game.victory){
            Sound.victory.play();
        }
        else{
            Sound.lose.play();
        }
        Game.endGame = true;
        canvas.addEventListener("mousedown",mouseDown);
    }
    ctx.fillStyle = "#560abd";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(Game.victory){
        ctx.drawImage(Objects.bugle,0,160,300,300);
        ctx.drawImage(Objects.Rbugle,1280-300,160,300,300);
    }
    ctx.drawImage(Objects.home,590,600);
    ctx.drawImage(Objects.replay,590,480);
    ctx.font = "bold 60px Calibri";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(Game.laverOver, 640, 100);
    ctx.textAlign = "start";
    ctx.drawImage(Objects.hp,550,200,40,40);
    ctx.fillText(Math.round(Player.hp), 640, 196); 
    ctx.drawImage(Objects.score,550,250,40,40);
    ctx.fillText(Player.score, 640, 246);
    ctx.drawImage(Objects.clock,550,300,40,40);  
    ctx.fillText(minutes + ":" + fixsec, 640, 296);     
}

function mouseDown(e) {
    console.log(e.offsetX + "   " + e.offsetY);
    console.log(e);
    if((590 <= e.offsetX && 690 >= e.offsetX) && (600 <= e.offsetY && 700 >= e.offsetY)){
        //home
        console.log("Go to home!");
        document.location.href = "index.html";
    }
    if((590 <= e.offsetX && 690 >= e.offsetX) && (480 <= e.offsetY && 580 >= e.offsetY)){
        //replay
        console.log("Replay");
        window.location.reload();
    }
}

function draw(){
    move();
    moveGround();
    if(!Game.over && NPC.aLive){
        IiNPC(Player,NPC);
    }
    watcher();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ctx.drawImage(Ground.back,0,0,canvas.width,canvas.height-100);
    ctx.drawImage(Ground.front,Ground.frontPosX,Ground.frontPosY,Ground.frontWidth,Ground.frontHeight);
    ctx.drawImage(Ground.front,Ground.frontPosX+canvas.width,Ground.frontPosY,Ground.frontWidth,Ground.frontHeight);
    
    if(Platform.enebled){
        ctx.drawImage(Platform.img,Platform.x,Platform.y,Platform.width,Platform.height);
    }
    if(Heal.enebled){
        ctx.drawImage(Heal.img,Heal.x,Heal.y,Heal.width,Heal.height);
    }
    if(NPC.aLive){
        ctx.drawImage(NPC.toggleImage,NPC.xPosImg,NPC.yPosImg,NPC.width,NPC.height,NPC.x,NPC.y,NPC.width,NPC.height);
    }
    //ctx.fillRect(Player.x+13,Player.y-Player.jumpHeight+40,Player.width-30,Player.height-40);
    
    ctx.drawImage(Player.toggleImage,Player.xPosImg,Player.yPosImg,Player.width,Player.height,Player.x,Player.y,Player.width,Player.height);
    drawPanel();
    drawHp();
    drawScore();
    drawTime();  
    
    if(Game.over){
        gameover();
    }

    requestAnimationFrame(draw);
}

function keydown(e){       
    if(!Game.start){
        startGame();
        Game.start = true;
    }
    switch (e.keyCode) {
        case 32:
        case 38:
            Controler.jump = true;         
            break;
    
        case 77:
            Sound.theme.pause();       
            break;

        case 65:
        case 37:                    
            Controler.left = true;
            Player.toggleImage.src =  Player.img2.src; 
            if(!animationOn){
                animation();
            }            
            break;

        case 68:
        case 39:                         
            Controler.right = true;
            Player.toggleImage.src =  Player.img.src; 
            if(!animationOn){
                animation();
            }            
            break;

        default:            
            console.log(e.keyCode);  
            break;
    }     
}

function move(){   
    
    if(Platform.enebled && Player.onJumpTop && Platform.collision(Player,Platform)){
        Player.y = Platform.y - Player.height +7;            
        Player.jumping = false;
        Player.xPosImg  = bPosX;
        Player.yPosImg  = bPosY;         
        Player.onJumpTop = false;   
        Player.fixbottom = Player.y; 
        Player.onPlatform = true;
        if(!animationOn){
            animation();
        }              
    }
    else if(Platform.enebled && !Player.jumping && Player.onPlatform && !Platform.collision(Player,Platform)){
        Player.onPlatform = false; 
        Player.onJumpTop = true; 
    }    
        
    if(Player.onJumpTop && Player.y < Player.bottom)
    {              
        Controler.jump = false;   
        Player.y += Player.speedJump;
        if(NPC.aLive && NPC.kill(Player,NPC)){
            NPC.aLive = false;
            Sound.NPC.pause();
			if(!Game.over){
				Sound.monsterDying.play();  
			}			
            Player.score += 100;           
        }
        if(Player.y <= Player.bottom && Player.y >= Player.bottom - Player.speedJump)
        {
            Player.onJumpTop = false;
            Player.jumping = false;
            Player.xPosImg  = bPosX;
            Player.yPosImg  = bPosY; 
            Sound.footstep.play();   
            Player.y = Player.bottom;            
            Player.fixbottom = Player.bottom; 
            Player.onPlatform = false; 
            if(!animationOn){
                animation();
            }            
        }          
    }
    if(Controler.jump)
    {
        Player.yPosImg = Player.height * 2;
        Player.xPosImg = Player.width * 6;
        Player.jumping = true;
        Player.y -= Player.speedJump;  
        if(Player.y <= Player.fixbottom - Player.jumplenght)
        {             
            setTimeout(()=>{
                Controler.jump = false;   
                Player.onJumpTop = true;
            },Player.delayJump);
        }      
    }    

    if(NPC.aLive && NPC.collisionDamage(Player,NPC) && Player.hp >= 0){
        Player.hp-=0.5;
    }

    if(Controler.left && Player.x >= 0){
        Player.x -= Player.speed;        
        Game.distance -= Player.speed;
        Game.path -= Player.speed;      
    }
    if(Controler.right && Player.x <= Game.border){
        Player.x += Player.speed;  
        Game.distance += Player.speed; 
        Game.path += Player.speed;      
    }
}

function animation() {  
    
    if(!Game.over && (Controler.right || Controler.left) && !Player.jumping){
        Player.yPosImg = Player.height * 4;
        Player.xPosImg = Player.width * Player.counterFrame;        
        animationOn = true;
        Player.counterFrame++
        if(Player.counterFrame>7){
            Player.counterFrame = 0;
        }
        //console.log(Game.distance);  
        Sound.footstep.play();
        setTimeout(animation,100);            
    }
    else{       
        animationOn = false;           
        Player.xPosImg  = bPosX;
        Player.yPosImg  = bPosY; 
        Player.counterFrame = 0;
    }    
}

function animationNPC() {  
    if(!Game.over && NPC.aLive){
        NPC.yPosImg = NPC.height * 4;
        NPC.xPosImg = NPC.width * NPC.counterFrame;    
        NPC.counterFrame++;
        if( NPC.counterFrame>7){
            NPC.counterFrame = 0;
        }
        Sound.NPC.play();
        setTimeout(animationNPC,100); 
    }     
}

function IiNPC(Item1,Item2) {
    if(Item1.jumping || Player.onPlatform || Player.onJumpTop)
    {
        if(Item1.x > Item2.x && Item2.x > 0){
            Item2.x -= Item2.speed/2;
            NPC.toggleImage.src =  NPC.img2.src;
        }
        else if(Item1.x < Item2.x && Item2.x < Game.borderNPCState - 256){
            Item2.x += Item2.speed/2;
            NPC.toggleImage.src =  NPC.img.src;
        }
    }
    else{
        if(Item1.x > Item2.x){
            Item2.x += Item2.speed;
            NPC.toggleImage.src =  NPC.img.src;
        }
        else{
            Item2.x -= Item2.speed;
            NPC.toggleImage.src =  NPC.img2.src;
        }
    }
}

function moveGround() {
    if(Player.x > Game.border)
    {
        Player.x -= Player.speed;
    }
    if(Player.x >= Game.borderFrontGroung && Controler.right){
        Game.distance += Player.speed;
        Game.path += Player.speed;
        Ground.frontPosX -= Player.speed;
        if(Platform.enebled){
            Platform.x -= Player.speed;
        }
        if(Heal.enebled){
            Heal.x -= Player.speed;
        }
        if(Game.blockZone)
        {
            if(!Platform.enebled)
            {
                Platform.enebled = true;
                Platform.x = Game.border + getRandomArbitrary(428,canvas.width-Platform.width-50);
                Platform.y =  getRandomArbitrary(200,350);
            }
            if(Game.border > 0 && Game.border < Player.speed){
                Game.blockZone = false;
                Game.toggleZone = true;
            }
            Game.distance = -200;
            Game.borderFrontGroung -= Player.speed;            
            Game.border -= Player.speed;            
        }
        if(Game.toggleZone)
        {
           Game.border = Game.borderNPCState - Player.width;
           Game.borderFrontGroung = Game.borderNPCState + 256;
           if(!Game.warZone){
                battle();
           }
        }
        if (Ground.frontPosX <= -Ground.frontWidth) {
            Ground.frontPosX = 0;
        }
        if(Platform.enebled && Platform.x < -Platform.width*2)
        {
            Platform.enebled = false;
            Heal.enebled = false;
        }
    }

}

function battle() {
    Game.warZone = true;
    NPC.x = canvas.width - 256;
    NPC.aLive = true;
    animationNPC();
    Sound.theme.pause();
    Sound.battle.play();    
}

function keyup(e){       
    switch (e.keyCode) {
        case 65:
        case 37: 
            Controler.left = false;
            Sound.footstep.pause(); 
            break;

        case 68:
        case 39:
            Controler.right = false;
            Sound.footstep.pause(); 
            break;
    
        default:
            break;
    }
}

window.onload = function () {
    preloader();  
    draw();
    requestAnimationFrame(draw);   
    this.addEventListener("keydown",keydown);
    this.addEventListener("keyup",keyup);
}

function preloader() {
    setTimeout(function(){
        var preloader = document.getElementById('preloader');
        if(!preloader.classList.contains('done')){
            preloader.classList.add('done');
			setTimeout(()=>{
				document.body.removeChild(preloader);				
			},1000);			
        }

    },1000);//минимальное время отображения
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}