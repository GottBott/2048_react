import  { Component } from 'react';
import './App.css';


class AIPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.executeMove = this.executeMove.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

// random ai agent
  executeMove(board){
      let randomMove = Math.floor(Math.random() * 4)
      return randomMove
  }


  render() {
    return null
  }
}

export default AIPlayer;
