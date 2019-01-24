import { Component } from 'react';
import './App.css';


class AIPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.executeMove = this.executeMove.bind(this)
    this.evaulateMoveOptions = this.evaulateMoveOptions.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  // random ai agent
  executeMove(board) {
    let moves = [0, 0, 0, 0]
    let bestMove = -1
    let bestScore = -1
    let iterations = 100
    let initialBoard = JSON.parse(JSON.stringify(board))
    for (let j = 0; j < 4; j++) {
      board = this.props.gameLogic.current.testMove(j, initialBoard)
      for (let i = 0; i < iterations; i++) {
       board = this.evaulateMoveOptions(board)
        moves[j] += board.score
      }
      moves[j] = moves[j] / iterations
      if (moves[j] > bestScore) {
        bestScore = moves[j]
        bestMove = j
      }
    }

    return bestMove
  }


  evaulateMoveOptions(board) {
   
    while (!board.gameOver) {
      board = this.props.gameLogic.current.testMove(Math.floor(Math.random() * 4), board)
    }
    return board
  }



  render() {
    return null
  }
}

export default AIPlayer;
