import React from "react";

const ModalWinner = ({ handleClose, winner, player }) => {
  const sessionSave = () => {
    for (let i = 0; i < 50; i++) {
      if (sessionStorage.getItem(i) === null) {
        sessionStorage.setItem(i, document.getElementById("nameSession").value);
        return
      }
    }
  };
  const showHideClassName = winner
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-mainWinner">
        Congratulations {player} you are the Winner!!! Enter your name
        <form onSubmit={sessionSave}>
          <label>
            Name:
            <input type="text" id="nameSession" />
          </label>
          <input type="submit" value="Submit" onClick={sessionSave}/>
        </form>
        <button onClick={handleClose} className="buttonWinner">
          {" "}
          Want to play again?{" "}
        </button>
      </section>
    </div>
  );
};
export default ModalWinner;
