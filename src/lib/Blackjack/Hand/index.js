import Immutable from 'immutable'
import Card from '../Card'
import * as status from '../status'
import _ from 'lodash'

function Hand()
{
    this.NewHand()
}

Hand.prototype.NewHand = function()
{
    this.cards = []
    this.score = 0
    this.status = status.VALID
}

Hand.prototype.IsBlackjack = function() {
    return this.cards.length === 2 && this.score === 21
}

Hand.prototype.GetScore = function()
{
    return this.score
}

Hand.prototype.GetCards = function()
{
    return this.cards
}

Hand.prototype.AddCardToHand = function(card)
{
    this.cards = _.concat(this.cards, card)

    if(typeof card.value === "string" && card.value.toLowerCase().trim() === "ace" || (this.score + card.score > 21))
    {
        let newScore = 0
        let aces = []

        // sum non-ace cards as we know this gives a constant sum
        this.cards.forEach((existingCard) => {
            if(typeof existingCard.value === "string" && existingCard.value.toLowerCase().trim() === "ace")
            {
                aces = _.concat(aces, existingCard)
            } 
            else 
            {
                newScore += existingCard.score[0]
            }
        })

        // now find the non-bust combination of ace - warning, this is super messy but it works!
        aces.forEach((ace) => {
            if(aces.length === 1 && newScore <= 10) // this gives or gets us close to blackjack
            {
                newScore += ace.score[1]
            }
            else if((newScore < 21 - aces.length) && newScore > 10) //
            {
                newScore += ace.score[0]
            }
            else if(newScore < 10)
            {
                newScore += ace.score[1]
            }
            else 
            {
                newScore += ace.score[0]
            }
        })

        this.score = newScore
    } 
    else
    {
        this.score += card.score[0]
    } 

    if(this.DidCardCauseHandToGoBust())
    {
        this.status = status.BUST
    } 
}

Hand.prototype.DidCardCauseHandToGoBust = function()
{
    return this.score > 21
}

module.exports = Hand