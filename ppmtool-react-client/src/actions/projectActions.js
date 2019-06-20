import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/project", project);
    history.push("/dashboard");
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

export const getProjects = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

export const getProject = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = id => async dispatch => {
  await axios.delete(`http://localhost:8080/api/project/${id}`);
  dispatch({
    type: DELETE_PROJECT,
    payload: id
  });
};
