import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../asset/logo.png";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleBurger = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/home" className="navbar-item">
            <img src={logo} width="112" height="28" alt="logo" />
          </NavLink>

          <a
            href="#!"
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isActive ? "true" : "false"}
            data-target="navbarBasicExample"
            onClick={toggleBurger}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-light" onClick={logout}>
                  <IoLogOut />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;