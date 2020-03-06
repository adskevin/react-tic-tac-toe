import React from 'react'

import Ul from './Ul'
import Board from './Board'
import GameSteps from './GameSteps'

export default class Game extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          player_move: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      }
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[history.length - 1]
      const squares = current.squares.slice()
      let player_move = null
  
      if (calculateWinner(squares) || squares[i]) {
        return
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'
  
      player_move = i
      
      this.setState({
        history: history.concat([{
          squares,
          player_move,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      })
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
  
    render() {
      const history = this.state.history
      const current = history[this.state.stepNumber]
      const winner = calculateWinner(current.squares)
  
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start'
        const classNametext = move === this.state.stepNumber ? 'strong_text' : ''
        return(
          <GameSteps
            className={classNametext}
            onClick={() => this.jumpTo(move)}
            desc={desc}
            key={move}
          />
        )
      })
  
      let status
      if (winner) {
        status = 'Winner: ' + winner[0]
        current.player_move = winner[1]
      } else if(this.state.stepNumber === 9) {
        status = 'That is a DRAW'
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              player_move={current.player_move}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <Ul moves={moves}/>
          </div>
        </div>
      )
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      }
    }
    return null
  }