 const randomAnswer = answers => {
     let j, x, i;
     for (i = answers.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1));
         x = answers[i];
         answers[i] = answers[j];
         answers[j] = x;
     }
     return answers;
 };

 export default randomAnswer;