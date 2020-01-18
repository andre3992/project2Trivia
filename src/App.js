import React from "react";
import "./App.css";
import MyComponent from "./component/triviagame";

function App() {
  return (
    <div className="App">
      <div className="blankarea">1</div>
      <div className="board">
      <MyComponent 
      categoryId={Math.floor(Math.random() * 18)+9}/>
      </div>
      <div className="cheese">3</div>
    </div>
  );
}

export default App;
