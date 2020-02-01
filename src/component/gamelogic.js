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
    question = question.replace(/&#039;/g, "\'");
    question = question.replace(/&rsquot;/g, "’");
    question = question.replace(/&ldquo;/g, "“");
    question = question.replace(/&rdquo;/g, "”");
    question = question.replace(/&eacute;/g, "é");
    question = question.replace(/&ecirc;/g, "ê");
    question = question.replace(/&Uuml;/g, "Ü");
    return question;
}

export const checkAnswer = () => {
    if () {


    }


}