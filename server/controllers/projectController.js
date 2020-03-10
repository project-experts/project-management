module.exports = {
  createProject: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    const { project_name, project_description, deadline } = req.body;
    db.projects
      .create_project(user_id, project_name, project_description, deadline)
      .then(() => res.sendStatus(200));
  },

  getAllProjects: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    console.log("user_id :", user_id);
    db.projects
      .get_allProjects_singleUser(user_id)
      .then(data => res.status(200).send(data));
  }
};
