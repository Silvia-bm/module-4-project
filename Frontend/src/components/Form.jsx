import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addProject } from "../services/api";
import FormTextInputs from "./FormTextInputs";
import FormImage from "./FormImage";
import Reset from "../components/Reset";
import PropTypes from "prop-types";

const Form = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [globalError, setGlobalError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nameProj.trim())
      newErrors.nameProj = "Este campo es obligatorio";
    if (!formData.repo.trim()) newErrors.repo = "Este campo es obligatorio";
    if (!formData.demo.trim()) newErrors.demo = "Este campo es obligatorio";
    if (!formData.techs.trim()) newErrors.techs = "Este campo es obligatorio";
    if (!formData.description.trim())
      newErrors.description = "Este campo es obligatorio";
    if (!formData.owner.trim()) newErrors.owner = "Este campo es obligatorio";
    if (!formData.jobTitle.trim())
      newErrors.jobTitle = "Este campo es obligatorio";
    if (!formData.authorDescription.trim())
      newErrors.authorDescription = "Este campo es obligatorio";

    if (!formData.projectImage)
      newErrors.projectImage = "La imagen del proyecto es obligatoria";
    if (!formData.authorImage)
      newErrors.authorImage = "La imagen de la autora es obligatoria";

    setErrors(newErrors);
    console.log(errors);

    if (Object.keys(newErrors).length > 0) {
      setGlobalError("Por favor, completa los campos");
    } else {
      setGlobalError("");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateProject = () => {
    const isValid = validateForm();
    if (!isValid) return;

    const formDetails = {
      nameProj: formData.nameProj,
      repo: formData.repo,
      demo: formData.demo,
      techs: formData.techs,
      description: formData.description,
      owner: formData.owner,
      jobTitle: formData.jobTitle,
      authorDescription: formData.authorDescription,
      projectImage: formData.projectImage,
      authorImage: formData.authorImage,
    };

    addProject(formDetails)
      .then(() => {
        navigate("/project-list");
      })
      .catch((error) => {
        console.error(error);
        setGlobalError("Hubo un problema al guardar el proyecto");
      });
  };

  console.log(formData);
  return (
    <div className="form__inputs">
      <FormTextInputs
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
      <FormImage
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
      <div className="button-container">
        <Reset setFormData={setFormData} />
        <button onClick={handleCreateProject}>Crea tu proyecto</button>
      </div>

      {globalError && (
        <p style={{ color: "red", marginTop: "10px" }}>{globalError}</p>
      )}
    </div>
  );
};

Form.propTypes = {
  formData: PropTypes.shape({
    nameProj: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    demo: PropTypes.string.isRequired,
    techs: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authorDescription: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    jobTitle: PropTypes.string,
    projectImage: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Form;
