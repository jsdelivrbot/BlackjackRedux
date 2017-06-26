import Blackjack from '../lib/Blackjack'
import * as actions from '../actions/types'
import { Map } from 'immutable'

export default function(state = Map(), action)
{
    switch(action.type)
    {
        case actions.SET_STATE:
            let map = Map(action.state)
            console.log('game is: ', map.get("game"))
            return state.merge(map)
        default :
            return state
    }
}