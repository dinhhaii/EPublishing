import { takeLatest, call, put, delay } from "redux-saga/effects";
import { toast } from "react-toastify";
import jwt from 'jsonwebtoken';

import * as actionTypes from "../utils/action-types";
import {
  showLoading,
  hideLoading,
  fetchPostsSuccess,
  fetchPostsFailed,
  fetchUserSuccess,
  fetchUserFailed,
  fetchUsersSuccess,
  fetchUsersFailed,
  fetchCommentsSuccess,
  fetchCommentsFailed,
} from "../actions";
import { fetchPosts, fetchUsers, fetchComments } from "../api";
import { JWT_SECRET, TOKEN } from "../utils/constant";

function* rootSaga() {
  yield takeLatest(actionTypes.FETCH_POSTS, fetchPostsSaga);
  yield takeLatest(actionTypes.FETCH_USERS, fetchUsersSaga);
  yield takeLatest(actionTypes.FETCH_COMMENTS, fetchCommentsSaga);
  yield takeLatest(actionTypes.FETCH_USER, fetchUserSaga);
}

function* fetchPostsSaga() {
  yield put(showLoading());
  try {
    const response = yield call(fetchPosts);
    const data = yield response.json();
    if (data) {
      yield put(fetchPostsSuccess(data));
    } else {
      yield put(fetchPostsFailed());
      toast.error("Sorry, fetch post failed!");
    }
  } catch (e) {
    console.log(e);
    yield put(fetchPostsFailed());
    toast.error("Sorry, fetch post failed!");
  } finally {
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* fetchUsersSaga() {
  yield put(showLoading());
  try {
    const response = yield call(fetchUsers);
    const data = yield response.json();
    if (data) {
      yield put(fetchUsersSuccess(data));
    } else {
      yield put(fetchUsersFailed());
      toast.error("Sorry, fetch user list failed!");
    }
  } catch (e) {
    console.log(e);
    yield put(fetchUsersFailed());
    toast.error("Sorry, fetch user list failed!");
  } finally {
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* fetchCommentsSaga() {
  yield put(showLoading());
  try {
    const response = yield call(fetchComments);
    const data = yield response.json();
    if (data) {
      yield put(fetchCommentsSuccess(data));
    } else {
      yield put(fetchCommentsFailed());
      toast.error("Sorry, fetch comments failed!");
    }
  } catch (e) {
    console.log(e);
    yield put(fetchCommentsFailed());
    toast.error("Sorry, fetch comments failed!");
  } finally {
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* fetchUserSaga({ username, password }) {
  yield put(showLoading());
  try {
    const response = yield call(fetchUsers);
    const data = yield response.json();
    const user = data && data.find(user => user.username === username && user.password === password);
    console.log(user);
    if (user) {
      const token = jwt.sign(JSON.stringify(user), JWT_SECRET);
      localStorage.setItem(TOKEN, token);
      yield put(fetchUserSuccess(user));
      toast.success("Login successfully");

    } else {
      toast.error("Invalid user");
      yield put(fetchUserFailed());
    }
  } catch (e) {
    console.log(e);
    yield put(fetchUserFailed());
    toast.error(e.message);
  } finally {
    yield delay(1000);
    yield put(hideLoading());
  }
}

export default rootSaga;
