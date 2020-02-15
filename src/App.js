import React from "react";
import "./App.css";
import MyComponent from "./component/triviagame";

class App extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }
  render() {
    return (
      <div className="App">
        <div className="board">
          <MyComponent />
        </div>
      </div>
    );
  }
}

export default App;
