import Blackjack from '../src/lib/Blackjack'

const PORT = 1337
const blackjack = new Blackjack(1, 1, 2)

const Server = require('socket.io')
const io = new Server(PORT)


console.log("Server running on ", PORT)

let players = []

io.use((socket, next) => {
    let playerId = blackjack.SpawnPlayer()

    if(playerId !== null) {
        socket.playerId = playerId
        players.push(socket)
        return next()
    }
        
    return next(new Error({ code: 400, message: 'The lobby is full, spectator mode not supported yet'}))
})

io.on('connection', (socket) => {

    socket.emit('connected', { playerId: socket.playerId })

    

    socket.on('disconnect', () => {
        DestroySocket(socket)        
    })

    socket.on('error', () => {
        DestroySocket(socket)
    })
})

function DestroySocket(socket) {
    blackjack.RemovePlayer(socket.playerId)
    players.splice(players.indexOf(socket), 1)

    let out = players.map((player) => { return player.playerId })
    console.log("Removed player: " + socket.playerId + " players is now: ", out)
}
