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
const {getAllFiles} = require('./get-files/get-documents')
const corsOptions = {
    origin: '*'
}
const {createRecord} = require('./DAO/write-message-DAO')
const {getMessage} = require('./service/get-message-service')

// Create data table
createMessageTable()

// app configs
app.use(cors(corsOptions))

// file service APIs
const files = getAllFiles()

const port = process.env.PORT || 4080
app.get(`/health`, (req, res) => {
    res.send(200)
})

// conversationID is the id of the document
app.get(`/chat/:conversationID`, getMessage)


io.on('connection', (socket) => {
    console.log('a user connected');
    files.then(data => {
        const items = data.data.Items
        // generate socketIO
        items.map( item => {
            socket.on(item.key, (message) => {
                console.log(`on this ${item.key}, receive message ${message}`)
                createRecord('authenticatedUser1', message)
                // emits message to ALL connected user
                io.emit(item.key, message)
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