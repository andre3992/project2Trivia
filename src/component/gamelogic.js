export const randomAnswer = answers => {
    let j, x, i;
    for (i = answers.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = answers[i];
        answers[i] = answers[j];
        answers[j] = x;
    }
    return answers;
};

export const decodeChar = question => {
    question = question.replace(/&quot;/g, '"');
    question = question.replace(/&#039;/g, "'");
    question = question.replace(/&rsquot;/g, "’");
    question = question.replace(/&ldquo;/g, "“");
    question = question.replace(/&rdquo;/g, "”");
    question = question.replace(/&eacute;/g, "é");
    question = question.replace(/&ecirc;/g, "ê");
    question = question.replace(/&Uuml;/g, "Ü");
    question = question.replace(/&Ouml;/g, "Ö");
    question = question.replace(/&amp;/g, "&");
    return question;
};

const checkWinner = (player1,
    player2, won) => {
    if (player1 === 2 || player2 === 2) {
        alert(won);
        won = true;
        return won;
    }
};
export const checkAnswer = (
    item,
    correct_answer,
    activePlayer,
    showWrongAnswer,
    showRightAnswer,
    updateQuestion,
    player1,
    player2,
    winner
) => {
    const correct = item === correct_answer;
    let nextPlayer = activePlayer;
    let showModalRight = showRightAnswer;
    let showModalWrong = showWrongAnswer;
    let updateQuestion1 = updateQuestion;
    let playerOne = player1;
    let playerTwo = player2;
    let won = winner;

    if (correct) {
        updateQuestion1 = true;
        showModalRight = true;
        if (nextPlayer === "Player1") {
            playerOne++;
        } else {
            playerTwo++;
        }
        nextPlayer = getNextPlayer(activePlayer);
    } else {
        updateQuestion1 = true;
        showModalWrong = true;
        nextPlayer = getNextPlayer(activePlayer);
    }

    let win = checkWinner(playerOne, playerTwo, won);
    if (win === true) {
        showModalRight = false;
    }

    return {
        nextPlayer,
        correct,
        showModalRight,
        showModalWrong,
        updateQuestion1,
        playerOne,
        playerTwo,
        win
    };
};

export const getNextPlayer = activePlayer => {
    if (activePlayer === "Player1") {
        activePlayer = "Player2";
    } else {
        activePlayer = "Player1";
    }
    return activePlayer;
};