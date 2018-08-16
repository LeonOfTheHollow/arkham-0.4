import React, { Component } from "react";
import { connect } from "react-redux";
import GameDisplay from "./Game";
import Matchmaker from "./LobbyPanels/BasicLobby";
import io from "socket.io-client";

import { loadSocketMessenger } from "../actions/index";

class Viewport extends Component {

  async componentDidMount() {
    const uuID = localStorage.getItem("uuID");
    
  }

  render() {
    return (
      <div className="View">
        <div className="View__Toolbar">{/* <Toolbar /> */}</div>
        <div className="View__Main">
          {this.props.currentGame ? <GameDisplay /> : <Matchmaker/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authed: state.authed,
    currentGame: state.currentGame,
  }
}

export default connect(mapStateToProps, { })(Viewport);