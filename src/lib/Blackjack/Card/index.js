import * as types from './types'

// Very simple abstraction representing a card
function Card(suit, value)
{
    this.suit = suit 
    this.value = value
}

Card.prototype.GetSuit = function()
{
    return this.suit || "unset"
}

Card.prototype.GetValue = function()
{
    return this.value || "unset"
}

Card.prototype.GetScore = function()
{
    switch(this.value)
    {
        case types.JACK: return [10]
        case types.QUEEN: return [10]
        case types.KING: return [10]
        case types.ACE: return [1, 11]
        default: return [this.value]
    }
}

module.exports = Card