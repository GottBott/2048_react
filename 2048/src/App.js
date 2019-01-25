import React, { Component } from 'react';
import './App.css';
import GameBoard from './GameBoard'
import GameLogic from './GameLogic'
import AIPlayer from './AIPlayer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: {
        board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        score: 0,
        gameOver: false
      }
    }
    this.onGameChange = this.onGameChange.bind(this)
    this.getGameState = this.getGameState.bind(this)
    this.startAI = this.startAI.bind(this)
    this.isGameOver = this.isGameOver.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.AIPlayer = React.createRef()
    this.GameLogic = React.createRef()

  }

  onGameChange(board) {
    this.setState({
      board: board
    })
  }

  getGameState() {
    return this.state
  }

  startAI() {
    if (!this.state.board.gameOver) {
      setTimeout(() => {
        let move = this.AIPlayer.current.executeMove(this.state.board)
//        console.log(move,this.state.board)
        this.GameLogic.current.preformMove(move)
        this.startAI()
      }, 100);
    }
  }

  resetGame() {
    this.setState({
      board: {
        board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        score: 0,
        gameOver: false
      }
    }, () => {
      this.GameLogic.current.resetGame()
    })
  }

  isGameOver() {
    if (this.state.board.gameOver) {
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
          <span>Score: {this.state.board.score}</span>
          <span>{this.isGameOver()}</span>
        </div>
        <div className="game">
          <GameBoard data={this.state.board}></GameBoard>
          <GameLogic ref={this.GameLogic} updateGame={this.onGameChange} getGameState={this.getGameState}></GameLogic>
          <AIPlayer ref={this.AIPlayer} gameLogic={this.GameLogic} ></AIPlayer>
        </div>
      </div>
    );
  }
}

export default App;
