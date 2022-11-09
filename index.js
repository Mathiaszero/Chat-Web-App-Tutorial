//tut based on https://socket.io/get-started/chat

//import the express package
const express = require('express');
//shorten express package as app
const app = express();
//import the http package
const http = require('http');
const { isObject } = require('util');
//create a new server
//app becomes function handler to supply express to http server
const server = http.createServer(app);
//import socket.io
const { Server } = require('socket.io');
//reference io server object
const io = new Server(server);

//v1
/*
//defined route handler that's called when we hit website home
app.get('/', (req, res) =>{
    res.send('<h1>Hello world</h1>');
})
*/

//send to html for less confusing code
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//only detects if user opens/closes tab
/*
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
*/
//puts user chat in bash
/*
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});
*/
//puts user chat on webpage
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

//http server starts and listens to port 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
})
