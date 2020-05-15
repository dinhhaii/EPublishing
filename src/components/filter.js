/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { TAG, POINTS, TIME } from "../utils/constant";
import { capitalize } from "../utils/helper";
import { withRouter } from "react-router-dom";

const Filter = (props) => {
  const { filter, setFilter, handleChangeFilter, location } = props;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('search');
    if (search) {
      const f = { ...filter, search };
      setFilter(f);
      handleChangeFilter(f)
    }
  }, [location.search])

  const handleChange = (e) => {
    const { name, value } = e.target;
    const f = { ...filter, [name]: value };
    setFilter(f);
    handleChangeFilter(f)
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex justify-content-around align-items-center col-md-3 mb-3">
          <label className="w-25" for="tag">
            Search
          </label>
          <select
            className="form-control w-75"
            name="tag"
            id="tag"
            onChange={handleChange}
          >
            {Object.values(TAG).map((value) => (
              <option value={value}>{capitalize(value)}</option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-around align-items-center col-md-3 mb-3">
          <label className="w-25" for="points">
            for
          </label>
          <select
            className="form-control w-75"
            name="points"
            id="points"
            onChange={handleChange}
          >
            {Object.values(POINTS).map((value) => (
              <option value={value}>{capitalize(value)}</option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-around align-items-center col-md-3 mb-3">
          <label className="w-25" for="time">
            by
          </label>
          <select
            className="form-control w-75"
            name="time"
            id="time"
            onChange={handleChange}
          >
            {Object.values(TIME).map((value) => (
              <option value={value}>{capitalize(value)}</option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-around align-items-center col-md-3 mb-3">
          <button
            className="btn btn-warning"
            onClick={() => {
              const f = {
                search: "",
                tag: TAG.NONE,
                points: POINTS.NONE,
                time: TIME.ALLTIME,
              };
              setFilter(f);
              handleChangeFilter(f);
            }}>
            <i className="fa fa-refresh" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Filter);
