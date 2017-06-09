import React, { Component } from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import * as types from '../../actions/types'
import * as players from '../../lib/Blackjack/players'
import Button from '../../components/Button'
import Blackjack from '../../lib/Blackjack'
import Label from '../../components/Label'
import Hand from '../../components/Hand'

class Table extends Component 
{
    constructor(props)
    {
        super(props)

        this.state = {
            game: null
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps !== this.props
    }

    componentWillMount()
    {
        if(!this.state.game)
        {
            this.setState({
                game: new Blackjack(1, 1)
            })
        }

        this.props.newGame()
    }

    componentWillUnmount()
    {
        if(this.state.game)
        {
            this.setState({
                game: null
            })
        }
    }

    renderButtonPanel()
    {
        const WINNER = this.props.game.get("winner") 

        if(WINNER === null)
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
            let matchOutcome = ""
            if(WINNER === players.PLAYER) {
                matchOutcome = <span id="matchOutcome">You beat the house!</span>
            } else {
                matchOutcome = <span id="matchOutcome">You lost to the house :(</span>
            }
            return (
                <div id="buttonPanel">
                    <Button action={this.props.newGame} title="New Game" />
                    { matchOutcome }
                </div>
            )
        }
    }

    renderGameIfInProgress()
    {
        if(this.props.game)
        {
            const DEALER_HAND = this.props.game.get("dealer")
            const PLAYER_HAND = this.props.game.get("player")

            return (
                <div>
                    <header>
                        <Label staticText="Player wins:" coloredText={this.props.game.get("playerWins")} />
                        <Label staticText="Dealer wins:" coloredText={this.props.game.get("dealerWins")} />
                    </header>

                    <div id="dealerTable" className="table-section">
                        <Hand cards={DEALER_HAND.cards} score={DEALER_HAND.score} status={DEALER_HAND.status} scoreToBeat={PLAYER_HAND.score} label="Dealer" />
                    </div>

                    { this.renderButtonPanel() }
                
                    <div id="playerTable" className="table-section">
                        <Hand cards={PLAYER_HAND.cards} score={PLAYER_HAND.score} status={PLAYER_HAND.status} scoreToBeat={DEALER_HAND.score} label="Player" />
                    </div>
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
        newGame: () => dispatch({ type: types.NEW_GAME }),
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