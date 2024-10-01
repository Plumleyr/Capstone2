import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { signOut } from "../functions";
import useStore from "../store";
import { Button } from "react-aria-components";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, isAnonymous } = useStore();
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "NavBar-NavLink active" : "NavBar-NavLink";
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="NavBar-nav-div">
        <Link className="NavBar-Branding-Link" to={"/"}>
          Capstone 2
        </Link>

        <nav>
          {user ? (
            <>
              <NavLink className={getNavLinkClass} to={"/recipes"}>
                Recipes
              </NavLink>
              <NavLink className={getNavLinkClass}>{user.name}</NavLink>
            </>
          ) : null}
          {isAnonymous ? (
            <>
              <Button
                onPress={() => navigate("/login")}
                className="Nav-Btn btn-outlined"
              >
                Login
              </Button>
              <Button
                onPress={() => navigate("/signup")}
                className="Nav-Btn btn"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <NavLink onClick={handleSignOut}>Sign Out</NavLink>
            </>
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
