import { Component } from 'react';
import './App.css';


class GameLogic extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.board = {
      board: null,
      score:null,
      gameOver:null
    }
   

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
    this.resetGame = this.resetGame.bind(this)
    this.testMove = this.testMove.bind(this)
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentDidMount() {
    this.resetGame()
  }

  resetGame() {
    this.board = this.props.getGameState().board
    this.board = this.addRandomTile(this.board)
    this.board  = this.addRandomTile(this.board )
    this.props.updateGame(this.board)
  }

  componentDidUpdate() {
  }

  addRandomTile(board) {
    let options = []
    for (let row = 0; row < board.board.length; row++) {
      for (let col = 0; col < board.board[row].length; col++) {
        if (board.board[row][col] === 0) options.push([row, col])
      }
    }
    if (!options.length) return
    let randomLocation = options[Math.floor(Math.random() * options.length)]
    board.board[randomLocation[0]][randomLocation[1]] = (Math.random() < 0.9) ? 1 : 2

    return board

  }

  isGameOver(board) {
    let options = []
    for (let row = 0; row < board.board.length; row++) {
      for (let col = 0; col < board.board[row].length; col++) {
        if (board.board[row][col] === 0) options.push([row, col])
      }
    }
    board.gameOver = options.length ? false : !this.movesAvaiable(board)
    return board
  }

  movesAvaiable(board) {
    if (!this.compareBoards(board, this.swipeUp(board))) return true
    else if (!this.compareBoards(board, this.swipeDown(board))) return true

    else if (!this.compareBoards(board, this.swipeLeft(board))) return true

    else if (!this.compareBoards(board, this.swipeRight(board))) return true

    return false
  }

  compareBoards(b1, b2) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (b1.board[i][j] !== b2.board[i][j]) return false
      }
    }
    return true
  }

  swipeUp(board) {

    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard.board[0][i], newBoard.board[1][i], newBoard.board[2][i], newBoard.board[3][i]],newBoard.score)
      newBoard.score = newCol.score
      for (let j = 0; j < 4; j++) {
        newBoard.board[j][i] = newCol.row[j]
      }
    }
    return newBoard
  }

  swipeLeft(board) {
    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard.board[i][0], newBoard.board[i][1], newBoard.board[i][2], newBoard.board[i][3]],newBoard.score)
      newBoard.score = newCol.score
      for (let j = 0; j < 4; j++) {
        newBoard.board[i][j] = newCol.row[j]
      }
    }
    return newBoard
  }

  swipeDown(board) {
    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard.board[3][i], newBoard.board[2][i], newBoard.board[1][i], newBoard.board[0][i]],newBoard.score)
      newBoard.score = newCol.score
      for (let j = 0; j < 4; j++) {
        newBoard.board[3 - j][i] = newCol.row[j]
      }
    }
    return newBoard
  }

  swipeRight(board) {
    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < 4; i++) {
      let newCol = this.swipeRow([newBoard.board[i][3], newBoard.board[i][2], newBoard.board[i][1], newBoard.board[i][0]],newBoard.score)
      newBoard.score = newCol.score
      for (let j = 0; j < 4; j++) {
        newBoard.board[i][3 - j] = newCol.row[j]
      }
    }
    return newBoard
  }

  swipeRow(row,score) {
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
        score += Math.pow(2,row[tile - 1])
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

    return {row:row,score:score}
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
    this.props.updateGame(this.board)
    setTimeout(() => {
      if (!this.compareBoards(initialBoard, this.board)) this.board = this.addRandomTile(this.board)
      this.isGameOver(this.board)
      this.props.updateGame(this.board)
    }, 200);
  }

  // for non human players
  preformMove(move) {
    let initialBoard = JSON.parse(JSON.stringify(this.board))

    if (move === 0) this.board = this.swipeLeft(this.board)
    else if (move === 1) this.board = this.swipeUp(this.board)
    else if (move === 2) this.board = this.swipeRight(this.board)
    else if (move === 3) this.board = this.swipeDown(this.board)

    if (!this.compareBoards(initialBoard, this.board)) this.board = this.addRandomTile(this.board)
    this.isGameOver(this.board)
    this.props.updateGame(this.board)
  }

  testMove(move, board) {
    let initialBoard = JSON.parse(JSON.stringify(board))
    if (move === 0) board = this.swipeLeft(board)
    else if (move === 1) board = this.swipeUp(board)
    else if (move === 2) board = this.swipeRight(board)
    else if (move === 3) board = this.swipeDown(board)

    if (!this.compareBoards(initialBoard, board)) board = this.addRandomTile(board)
    this.isGameOver(board)
    return board
  }


  render() {
    return null
  }
}

export default GameLogic;