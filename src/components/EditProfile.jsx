import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useStore from "../store";
import { updateUser } from "../api/supabase/user";
import { getDiseases } from "../api/supabase/diseases";
import { updateAuthUser } from "../api/supabase/auth";
import Container from "./Container";
import Ellipse3 from "../assets/Ellipse3.png";
import Ellipse2 from "../assets/Ellipse2.png";
import {
  Form,
  Label,
  Input,
  TextField,
  Button,
  Select,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  const INITIAL_STATE = {
    disease: user?.disease,
    name: user?.name,
  };

  const labelName = {
    disease: "Disease",
    name: "Name",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [diseases, setDiseases] = useState([]);

  const fetchDiseases = async () => {
    let fetchedDiseases = await getDiseases();
    setDiseases(fetchedDiseases);
  };

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.user_id, {
        disease: formData.disease,
        name: formData.name,
      });
      await updateAuthUser({ name: formData.name, disease: formData.disease });
      setFormData(INITIAL_STATE);
    } catch (err) {
      console.error("Unexpected error", err.message);
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  return (
    <>
      <img className="EP-img1" src={Ellipse3} alt="" />
      <img className="EP-img2" src={Ellipse3} alt="" />
      <img className="EP-img3" src={Ellipse2} alt="" />
      <Container width="min(80%, 457px)" height="min(80%, 516px)">
        <Form className="EP-form" onSubmit={handleSubmit}>
          <h1 className="EP-h1">Edit Profile</h1>
          <TextField className="EP-TF">
            <Label className="EP-lbl">{labelName.name}</Label>
            <Input
              className="form-control"
              type="text"
              placeholder={labelName.name}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </TextField>

          <div className="EP-TF">
            <Select
              selectedKey={formData.disease}
              onSelectionChange={(value) => {
                handleChange("disease", value);
              }}
            >
              <Label className="EP-lbl">{labelName.disease}</Label>
              <Button className="form-control">
                <div className="EP-select">
                  <SelectValue>
                    {formData.disease || "Select a disease"}
                  </SelectValue>
                  <span className="EP-carot" aria-hidden="true">
                    ▼
                  </span>
                </div>
              </Button>
              <Popover className="EP-popover">
                <ListBox>
                  {diseases.map((disease, idx) => (
                    <ListBoxItem
                      key={idx}
                      id={disease.disease_name}
                      className="EP-LBI"
                    >
                      {disease.disease_name}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Popover>
            </Select>
          </div>

          <div className="EP-btn-div">
            <Button type="submit" className="btn">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditProfile;
