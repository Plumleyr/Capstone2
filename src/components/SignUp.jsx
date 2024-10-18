import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAnonSignUp } from "../api/supabase/auth";
import Container from "./Container";
import Ellipse3 from "../assets/Ellipse3.png";
import Ellipse2 from "../assets/Ellipse2.png";
import { Form, Label, Input, TextField, Button } from "react-aria-components";
import "../styles/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const INITIAL_STATE = {
    email: "",
    password: "",
    confirm: "",
  };

  const labelName = {
    email: "Email",
    password: "Password: Must be 6 characters long",
    confirm: "Confirm Password",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e, key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: e,
    }));
  };

  const isFormValid = (formData) => {
    return (
      formData.password === formData.confirm && formData.password.length >= 6
    );
  };

  const disabled = !isFormValid(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAnonSignUp(formData);
      setFormData(INITIAL_STATE);
      navigate("/");
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
              <Input
                className="form-control"
                type={
                  key === "password" || key === "confirm" ? "password" : "text"
                }
                placeholder={labelName[key]}
              />
            </TextField>
          ))}
          <div className="SU-btn-div">
            <Button type="submit" className="btn" isDisabled={disabled}>
              Sign Up
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
