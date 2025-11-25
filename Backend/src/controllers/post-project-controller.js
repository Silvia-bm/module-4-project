const mysql = require("../database/mysql-pool");

const postProjectController = async (req, res) => {
  try {
    const {
      nameProj,
      repo,
      demo,
      techs,
      description,
      owner,
      jobTitle,
      authorDescription,
      projectImage,
      authorImage,
    } = req.body;

    if (
      !nameProj ||
      !repo ||
      !demo ||
      !techs ||
      !description ||
      !owner ||
      !jobTitle ||
      !authorDescription ||
      !projectImage ||
      !authorImage
    ) {
      return res.status(400).send("Faltan datos obligatorios");
    }

    const connection = await mysql.getConnection();

    const insertAuthorQuery = `
      INSERT INTO authors (name, job, photo, description)
      VALUES (?, ?, ?, ?)
    `;
    const [authorResult] = await connection.query(insertAuthorQuery, [
      owner,
      jobTitle,
      authorImage,
      authorDescription,
    ]);

    const authorId = authorResult.insertId;

    const insertProjectQuery = `
      INSERT INTO projects (name, description, technologies, image, github, demo, authors_id_authors)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(insertProjectQuery, [
      nameProj,
      description,
      techs,
      projectImage,
      repo,
      demo,
      authorId,
    ]);

    res.status(201).send("Proyecto y autora creados correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Algo ha ido mal");
  }
};

module.exports = {
  postProjectController,
};
