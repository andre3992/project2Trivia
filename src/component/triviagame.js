import React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
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
    const { error, isLoaded, results } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {results.map(item => {
            let answers = [...item.incorrect_answers, item.correct_answer];
            return (
              <div key={item.category} className="card">
                <div className="cardinner">
                  <div className="gamename">
                    <h1>TriviaGame</h1>
                    <div className="category">{item.category}</div>
                    <div className="question">
                      {" "}
                      {"Questão: " + item.question}
                    </div>
                    <div className="options">
                      {"Opções: "}
                      {answers.map(item => (
                        <div>
                          <button key={item} className="button">
                            {" "}
                            {item}
                          </button>{" "}
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
