import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-aria-components";
import useStore from "../store";

import "../styles/LandingPage.css";
import BrazStand from "../assets/BrazStand.png";
import BrazCat from "../assets/BrazCat.png";
const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="LP-main">
        <img
          className="LP-img1"
          src={BrazStand}
          alt="dude standing with brush"
        />
        <div className="LP-text">
          <h1 className="LP-h1">
            Seriously, your <span>stomach</span>
            <br />
            needs you!
          </h1>
          <p className="LP-p">
            Let’s start logging our food daily and adjust our cooking
            <br />
            recipes according to your stomach. It TRUSTS you.
          </p>
        </div>
        <Button
          onPress={() => navigate("/getting-started-name")}
          className="btn LP-btn"
        >
          Get Started
        </Button>
        <img className="LP-img2" src={BrazCat} alt="cat stretching" />
      </div>
    </>
  );
};

export default LandingPage;
