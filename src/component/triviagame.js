import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import randomAnswer from "./randomAnswer";
import { decodeChar, checkAnswer } from "../component/gamelogic";
import ModalWrongAnswer from "./modalWrongAnswer";
import ModalRightAnswer from "./modalRightAnswer";
import StartGame from "./startGame";
import ModalWinner from "./modalWinner";
import { Container, Row, Col } from "react-bootstrap";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 0,
      player2: 0,
      error: null,
      isLoaded: false,
      activePlayer: "Player1",
      showWrongAnswer: false,
      showRightAnswer: false,
      updateQuestion: false,
      startGame: true,
      // active for hide game at start
      active: true,
      winner: false,
      difficulty: "easy"
    };
  }

  // hide modal
  hideModal = difficulty => {
    if (difficulty === "easy") {
      this.setState({ difficulty: "easy" });
    }
    if (difficulty === "medium") {
      this.setState({ difficulty: "medium" });
    }
    if (difficulty === "hard") {
      this.setState({ difficulty: "hard" });
    }
    console.log(difficulty);
    this.setState({
      showRightAnswer: false,
      showWrongAnswer: false,
      startGame: false,
      active: false,
      winner: false
    });
  };

  getQuiz = () => {
    this.setState({ updateQuestion: false });
    return fetch(
      "https://opentdb.com/api.php?amount=1&category=" +
        (Math.floor(Math.random() * 18) + 9) +
        "&difficulty=" +
        this.state.difficulty +
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
        <Container fluid>
          <div className="tittleName">
            <h1>Trivia Battle</h1>
          </div>
          <Row>
            <Col className="rules">
              <div>
                <h1>Rules:</h1>
                <h2>1-Win a point everytime you get the answer right</h2>
                <h2>2-You can only use help one time</h2>
                <h2>3-The first one to get 5 points win</h2>
                <h2>4-</h2>
                <h2>5-</h2>
              </div>
            </Col>
            <Col>
              {/* modal winner */}

              <main>
                <ModalWinner
                  winner={this.state.winner}
                  handleClose={this.hideModal}
                  player={this.state.activePlayer}
                >
                  <p>winner</p>
                </ModalWinner>
              </main>

              {/* modal start game */}

              <main>
                <StartGame
                  startGame={this.state.startGame}
                  handleClose={this.hideModal}
                >
                  <h1>Welcome</h1>
                </StartGame>
              </main>

              {/* modal wrong answer */}

              <main>
                <ModalWrongAnswer
                  showWrongAnswer={this.state.showWrongAnswer}
                  handleClose={this.hideModal}
                >
                  <p>Incorrect</p>
                </ModalWrongAnswer>
              </main>
              {/* modal right answer */}
              <main>
                <ModalRightAnswer
                  showRightAnswer={this.state.showRightAnswer}
                  handleClose={this.hideModal}
                >
                  <p>Correct</p>
                </ModalRightAnswer>
              </main>
              <div className="tittle">
                <div
                  style={{
                    visibility: this.state.active ? "hidden" : "visible"
                  }}
                  className="cardInner"
                >
                  <div
                    style={{
                      visibility: this.state.active ? "hidden" : "visible"
                    }}
                    className="card"
                  >
                    {results.map(item => {
                      let answers = [
                        ...item.incorrect_answers,
                        item.correct_answer
                      ];
                      let correct_answer = item.correct_answer;
                      let question = item.question;
                      let showWrongAnswer = false;
                      let showRightAnswer = false;
                      let updateQuestion = false;
                      let player1 = this.state.player1;
                      let player2 = this.state.player2;
                      let winner = this.state.winner;
                      randomAnswer(answers);
                      return (
                        <>
                          <div className="category">{item.category}</div>
                          <div className="question">
                            {"Question: " + decodeChar(question)}
                          </div>
                          <div className="options">
                            {"Options: "}
                            {answers.map(item => (
                              <div>
                                <button
                                  key={item}
                                  className="buttonQuiz"
                                  onClick={() => {
                                    const result = checkAnswer(
                                      decodeChar(item),
                                      correct_answer,
                                      activePlayer,
                                      showWrongAnswer,
                                      showRightAnswer,
                                      updateQuestion,
                                      player1,
                                      player2,
                                      winner
                                    );

                                    this.setState({
                                      showRightAnswer: result.showModalRight,
                                      showWrongAnswer: result.showModalWrong,
                                      activePlayer: result.nextPlayer,
                                      updateQuestion: result.updateQuestion1,
                                      active: true,
                                      player1: result.playerOne,
                                      player2: result.playerTwo,
                                      winner: result.win
                                    });
                                  }}
                                >
                                  {decodeChar(item)}
                                </button>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Col>

            <Col className="scoreboard">
              <div >
                <h1>Playing: {this.state.activePlayer}</h1>
                <h2>Scoreboard</h2>
                <h3>Player1: {this.state.player1} </h3>
                <h3>Player2: {this.state.player2} </h3>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default MyComponent;
