"use strict";

var express = require("express"),
    app = express(),
    io = require("socket.io");

app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {});

const PORT = process.env.PORT || 8080;

var server = app.listen(PORT);
var socket = io.listen(server);

var circles = []

setInterval(function() {
    console.log(circles)
}, 1000)

function changePosition(newX, newY, circleName) {
    for (var i in circles) {
        if (circles[i].name == circleName) {
            circles[i].x = newX;
            circles[i].y = newY;
            break;
        }
    }
}

socket.on("connection", function (socket) {
    console.log("A user has connected")

    socket.broadcast.emit("userJoined", "A user connected to the server");

    socket.on("userCreatedCircle", function (data) {
        circles.push(data)
        socket.broadcast.emit("addCircle", data)
        socket.emit("allCircles", circles)
    })

    socket.on("updateCircle", function(data) {

        circles.some(function(item, index) {
            if(circles[index].name == data.name){
                circles.splice(index, 1);
                return true;
            }
        });

        circles.push(data);

        socket.broadcast.emit("newCirclePos", circles);
    })

    socket.on("disconnect", function () {
        console.log("user disconnected");
    })

});