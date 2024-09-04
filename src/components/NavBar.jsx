import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = ({ user }) => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "NavBar-NavLink active" : "NavBar-NavLink";

  return (
    <>
      <div className="NavBar-nav-div">
        <Link className="NavBar-Link" to={"/home"}>
          Capstone 2
        </Link>

        <nav>
          {user.is_anonymous ? (
            (
              <NavLink className={getNavLinkClass} to={"/login"}>
                Login
              </NavLink>
            ) /
            (
              <NavLink className={getNavLinkClass} to={"/signup"}>
                Sign Up
              </NavLink>
            )
          ) : (
            <NavLink className={getNavLinkClass}>{user.first_name}</NavLink>
          )}
        </nav>
      </div>
      <div className="NavBar-body">
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
