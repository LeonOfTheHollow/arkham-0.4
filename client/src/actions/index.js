const axios = require("axios");
const io = require("socket.io-client");

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const GAME_RETRIEVED = "GAME_RETRIEVED";
export const ALL_GAMES_RETRIEVED = "ALL_GAMES_RETRIEVED";
export const SELECTED_INVESTIGATOR = "SELECTED_INVESTIGATOR";
export const USER_PROF_RETRIEVED = "USER_PROF_RETRIEVED";
export const OPENING_SOCKET = "OPENING_SOCKET";
export const OPENED_SOCKET = "OPENED_SOCKET";
export const SOCKET_FAILURE = "SOCKET_FAILURE";
export const LOBBY_RETRIEVED = "LOBBY_RETRIEVED";
export const SOCKET_MSG = "SOCKET_MSG";

const ROOT_URL = "http://localhost:5050";
const WS_URL = "ws://localhost:5050";

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await axios.post(`${ROOT_URL}/login`, { username, password });
      const uuID = user.data._id;
      localStorage.setItem("uuID", uuID);
      if (user) dispatch({ 
        type: LOGIN_SUCCESS,
        payload: user,
      });
      else dispatch({ type: LOGIN_FAILURE });
    } catch(e) {
      console.log("Problem logging in: ", e);
      dispatch({ type: LOGIN_FAILURE });
    }
  };
};

export const register = (username, password, confirmPassword) => {
  return async dispatch => {
    try {
      const newUser = await axios.post(`${ROOT_URL}/register`, { username, password });
    } catch(e) {
      console.log("There was a problem registering: ", e);
    }
  };
};

export const openSocket = (gameId) => {
  return async dispatch => {
    try {
      const socket = io(WS_URL);
      console.log("Created a socket: ", socket);
      socket.on('connect', function() {
        console.log("The socket opened: ", socket);
        dispatch({ type: OPENED_SOCKET, payload: socket })
      })
      return socket;
    } catch(e) {
      dispatch({ type: SOCKET_FAILURE, payload: e })
    }
  }
}

export const fetchUserInfo = () => {
  const uuID = localStorage.getItem('uuID');
  return async dispatch => {
    try {
      console.log("About to request fresh user info.")
      const currentUser = await axios.get(`${ROOT_URL}/users/${uuID}`);
      if (currentUser) dispatch({
        type: USER_PROF_RETRIEVED,
        payload: {
          currentUser,
        },
      })
    } catch(e) {
      console.log("There was a problem fetching the latest user state: ", e);
    }
  }
}

export const fetchLobby = () => {
  return async dispatch => {
    try {
      const gameList = await axios.get(`${ROOT_URL}/games/all`);
      const gameIds = gameList.data.map(game => game._id);
      if (gameList) dispatch({
        type: LOBBY_RETRIEVED,
        payload: {
          gameIds,
        },
      });
    } catch(e) {
      console.log("There was an error fetching the lobby. A puzzle to solve!", e);
    }
  }
}

export const buildGame = () => {
  console.log("This is a dummy action creator!");
}

export const loadSocketMessenger = (socket) => {
  return dispatch => {
    socket.on('message', (res) => {
      console.dir(res);
      dispatch({
        type: SOCKET_MSG,
        payload: res
      })
    })
  }
}