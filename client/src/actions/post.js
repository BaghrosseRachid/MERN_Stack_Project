import React from "react";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";
import axios from "axios";
import { setAlert } from "./alert";

//get posts
export const getPosts = () => async (dispatch) => {
  await axios
    .get("/api/posts")
    .then((res) => {
      //console.log(res.data)
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};

export const getPost = (postId) => async (dispatch) => {
  await axios
    .get(`/api/posts/${postId}`)
    .then((res) => {
      //console.log(res.data)
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};
export const addLike = (postId) => async (dispatch) => {
  await axios
    .put(`/api/posts/like/${postId}`)
    .then((res) => {
      //console.log(res.data)
      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data },
      });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};
export const removeLike = (postId) => async (dispatch) => {
  await axios
    .put(`/api/posts/unlike/${postId}`)
    .then((res) => {
      //console.log(res.data)
      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data },
      });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};

//delete post
export const deletePost = (postId) => async (dispatch) => {
  await axios
    .delete(`/api/posts/${postId}`)
    .then((res) => {
      //console.log(res.data)
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
      dispatch(setAlert("Post Supprimé avec succès", "success"));
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};
//ADD post
export const addPost = (formData) => async (dispatch) => {
  console.log(formData)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  await axios
    .post("/api/posts", formData, config)
    .then((res) => {
      //console.log(res.data)
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch(setAlert("Post ajouté avec succès", "success"));
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};
//add comment
export const addComment = (postId, formData) => async (dispatch) => {
  // console.log(postId);
  // console.log(formData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  await axios.post(`/api/posts/comment/${postId}`, formData, config)
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert("comment ajouté avec succès", "success"));
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};
//add comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  console.log(postId)
  console.log(commentId)

  await axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) => {
      //console.log("done")
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert("comment supprimé avec succès", "success"));
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};
