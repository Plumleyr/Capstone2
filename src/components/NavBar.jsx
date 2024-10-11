import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { signOut } from "../functions";
import useStore from "../store";
import { Button } from "react-aria-components";
import accountIcon from "../assets/account_circle.png";
import accountIconDark from "../assets/account_circle_dark.png";

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

        <nav className="Nav-nav">
          {isAnonymous ? (
            <>
              <Button
                onPress={() => navigate("/login")}
                className="Nav-Btn btn-outlined"
              >
                Log In
              </Button>
              <Button
                onPress={() => navigate("/signup")}
                className="Nav-Btn btn"
              >
                Sign Up
              </Button>
            </>
          ) : null}
          {user ? (
            <>
              <p className="Nav-p"> Howdy, {user.name}</p>
              <NavLink className={getNavLinkClass}>
                <img src={accountIcon} alt="icon for account" />
                {/* <img src={accountIconDark} alt="icon for account" /> */}
              </NavLink>
            </>
          ) : null}
        </nav>
      </div>
      <div className="NavBar-body">
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
