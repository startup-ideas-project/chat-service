const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*"
    }
  });
const cors = require('cors')
const { createMessageTable } = require('./DAO/create-message-table')
// APIs import
const {getComments} = require('./get-comments/get-comment')
const corsOptions = {
    origin: '*'
}
const {createRecord} = require('./DAO/write-message-DAO')
const {getMessage} = require('./service/get-message-service')

// Create data table
createMessageTable()

// app configs
app.use(cors(corsOptions))

const port = process.env.PORT || 4080
app.get(`/health`, (req, res) => {
    res.send(200)
})

// commentID is the id of the document
app.get(`/chat/:commentID`, getMessage)

io.on('connection', (socket) => {
    console.log('a user connected');
    getComments().then(data => {
        // generate socketIO
        data.data.map( commentid => {
            console.log(`A User is connected to ${commentid.commentid}`)
            socket.on(commentid.commentid, (message) => {
                console.log(`on this ${commentid.commentid}, receive message ${message}`)
                createRecord('authenticatedUser1', message, commentid.commentid)
                // emits message to ALL connected user
                io.emit(commentid.commentid, message)
            })
        })
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});