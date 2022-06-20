var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var MONSTERS = [];
var PBULLETS = [];
var MBULLETS = [];
var BBULLETS = [];
var nob = 2;
var b = 0;
var bb = 0;
var mb = 0;
var ex = 1;
var countOfMONSTERS = 6;
var yDirection = 10;
var frames = 0;
var monsterHeight = 29;
var monsterWidth = 61;
var bulletHeight = 4;
var bulletWidth = 6;
var pPic = new Image();
var bbPic = new Image();
bbPic.src = 'images/bossB.png';
pPic.src = 'images/ship2.png';
var mPic1 = new Image();
var mPic2 = new Image();
var mPic3 = new Image();
var mPic4 = new Image();
var bPic = new Image();
bPic.src = 'images/boss.png'
mPic1.src = 'images/Exhaust/ship11.png';
mPic2.src = 'images/Exhaust/ship12.png';
mPic3.src = 'images/Exhaust/ship13.png';
mPic4.src = 'images/Exhaust/ship14.png';
var backGd = new Image();
backGd.src = 'images/backGd.png';
const maxB = 100;

var GAME = {
    width: 1280,
    height: 720,
    over: false,
    boss: false,
    win: false,
    score: 0,
    backGd: new Image(),
}

var BOSS = {
    x: GAME.width + 10,
    y: 250, 
    lives: 100,
    height: 435,
    width: 105,
    speed: 1,
    bPic: new Image(),
    side: "up",
}

var PLAYER = {
    lives: 3,
    height: 35,
    width: 78,
    x: 10,
    y: 335,
    pPic: new Image(),
}

var PBULLET = {
    x: 0,
    y: GAME.width,
    speed: 10,
    height: 4,
    width: 6,
}

canvas.width = GAME.width;
canvas.height = GAME.height;

bPic.onload = function () {
    BOSS.bPic = bPic;
}

backGd.onload = function () {
    GAME.backGd = backGd;
}

pPic.onload = function () {
    PLAYER.pPic = pPic;
}

function initEventListeners() {
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("click", mouseclick);
}

function onmousemove(event) {
    if ((event.clientY + PLAYER.height < GAME.height) && (event.clientY - PLAYER.height / 2 > 0)) {
        PLAYER.y = event.clientY - PLAYER.height / 2;
    } else {
        if (event.clientY + PLAYER.height > GAME.height) {
            PLAYER.y = GAME.height - PLAYER.height;
        } else {
            PLAYER.y = 0;
        }
    }
}

function mouseclick(event) {
    if (b === 99){
         b = 0;
     }
    if (nob >= 0) {
        PBULLETS[b].x = PLAYER.x + PLAYER.width;
        PBULLETS[b].y = PLAYER.y + PLAYER.height / 2 - PBULLETS[b].height / 2;
        b++;
        nob--;
    }
}

function initMBullets() {
    for (let i = 0; i < maxB; i++) {
        MBULLETS[i] = {
            x: 0,
            y: GAME.width,
            speed: -10,
            height: 4,
            width: 6,
        }
    }
    
}

function initPBullets() {
    for (let i = 0; i < maxB; i++) {
        PBULLETS[i] = {
            x: 0,
            y: GAME.width,
            speed: 10,
            height: 4,
            width: 6,
        }
    }
}

function initBBullets() {
    for (let i = 0; i < maxB; i++) {
        BBULLETS[i] = {
            x: 0,
            y: GAME.width,
            speed: 10,
            height: 20,
            width: 30,
            speed: -15,
            bbPic: new Image(),
        }
    }
}

function initMonsters() {
    for (let i = 0; i < countOfMONSTERS; i++) {
        var initX = GAME.width + i * 200;
        var initY = Math.floor(Math.random() * (GAME.height - monsterHeight));
        MONSTERS[i] = {
            x: initX,
            y: initY,
            speed: 2,
            lives: 3,
            mPic1: new Image(),
            mPic2: new Image(),
            mPic3: new Image(),
            mPic4: new Image(),
        }
    }
}

function bossMove() {
    if (GAME.boss){
        if (BOSS.side === "up"){
            if (BOSS.y > 0){
                BOSS.y -= BOSS.speed;
            } else {
                BOSS.side = "down"
            }
        } else {
            if (BOSS.y < GAME.height - BOSS.height){
                BOSS.y += BOSS.speed;
            } else {
                BOSS.side = "up"
            }
        }
    }
}

bbPic.onload = function () {
    for (let i = 0; i < maxB; i++) {
        BBULLETS[i].bbPic = bbPic;
    }
}

