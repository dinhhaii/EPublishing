/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserSuccess } from "../actions";

const Search = (props) => {
  const { history, location } = props;

  const [keyword, setKeyword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/?search=${keyword}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('search');
    if (search) {
        setKeyword(search);
    }
  }, [location.search])

  return (
    <form className="d-none d-sm-inline-block form-inline mr-auto ml-5 my-2 my-md-0 mw-100 navbar-search" id="searchForm" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control bg-light border-0 small"
          placeholder="Search posts, author, tag, ..."
          onChange={e => setKeyword(e.target.value)}
          aria-label="Search"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit" form="searchForm">
            <i className="fa fa-search fa-sm" />
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserSuccessAction: bindActionCreators(fetchUserSuccess, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
