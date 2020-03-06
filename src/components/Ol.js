import React from 'react'

export default class Ol extends React.Component {
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