"use strict";

var express = require("express"),
    app = express(),
    io = require("socket.io");

app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res) {});

const PORT = process.env.PORT || 8080;

var server = app.listen(PORT);
var socket = io.listen(server);

socket.on("connection", function(socket) {

});
