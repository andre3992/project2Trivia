import React from "react";

const StartGame = ({ handleClose, startGame,children }) => {
  const showHideClassName = startGame ? "modal display-block": "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-StartGame">
      {children}
        <h2>If ready to start choose the difficulty</h2>
        <button onClick={()=>handleClose("easy")}>Easy</button>
        <button onClick={()=>handleClose("medium")}>Medium</button>
        <button onClick={()=>handleClose("hard")}>Hard</button>
      </section>
    </div>
  );
};

export default StartGame;
