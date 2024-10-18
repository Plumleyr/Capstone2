import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, TextField } from "react-aria-components";
import useStore from "../../store";
import Container from "../Container";
import Ellipse3 from "../../assets/Ellipse3.png";
import Ellipse2 from "../../assets/Ellipse2.png";

const GettingStartedName = () => {
  const navigate = useNavigate();
  const { user, name, setName } = useStore();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  let isDisabled = name.length ? false : true;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/getting-started-disease");
  };

  return (
    <>
      <img className="LP-GS-img1" src={Ellipse3} alt="" />
      <img className="LP-GS-img2" src={Ellipse3} alt="" />
      <img className="LP-GS-img3" src={Ellipse2} alt="" />
      <Container width="min(90%, 1194px)" height="min(90%, 600px)">
        <div className="LP-text form">
          <h1 className="GS-h1">
            Welcome to <span>Gutsy</span> 🎉
          </h1>
          <p>
            Let’s get you started! We’d love to know your name to make things
            more personal. If you
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
  );
};

export default GettingStartedName;
