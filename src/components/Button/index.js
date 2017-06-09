import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Button extends Component
{
    constructor(props) 
    {
        super(props)
    }

    render()
    {
        return (
            <div onClick={this.props.action} className={ "button " + (this.props.color || "default") }>
                { this.props.title }
            </div>
        )
    }
}

// Define prop types and if they are required
Button.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
}

module.exports = Button