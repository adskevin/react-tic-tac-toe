import React from 'react'

import Square from './Square'

export default class Board extends React.Component {
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