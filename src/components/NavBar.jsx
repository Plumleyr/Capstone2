import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { signOut } from "../api/supabase/auth";
import useStore from "../store";
import { Button } from "react-aria-components";
import accountIcon from "../assets/account_circle.png";
import accountIconDark from "../assets/account_circle_dark.png";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, isAnonymous, resetNonForm } = useStore();
  const [profileCard, setProfileCard] = useState("hidden");
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "NavBar-NavLink active" : "NavBar-NavLink";

  const toggleProfileCard = () => {
    if (profileCard === "") {
      setProfileCard("hidden");
    } else {
      setProfileCard("");
    }
  };

  const handleSignOut = async () => {
    try {
      resetNonForm();
      await signOut();
      toggleProfileCard;
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const bodyToggleCard = () => {
    if (profileCard === "") {
      setProfileCard("hidden");
    }
  };

  return (
    <>
      <div className="NavBar-nav-div">
        <Link className="NavBar-Branding-Link" to={"/"}>
          Gutsy
        </Link>

        <nav className="Nav-nav">
          {/* Show Log In button if there is no user */}
          {!user && (
            <Button
              onPress={() => navigate("/login")}
              className="Nav-Btn btn-outlined"
            >
              Log In
            </Button>
          )}

          {/* Show Sign Up button if isAnonymous is true and there is a user */}
          {isAnonymous && user && (
            <Button onPress={() => navigate("/signup")} className="Nav-Btn btn">
              Sign Up
            </Button>
          )}

          {/* Show user info and profile options if the user is logged in */}
          {user && (
            <>
              <p className="Nav-p">Howdy, {user.name}</p>
              <Button className="Nav-profile-btn" onPress={toggleProfileCard}>
                <img src={accountIcon} alt="icon for account" />
              </Button>
              <div className={`Nav-profile-card ${profileCard}`}>
                <NavLink
                  onClick={toggleProfileCard}
                  className={`${getNavLinkClass} Nav-link`}
                  to={"/edit-profile"}
                >
                  Edit Profile
                </NavLink>
                <Link className="Nav-link" onClick={handleSignOut}>
                  Sign Out
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
      <div className="NavBar-body" onClick={bodyToggleCard}>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
