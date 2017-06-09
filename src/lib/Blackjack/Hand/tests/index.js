import Hand from '../../Hand'
import * as players from '../../../Blackjack/players'
import * as types from '../../Card/types'
import * as status from '../../../Blackjack/status'

const assert = require('assert')
var hand = new Hand()
hand.NewHand()

describe("Blackjack Hand", () => {

    it("should initially be empty on creation", () => {
        return hand.cards.length === 0 
    })
    it("should have 2 cards after making two separate 'Hit' calls", () => {
        hand.AddCardToHand({ suit: types.SPADES, value: types.ACE, score: [1, 11] })
        hand.AddCardToHand({ suit: types.CLUBS, value: types.ACE, score: [1, 10] })

        assert(hand.cards.length, 2)
    })
    it("should find the best combination of aces in a hand to cause the player not to bust", () => {
        hand.NewHand()

        hand.AddCardToHand({ suit: types.SPADES, value: types.ACE, score: [1, 11] })
        hand.AddCardToHand({ suit: types.CLUBS, value: types.ACE, score: [1, 11] })
        hand.AddCardToHand({ suit: types.HEARTS, value: types.ACE, score: [1, 11] })
        hand.AddCardToHand({ suit: types.DIAMONDS, value: types.ACE, score: [1, 11] })
        hand.AddCardToHand({ suit: types.DIAMONDS, value: 10, score: [10] })
        hand.AddCardToHand({ suit: types.HEARTS, value: 5, score: [5] })

        return  hand.score <= 21
    })
    it("should be able to determine when a hand goes 'bust'", () => {
        hand.AddCardToHand({ suit: types.HEARTS, value: 5, score: [5] })

        return hand.score > 21
    })
})