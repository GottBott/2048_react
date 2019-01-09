import { Component } from 'react';
import './App.css';


class GameLogic extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.board = null
    this.score = null
    this.gameOver = null;

    this.addRandomTile = this.addRandomTile.bind(this)
    this.isGameOver = this.isGameOver.bind(this)
    this.movesAvaiable = this.movesAvaiable.bind(this)
    this.compareBoards = this.compareBoards.bind(this)
    this.swipeDown = this.swipeDown.bind(this)
    this.swipeUp = this.swipeUp.bind(this)
    this.swipeLeft = this.swipeLeft.bind(this)
    this.swipeRight = this.swipeRight.bind(this)
    this.swipeRow = this.swipeRow.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this.preformMove = this.preformMove.bind(this)
    this.resetGame=this.resetGame.bind(this)

  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentDidMount() {
    this.resetGame()
  }

  resetGame(){
    this.board = this.props.getGameState().board
    this.score = this.props.getGameState().score
    this.gameOver = this.props.getGameState().gameOver
    this.addRandomTile(this.board)
    this.addRandomTile(this.board)
    this.props.updateGame(this.board, this.score, this.gameOver)
  }

  componentDidUpdate() {

  }

  addRandomTile() {
    let options = []
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === 0) options.push([row, col])
      }
    }
    if (!options.length) return
    let randomLocation = options[Math.floor(Math.random() * options.length)]
    this.board[randomLocation[0]][randomLocation[1]] = (Math.random() < 0.9) ? 1 : 2

  }

  isGameOver() {
    let options = []
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === 0) options.push([row, col])
      }
    }
    return options.length ? false : !this.movesAvaiable()

  }

  movesAvaiable() {
    if (!this.compareBoards(this.board, this.swipeUp(this.board))) return true
    else if (!this.compareBoards(this.board, this.swipeDown(this.board))) return true

    else if (!this.compareBoards(this.board, this.swipeLeft(this.board))) return true

    else if (!this.compareBoards(this.board, this.swipeRight(this.board))) return true

    return false
  }

  compareBoards(b1, b2) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (b1[i][j] !== b2[i][j]) return false
      }
    }
    return true
  }

  swipeUp(board) {

    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard[0][i], newBoard[1][i], newBoard[2][i], newBoard[3][i]])
      for (let j = 0; j < 4; j++) {
        newBoard[j][i] = newCol[j]
      }
    }
    return newBoard
  }

  swipeLeft(board) {
    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard[i][0], newBoard[i][1], newBoard[i][2], newBoard[i][3]])
      for (let j = 0; j < 4; j++) {
        newBoard[i][j] = newCol[j]
      }
    }
    return newBoard
  }

  swipeDown(board) {
    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard[3][i], newBoard[2][i], newBoard[1][i], newBoard[0][i]])
      for (let j = 0; j < 4; j++) {
        newBoard[3 - j][i] = newCol[j]
      }
    }
    return newBoard
  }

  swipeRight(board) {
    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard[i][3], newBoard[i][2], newBoard[i][1], newBoard[i][0]])
      for (let j = 0; j < 4; j++) {
        newBoard[i][3 - j] = newCol[j]
      }
    }
    return newBoard
  }

  swipeRow(row) {
    // push together
    for (let tile = 1; tile < 4; tile++) {
      if (row[tile] !== 0 && row[tile - 1] === 0) {
        row[tile - 1] = row[tile]
        row[tile] = 0
        tile = tile > 1 ? tile - 2 : 1
      }
    }

    // combind like peices
    for (let tile = 1; tile < 4; tile++) {
      if (row[tile] !== 0 && row[tile - 1] === row[tile]) {
        row[tile - 1] = row[tile - 1] + 1
        this.score = this.score + Math.pow(row[tile - 1], 2)
        row[tile] = 0
      }
    }

    // push together
    for (let tile = 1; tile < 4; tile++) {
      if (row[tile] !== 0 && row[tile - 1] === 0) {
        row[tile - 1] = row[tile]
        row[tile] = 0
        tile = tile > 1 ? tile - 2 : 1
      }
    }

    return row
  }

  // human players using keyboard
  _handleKeyDown(event) {
    let initialBoard = JSON.parse(JSON.stringify(this.board))
    if (event.keyCode === 37) {
      this.board = this.swipeLeft(this.board)
    }
    else if (event.keyCode === 38) {
      this.board = this.swipeUp(this.board)
    }
    else if (event.keyCode === 39) {
      this.board = this.swipeRight(this.board)
    }
    else if (event.keyCode === 40) {
      this.board = this.swipeDown(this.board)
    }
    this.props.updateGame(this.board, this.score, this.gameOver)
    setTimeout(() => {
      if (!this.compareBoards(initialBoard, this.board)) this.addRandomTile(this.board)
      if (this.isGameOver()) {
        this.gameOver = true
      }
      this.props.updateGame(this.board, this.score, this.gameOver)
    }, 200);
  }

  // method for non human players
  preformMove(move) {
    let initialBoard = JSON.parse(JSON.stringify(this.board))

    if (move === 0) this.board = this.swipeLeft(this.board)
    else if (move === 1) this.board = this.swipeUp(this.board)
    else if (move === 2) this.board = this.swipeRight(this.board)
    else if (move === 3) this.board = this.swipeDown(this.board)

    if (!this.compareBoards(initialBoard, this.board)) this.addRandomTile(this.board)
    if (this.isGameOver()) {
      this.gameOver = true
    }
    this.props.updateGame(this.board, this.score, this.gameOver)
  }

  render() {
    return null
  }
}

export default GameLogic;
