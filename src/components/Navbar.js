import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar({ user, onLogout }) {
  const cart = useSelector((state) => state.cart);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div className="container px-5">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/product"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item order">
              <NavLink
                to="/order"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Order
              </NavLink>
              <span>{cart.books.length}</span>
            </li>
          </ul>
        </div>
        <div className="box-user">
          <img
            alt="avatar"
            src={`${
              user.avatar ? user.avatar : "https://i.stack.imgur.com/l60Hf.png"
            }`}
          />
          <p className="text-light m-0">{user.name}</p>

          <ul>
            <li>
              <NavLink to="/profile">Profiles</NavLink>
            </li>
            <li>
              <a href="" onClick={onLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
