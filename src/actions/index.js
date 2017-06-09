import * as types from './types'

export function handlePress(message)
{   
    switch(message)
    {
        case HIT: 
            return hit()
        case STICK: 
            return stick()
        case NEW_GAME:
            return newGame()
    }
}

function newGame()
{
    return {
        type: types.NEW_GAME,
        payload: { message: "new_game" }
    }
}

function hit()
{
    return {
        type: types.HIT,
        payload: { message: "hit" }
    }
}

function stick()
{
    return {
        type: types.STICK,
        payload: { message: "stick" }
    }
}