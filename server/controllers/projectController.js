module.exports = {
  createProject: async (req, res) => {
    const db = req.app.get("db");
    const { user_id, project_name, project_description, deadline, teammates } = req.body;
    console.log( user_id, project_name, project_description, deadline, teammates )
    let newProject = await db.projects
                     .create_project(user_id, project_name, project_description, deadline)
                     // .then(() => res.sendStatus(200))
                     // .catch(err => res.status(500).send('Project not created', err)); 

   
    for (let i=0; i<teammates.length; i++){
       await db.projects.create_project_junc(newProject[0].project_id, teammates[i])
       console.log('Line 14: ', newProject[0].project_id, teammates[i])
    }
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
