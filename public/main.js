var socket = io();

var canvas = document.getElementById("ctx")
var ctx = canvas.getContext("2d");

socket.on("userJoined", function (data) {
    console.log(data)
});

socket.on("allCircles", function (data) {
    getAllCircles(data)
})

socket.on("addCircle", function (data) {
    console.log(data);
    addCircle(data);
})

socket.on("updateCircles", function(data) {
    updateCircles(data);
})

socket.on("newCirclePos", function(data) {
    updateCircles(data);
})

var player = {
    startX: canvas.width / 2,
    startY: canvas.height / 2,
    radius: 10,
    name: "something"
}

var speed = 3;
var allCircles = []

var startCircleName = prompt("What is the name of your circle?");

randX = Math.floor(Math.random() * 1280) + 1;
randY = Math.floor(Math.random() * 720) + 1;

var startCircle = {
    x: randX,
    y: randY,
    radius: player.radius,
    name: startCircleName
}

socket.emit("userCreatedCircle", startCircle);

allCircles.push(startCircle)

function makeCircle() {}

// Draw circle.
function drawCircles() {
    allCircles.forEach(function (circle) {
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        //console.log(allCircles)
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
            sendUpdatedCircle();
            break;
        }
    }
}

function move() {
    if (LEFT && startCircle.x > 10) {
        startCircle.x -= speed;
        changePosition(startCircle.x, startCircle.y)
    } else
    if (RIGHT && startCircle.x < 1268) {
        startCircle.x += speed;
        changePosition(startCircle.x, startCircle.y)
    } else
    if (UP && startCircle.y > 12) {
        startCircle.y -= speed;
        changePosition(startCircle.x, startCircle.y)
    } else
    if (DOWN && startCircle.y < 710) {
        startCircle.y += speed;
        changePosition(startCircle.x, startCircle.y)
    }

}

document.onkeydown = function (e) {
    if (e.keyCode == 37) LEFT = true;
    if (e.keyCode == 39) RIGHT = true;
    if (e.keyCode == 38) UP = true;
    if (e.keyCode == 40) DOWN = true;
}

document.onkeyup = function (e) {
    if (e.keyCode == 37) LEFT = false;
    if (e.keyCode == 39) RIGHT = false;
    if (e.keyCode == 38) UP = false;
    if (e.keyCode == 40) DOWN = false;
}

function getAllCircles(circles) {
    circles.forEach(function (circle) {
        if (circle.name !== startCircleName) {
            allCircles.push(circle)
        }
    })
}

function addCircle(circle) {
    allCircles.push(circle)
}

function updateCircles(circles) {
    allCircles = circles;
}

function sendUpdatedCircle() {
    var circleToSend;

    allCircles.forEach(function (circle) {
        if (circle.name == startCircleName) {
            circleToSend = circle;
        }
    })

    socket.emit("updateCircle", circleToSend)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(update, 10);

function update() {
    clearCanvas();
    drawCircles();
    move();
    //   sendCircles();
}