const assert = require('assert')

const client = require('socket.io-client')
const server = require('../index')

const serverAddress = 'http://localhost:1337'

import * as types from '../..//src/actions/types'


describe("Socket Server", () => {
    it("should create a socket listening on port 1337 and receive a state event on connection", (done) => {
        var socket = client(serverAddress)
        socket.on('state', (nextState) => {
            assert(nextState.game !== null) 
            done()
        })
    })
    it("should assign a unique playerId for the connected socket", (done) => {
        var socket = client(serverAddress)
        socket.on('state', (nextState) => {
            assert(nextState.playerId !== 0) 
            done()
        })
    })  
})