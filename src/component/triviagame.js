import React from "react";
import { randomAnswer, decodeChar, checkAnswer } from "../component/gamelogic";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      activePlayer: "player1"
    };
  }

  componentDidMount() {
    fetch(
      "https://opentdb.com/api.php?amount=1&category=" +
        this.props.categoryId +
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
  }

  render() {
    const { error, isLoaded, results, activePlayer } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {this.state.activePlayer}
          {results.map(item => {
            let answers = [...item.incorrect_answers, item.correct_answer];
            let correct_answer = item.correct_answer;
            let question = item.question;
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
                                activePlayer
                              );
                              
                              this.setState({ activePlayer: result.nextPlayer });
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
      );
    }
  }
}

export default MyComponent;
