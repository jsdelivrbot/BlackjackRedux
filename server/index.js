import Blackjack from '../src/lib/Blackjack'
import { Map } from 'immutable'
import * as types from '../src/actions/types'

const MAX_PLAYERS = 5
const MATCH_START_TIME = 5 * 1000

const PORT = 1337
const blackjack = new Blackjack(1, 1, 5, NewGame)

const Server = require('socket.io')
const io = new Server(PORT)

var tableAcceptingPlayers = true

console.log("Server running on ", PORT)

let players = []

io.use((socket, next) => {
    let playerId = blackjack.SpawnPlayer()

    if(playerId !== null && tableAcceptingPlayers) {
        socket.playerId = playerId
        players.push(socket)
        return next()
    }
        
    return next(new Error({ code: 400, message: 'The lobby is full or the session is in progress and new player are not accepted, spectator mode not supported yet'}))
})

io.on('connection', (socket) => {

    socket.emit('state', GetState(socket))
    NewGame()

    socket.on('action', (action) => {
        console.log("Received action: ", action)
        switch(action.type) {
            case types.FOLD:
                blackjack.Fold()
            break;
            case types.HIT:
                blackjack.Hit()
            break;
            case types.STICK:
                blackjack.Stick()
            break;
        }

        players.forEach((player) => {
            player.emit('state', GetState(player))
        })
    })

    socket.on('disconnect', () => {
        DestroySocket(socket)        
    })

    socket.on('error', () => {
        DestroySocket(socket)
    })
})

function NewGame() {

    tableAcceptingPlayers = true 

    setTimeout(() => {
        blackjack.NewGame()
        tableAcceptingPlayers = false

        if(players.length > 0) {
            players.forEach((player) => {
                player.emit('state', GetState(player))
            })
        } else {
            NewGame()
        }

    }, MATCH_START_TIME)
}

function GetState(socket) {
    const baseState = blackjack.GameState()

    return baseState.set('playerId', socket.playerId)
}

function DestroySocket(socket) {
    blackjack.RemovePlayer(socket.playerId)
    players.splice(players.indexOf(socket), 1)

    let out = players.map((player) => { return player.playerId })
    console.log("Removed player: " + socket.playerId + " players is now: ", out)

    if(players.length === 0) {
        NewGame()
    } else {
        players.forEach((player) => {
            player.emit('state', GetState(player))
        })
    }
}
