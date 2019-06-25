import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    const errorMessage = (() => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    })();
    dispatch({
      type: GET_ERRORS,
      payload: errorMessage
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/users/login",
      LoginRequest
    );
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);

    const decoded = jwt_decode(token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    const errorMessage = (() => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    })();
    dispatch({
      type: GET_ERRORS,
      payload: errorMessage
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
