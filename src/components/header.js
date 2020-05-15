/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { TOKEN, JWT_SECRET } from "../utils/constant";
import { bindActionCreators } from "redux";
import { fetchUserSuccess } from "../actions";
import { toast } from "react-toastify";
import Search from "./search";

const Header = (props) => {
  const { history, user, isLogin } = props;

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const urs = token ? jwt.verify(token, JWT_SECRET) : null;
    if (urs) {
      if (!isLogin || !user) {
        props.fetchUserSuccessAction(urs);
        toast.success("Login successfully");
      }
    } else {
      localStorage.removeItem(TOKEN);
      history.push('/login');
    }
  }, []);

  return (
    <nav
      className="navbar navbar-expand navbar-light bg-white topbar mb-4 shadow"
      style={{ zIndex: 999, position: "sticky", top: 0, left: 0, right: 0 }}>
      <img src="/logo.png" style={{ height: 50 }} alt="" />
      <h3 className="d-sm-none d-lg-inline">E-PUBLISHING</h3>
      <Search />
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        {isLogin && user ? (
          <li className="nav-item dropdown no-arrow">
            <Link
              className="nav-link"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600">
                {user.name}
              </span>
              <img
                className="img-profile rounded-circle"
                src={user.images}
                height={50}
                width={50}
                alt=""
              />
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link to="/logout" className="dropdown-item">
                <i className="fa fa-sign-out mr-2 text-gray-400"></i>
                Logout
              </Link>
            </div>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="btn btn-info">
              LOGIN
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLogin: state.isLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchUserSuccessAction: bindActionCreators(fetchUserSuccess, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
