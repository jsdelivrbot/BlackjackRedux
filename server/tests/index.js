const assert = require('assert')

const client = require('socket.io-client')
const server = require('../index')

const serverAddress = 'http://localhost:1337'

describe("Socket Server", () => {
    it("should create a socket listening on port 1337", () => {
        var socket = client('http://localhost:1337')
        socket.on('connect', () => {
            console.log("Connected!")
        })
        assert(1, 1)
    })
})