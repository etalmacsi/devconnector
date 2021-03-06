import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login  - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to local Storage
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log user out

export const logoutUser = () => dispatch => {
  //remove the token from localstorage
  localStorage.removeItem("jwtToken");
  //remove the auth header
  setAuthToken(false);
  //set the current user to {} which will set isAutenticated to false
  dispatch(setCurrentUser({}));
};
