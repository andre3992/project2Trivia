import React from "react";

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    render() {
        const { error } = this.state;
        if (error) {
            return <div > Error: { error.message } < /div>;
        } else {
            return ( <
                div >
                <
                div className = "playerActive" >
                <
                div className = "activePlayer" > { this.props.activePlayer } < /div> <
                /div> <
                /div>
            );
        }
    }
}

export default Player;