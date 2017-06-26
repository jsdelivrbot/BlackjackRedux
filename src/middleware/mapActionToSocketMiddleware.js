import * as types from '../actions/types.js'

export default socket => store => next => action => {

    if(action.type !== types.SET_STATE)
        socket.emit('action', action)
    else 
        return next(action)
}