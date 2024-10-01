import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { handleAnonSignUp, handleSessionlessSignUp } from "../functions";
import Container from "./Container";
import { Form, Label, Input, TextField, Button } from "react-aria-components";

const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const INITIAL_STATE = {
    email: "",
    password: "",
    ...(user ? { name: "" } : {}),
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
    <Container>
      <Form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value], idx) => (
          <TextField
            key={idx}
            name={key}
            onChange={(e) => handleChange(e, key)}
          >
            <Label>{key}</Label>
            <Input />
          </TextField>
        ))}
      </Form>
    </Container>
    //   <div>
    //     {user ? (
    //       <form onSubmit={handleSubmit}>
    //         {formData.map((prop) =>(

    //         ))}
    //         <label htmlFor="email">Email:</label>
    //         <input
    //           type="text"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //         />

    //         <label htmlFor="password">Password:</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //         />

    //         <button>Sign Up</button>
    //       </form>
    //     ) : (
    //       <form onSubmit={handleSubmit}>
    //         <label htmlFor="first_name">First:</label>
    //         <input
    //           type="text"
    //           name="first_name"
    //           value={formData.first_name}
    //           onChange={handleChange}
    //         />

    //         <label htmlFor="last_name">Last:</label>
    //         <input
    //           type="text"
    //           name="last_name"
    //           value={formData.last_name}
    //           onChange={handleChange}
    //         />

    //         <label htmlFor="email">Email:</label>
    //         <input
    //           type="text"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //         />

    //         <label htmlFor="password">Password:</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //         />
    //         <button>Sign Up</button>
    //       </form>
    //     )}
    //   </div>
  );
};

export default SignUp;
