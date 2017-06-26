import Blackjack from '../../Blackjack'
import * as players from '../../Blackjack/players'
import * as types from '../Card/types'
import * as status from '../../Blackjack/status'

const assert = require('assert')
var blackjack = new Blackjack(1, 1, 1, () => {})

describe("Blackjack Game", () => {
    it("should construct a 52 card deck when no parameters are supplied", () => {
        assert.equal(blackjack.deck.cards.length, 52)
    })
    it("should manage a deck containing 49 cards when a new game is started, once cards have been dealt", () => {
        blackjack.SpawnPlayer()
        blackjack.NewGame()
        assert.equal(blackjack.deck.cards.length, 49)
    })
    it("should construct a 104 card deck when a parameter of '2' is supplied for number of decks", () => {
        blackjack = new Blackjack(2, 1, 1, () => {})
        assert.equal(blackjack.deck.cards.length, 104)
        blackjack = new Blackjack(1, 1, 1, () => {})
    })
    it("should automatically handle the dealers turn once the player prompts to stick", () => {
        blackjack.SpawnPlayer()
        blackjack.NewGame()
        blackjack.Stick()

        assert.equal(blackjack.turn.id, players.DEALER)
    })
    it("should automatically make the player win if they have 'blackjack'", () => 
    {
        blackjack.NewGame()
        blackjack.players[0].hand.cards = [
                { suit: types.SPADES, value: types.ACE },
                { suit: types.DIAMONDS, value: types.JACK }
            ]
        blackjack.players[0].hand.score = 21

        blackjack.Stick()
        assert.equal(blackjack.winners[0], blackjack.players[0].id)
    })
    it("should allow the player to win if both the dealer and player have 21", () => {
        blackjack.NewGame()
        blackjack.players[0].hand.score = 21
        blackjack.dealer.hand.score = 21

        blackjack.CheckForWinner()

        assert.equal(blackjack.winners[0], blackjack.players[0].id)
    })
    it("should set the status of the player to BUST when they go over 21", () => {
        blackjack.NewGame()
        
        while(blackjack.players[0].hand.score <= 22) 
        {
            blackjack.players[0].hand.AddCardToHand({ suit: types.DIAMONDS, value: 10, score: [10] })
            blackjack.players[0].hand.AddCardToHand({ suit: types.HEARTS, value: 7, score: [7] })
        }
        
        assert.equal(blackjack.players[0].hand.status, status.BUST)
    })
    it("should deal the player 2 cards upon the game starting", () => {
        blackjack.NewGame()

        assert.equal(blackjack.players[0].hand.cards.length, 2)
    })
    it("should deal the dealer 1 card upon the game starting", () => {
        blackjack.NewGame()

        assert.equal(blackjack.dealer.hand.cards.length, 1)
    })
    it("should increment the players hand size by 1 if they choose to hit", () => {
        blackjack.NewGame()
        let oldLen = blackjack.players[0].hand.cards.length
        blackjack.Hit()

        assert.equal((blackjack.players[0].hand.cards.length - oldLen), 1)
    })
    it("should force the dealer to keep 'hitting' until they have a score greater than the player, even if they go bust", () => {
        blackjack.NewGame()
        blackjack.Stick()

        return blackjack.players[0].hand.score < blackjack.dealer.hand.score
    })
    it("should find the best combination of aces in a hand to cause the player not to bust", () => {
        blackjack.NewGame()
        blackjack.players[0].hand.cards = []
        blackjack.players[0].hand.AddCardToHand({ suit: types.SPADES, value: types.ACE, score: [1, 11] })
        blackjack.players[0].hand.AddCardToHand({ suit: types.CLUBS, value: types.ACE, score: [1, 11] })
        blackjack.players[0].hand.AddCardToHand({ suit: types.HEARTS, value: types.ACE, score: [1, 11] })
        blackjack.players[0].hand.AddCardToHand({ suit: types.DIAMONDS, value: types.ACE, score: [1, 11] })
        blackjack.players[0].hand.AddCardToHand({ suit: types.DIAMONDS, value: 10, score: [10] })
        blackjack.players[0].hand.AddCardToHand({ suit: types.HEARTS, value: 7, score: [7] })

        assert.equal(blackjack.players[0].hand.score, 21)
    })
    it("should only allow only one player to win each game", () => {
        blackjack = new Blackjack(1, 1, 1, () => {})
        blackjack.SpawnPlayer()
        blackjack.NewGame()

        blackjack.Hit()
        blackjack.Stick()

        blackjack.NewGame()

        return (blackjack.players[0].wins === 1 && blackjack.dealer.wins === 0) || (blackjack.players[0].wins === 0 && blackjack.dealer.wins === 1)
    })
})