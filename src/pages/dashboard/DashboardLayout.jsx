import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardLayout.css";
import { cookie } from "../../controller/Common";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
    cookie.set("user", "", {
      path: "/",
    });
    cookie.set("token", "", {
      path: "/",
    });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="sidebar">
        <a className="navbar-brand mb-4" href="#">
          <h4 style={{ padding: "20px" }}>Dashboard</h4>
        </a>
        <ul className="navbar-nav flex-column">
          <li className="nav-item list ">
            <Link className="nav-link" to="/dashboardLayout">
              <h6>User Details</h6>
            </Link>
          </li>
          <li className="nav-item list">
            <Link className="nav-link" to="/dashboardLayout/createTask">
              <h6>Create Task</h6>
            </Link>
          </li>
          <li className="nav-item list">
            <Link className="nav-link" to="/dashboardLayout/viewTask">
              <h6>View Task</h6>
            </Link>
          </li>
        </ul>
      </nav>
      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar" style={{ backgroundColor: "#ebf5ff" }}>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              width: "100%",
            }}
          >
            <button
              className="btn btn-danger"
              style={{ float: "right", width: "100px", marginRight: "25px" }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="m-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
