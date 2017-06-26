import React, { Component } from 'react'
import * as status from '../../lib/Blackjack/status'

class PlayerWidget extends Component {

    constructor(props) {
        super(props)
    }

    renderStatus() {
        switch(this.props.hand.status) {
            case status.BUST:
                return <div className='red match-status'>Busted</div>
            case status.FOLD:
                return <div className='gray match-status'>Folded</div>
            case status.VALID:
                return <div className='green match-status'>In-Play</div>
            case status.STICK:
                return <div className='orange match-status'>Stuck</div>
        }
    }

    render() {
        console.log("Player is: ", this.props.activePlayer)
        var activeClass = this.props.activePlayer && this.props.activePlayer.id === this.props.id ? 'active' : ''

        
        return (
            <div className={activeClass}>
                <strong>{ this.props.hand.score }</strong>
                <div className='stats'>
                    <span>Player #{this.props.id}, Wins: {this.props.wins}</span>
                    { this.renderStatus() }
                </div>
            </div>
        )
    }
}

class PlayerContainer extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const nodes = this.props.players.map((player, i) => {
            return (
                <PlayerWidget key={'widget ' + i} activePlayer={this.props.activePlayer} {...player} />
            )
        })

        return (
            <div id='player-widget'>{ nodes }</div>
        )

    }

}

module.exports = PlayerContainer