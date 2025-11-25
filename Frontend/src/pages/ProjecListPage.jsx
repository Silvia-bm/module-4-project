import { useEffect, useState } from "react";
import ListComponent from "../components/ListComponent";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import Footer from "../components/Footer";
import { getProjects } from "../services/api";
import "../styles/listitemcomponent.css";
import "../styles/projectpreview.css";

const ProjecListPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="button-container">
        <Buttons to="/">Nuevo proyecto</Buttons>
      </div>
      <ListComponent projects={projects} hiddenclass="hidden" card="card" />
      <Footer />
    </>
  );
};

export default ProjecListPage;
