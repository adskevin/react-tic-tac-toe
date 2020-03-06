import React from 'react'

export default class Square extends React.Component {
    render() {
        return (
            <button className={this.props.player_move ? "square player_move" : "square"} onClick={this.props.onClick}>
            {this.props.value}
            </button>
        )
    }
}