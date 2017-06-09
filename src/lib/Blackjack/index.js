import Deck from './Deck'
import Hand from './Hand'
import { Map } from 'immutable' // Any data returned is Immutable, Blackjack class can only mutate state
import * as status from './status'
import * as players from './players'
import _ from 'lodash'

// I would normally use the ES6 syntax with class, but I wanted to demonstrate
// that I understand how to chain module definitions using "prototype"
// Also note that I have not implemented the concept of betting in this program
// but that could easily be added to the rule set :)
// For the sake of simplicity I have not used Immutable.js,
function Blackjack(numberOfDecks = 1, timesToShuffle = 1)
{
    this.deck = new Deck(numberOfDecks, timesToShuffle)
    this.numberOfDecks = numberOfDecks
    this.timesToShuffle = timesToShuffle
    this.dealer = new Hand()
    this.player = new Hand()
    this.winner = null
    this.playerWins = 0
    this.dealerWins = 0
    this.turn = players.PLAYER
    this.winnerSet = false
}

// This is bad practice as it ends up being a public API function which means
// anybody with access to the instance can force a new ga,e, for the sake
// of a quick hack I've just included it on the Blackjack prototype, to avoid
// this I could A) scope it to the file but it wouldnt be attached to the 
// Blackjack instance so I'd have to pass params directly   B) Wrap this code
// in an IIFE block and have it as a private defintion
Blackjack.prototype.NewGame = function()
{
    this.dealer = new Hand()
    this.player = new Hand()
    this.winner = null
    this.turn = players.DEALER
    this.winnerSet = false

    this.deck = new Deck(this.numberOfDecks, this.timesToShuffle)

    // draw for the dealer
    this.Hit()

    // now set the players turn 
    this.turn = players.PLAYER

    // draw players two initial cards
    this.Hit()
    this.Hit()

    // Possibility of starting blackjack
    return this.CheckForWinner()
}

Blackjack.prototype.Stick = function()
{
    this.turn = players.DEALER

    // Dealer now has to play until he beats or matches player score
    while(this.dealer.GetScore() <= this.player.GetScore())
    {
        this.Hit()
    }
    
    return this.CheckForWinner()
}

Blackjack.prototype.Fold = function()
{
    this.dealerWins++
    this.player.status = status.FOLD;
    
    return this.NewGame()
}

Blackjack.prototype.CheckForWinner = function()
{
    const PLAYER_SCORE = this.player.GetScore()
    const DEALER_SCORE = this.dealer.GetScore()

    if(this.turn === players.PLAYER && PLAYER_SCORE > 21) // went bust on player turn is instant loss
    {
        this.winner = players.DEALER
    }
    else if(PLAYER_SCORE === 21 && this.player.cards.length === 2) // check player blackjack
    {
        this.winner = players.PLAYER
    }
    else if(DEALER_SCORE === 21 && this.player.cards.length === 2) // check dealer blackjack
    {
        this.winner = players.DEALER
    }
    else if(PLAYER_SCORE > 0 && DEALER_SCORE > 0) // check when both people have played
    {
        if(this.turn === players.PLAYER)
        {
            if(this.player.status !== status.VALID || PLAYER_SCORE > 21)
                this.winner = players.DEALER
            else 
                this.winner = null
        }
        else if(this.turn === players.DEALER)
        {
            if(this.dealer.status !== status.VALID || DEALER_SCORE > 21)
                this.winner = players.PLAYER
            else 
                this.winner = null
        }
    }
    // When its the dealers turn, all draws have been made - make a final win condition check
    if(this.winner === null && this.turn === players.DEALER && PLAYER_SCORE > 0 && DEALER_SCORE > 0) 
    {
        PLAYER_SCORE >= DEALER_SCORE
                ? this.winner = players.PLAYER 
                : this.winner = players.DEALER
    } 

    if(!this.winnerSet && this.winner !== null) 
    {
        if(this.winner === players.DEALER) 
            this.dealerWins+=1
        else if(this.winner === players.PLAYER)
            this.playerWins+=1

        this.winnerSet = true
    }


    return Map({
        deck: this.deck, 
        player: { cards: this.player.cards, status: this.player.status, score: this.player.score }, // dont return methods - use a method for this
        dealer: { cards: this.dealer.cards, status: this.dealer.status, score: this.dealer.score }, // dont return methods - use a method for this
        playerWins: this.playerWins,
        dealerWins: this.dealerWins,
        numberOfDecks: this.numberOfDecks,
        timesToShuffle: this.timesToShuffle,
        winner: this.winner,
        turn: this.turn,
    })
}

// Currently only supports single player / dealer support - could solve this using
// player ids in the JS object.
Blackjack.prototype.Hit = function()
{
    const PLAYER_SCORE = this.player.GetScore()
    const DEALER_SCORE = this.dealer.GetScore()

    if((this.turn === players.PLAYER && PLAYER_SCORE >= 21) || (this.turn === players.DEALER && DEALER_SCORE >= 21)) {
        return this.CheckForWinner()
    } 

    if(this.deck.cards.length > 0) {
        let card = this.deck.Draw()

        if(this.turn === players.PLAYER) 
        {
            this.player.AddCardToHand(card)
        } else {
            this.dealer.AddCardToHand(card)
        }
    }

    // if we hit 21 then the dealer needs to play
    if(this.player.GetScore() === 21)
    {
        return this.Stick()
    }
    else 
    {
        return this.CheckForWinner()
    }
}

module.exports = Blackjack