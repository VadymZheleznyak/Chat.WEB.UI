var app = require('express')();
var bigInt = require("big-integer");
var CryptoJS = require("crypto-js");
var io = require('socket.io')(3000, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  });

io.on('connection',(socket)=>{

    console.log('new connection made.');

    socket.on('join', function(data){

      socket.join(data.room);

      console.log(data.user + 'joined the room : ' + data.room);

      socket.broadcast.to(data.room).emit('new user joined', {message: data.user + ' has joined this room.'});
    });


    socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {message: data.user + ' has left this room.'});

      socket.leave(data.room);
    });

    socket.on('message',function(data){

      io.in(data.room).emit('new message', {message: data.message});
    })
});