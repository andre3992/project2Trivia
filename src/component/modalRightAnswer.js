import React from "react";

const ModalRightAnswer = ({ handleClose, showRightAnswer, children }) => {
    const showHideClassName = showRightAnswer ?
        "modal display-block" :
        "modal display-none";

    return ( <
        div className = { showHideClassName } >
        <
        section className = "modal-main" >
        <
        button onClick = { handleClose }
        class = "buttonRightAnswer" > { children } < /button> <
        /section> <
        /div>
    );
};
export default ModalRightAnswer;