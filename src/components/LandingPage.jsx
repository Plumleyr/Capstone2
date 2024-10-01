import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, TextField } from "react-aria-components";
import { signInAnonymously } from "../functions";
import useStore from "../store";

import "../styles/LandingPage.css";
import Container from "./Container";
import BrazStand from "../assets/BrazStand.png";
import BrazCat from "../assets/BrazCat.png";
import Ellipse3 from "../assets/Ellipse3.png";
import Ellipse2 from "../assets/Ellipse2.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [gettingStarted, setGettingStarted] = useState(false);
  const [name, setName] = useState("");
  let isDisabled = name.length ? false : true;

  const handleSubmit = (e) => {
    e.preventDefault();
    signInAnonymously(name);
  };

  return (
    <>
      {gettingStarted ? (
        <>
          <img className="LP-GS-img1" src={Ellipse3} alt="" />
          <img className="LP-GS-img2" src={Ellipse3} alt="" />
          <img className="LP-GS-img3" src={Ellipse2} alt="" />
          <Container>
            <div className="LP-text form">
              <h1 className="GS-h1">
                Welcome to <span>Capstone 2</span> 🎉
              </h1>
              <p>
                Let’s get you started! We’d love to know your name to make
                things more personal. If you
                <br />
                prefer to stay incognito, you can always continue as a guest.
              </p>
              <p>
                What’s your name?
                <br />
                (Or just click “Continue as Guest” to skip this step.)
              </p>
            </div>
            <Form className="LP-form" onSubmit={handleSubmit}>
              <TextField
                name="name"
                type="text"
                aria-label="your name"
                value={name}
                onChange={setName}
              >
                <Input className="LP-input" />
              </TextField>
              <div className="LP-btn-div">
                <Button className="LP-GS-btn btn-outlined" type="submit">
                  Continue as guest
                </Button>
                <Button
                  className="LP-GS-btn btn"
                  type="submit"
                  isDisabled={isDisabled}
                >
                  Continue
                </Button>
              </div>
            </Form>
          </Container>
        </>
      ) : (
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
            onPress={() => setGettingStarted(true)}
            className="btn LP-btn"
          >
            Get Started
          </Button>
          <img className="LP-img2" src={BrazCat} alt="cat stretching" />
        </div>
      )}
    </>
  );
};

export default LandingPage;
