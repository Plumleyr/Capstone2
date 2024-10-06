import "../../styles/FirstEntry.css";
import Ellipse3 from "../../assets/Ellipse3.png";
import Ellipse2 from "../../assets/Ellipse2.png";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { getDiseases } from "../../functions";

import { Form, Radio, RadioGroup, Button } from "react-aria-components";
import Container from "../Container";
import { useNavigate } from "react-router-dom";

const FirstEntry = () => {
  const navigate = useNavigate();
  const { disease, setDisease } = useStore();
  const [diseases, setDiseases] = useState([]);

  const fetchDiseases = async () => {
    let fetchedDiseases = await getDiseases();
    setDiseases(fetchedDiseases);
  };

  const isDisabled = !disease;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/stomach-status");
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  return (
    <>
      <img className="FE-img1" src={Ellipse3} alt="" />
      <img className="FE-img2" src={Ellipse3} alt="" />
      <img className="FE-img3" src={Ellipse2} alt="" />
      <Container width="min(90%, 1194px)" height="min(90%, 600px)">
        <Form className="tracker" onSubmit={handleSubmit}>
          <h1 className="FE-h1">Our first entry!</h1>
          <div className="FE-text">
            <p>
              To help us personalize your experience, could you tell us which
              stomach condition you're dealing with?
            </p>
            <p>Choose from the list below:</p>
          </div>

          <RadioGroup aria-label="disease selection" onChange={setDisease}>
            {diseases.map((d, idx) => {
              return (
                <Radio
                  key={idx}
                  value={d.disease_name}
                  className={`FE-radio ${
                    disease === d.disease_name ? "selected" : ""
                  }`}
                >
                  {d.disease_name}
                </Radio>
              );
            })}
          </RadioGroup>
          <div className="FE-btn-div">
            <Button className="btn" isDisabled={isDisabled} type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default FirstEntry;
