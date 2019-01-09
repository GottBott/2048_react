import React, { Component } from 'react';
import './App.css';
import GameBoard from './GameBoard'
import GameLogic from './GameLogic'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      score: 0
    }
    this.onGameChange = this.onGameChange.bind(this)
    this.getGameState = this.getGameState.bind(this)


  }

  onGameChange(board, score) {
    this.setState({
      board: board,
      score: score
    })
  }

  getGameState() {
    return this.state
  }


  render() {
    return (
      <div className="game-container">
        <div className="score">
          <span>Score: {this.state.score}</span>
        </div>
        <div className="game">
          <GameBoard data={this.state.board}></GameBoard>
          <GameLogic updateGame={this.onGameChange} getGameState={this.getGameState}></GameLogic>
        </div>
      </div>
    );
  }
}

export default App;
