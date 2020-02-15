import React, { Component } from "react";
import { randomAnswer, decodeChar, checkAnswer } from "../component/gamelogic";
import ModalWrongAnswer from "./modalWrongAnswer";
import ModalRightAnswer from "./modalRightAnswer";
import StartGame from "./startGame";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      activePlayer: "player1",
      showWrongAnswer: false,
      showRightAnswer: false,
      updateQuestion: false,
      startGame: true,
      // active for hide game at start
      active: true
    };
  }

  // hide modal
  hideModal = () => {
    this.setState({
      showRightAnswer: false,
      showWrongAnswer: false,
      startGame: false,
      active: false
    });
  };

  // get question
  getQuiz = () => {
    this.setState({ updateQuestion: false });
    return fetch(
      "https://opentdb.com/api.php?amount=1&category=" +
        (Math.floor(Math.random() * 18) + 9) +
        "&type=multiple"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            results: result.results
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  componentDidMount() {
    this.getQuiz();
  }

  componentDidUpdate() {
    if (this.state.updateQuestion === true) {
      this.getQuiz();
    }
  }

  render() {
    const { error, isLoaded, results, activePlayer } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="game">
          {/* modal wrong answer */}
          <main>
            <StartGame
              startGame={this.state.startGame}
              handleClose={this.hideModal}
            >
              <p>Start</p>
            </StartGame>
          </main>
          <main>
            <ModalWrongAnswer
              showWrongAnswer={this.state.showWrongAnswer}
              handleClose={this.hideModal}
            >
              <p>Wrong</p>
            </ModalWrongAnswer>
          </main>
          {/* modal right answer */}
          <main>
            <ModalRightAnswer
              showRightAnswer={this.state.showRightAnswer}
              handleClose={this.hideModal}
            >
              <p>Right</p>
            </ModalRightAnswer>
          </main>
          <div style={{ display: this.state.active ? "none" : "inline" }}>
            {this.state.activePlayer}
            {this.state.show}
            {results.map(item => {
              let answers = [...item.incorrect_answers, item.correct_answer];
              let correct_answer = item.correct_answer;
              let question = item.question;
              let showWrongAnswer = false;
              let showRightAnswer = false;
              let updateQuestion = false;
              randomAnswer(answers);
              return (
                <div key={item.category} className="card">
                  <div className="cardinner">
                    <div className="gamename">
                      <h1>TriviaGame</h1>
                      <div className="category">{item.category}</div>
                      <div className="question">
                        {"Questão: " + decodeChar(question)}
                      </div>
                      <div className="options">
                        {"Opções: "}
                        {answers.map(item => (
                          <div>
                            <button
                              key={item}
                              className="button"
                              onClick={() => {
                                const result = checkAnswer(
                                  decodeChar(item),
                                  correct_answer,
                                  activePlayer,
                                  showWrongAnswer,
                                  showRightAnswer,
                                  updateQuestion
                                );

                                this.setState({
                                  showRightAnswer: result.showModalRight,
                                  showWrongAnswer: result.showModalWrong,
                                  activePlayer: result.nextPlayer,
                                  updateQuestion: result.updateQuestion1,
                                  active:true
                                });
                              }}
                            >
                              {decodeChar(item)}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default MyComponent;
