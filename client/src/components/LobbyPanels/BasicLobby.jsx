import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchLobby, buildGame, openSocket } from "../../actions";

class Matchmaker extends Component {
  state = {
    numberOfPlayersField: ""
  };

  async componentWillMount() {
    const uuID = localStorage.getItem("uuID");
    await this.props.fetchLobby();
  }

  handleNumberOfPlayersFieldChange = event => {
    this.setState({ numberOfPlayersField: event.target.value });
  };

  handleBuildGameSubmit = async event => {
    event.preventDefault();
    await this.props.buildGame(this.state.numberOfPlayersField);
    await this.props.fetchLobby();
  };

  handleGameConnect = async gameId => {
    try {
      const res = await this.props.openSocket(gameId);
      console.log("Opened socket! Log: ", res);
    } catch(e) {
      console.log("There was a problem opening the Socket connection with the provided gameId: ", e);
    }
  }

  render() {
    return (
      <div className="Dashboard">
        <h2>Welcome to Arkham...</h2>
        <p>Create or join a game.</p>
        <form className="Form" onSubmit={this.handleBuildGameSubmit}>
          <input
            type="text"
            placeholder="# of players"
            value={this.state.numberOfPlayersField}
            onChange={this.handleNumberOfPlayersFieldChange}
          />
          <button className="Form__submit" type="submit">
            Initialize a game
          </button>
        </form>
        {this.props.availableGames ? (
          <div className="Available-Games">
            {this.props.availableGames.gameIds.map((gameId, i) => {
              if (gameId)
                return (
                  <div
                    key={i}
                    onClick={async () => {
                      this.handleGameConnect(gameId);
                    }}
                  >
                    {gameId}
                  </div>
                );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authed: state.authed,
    availableGames: state.availableGames,
  }
}

export default connect(mapStateToProps, { fetchLobby, buildGame, openSocket })(Matchmaker);