import "../../styles/GettingStartedDisease.css";
import Ellipse3 from "../../assets/Ellipse3.png";
import Ellipse2 from "../../assets/Ellipse2.png";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { getDiseases } from "../../api/supabase/diseases";
import { signInAnonymously } from "../../api/supabase/auth";

import { Form, Radio, RadioGroup, Button } from "react-aria-components";
import Container from "../Container";
import { useNavigate } from "react-router-dom";

const GettingStartedDisease = () => {
  const navigate = useNavigate();
  const { disease, setDisease, name } = useStore();
  const [diseases, setDiseases] = useState([]);

  const fetchDiseases = async () => {
    let fetchedDiseases = await getDiseases();
    setDiseases(fetchedDiseases);
  };

  const isDisabled = !disease;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInAnonymously(name, disease);
    navigate("/stomach-status");
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  return (
    <>
      <img className="GSD-img1" src={Ellipse3} alt="" />
      <img className="GSD-img2" src={Ellipse3} alt="" />
      <img className="GSD-img3" src={Ellipse2} alt="" />
      <Container width="min(90%, 1194px)" height="min(90%, 600px)">
        <Form className="tracker" onSubmit={handleSubmit}>
          <h1 className="GSD-h1">Our first entry!</h1>
          <div className="GSD-text">
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
                  className={`GSD-radio ${
                    disease === d.disease_name ? "selected" : ""
                  }`}
                >
                  {d.disease_name}
                </Radio>
              );
            })}
          </RadioGroup>
          <div className="GSD-btn-div">
            <Button
              className="GSD-btn btn-outlined"
              type="button"
              onPress={() => navigate("/getting-started-name")}
            >
              Back
            </Button>

            <Button
              className="GSD-btn btn"
              isDisabled={isDisabled}
              type="submit"
            >
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default GettingStartedDisease;
