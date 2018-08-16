import { LOGIN_SUCCESS, LOGIN_FAILURE, USER_PROF_RETRIEVED, LOBBY_RETRIEVED, OPENED_SOCKET, SOCKET_FAILURE } from "../actions";
import { lstat } from "fs";

const initialState = {
  authed: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
    console.log("Got user info from logging in: \n", action.payload, "\n");
      return {
        ...state,
        authed: true,
        currentUser: action.payload.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
      };
    case USER_PROF_RETRIEVED:
      return {
        ...state,
        currentUser: action.payload.currentUser.data,
      };
    case LOBBY_RETRIEVED:
      return {
        ...state,
        availableGames: action.payload,
      }
    case OPENED_SOCKET:
      return {
        ...state,
        gameConnection: action.payload,
      }
    default:
      return state;
  }
}