import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import randomAnswer from "./randomAnswer";
import { decodeChar, checkAnswer } from "../component/gamelogic";
import ModalWrongAnswer from "./modals/modalWrongAnswer";
import ModalRightAnswer from "./modals/modalRightAnswer";
import StartGame from "./modals/startGame";
import ModalWinner from "./modals/modalWinner";
import ModalRules from "./modals/modalRules";
import { Table, Container, Row, Col } from "react-bootstrap";
// import sessionStorage from "./sessionStorage"

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
      showRules: false,
      updateQuestion: false,
      startGame: true,
      // active for hide game at start
      active: true,
      winner: false,
      difficulty: "easy"
    };
  }

  //play again
  playAgain = () => {
    this.setState({
      player1: 0,
      player2: 0,
      error: null,
      isLoaded: true,
      activePlayer: "Player1",
      showWrongAnswer: false,
      showRightAnswer: false,
      showRules: false,
      updateQuestion: false,
      startGame: true,
      // active for hide game at start
      active: true,
      winner: false,
      difficulty: "easy",
      scoreBoard: []
    });
  };

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
    this.setState({
      showRightAnswer: false,
      showWrongAnswer: false,
      startGame: false,
      active: false,
      winner: false,
      showRules: false
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
    this.createTable();
  }

  componentDidUpdate() {
    if (this.state.updateQuestion === true) {
      this.getQuiz();
    }
  }

  showSessionStorage = () => {
    let data = sessionStorage.getItem("key");
  };
  /* Open scoreboard menu on responsive */
  openScoreboard = () => {
    document.getElementById("myScoreboard").style.width = "100%";
  };

  /* Close when someone clicks on the "x" symbol inside the overlay */
  closeScoreboard() {
    document.getElementById("myScoreboard").style.width = "0%";
  }

  /* Open rules  on responsive */

  openNav = () => {
    document.getElementById("myNav").style.width = "100%";
  };

  /* Close when someone clicks on the "x" symbol inside the overlay */
  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  createTable() {
    let table = [];
    for (let i = 1; i < 50; i++) {
      console.log("sessao");
      table.push(<tr>{window.sessionStorage.getItem(i)}</tr>);
    }
    this.setState({
      scoreBoard: table
    });
    return table;
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
            <p>Trivia Battle</p>
          </div>

          <div id="myNav" className="overlay">
            <a href="# " className="closebtn" onClick={this.closeNav}>
              &times;
            </a>
            <div className="overlay-content">
              <h1>Rules:</h1>
              <h2>1-Win a point everytime you get the answer right</h2>
              <h2>2-One player at a time</h2>
              <h2>3-The first one to get 5 points win</h2>
            </div>
          </div>

          <div id="myScoreboard" className="overlay">
            <a href="# " className="closebtn" onClick={this.closeScoreboard}>
              &times;
            </a>
            <div className="overlay-content">
              <h1>Scoreboard</h1>
              <Table className="sessionTable">
                <thead>
                  <tr>
                    <h2>Name:</h2>
                  </tr>
                </thead>
                <tbody>{this.state.scoreBoard}</tbody>
              </Table>
            </div>
          </div>
          <Row>
            <Col className="rules">
              <button onClick={this.openNav} className="btn btn-2" >
                Rules
              </button>
              <button className="btn btn-2" onClick={this.openScoreboard}>Scoreboard</button>
            </Col>

            <Col className="tittle">
              {/* modal winner */}
              <main>
                <ModalWinner
                  winner={this.state.winner}
                  handleClose={this.playAgain}
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
                  <h1>Welcome to Trivia Battle</h1>
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
              {/* modal show rules on responsive */}
              <main>
                <ModalRules
                  showRules={this.state.showRules}
                  handleClose={this.hideModal}
                ></ModalRules>
              </main>
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
                          {"Options:"}
                          {answers.map(item => (
                            <>
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
                                <span>{decodeChar(item)}</span>
                              </button>
                            </>
                          ))}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </Col>

            <Col className="scoreboard">
              <div>
                <h1>Playing: {this.state.activePlayer}</h1>
                <h2>Scoreboard</h2>
                <h3>Player1: {this.state.player1} </h3>
                <h3>Player2: {this.state.player2} </h3>
              </div>
              <div className="buttonsOnResponsive">
                <button onClick={this.openNav} className="btn btn-2">
                  Rules
                </button>
                <button className="btn btn-2" onClick={this.openScoreboard}>Scoreboard</button>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default MyComponent;
