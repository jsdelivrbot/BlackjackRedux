const client = require('socket.io-client')

let socket = new client('http://localhost:1337')

socket.on('connected', (payload) => {
    console.log('Successfully connected to game with id: ', payload.playerId)
})

socket.on('error', (error) => {
    console.log("Got error: ", error)
})
