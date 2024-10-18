import "../../styles/IngredientTracking.css";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { createTracker } from "../../api/supabase/tracker";
import { useCreateIngredientRating } from "../../hooks/useCreateIngredientRating";

import {
  Form,
  TextField,
  Label,
  TextArea,
  Button,
} from "react-aria-components";
import Ellipse3 from "../../assets/Ellipse3.png";
import Ellipse2 from "../../assets/Ellipse2.png";
import Container from "../Container";
import { useState } from "react";

const IngredientTracking = () => {
  const { stomachStatus, ingredients, setIngredients, resetForm } = useStore();
  const navigate = useNavigate();
  const isDisabled = ingredients.length > 0 ? false : true;
  const [loading, setLoading] = useState(false);

  const mapIngredients = (e) => {
    let currIngredients = e;
    const ingredientList = currIngredients
      .split(",")
      .map((ing) => {
        const trimmedIng = ing.trim();
        return trimmedIng.charAt(0).toUpperCase() + trimmedIng.slice(1);
      })
      .filter((ing) => ing !== "");

    setIngredients(ingredientList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    try {
      setLoading(true);
      await useCreateIngredientRating(ingredients);
      await createTracker(formattedDate, stomachStatus, ingredients);
      resetForm();
    } catch (error) {
      console.error("Error submitting tracker:", error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      {loading ? (
        <div className="App-Loading">Loading...</div>
      ) : (
        <>
          <img className="IT-img1" src={Ellipse3} alt="" />
          <img className="IT-img2" src={Ellipse3} alt="" />
          <img className="IT-img3" src={Ellipse2} alt="" />
          <Container width="min(90%, 1194px)" height="min(90%, 600px)">
            <Form className="tracker" onSubmit={handleSubmit}>
              <h1 className="IT-h1"> Time to track your day! 📋</h1>
              <p className="IT-text">
                What ingredients did you enjoy today? Just type them in
                below—anything you ate or drank. This helps us get a better
                picture of what might be affecting you.
              </p>
              <TextField className="IT-TF" onChange={mapIngredients}>
                <Label className="IT-lbl">
                  Enter your ingredients (seperated by commas) here:
                </Label>
                <TextArea
                  className="IT-TA"
                  placeholder="e.g., tomatoes, mustard, garlic"
                />
              </TextField>
              <div className="IT-btn-div">
                <Button
                  className="IT-btn btn-outlined"
                  type="button"
                  onPress={() => navigate("/stomach-status")}
                >
                  Back
                </Button>

                <Button
                  className="IT-btn btn"
                  type="submit"
                  isDisabled={isDisabled}
                >
                  Finish
                </Button>
              </div>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default IngredientTracking;
