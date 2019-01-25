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
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < iterations; i++) {
        let testingBoard = JSON.parse(JSON.stringify(board))
        testingBoard = this.props.gameLogic.current.testMove(j, testingBoard)
        //console.log(testingBoard)
        testingBoard = this.evaulateMoveOptions(testingBoard, i)
        moves[j] += testingBoard.score
      }
  
      moves[j] = moves[j] / iterations
      if (moves[j] > bestScore) {
        bestScore = moves[j]
        bestMove = j
      }
    }
    //console.log(moves)
    //this.fail()
    return bestMove
  }


  evaulateMoveOptions(board, i) {
    while (!board.gameOver) {
      board = this.props.gameLogic.current.testMove(Math.floor(Math.random() * 4), board)
      //console.log(i,board)
    }
    return board
  }



  render() {
    return null
  }
}

export default AIPlayer;
