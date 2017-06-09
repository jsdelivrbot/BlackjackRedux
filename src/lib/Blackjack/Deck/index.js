import * as types from '../Card/types'
import Card from '../Card'
import _ from 'lodash'

// Class constants:
const SUITS = [types.HEARTS, types.SPADES, types.CLUBS, types.DIAMONDS]
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, types.JACK, types.QUEEN, types.KING, types.ACE]

// Showing a different style opposed to ES6 classes, could also have used IIFE module definition
// we create N decks and shuffle it N times to get our master deck/draw pile
function Deck(numberOfDecks = 1, timesToShuffle = 3)
{
    this.cards = []

    for(var i = 0; i < numberOfDecks; i++)
    {
        this.cards = _.concat(this.cards, this.SpawnDeck());
    }
    
    Shuffle(this.cards, timesToShuffle)
}

// Spawns a sequential deck of 52 cards in order.
// This would gives us the ability to use multiple decks and shuffle them together
// if we wanted to change the outcome of a game
// We could use an arrow function here as we don't require the current Deck scope
// but to keep the style consistent we will use = function() instead of = () => here
// = () => will essentially make this a static method!
Deck.prototype.SpawnDeck = function() 
{
    let deck = []

    SUITS.forEach((suit) => {
        VALUES.forEach((value) => {
            deck.push(new Card(suit, value))
        })
    })

    return deck;
}

Deck.prototype.Draw = function()
{
    if(Object.prototype.toString.call(this.cards) === '[object Array]' && this.cards.length > 0) {
        let card = this.cards.pop()
        return { suit: card.GetSuit(), value: card.GetValue(), score: card.GetScore() }
    }
}

// Private API call, responsible for 'shuffling' the input array of cards
// and returning a fresh array of 'shuffled' cards
// This is an extremely simple shuffle method running at timesToShuffle * O(n) given that 
// we must pass over each element in the array
function Shuffle(cards, timesToShuffle)
{
    for(var i = 0; i < timesToShuffle; i++)
    {
        cards.forEach((card, index) => {
            let swapIndex = Math.floor(Math.random()*cards.length-1)
            let cardToSwap = cards[swapIndex]

            if(card && cardToSwap) {
                cards[swapIndex] = card 
                cards[index] = cardToSwap 
            }
        })
    }

    return cards
}

module.exports = Deck


