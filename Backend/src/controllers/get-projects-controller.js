const mysql = require("../database/mysql-pool");

const getProjectsController = async (req, res) => {
  try {
    const connection = await mysql.getConnection();

    const query = `
      SELECT 
        p.id_projects,
        p.name AS project_name,
        p.description AS project_description,
        p.technologies,
        p.image AS project_image,
        p.github,
        p.demo,
        a.id_authors,
        a.name AS author_name,
        a.job AS author_job,
        a.photo AS author_photo,
        a.description AS author_description
      FROM projects p
      JOIN authors a ON p.authors_id_authors = a.id_authors
    `;

    const [rows] = await connection.query(query);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Algo ha ido mal");
  }
};

module.exports = {
  getProjectsController,
};
