import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./Navbar.scss";

const Navbar = () => {
  const [state, dispatch] = useContext(UserContext);
  const [isMenuActive, setMenuActive] = useState(false);
  let history = useHistory();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });

    history.push("/");
  };

  return (
    <nav
      className="navbar menuNavbar"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="navbar-brand">
        <Link to="/home">
          <img src="./images/logo.png" width="112" height="28" alt="Logo" />
        </Link>

        <Link
          onClick={() => {
            setMenuActive(!isMenuActive);
          }}
          role="button"
          className={`navbar-burger burger ${isMenuActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-terget="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isMenuActive ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/home" className="navbar-item">
              Home
            </Link>
            <Link to="/home" className="navbar-item">
              Home Lagi
            </Link>
            <Link onClick={() => logout()} className="navbar-item">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
