import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Deck extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            cards: []
        }
    }

    componentDidMount()
    {
        console.log("Mounted with: ", this.props)
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        console.log("Should update with: ", nextProps)
    }

    componentWillReceiveProps(nextProps)
    {
        console.log("New props are: ", nextProps);
    }

    render()
    {
        return (
            <div>
                <span>There are {this.state.cards.length} remaining</span>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return { cardsInDeck: this.state.cards }
}

export default connect(null, actions)(Deck)