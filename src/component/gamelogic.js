export const randomAnswer = (answers) => {
    let j, x, i;
    for (i = answers.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = answers[i];
        answers[i] = answers[j];
        answers[j] = x;
    }
    return answers;
}

export const decodeChar = (question) => {
    question = question.replace(/&quot;/g, "\"");
    question = question.replace(/&#039;/g, "'");
    question = question.replace(/&rsquot;/g, "’");
    question = question.replace(/&ldquo;/g, "“");
    question = question.replace(/&rdquo;/g, "”");
    question = question.replace(/&eacute;/g, "é");
    question = question.replace(/&ecirc;/g, "ê");
    question = question.replace(/&Uuml;/g, "Ü");
    question = question.replace(/&Ouml;/g, "Ö");
    return question;
};

export const checkAnswer = (item, correct_answer, activePlayer) => {
    const correct = item === correct_answer;
    let nextPlayer = activePlayer;
    if (correct) {
        alert("certo");
    } else {
        nextPlayer = getNextPlayer(activePlayer);
    }
    return { nextPlayer, correct }
};

export const getNextPlayer = (activePlayer) => {
    if (activePlayer === "player1") {
        activePlayer = "player2";
    } else {
        activePlayer = "player1";
    }
    return activePlayer;
}