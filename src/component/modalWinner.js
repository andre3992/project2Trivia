import React from "react";

const ModalWinner = ({ handleClose, winner, children }) => {
  const showHideClassName = winner
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Winner </button>
      </section>
    </div>
  );
};
export default ModalWinner;
