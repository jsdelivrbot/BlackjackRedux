import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'

class Hand extends Component
{
    shouldComponentUpdate(nextProps, nextState)
    {
        return this.props.cards.length !== nextProps.length 
            || this.props.status !== nextProps.status 
            || this.props.score !== nextProps.score
    }

    renderHand()
    {
        const CARDS = this.props.cards.map((card) => {
            return <Card value={card.value} suit={card.suit} />
        })

        return (
            <div className="handContainer">
                { CARDS }
            </div>
        )
    }

    render()
    {
        let color = "text-color-"
        if(this.props.scoreToBeat <= 21 && this.props.score < this.props.scoreToBeat)
        {
            color += "orange"
        } 
        else if((this.props.score <= 21 && this.props.scoreToBeat < this.props.score) || this.props.score === 21 || this.props.scoreToBeat > 21) 
        {
            color += "green"
        } 
        else 
        {
            color += "red"
        }

        return (
            <div>
                <h1>{ this.props.label } : <span className={color}>{ this.props.score }</span></h1>
                { this.renderHand() }
            </div>
        )
    }
}

Hand.propTypes = {
    cards: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    scoreToBeat: PropTypes.number.isRequired,
}

module.exports = Hand