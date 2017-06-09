import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as types from '../../lib/Blackjack/Card/types'

class Card extends Component 
{
    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.suit !== this.props.suit 
            || nextProps.value !== this.props.value
    }

    render()
    {
        const SUIT_COLOR = this.props.suit === types.DIAMONDS || this.props.suit === types.HEARTS ? "red" : ""

        return (
            <div className="card">
                <div className={"value " + SUIT_COLOR}><strong>{ this.props.value }</strong></div>
                <div className="small-text">of</div>
                <div className={"suit " + SUIT_COLOR}>{ this.props.suit }</div>
            </div>
        )
    }
}

Card.propTypes = {
    value: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
}

module.exports = Card