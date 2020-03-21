import React from "react";

const ModalRules = ({ handleClose,showRules }) => {
  const showHideClassName = showRules
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-rules">
        <div>
          <h1>Rules:</h1>
          <h2>1-Win a point everytime you get the answer right</h2>
          <h2>2-One player at a time</h2>
          <h2>3-The first one to get 5 points win</h2>
          <button onClick={handleClose} className="buttonRules"> Close Rules </button>
        </div>
      </section>
    </div>
  );
};
export default ModalRules;
