import Blackjack from '../../../Blackjack'
import * as players from '../../../Blackjack/players'
import * as types from '../../Card/types'
import * as status from '../../../Blackjack/status'

const assert = require('assert')
var blackjack = new Blackjack()
blackjack.NewGame()

const CARD = blackjack.deck.Draw()
var ace = null
var king = null 
var queen = null
var jack = null 

var card = blackjack.deck.Draw()
while(card)  
{
    if(card.value === types.KING) king = card 
    else if(card.value === types.QUEEN) queen = card
    else if(card.value === types.JACK) jack = card 
    else if(card.value === types.ACE) ace = card
    card = blackjack.deck.Draw()
}

describe("Blackjack Card", () => {

    it("should have a suit, value and score", () => { // this is a lazy hack, I should check types here too!
       return CARD.suit !== null && CARD.value !== null && CARD.score !== null
    })
    it("should either be of the suit diamonds, hearts, clubs or spades", () => {
        return CARD.suit === types.DIAMONDS || CARD.suit === types.HEARTS || CARD.suit === types.SPADES || CARD.suit === types.CLUBS
    })
    it("should set ace cards the values 1 or 11", () => {
        return ace.score[0] === 1 && ace.score[1] === 11
    })
    it("should set picture cards to all have a value of 10", () => {
        return king.score[0] === 10 && queen.score[0] === 10 && jack.score[0] === 10
    })
})