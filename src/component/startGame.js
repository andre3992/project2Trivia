import React from "react";

const StartGame = ({ handleClose, startGame,children }) => {
  const showHideClassName = startGame ? "modal display-block": "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      {children}
        <h1>Ready to Start?</h1>
        <button onClick={handleClose}>Start</button>
      </section>
    </div>
  );
};

export default StartGame;
