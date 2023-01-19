const express = require('express');

const app = express();
require('dotenv').config()
const http = require('http').createServer(app);

// midleware connection
app.use(express.static(__dirname + '/public'))
    // uploading my html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket connection
const io = require('socket.io')(http)

// making socket connection in server si
io.on('connection', (socket) => {

    socket.on('message', (msg) => {
        console.log("connected")
        socket.broadcast.emit('message', msg)
    });

});
// listening
http.listen(process.env.PORT || 7000, () => {
    console.log('listening at port no. 7000');
})