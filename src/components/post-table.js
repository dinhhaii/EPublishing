import React from "react";
import { capitalize, formatDateToString } from "../utils/helper";
import { withRouter } from "react-router-dom";

const PostTable = ({ posts, comments, users, history }) => {

  return (
    <table className="table table-hover table-borderless table-responsive w-100 d-table mr-2 ml-2">
      <tbody>
        {posts && posts.length !== 0 ? (
          posts.map((post, index) => {
            const countComment = comments.reduce(
              (initVal, val) =>
                val.idPost === post.id ? initVal + 1 : initVal,
              0
            );
            const author = users.find((user) => user.id === post.idAuthor);
            return (
              <tr key={index.toString()} onClick={() => history.push(`/post/${post.id}`)}>
                <td>
                  <div className="card" style={{ width: "calc(100vw - 50px)" }}>
                    <div className="card-body">
                      <h4 className="card-title">{capitalize(post.name)}</h4>
                      <p
                        className="card-text text-nowrap overflow-hidden w-100"
                        style={{ textOverflow: "ellipsis" }}
                      >
                        {capitalize(post.content)}
                      </p>
                      <span className="card-text small">
                        {post.points} points |{" "}
                        {formatDateToString(post.createdDate * 1000)} |{" "}
                        {author && author.name} |{" "}
                        {countComment} comments
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td className="m-5 text-center"> There are no records</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default withRouter(PostTable);
