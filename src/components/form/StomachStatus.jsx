import "../../styles/StomachStatus.css";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";

import { Form, Radio, RadioGroup, Button } from "react-aria-components";
import Ellipse3 from "../../assets/Ellipse3.png";
import Ellipse2 from "../../assets/Ellipse2.png";
import good from "../../assets/good.png";
import meh from "../../assets/meh.png";
import bad from "../../assets/bad.png";
import Container from "../Container";

const StomachStatus = () => {
  const navigate = useNavigate();
  const { stomachStatus, setStomachStatus } = useStore();
  const isDisabled = stomachStatus ? false : true;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/ingredient-tracking");
  };

  return (
    <>
      <img className="SS-img1" src={Ellipse3} alt="" />
      <img className="SS-img2" src={Ellipse3} alt="" />
      <img className="SS-img3" src={Ellipse2} alt="" />
      <Container width="min(90%, 1194px)" height="min(90%, 600px)">
        <Form className="tracker" onSubmit={handleSubmit}>
          <h1 className="SS-h1">How Are You Feeling? 😊</h1>
          <p className="SS-text">
            We want to make sure we’re capturing how you’re doing. How’s your
            stomach today?
          </p>
          <RadioGroup
            aria-label="stomach status selection"
            className="SS-radioGroup"
            onChange={setStomachStatus}
          >
            <Radio
              value="bad"
              className={`SS-radio ${
                stomachStatus === "bad" ? "selected" : ""
              }`}
            >
              Not so good...
              <img className="SS-radio-img" src={bad} />
            </Radio>
            <Radio
              value="meh"
              className={`SS-radio ${
                stomachStatus === "meh" ? "selected" : ""
              }`}
            >
              Meh.!
              <img className="SS-radio-img" src={meh} />
            </Radio>
            <Radio
              value="good"
              className={`SS-radio ${
                stomachStatus === "good" ? "selected" : ""
              }`}
            >
              Good!
              <img className="SS-radio-img" src={good} />
            </Radio>
          </RadioGroup>
          <div className="SS-btn-div">
            <Button
              className="SS-btn btn"
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

export default StomachStatus;
