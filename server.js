//This file will contain server code that handle socket data exchanges 
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/peerjs', peerServer);
app.get("/", (req, res) => {
    res.redirect(`/${uuidV4()}`);
})
app.get("/:room", (req, res) => {
    res.render('room', { roomId: req.params.room });
})
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);

        // messages
        socket.on("SentMessage", (message) => {
            //send message to the same room
            io.emit("createMessage", message);
        });
        socket.on('disconnect', (roomId, userId) => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });
    });

});
server.listen(process.env.PORT||3030);
