import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "../functions";

const Login = () => {
  const navigate = useNavigate();

  const INITIAL_STATE = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignIn(formData);
    } catch (err) {
      console.error("Unexpected Error", err.message);
    }
    setFormData(INITIAL_STATE);
    navigate("/home");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
