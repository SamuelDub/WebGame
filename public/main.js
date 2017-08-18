var canvas = document.getElementById("ctx")
var ctx = canvas.getContext("2d");

var player = {
    startX: canvas.width / 2,
    startY: canvas.height / 2,
    radius: 10,
    name: "something"
}

var speed;speed
var allCircles = []

var startCircleName = prompt("What is the name of your circle?");
var startCircle = {
    x: player.startX,
    y: player.startY,
    radius: player.radius,
    name: startCircleName
}

allCircles.push(startCircle)

function makeCircle() {}

// Draw circle.
function drawCircles() {
    allCircles.forEach(function (circle) {
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#07C";
        ctx.fill();
    });
}

var UP = false;
var DOWN = false;
var LEFT = false;
var RIGHT = false;

function changePosition(x, y) {
   for (var i in allCircles) {
     if (allCircles[i].name == startCircleName) {
        allCircles[i].x = x;
        allCircles[i].y = y;
        console.log("changed")
        break;
     }
   }
}

function move() {
    console.log(startCircle)
    console.log(startCircle.x)
    console.log(startCircle.y)
    if (LEFT && startCircle.x > 10) {
        console.log("moved")
        startCircle.x -= speed;
        changePosition(startCircle.x, startCircle.y)
    } else
    if (RIGHT && startCircle.x < 1268) {
        console.log("moved")
        startCircle.x += speed;
        changePosition(startCircle.x, startCircle.y)
    } else
    if (UP && startCircle.y > 12) {
        console.log("moved")
        startCircle.y -= speed;
        changePosition(startCircle.x, startCircle.y)
    } else
    if (DOWN && startCircle.y < 710) {
        console.log("moved")
        startCircle.y += speed;
        changePosition(startCircle.x, startCircle.y)
    }

}

document.onkeydown = function (e) {
    if (e.keyCode == 37) LEFT = true;
    if (e.keyCode == 39) RIGHT = true;
    if (e.keyCode == 38) UP = true;
    if (e.keyCode == 40) DOWN = true;
    // if (e.keyCode == 13) {
    //     makeCircle()
    //     console.log("drew circle")
    // }
}

document.onkeyup = function (e) {
    if (e.keyCode == 37) LEFT = false;
    if (e.keyCode == 39) RIGHT = false;
    if (e.keyCode == 38) UP = false;
    if (e.keyCode == 40) DOWN = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(update, 10);

function update() {
    clearCanvas();
    drawCircles();
    move();
}