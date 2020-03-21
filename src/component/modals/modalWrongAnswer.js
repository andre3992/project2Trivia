import React from "react";


const ModalWrongAnswer = ({ handleClose, showWrongAnswer, children }) => {
  const showHideClassName = showWrongAnswer ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <button
          onClick={handleClose}
        className="buttonWrongAnswer">
          {children}
        </button>
      </section>
    </div>
  );
};
export default ModalWrongAnswer;
