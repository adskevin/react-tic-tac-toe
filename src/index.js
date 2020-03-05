import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={props.player_move ? "square player_move" : "square"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Ol extends React.Component {
  constructor(){
    super();
    this.state={
      className: 'asc'
    }
  }

  changeOrder() {
    if(this.state.className === 'desc'){
      this.setState({
        className: 'asc'
      });
    } else {
      this.setState({
        className: 'desc'
      });
    }
  }

  render() {
    return(
      <>
        <button className="order-button" onClick={() => this.changeOrder()}>Change order</button>
        <ul className={this.state.className}>{this.props.moves}</ul>
      </>
    );
  }
}
  
class Board extends React.Component {
  renderSquare(i) {
    let player_move = null;
    if(this.props.player_move === i) {
      player_move = true;
    } else if(Array.isArray(this.props.player_move)){
      this.props.player_move.map((value) => {
        if(value === i){
          player_move = true;
        }
      })
    }

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        player_move={player_move}
        key={i}
      />
    );
  }

  render(){
    var divsArray = [];
    var squareIndex = 0;
    for(var divNumber = 0; divNumber <= 2; divNumber++){
      var rowOfSquares = [];
      for(var squarePerRow = 0; squarePerRow <= 2; squarePerRow++){
        rowOfSquares.push(
          this.renderSquare(squareIndex)
        );
        squareIndex++;
      }
      divsArray.push(
        <div className="board-row" key={divNumber}>{rowOfSquares}</div>
      )
    }

    return(
      <div>
        {divsArray}
      </div>
    );
  }
}

class GameSteps extends React.Component {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
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
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let player_move = null;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    player_move = i;
    
    this.setState({
      history: history.concat([{
        squares,
        player_move,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      const classNametext = move === this.state.stepNumber ? 'strong_text' : '';
      return(
        <GameSteps
          className={classNametext}
          onClick={() => this.jumpTo(move)}
          desc={desc}
          key={move}
        />
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
      current.player_move = winner[1];
    } else if(this.state.stepNumber === 9) {
      status = 'That is a DRAW';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
          <Ol moves={moves}/>
          {/* <ol>{moves}</ol> */}
        </div>
      </div>
    );
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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  