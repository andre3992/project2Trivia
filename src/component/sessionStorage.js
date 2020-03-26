import React from "react";

class sessionStorage extends React.Component {
  createTable(){
    let table = [];
    for (let i = 1; i < 50; i++) {
      table.push(<td>{sessionStorage.getItem(i)}</td>);
    }
    return table;
  };

  render() {
    return (
      <div>
        <table>{this.createTable()}</table>
      </div>
    );
  }
}
export default sessionStorage;
