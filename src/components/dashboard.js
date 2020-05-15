/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPosts, fetchUsers, fetchComments } from "../actions";
import { usePrevious } from "../utils/helper";
import PostTable from "./post-table";
import { Pagination } from "antd";
import 'antd/dist/antd.css';
import Filter from "./filter";
import { TAG, POINTS, TIME } from "../utils/constant";

const Dashboard = (props) => {
  const prevProps = usePrevious(props);
  const dataPerPage = 5;

  const [filter, setFilter] = useState({
    search: '',
    tag: TAG.NONE,
    points: POINTS.NONE,
    time: TIME.ALLTIME,
  });

  const [pagination, setPagination] = useState({
    indexFirst: 0,
    indexLast: 0,
    currentPage: 1,
    totalPage: 1,
    data: [],
  });

  useEffect(() => {
      props.fetchPostsAction();
      props.fetchUsersAction();
      props.fetchCommentsAction();
  }, [])

  useEffect(() => {
    if (prevProps && prevProps.posts !== props.posts) {
        const indexFirst = 0;
        const indexLast = dataPerPage;
        const currentPage = 1;
        const totalPage = Math.ceil(filteredData(props.posts, filter).length / dataPerPage);
        const data = filteredData(props.posts, filter).slice(0, dataPerPage);

        setPagination({ indexFirst, indexLast, currentPage, totalPage, data });
      }
  })

  const filteredData = (data, f) => {
    const keyword = f.search.toLowerCase();
    console.log(keyword);
    const result = data.slice()
      .filter(e => {
          const user = props.users.find(item => item.id === e.idAuthor);
          // console.log(e.tag.includes(keyword),user && user.name.toLowerCase().includes(keyword),e.name.toLowerCase().includes(keyword),e.content.toLowerCase().includes(keyword))
          return keyword === "" ||
          e.tag.includes(keyword) ||
          e.name.toLowerCase().includes(keyword) ||
          e.content.toLowerCase().includes(keyword) ||
          (user && user.name.toLowerCase().includes(keyword))
        })
      .filter((e) => f.tag === "" || f.tag === TAG.NONE || f.tag === e.tag);

    if (f.time === TIME.LATEST) {
      result.sort((a,b) => b.createdDate - a.createdDate);
    }
    if (f.points === POINTS.POPULARITY) {
      result.sort((a,b) => b.points - a.points);
    }
    return result;
  }

  const choosePage = (page) => {
    const indexFirst = (page - 1) * dataPerPage;
    const indexLast = page * dataPerPage;
    const currentPage = page;
    const data = filteredData(props.posts, filter).slice(indexFirst, indexLast);
    
    setPagination({ ...pagination, indexFirst, indexLast, currentPage, data });
  };

  const handleChangeFilter = (f) => {
    const indexFirst = 0;
    const indexLast = dataPerPage;
    const currentPage = 1;
    const totalPage = Math.ceil(filteredData(props.posts, f).length / dataPerPage);
    const data = filteredData(props.posts, f).slice(0, dataPerPage);

    setPagination({ ...pagination, indexFirst, indexLast, currentPage, totalPage, data });
  }
  
  return (
    <div className="mt-3">
      <Filter
        filter={filter}
        setFilter={setFilter}
        handleChangeFilter={handleChangeFilter}
      />
      <PostTable
        users={props.users}
        comments={props.comments}
        posts={pagination.data}
      />
      <Pagination
        className="float-right mr-5 mb-5"
        onChange={choosePage}
        defaultCurrent={1}
        defaultPageSize={1}
        current={pagination.currentPage}
        total={pagination.totalPage}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    users: state.users,
    comments: state.comments,
    isLogin: state.isLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsAction: bindActionCreators(fetchPosts, dispatch),
    fetchUsersAction: bindActionCreators(fetchUsers, dispatch),
    fetchCommentsAction: bindActionCreators(fetchComments, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
