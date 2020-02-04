import React from "react";
import "./App.css";
import MyComponent from "./component/triviagame";
import Player from "./component/player"

class App extends React.Component {
  constructor(){
    super();
    this.state = { count: 0 }
  }
  handleClick = () => {
    this.setState({ count: 1 + this.state.count  })
  }
  render() {
    return (
      <div className="App" onClick={this.handleClick}>
        <div className="player">
        <Player activePlayer={"Player"+this.state.count}/>
              </div>
        <div className="board">
        <MyComponent 
        categoryId={Math.floor(Math.random() * 18)+9}/>
        </div>
        <div className="cheese">3</div>
      </div>
    );
  }
}

export default App;
