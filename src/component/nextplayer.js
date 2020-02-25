const getNextPlayer = activePlayer => {
    if (activePlayer === "Player1") {
        activePlayer = "Player2";
    } else {
        activePlayer = "Player1";
    }
    return activePlayer;
};

export default getNextPlayer;