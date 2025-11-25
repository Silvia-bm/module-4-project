const { getProjectsController } = require("./get-projects-controller");
const { getProjectByIdController } = require("./get-project-id-controller");
const { postProjectController } = require("./post-project-controller");

module.exports = {
  getProjectsController,
  getProjectByIdController,
  postProjectController,
};
