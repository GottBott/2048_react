import React, { Component } from 'react';
import './App.css';
import GameBoard from './GameBoard'
import GameLogic from './GameLogic'
import AIPlayer from './AIPlayer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      score: 0,
      gameOver: false
    }
    this.onGameChange = this.onGameChange.bind(this)
    this.getGameState = this.getGameState.bind(this)
    this.startAI = this.startAI.bind(this)
    this.isGameOver = this.isGameOver.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.AIPlayer = React.createRef()
    this.GameLogic = React.createRef()

  }

  onGameChange(board, score, gameOver) {
    this.setState({
      board: board,
      score: score,
      gameOver: gameOver
    })
  }

  getGameState() {
    return this.state
  }

  startAI() {
    if (!this.state.gameOver) {
      setTimeout(() => {
        let move = this.AIPlayer.current.executeMove(this.board)
        this.GameLogic.current.preformMove(move)
        this.startAI()
      }, 50);
    }
  }

  resetGame() {
    this.setState({
      board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      score: 0,
      gameOver: false
    },()=>{
      this.GameLogic.current.resetGame()
    })
  }

  isGameOver() {
    if (this.state.gameOver) {
      return <span>GAME OVER
         <button onClick={this.resetGame}>
          Reset
                </button>
      </span>
    }
    return null
  }

  render() {
    return (
      <div className="game-container">
        <div className="score">
          <span >
            <button onClick={this.startAI}>Let AI Play!</button>
          </span>
          <span>Score: {this.state.score}</span>
          <span>{this.isGameOver()}</span>
        </div>
        <div className="game">
          <GameBoard data={this.state.board}></GameBoard>
          <GameLogic ref={this.GameLogic} updateGame={this.onGameChange} getGameState={this.getGameState}></GameLogic>
          <AIPlayer ref={this.AIPlayer} ></AIPlayer>
        </div>
      </div>
    );
  }
}

export default App;
