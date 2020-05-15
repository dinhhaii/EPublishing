import * as actionTypes from "../utils/action-types";

export const showLoading = () => {
  return {
    type: actionTypes.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: actionTypes.HIDE_LOADING,
  };
};

// LOGIN
export const fetchUser = (username, password) => {
  return {
    type: actionTypes.FETCH_USER,
    username,
    password
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    data,
  };
};

export const fetchUserFailed = () => {
  return {
    type: actionTypes.FETCH_USER_FAILED,
  };
};

// POSTS LIST
export const fetchPosts = () => {
  return {
    type: actionTypes.FETCH_POSTS,
  };
};

export const fetchPostsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    data,
  };
};

export const fetchPostsFailed = () => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED,
  };
};

// USER LIST
export const fetchUsers = () => {
  return {
    type: actionTypes.FETCH_USERS,
  };
};

export const fetchUsersSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    data,
  };
};

export const fetchUsersFailed = () => {
  return {
    type: actionTypes.FETCH_USERS_FAILED,
  };
};

// COMMENTS LIST
export const fetchComments = () => {
  return {
    type: actionTypes.FETCH_COMMENTS,
  };
};

export const fetchCommentsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    data,
  };
};

export const fetchCommentsFailed = () => {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILED,
  };
};
