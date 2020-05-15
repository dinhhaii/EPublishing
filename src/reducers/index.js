import * as actionTypes from "../utils/action-types";

const initialState = {
  isLoading: false,
  isLogin: false,
  user: null,
  posts: [],
  users: [],
  comments: [],
};

const reducer = (state = initialState, action) => {
  const { data } = action;
  switch (action.type) {
    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.FETCH_USERS:
      return {
        ...state,
        users: [],
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: data,
      };
    case actionTypes.FETCH_USERS_FAILED:
      return {
        ...state,
        users: [],
      };
    case actionTypes.FETCH_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: data,
      };
    case actionTypes.FETCH_COMMENTS_FAILED:
      return {
        ...state,
        comments: [],
      };
    case actionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: [],
      };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: data,
      };
    case actionTypes.FETCH_POSTS_FAILED:
      return {
        ...state,
        posts: [],
      };
    case actionTypes.FETCH_USER:
      return {
        ...state,
        user: null,
        isLogin: false,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: data,
        isLogin: true,
      };
    case actionTypes.FETCH_USER_FAILED:
      return {
        ...state,
        users: null,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default reducer;
