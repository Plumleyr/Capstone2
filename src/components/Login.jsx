import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "../api/supabase/auth";
import Ellipse3 from "../assets/Ellipse3.png";
import Ellipse2 from "../assets/Ellipse2.png";
import { Form, Label, Input, TextField, Button } from "react-aria-components";
import Container from "./Container";
import "../styles/LogIn.css";

const Login = () => {
  const navigate = useNavigate();

  const INITIAL_STATE = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e, key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: e,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignIn(formData);
    } catch (err) {
      console.error("Unexpected Error", err.message);
    }
    setFormData(INITIAL_STATE);
    navigate("/");
  };

  return (
    <>
      <img className="LI-img1" src={Ellipse3} alt="" />
      <img className="LI-img2" src={Ellipse3} alt="" />
      <img className="LI-img3" src={Ellipse2} alt="" />
      <Container width="min(80%, 457px)" height="min(80%, 516px)">
        <Form className="LI-form" onSubmit={handleSubmit}>
          <h1 className="LI-h1">Log In</h1>
          <p className="LI-p">
            Welcome back! Enter your account information below to log in.
          </p>
          {Object.entries(formData).map(([key], idx) => (
            <TextField
              key={idx}
              name={key}
              onChange={(e) => handleChange(e, key)}
              className="LI-TF"
            >
              <Label className="LI-lbl">
                {key[0].toUpperCase() + key.slice(1)}
              </Label>
              <Input
                className="form-control"
                type={key === "password" ? "password" : "text"}
                placeholder={key[0].toUpperCase() + key.slice(1)}
              />
            </TextField>
          ))}
          <div className="LI-btn-div">
            <Button type="submit" className="btn">
              Log In
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
