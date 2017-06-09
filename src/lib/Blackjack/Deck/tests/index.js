import Deck from '../../Deck'
import * as players from '../../../Blackjack/players'
import * as types from '../../Card/types'
import * as status from '../../../Blackjack/status'

const assert = require('assert')
var deck = new Deck()
deck.SpawnDeck()

describe("Blackjack Deck", () => {

    it("should have an initial length of 52 cards given that there were no extra decks to shuffle", () => {
        return deck.cards.length === 52
    })
    it("should be unordered once the deck has been shuffled", () => {
        let shuffledDeck = new Deck()
        shuffledDeck.SpawnDeck()

        return shuffledDeck.cards[0] !== deck.cards[0] || shuffledDeck.cards[1] !== deck.cards[1]
    })
    it("should decrement the amount of cards in the deck when one is drawn", () => 
    {
        deck = new Deck()
        deck.SpawnDeck()

        deck.Draw()

        return deck.cards.length === 51
    })
})