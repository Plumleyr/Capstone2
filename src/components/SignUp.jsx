import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { handleAnonSignUp, handleSessionlessSignUp } from "../functions";
import Container from "./Container";
import Ellipse3 from "../assets/Ellipse3.png";
import Ellipse2 from "../assets/Ellipse2.png";
import { Form, Label, Input, TextField, Button } from "react-aria-components";
import "../styles/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const INITIAL_STATE = {
    ...(user ? {} : { name: "" }),
    email: "",
    password: "",
    confirm: "",
  };

  const labelName = {
    name: "Name",
    email: "Email",
    password: "Password",
    confirm: "Confirm Password",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e, key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: e,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await handleAnonSignUp(formData);
      } else {
        await handleSessionlessSignUp(formData);
      }

      setFormData(INITIAL_STATE);
      navigate("/home");
    } catch (err) {
      console.error("Unexpected error", err.message);
    }
  };

  return (
    <>
      <img className="SU-img1" src={Ellipse3} alt="" />
      <img className="SU-img2" src={Ellipse3} alt="" />
      <img className="SU-img3" src={Ellipse2} alt="" />
      <Container width="min(80%, 457px)" height="min(80%, 516px)">
        <Form className="SU-form" onSubmit={handleSubmit}>
          <h1 className="SU-h1">Sign Up</h1>
          {Object.entries(formData).map(([key], idx) => (
            <TextField
              key={idx}
              name={key}
              onChange={(e) => handleChange(e, key)}
              className="SU-TF"
            >
              <Label className="SU-lbl">{labelName[key]}</Label>
              <Input className="form-control" placeholder={labelName[key]} />
            </TextField>
          ))}
          <div className="SU-btn-div">
            <Button className="btn">Sign Up</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
