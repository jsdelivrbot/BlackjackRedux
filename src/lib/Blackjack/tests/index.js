import Blackjack from '../../Blackjack'
import * as players from '../../Blackjack/players'
import * as types from '../Card/types'
import * as status from '../../Blackjack/status'

const assert = require('assert')
var blackjack = new Blackjack()

describe("Blackjack Game", () => {
    it("should construct a 52 card deck when no parameters are supplied", () => {
        assert.equal(blackjack.deck.cards.length, 52)
    })
    it("should manage a deck containing 49 cards when a new game is started, once cards have been dealt", () => {
        blackjack.NewGame()
        assert.equal(blackjack.deck.cards.length, 49)
    })
    it("should construct a 104 card deck when a parameter of '2' is supplied for number of decks", () => {
        blackjack = new Blackjack(2, 1)
        assert.equal(blackjack.deck.cards.length, 104)
        blackjack = new Blackjack()
    })
    it("should automatically handle the dealers turn once the player prompts to stick", () => {
        blackjack.NewGame()
        blackjack.Stick()

        assert.equal(blackjack.turn, players.DEALER)
    })
    it("should automatically make the player win if they have 'blackjack'", () => 
    {
        blackjack.NewGame()
        blackjack.player.cards = [
                { suit: types.SPADES, value: types.ACE },
                { suit: types.DIAMONDS, value: types.JACK }
            ]
        blackjack.player.score = 21

        blackjack.Stick()
        assert.equal(blackjack.winner, players.PLAYER)
    })
    it("should allow the player to win if both the dealer and player have 21", () => {
        blackjack.NewGame()
        blackjack.player.score = 21
        blackjack.dealer.score = 21

        blackjack.CheckForWinner()

        assert.equal(blackjack.winner, players.PLAYER)
    })
    it("should set the status of the player to BUST when they go over 21", () => {
        blackjack.NewGame()
        
        while(blackjack.player.score <= 22) 
        {
            blackjack.Hit()
        }
        
        assert.equal(blackjack.player.status, status.BUST)
    })
    it("should cause the dealer to increment his 'win' counter when a player folds", () => {
        blackjack = new Blackjack()
        blackjack.NewGame()
        blackjack.Fold()

        assert.equal(blackjack.dealerWins, 1)
    })
    it("should deal the player 2 cards upon the game starting", () => {
        blackjack.NewGame()

        assert.equal(blackjack.player.cards.length, 2)
    })
    it("should deal the dealer 1 card upon the game starting", () => {
        blackjack.NewGame()

        assert.equal(blackjack.dealer.cards.length, 1)
    })
    it("should increment the players hand size by 1 if they choose to hit", () => {
        blackjack.NewGame()
        let oldLen = blackjack.player.cards.length
        blackjack.Hit()

        assert.equal((blackjack.player.cards.length - oldLen), 1)
    })
    it("should force the dealer to keep 'hitting' until they have a score greater than the player, even if they go bust", () => {
        blackjack.NewGame()
        blackjack.Stick()

        return blackjack.player.score < blackjack.dealer.score
    })
    it("should find the best combination of aces in a hand to cause the player not to bust", () => {
        blackjack.NewGame()
        blackjack.player.cards = []
        blackjack.player.AddCardToHand({ suit: types.SPADES, value: types.ACE, score: [1, 11] })
        blackjack.player.AddCardToHand({ suit: types.CLUBS, value: types.ACE, score: [1, 11] })
        blackjack.player.AddCardToHand({ suit: types.HEARTS, value: types.ACE, score: [1, 11] })
        blackjack.player.AddCardToHand({ suit: types.DIAMONDS, value: types.ACE, score: [1, 11] })
        blackjack.player.AddCardToHand({ suit: types.DIAMONDS, value: 10, score: [10] })
        blackjack.player.AddCardToHand({ suit: types.HEARTS, value: 7, score: [7] })

        assert.equal(blackjack.player.score, 21)
    })
    it("should only allow only one player to win each game", () => {
        blackjack = new Blackjack()
        blackjack.NewGame()

        blackjack.Hit()
        blackjack.Stick()

        blackjack.NewGame()

        return (blackjack.playerWins === 1 && blackjack.dealerWins === 0) || (blackjack.playerWins === 0 && blackjack.dealerWins === 1)
    })
})