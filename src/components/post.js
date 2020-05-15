/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { formatDateToString, capitalize } from "../utils/helper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchPosts, fetchUsers, fetchComments } from "../actions";

const Post = (props) => {
  const { posts, comments, users, history, match } = props;

  useEffect(() => {
    if (props.isLogin) {
      props.fetchPostsAction();
      props.fetchUsersAction();
      props.fetchCommentsAction();
    } else {
      history.push("/login");
    }
  }, [match.params]);

  const idPost = parseInt(match.params.id);
  const post = posts && posts.find((item) => item.id == idPost);
  const author =
    post && users && users.find((item) => item.id === post.idAuthor);
  const cmts = comments && comments.filter((item) => item.idPost === idPost);

  if (!post || !author || !cmts) {
    return <div>No post here</div>;
  }
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">{capitalize(post.name)}</div>
        <div className="card-body">
          <div classNameName="badge badge-danger"></div>
          <blockquote className="blockquote mb-0">
            <p>{post.content}</p>
            <footer className="blockquote-footer">{author.name}</footer>
          </blockquote>
          <p className="card-text">
            <small className="text-muted">
              {formatDateToString(post.createdDate * 1000)}
            </small>
          </p>
        </div>
        <div className="card-footer text-muted">
          <div className="comment-wrapper">
            <div className="panel panel-info">
              <ul className="media-list">
                {cmts.map((item) => {
                  const user = users.find((e) => e.id === item.idUser);
                  return (
                    <li className="media" key={item.id}>
                      <span className="pull-left mr-3">
                        <img className="img-circle" src={user.images} alt="" />
                      </span>
                      <div className="media-body">
                        <span className="text-muted pull-right">
                          <small className="text-muted">
                            {formatDateToString(item.createdDate * 1000)}
                          </small>
                        </span>
                        <strong className="text-success">{user.name}</strong>
                        <p>{item.content}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    users: state.users,
    comments: state.comments,
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsAction: bindActionCreators(fetchPosts, dispatch),
    fetchUsersAction: bindActionCreators(fetchUsers, dispatch),
    fetchCommentsAction: bindActionCreators(fetchComments, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
