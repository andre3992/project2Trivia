import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./style/App.css";
import MyComponent from "./component/triviagame";
import "./style/buttons.scss"

class App extends React.Component {
    constructor() {
        super();
        this.state = { count: 0 };
    }
    render() {
        return ( <div className = "App" >
            <MyComponent />
            </div>
        );
    }
}

export default App;