mPic1.onload = function () {
    for (let i = 0; i < countOfMONSTERS; i++) {
        MONSTERS[i].mPic1 = mPic1;
    }
}
mPic2.onload = function () {
    for (let i = 0; i < countOfMONSTERS; i++) {
        MONSTERS[i].mPic2 = mPic2;
    }
}
mPic3.onload = function () {
    for (let i = 0; i < countOfMONSTERS; i++) {
        MONSTERS[i].mPic3 = mPic3;
    }
}
mPic4.onload = function () {
    for (let i = 0; i < countOfMONSTERS; i++) {
        MONSTERS[i].mPic4 = mPic4;
    }
}

function respawnMonster(i) {
    MONSTERS[i].x = GAME.width;
    MONSTERS[i].y = Math.floor(Math.random() * (GAME.height - monsterHeight));
    MONSTERS[i].lives = 3;
}

function bossShoot() {
    if (bb >= maxB){
        bb = 0;
    }
    BBULLETS[bb].x = BOSS.x;
    BBULLETS[bb].y = BOSS.y + 300;
    bb++;
    BBULLETS[bb].x = BOSS.x;
    BBULLETS[bb].y = BOSS.y + 210;
    bb++;
    BBULLETS[bb].x = BOSS.x;
    BBULLETS[bb].y = BOSS.y + 45;
    bb++;
    BBULLETS[bb].x = BOSS.x;
    BBULLETS[bb].y = BOSS.y + 130;
    bb++;
}


function monstersShoot() {
    for (let i = 0; i < countOfMONSTERS; i++){
        if (mb >= maxB){
            mb = 0;
        }
        MBULLETS[mb].x = MONSTERS[i].x;
        MBULLETS[mb].y = MONSTERS[i].y + monsterHeight / 2;
        mb++;
    }
}

function drawPBullet() {
    for (let i = 0; i < maxB; i++){
        canvasContext.fillStyle = "purple";
        canvasContext.fillRect(PBULLETS[i].x, PBULLETS[i].y, PBULLETS[i].width, PBULLETS[i].height);
    }
}

function drawMBullet() {
    for (let i = 0; i < maxB; i++){
        canvasContext.fillStyle = "red";
        canvasContext.fillRect(MBULLETS[i].x, MBULLETS[i].y, MBULLETS[i].width, MBULLETS[i].height);
        
    }
}

function drawBBullet() {
    for (let i = 0; i < maxB; i++){
        canvasContext.fillStyle = "yellow";
        canvasContext.drawImage(BBULLETS[i].bbPic, BBULLETS[i].x, BBULLETS[i].y, BBULLETS[i].width, BBULLETS[i].height);
    }
}

function drawMonster() {
    canvasContext.fillStyle = "red";
    for (let i = 0; i < countOfMONSTERS; i++) {
        if ((ex >=1) && (ex <=2)){
            if (MONSTERS[i].mPic1) {
                canvasContext.drawImage(MONSTERS[i].mPic1, MONSTERS[i].x, MONSTERS[i].y, monsterWidth, monsterHeight)
            }
        }
        if ((ex >=3) && (ex <=4)){
            if (MONSTERS[i].mPic2) {
                canvasContext.drawImage(MONSTERS[i].mPic2, MONSTERS[i].x, MONSTERS[i].y, monsterWidth, monsterHeight)
            }
        }
        if ((ex >=5) && (ex <=6)){
            if (MONSTERS[i].mPic3) {
                canvasContext.drawImage(MONSTERS[i].mPic3, MONSTERS[i].x, MONSTERS[i].y, monsterWidth, monsterHeight)
            }
        }
        if ((ex >=7) && (ex <=8)){
            if (MONSTERS[i].mPic4) {
                canvasContext.drawImage(MONSTERS[i].mPic4, MONSTERS[i].x, MONSTERS[i].y, monsterWidth, monsterHeight)
            }
        }
    }
}

function drawBoss() {
    if (BOSS.bPic) {
        canvasContext.drawImage(BOSS.bPic, BOSS.x, BOSS.y, BOSS.width, BOSS.height);
    }
}

function releaseTheKraken() {
    if ((GAME.boss) &&(BOSS.x > GAME.width - BOSS.width)){
        BOSS.x -= BOSS.speed;
        console.log(BOSS.x, GAME.width)
    }
}

