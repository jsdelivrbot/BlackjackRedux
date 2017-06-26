const assert = require('assert')

const client = require('socket.io-client')
const server = require('../index')


describe("Socket Server", () => {
    it("should create a socket listening on port 1337", () => {
        var socket = client()
    })
})