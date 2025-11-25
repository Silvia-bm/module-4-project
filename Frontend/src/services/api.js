export const getProjects = () => {
  return fetch("http://localhost:3000/projects")
    .then((response) => response.json())
    .then((data) => {
      const cleanData = data.map((item) => {
        return {
          id: item.id_projects,
          nameProj: item.project_name,
          description: item.project_description,
          techs: item.technologies,
          projectImage: item.project_image,
          repo: item.github,
          demo: item.demo,
          authorId: item.id_authors,
          owner: item.author_name,
          jobTitle: item.author_job,
          authorImage: item.author_photo,
          authorDescription: item.author_description,
        };
      });

      return cleanData;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProjectById = (id) => {
  return fetch(`http://localhost:3000/project/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener proyecto");
      }
      return response.json();
    })
    .then((item) => {
      return {
        id: item.id_projects,
        nameProj: item.project_name,
        description: item.project_description,
        techs: item.technologies,
        projectImage: item.project_image,
        repo: item.github,
        demo: item.demo,
        authorId: item.id_authors,
        owner: item.author_name,
        jobTitle: item.author_job,
        authorImage: item.author_photo,
        authorDescription: item.author_description,
      };
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addProject = (data) => {
  return fetch("http://localhost:3000/create-project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear proyecto");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
