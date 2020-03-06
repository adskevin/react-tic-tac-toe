import React from 'react'

export default class GameSteps extends React.Component {
  render(){
    return(
      <li>
        <button onClick={this.props.onClick} className={this.props.className}>
          {this.props.desc}
        </button>
      </li>
    )
  }
}