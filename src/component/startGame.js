import React from "react";

const StartGame = ({ handleClose, startGame,children }) => {
  const showHideClassName = startGame ? "modal display-block": "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-StartGame">
      {children}
        <h2>If ready to start choose the difficulty</h2>
        <button className="buttonStart" onClick={()=>handleClose("easy")}>Easy</button>
        <button className="buttonStart" onClick={()=>handleClose("medium")}>Medium</button>
        <button className="buttonStart" onClick={()=>handleClose("hard")}>Hard</button>
      </section>
    </div>
  );
};

export default StartGame;
