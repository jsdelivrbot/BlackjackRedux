import Blackjack from '../lib/Blackjack'
import * as actions from '../actions/types'

const blackjack = new Blackjack()

export default function(state = null, action)
{
    switch(action.type)
    {
        case actions.NEW_GAME :
            return blackjack.NewGame()
        case actions.HIT :
            return blackjack.Hit(true)
        case actions.STICK :
            return blackjack.Stick()
        case actions.FOLD:
            return blackjack.Fold()
        default :
            return state
    }
}