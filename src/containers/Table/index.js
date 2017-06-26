import React, { Component } from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import * as types from '../../actions/types'
import * as players from '../../lib/Blackjack/players'
import Button from '../../components/Button'
import Label from '../../components/Label'
import Hand from '../../components/Hand'
import PlayerWidget from '../../components/Player'

class Table extends Component 
{
    constructor(props)
    {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps !== this.props
    }

    renderButtonPanel()
    {
        const winners = this.props.game.get("winners") 
        const currentPlayer = this.props.game.get('turn')
        const player = this.getPlayer()
        var didWin = false 

        console.log("CURRENT PLAYER IS: ", currentPlayer)

        winners.some((winnerId) => {
            if(winnerId === player.id) {
                didWin = true
            }
            return didWin
        })

        if(currentPlayer && currentPlayer.id === player.id)
        {
            return (
                <div id="buttonPanel">
                    <Button action={this.props.fold} title="Fold" color="red" />
                    <Button action={this.props.stick} title="Stick" color="yellow" />
                    <Button action={this.props.hit} title="Hit" color="green" />
                </div>
            )
        } 
        else 
        {
            if(currentPlayer === null || currentPlayer.id == 0) {
                var matchOutcome = <span id="matchOutcome">You lost to the house :(</span>
                if(didWin) {
                    matchOutcome = <span id="matchOutcome">You beat the house!</span>
                } 
                return (
                    <div id="buttonPanel">
                        <span>The next game will start in 10 seconds</span>
                        { matchOutcome }
                    </div>
                )
            } else {
                return (
                    <div id='buttonPanel'>
                        It is currently player: { currentPlayer.id }'s turn.
                    </div>
                )
            }
        }
    }

    getPlayer() 
    {
        let playerId = this.props.game.get('playerId')
        let player = null

        this.props.game.get('players').some((compPlayer) => {
            if(compPlayer.id === playerId) { player = compPlayer }

            return player !== null
        })

        return player
    }

    renderGameIfInProgress()
    {
        if(this.props.game && this.props.game.size > 0)
        {
            console.log(this.props.game.get("players"))
            const DEALER_HAND = this.props.game.get("dealer").hand
            const PLAYER = this.getPlayer()
            const PLAYER_HAND = PLAYER.hand

            console.log("Players hand is: ", PLAYER_HAND)
            console.log("Dealers hand is: ", DEALER_HAND)

            return (
                <div>
                    <header>
                        <Label staticText="Your wins:" coloredText={PLAYER.wins} />
                    </header>

                    <div id="dealerTable" className="table-section">
                        <Hand cards={DEALER_HAND.cards} score={DEALER_HAND.score} status={DEALER_HAND.status} scoreToBeat={PLAYER_HAND.score} label="Dealer" />
                    </div>

                    { this.renderButtonPanel() }
                
                    <div id="playerTable" className="table-section">
                        <Hand cards={PLAYER_HAND.cards} score={PLAYER_HAND.score} status={PLAYER_HAND.status} scoreToBeat={DEALER_HAND.score} label="Player" />
                    </div>

                    <PlayerWidget players={this.props.game.get('players')} />
                </div>
            )
        }
    }

    render()
    {
        console.log(this.props)
        return (
            <div id="table">
                { this.renderGameIfInProgress() }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch, props)
{
    return {
        //newGame: () => dispatch({ type: types.NEW_GAME }),
        hit: () => dispatch({ type: types.HIT }),
        stick: () => dispatch({ type: types.STICK }),
        fold: () => dispatch({ type: types.FOLD }),
    }
}

function mapStateToProps(state)
{
    return {
        game : state.game
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)