function updateFrame() {
    frames++;
    ex++;
    bossMove();
    if (GAME.score === 10){
        GAME.boss = true;
    }
    if (BOSS.lives <= 0){
        GAME.win = true;
    }
    if (ex === 9) {
        ex = 1;
    }
    if (frames === 90) {
        monstersShoot();
        if (GAME.boss === true){
            bossShoot();
        }
        frames = 0;
    }
    for (let i = 0; i < countOfMONSTERS; i++) {
        MONSTERS[i].x -= MONSTERS[i].speed;
        var losePositionX = MONSTERS[i].x <= PLAYER.x + PLAYER.width;
        var losePositionY = (MONSTERS[i].y - monsterHeight <= PLAYER.y) && (MONSTERS[i].y + monsterHeight >= PLAYER.y);
        var miss = MONSTERS[i].x <= -monsterWidth
        if (miss) {
            respawnMonster(i);
        }
        if (losePositionX && losePositionY) {
            PLAYER.lives -= 1;
            respawnMonster(i);
            if (PLAYER.lives === 0) {
                GAME.over = true;
            }
        }
        for (let j = 0; j < maxB; j++){
            losePositionX = (PBULLETS[j].x >= MONSTERS[i].x) && (PBULLETS[j].x <= MONSTERS[i].x + monsterWidth);
            losePositionY = (MONSTERS[i].y <= PBULLETS[j].y) && (MONSTERS[i].y + monsterHeight >= PBULLETS[j].y);
            miss = PBULLETS[j].x >= GAME.width;
            if (miss) {
                PBULLETS[j].y = GAME.width;
                PBULLETS[j].x = 0;
                nob++;
            }
            if (losePositionX && losePositionY) {
                MONSTERS[i].lives--;
                PBULLETS[j].y = GAME.width;
                nob++;
            }
        }
        if (MONSTERS[i].lives === 0) {
            respawnMonster(i);
            GAME.score++;
        }
    }

    for (let i = 0; i < maxB; i++){
        if (PBULLETS[i].y < GAME.height) {
            PBULLETS[i].x += PBULLETS[i].speed;
        }
    }

    for (let i = 0; i < maxB; i++){
        if (MBULLETS[i].y < GAME.height) {
            MBULLETS[i].x += MBULLETS[i].speed;
        }
        BBULLETS[i].x += BBULLETS[i].speed;
        losePositionX = MBULLETS[i].x <= PLAYER.x + PLAYER.width;
        losePositionY = (PLAYER.y <= MBULLETS[i].y) && (PLAYER.y + PLAYER.height >= MBULLETS[i].y);
        miss = MBULLETS[i].x <= -MBULLETS[i].width;
        if (miss) {
            MBULLETS[i].y = GAME.width;
            MBULLETS[i].x = 0;
        }
        if (losePositionX && losePositionY) {
            PLAYER.lives -= 1;
            MBULLETS[i].y = GAME.width;
            MBULLETS[i].x = 0;
            if (PLAYER.lives === 0) {
                GAME.over = true;
            }
        }
        losePositionX = BBULLETS[i].x <= PLAYER.x + PLAYER.width;
        losePositionY = (PLAYER.y <= BBULLETS[i].y) && (PLAYER.y + PLAYER.height >= BBULLETS[i].y);
        miss = BBULLETS[i].x <= -BBULLETS[i].width;
        if (miss) {
            BBULLETS[i].y = GAME.width;
            BBULLETS[i].x = 0;
        }
        if (losePositionX && losePositionY) {
            PLAYER.lives -= 1;
            BBULLETS[i].y = GAME.width;
            BBULLETS[i].x = 0;
            if (PLAYER.lives === 0) {
                GAME.over = true;
            }
        }
    }

    for (let i = 0; i < maxB; i++){
        losePositionX = (PBULLETS[i].x >= BOSS.x) && (PBULLETS[i].x <= BOSS.x + BOSS.width);
        losePositionY = (BOSS.y <= PBULLETS[i].y) && (BOSS.y + BOSS.height >= PBULLETS[i].y);
        if (losePositionX && losePositionY) {
            BOSS.lives--;
            console.log(BOSS.lives);
            PBULLETS[i].y = GAME.width;
            nob++;
        }
    }
}


function drawBackground() {
    canvasContext.fillStyle = "black";
    canvasContext.drawImage(GAME.backGd, 0, 0, GAME.width, GAME.height)
}

function drawPlayer() {
    if (PLAYER.pPic) {
        canvasContext.drawImage(PLAYER.pPic, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
    }
}

function drawFrame() {
    drawBackground();
    releaseTheKraken()
    drawBoss();
    drawPlayer();
    drawMonster();
    drawPBullet();
    drawMBullet();
    drawBBullet();
}

function play() {
    if ((GAME.over !== true) && (GAME.win !== true)) {
        drawFrame();
        updateFrame();
        requestAnimationFrame(play);
    } else {
        drawFrame();
        if (GAME.over) {
            alert("Game Over")
        } else {
            alert("You win")
        }
    }
}

initMBullets();
initPBullets();
initBBullets();
initMonsters();
initEventListeners();
play();
