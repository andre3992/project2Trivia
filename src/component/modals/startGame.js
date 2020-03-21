import React from "react";

const StartGame = ({ handleClose, startGame,children }) => {
  const showHideClassName = startGame ? "modalStart display-block": "modalStart display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-StartGame">
      {children}
        <h3>If ready to start choose the difficulty</h3>
        <button className="buttonStart" onClick={()=>handleClose("easy")}>Easy</button>
        <button className="buttonStart" onClick={()=>handleClose("medium")}>Medium</button>
        <button className="buttonStart" onClick={()=>handleClose("hard")}>Hard</button>
      </section>
    </div>
  );
};

export default StartGame;
