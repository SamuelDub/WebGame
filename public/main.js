var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1;
}

function movedown() {
    myGamePiece.speedY += 1;
}

function moveleft() {
    myGamePiece.speedX -= 1;
}

function moveright() {
    myGamePiece.speedX += 1;
}

document.onkeydown = function (event) {
    console.log("working")

    var left = true;
    var right = true;
    var up = true;
    var down = true;

    if (myGamePiece.speedX == 2) {
        right = false;
    } else if (myGamePiece.speedX == -2) {
        left = false;
    } else if (myGamePiece.speedY == 2) {
        down = false;
    } else if (myGamePiece.speedY == -2) {
        up = false;
    }

    if (event.keyCode == 39 && right == true) {
        moveright();
    } else if (event.keyCode == 38 && up == true) {
        moveup();
    } else if (event.keyCode == 40 && down == true) {
        movedown();
    } else if (event.keyCode == 37 && left == true) {
        moveleft();
    }
}