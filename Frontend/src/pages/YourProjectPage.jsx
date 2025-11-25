import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById } from "../services/api";
import ProjectPreview from "../components/ProjectPreview";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Buttons from "../components/Buttons";
import PropTypes from "prop-types";
import "../styles/projectpreview.css";
import "../styles/yourproject.css";

const YourProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectById(id).then((data) => {
      setProject(data);
    });
  }, [id]);

  return (
    <>
      <Header />
      <div className="button-container">
        <Buttons to="/project-list">Ver Proyectos</Buttons>
      </div>
      <div className="yourproject-container">
        {project ? (
          <ProjectPreview project={project} />
        ) : (
          <p>Cargando proyecto...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

YourProjectPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
};

export default YourProjectPage;
