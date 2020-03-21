import React from "react";

const ModalWinner = ({ handleClose, winner,player }) => {
  const showHideClassName = winner
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-mainWinner">
      Congratulations {player} you are the Winner
        <button onClick={handleClose} className="buttonWinner"> Want to play again? </button>
      </section>
    </div>
  );
};
export default ModalWinner;
