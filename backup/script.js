var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var MONSTERS = [];
var PBULLETS = [];
var MBULLETS = [];
var nob = 2;
var b = 0;
var mb = 0;
var countOfMONSTERS = 6;
var yDirection = 10;
var frames = 0;
var monsterHeight = 50;
var monsterWidth = 50;
var bulletHeight = 4;
var bulletWidth = 6;

const maxB = 100;

var GAME = {
    width: 1280,
    height: 720,
    over: false,
    score: 0,
}

var PLAYER = {
    lives: 3,
    height: 50,
    width: 50,
    x: 10,
    y: 335,
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

function initEventListeners() {
//  window.addEventListener("keydown", onkeydown);
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

// Уравление клавиатурой
// function onkeydown(event) {
//     if (event.key === "ArrowLeft") {
//         PLAYER.y = PLAYER.y - yDirection
//     }
//     if (event.key === "ArrowRight") {
//         PLAYER.y = PLAYER.y + yDirection
//     }
//     if (PLAYER.y < 0) {
//         PLAYER.y = 0
//     }
//     if (PLAYER.y + PLAYER.height > GAME.height) {
//         PLAYER.y = GAME.height - PLAYER.height
//     }
//     if (event.key === "ArrowUp") {
//         if (b === 99){
//             b = 0;
//         }
//         if (nob >= 0) {
//             PBULLETS[b].x = PLAYER.x + PLAYER.width;
//             PBULLETS[b].y = PLAYER.y + PLAYER.height / 2 - PBULLETS[b].height / 2;
//             b++;
//             nob--;
//         }
//     }
// }

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

function initMonsters() {
    for (let i = 0; i < countOfMONSTERS; i++) {
        var initX = GAME.width + i * 200;
        var initY = Math.floor(Math.random() * (GAME.height - monsterHeight));
        MONSTERS[i] = {
            x: initX,
            y: initY,
            speed: 5,
            lives: 3,
        }
    }
}

function respawnMonster(i) {
    MONSTERS[i].x = GAME.width;
    MONSTERS[i].y = Math.floor(Math.random() * (GAME.height - monsterHeight));
    MONSTERS[i].lives = 3;
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
        canvasContext.fillStyle = "red";
        canvasContext.fillRect(PBULLETS[i].x, PBULLETS[i].y, PBULLETS[i].width, PBULLETS[i].height);
    }
}

function drawMBullet() {
    for (let i = 0; i < maxB; i++){
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(MBULLETS[i].x, MBULLETS[i].y, MBULLETS[i].width, MBULLETS[i].height);
        
    }
}

function drawMonster() {
    canvasContext.fillStyle = "red";
    for (let i = 0; i < countOfMONSTERS; i++) {
        canvasContext.fillRect(MONSTERS[i].x, MONSTERS[i].y, monsterWidth, monsterHeight)
    }
}

function updateFrame() {
    frames++
    if (frames === 90) {
        monstersShoot();
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
        var losePositionX = MBULLETS[i].x <= PLAYER.x + PLAYER.width;
        var losePositionY = (PLAYER.y <= MBULLETS[i].y) && (PLAYER.y + PLAYER.height >= MBULLETS[i].y);
        var miss = MBULLETS[i].x <= -MBULLETS[i].width;
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
    }
}


function drawBackground() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, GAME.width, GAME.height)
}

function drawPlayer() {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
}

function drawFrame() {
    drawBackground();
    drawPlayer();
    drawMonster();
    drawPBullet();
    drawMBullet();
}

function play() {
    if (GAME.over !== true) {
        drawFrame();
        updateFrame();
        requestAnimationFrame(play);
    } else {
        drawFrame();
        alert("Game Over")
    }
}

initMBullets();
initPBullets();
initMonsters();
initEventListeners();
play();
