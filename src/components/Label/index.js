import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Label extends Component
{
    shouldComponentUpdate(nextProps, nextState)
    {
        return (
                    nextProps.staticText !== this.props.staticText || 
                    nextProps.coloredText !== this.props.coloredText
                )
    }

    renderStaticText()
    {
        if(this.props.staticText)
        {
            let staticTextColor = "text-color-black"

            if(this.props.staticTextColor)
            {
                staticTextColor = "text-color-" + this.props.staticTextColor.toLowerCase().trim()
            } 

            return ( <span className={staticTextColor}>{ this.props.staticText }</span> )
        }
    }

    renderColoredText()
    {
        if(this.props.staticText)
        {
            let coloredTextColor = "text-color-green"
            
            if(this.props.coloredTextColor)
            {
                coloredTextColor = "text-color" + this.props.coloredTextColor.toLowerCase().trim()
            }

            return ( <span className={coloredTextColor}>{ this.props.coloredText }</span> )
        }
    }

    render()
    {
        return (
            <label className={"static-text-"}>
                { this.renderStaticText() } { this.renderColoredText() }
            </label>
        )
    }
}

// Define prop types and if they are required
Label.propTypes = {
    staticTextColor: PropTypes.string,
    coloredTextColor: PropTypes.string,
    coloredText: PropTypes.string,
    staticText: PropTypes.string.isRequired,
}

module.exports = Label