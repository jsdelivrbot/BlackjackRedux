import Blackjack from '../src/lib/Blackjack'

var io = require('socket.io')(1337)

io.on('connection', function(socket) {
    console.log('got a connection')
})