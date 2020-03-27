module.exports = {
  createProject: async (req, res) => {
    const db = req.app.get("db");
    const { user_id, project_name, project_description, deadline, teammates } = req.body;
    console.log( user_id, project_name, project_description, deadline, teammates )
    let newProject = await db.projects
                     .create_project(user_id, project_name, project_description, deadline)
   
    for (let i=0; i<teammates.length; i++){
       await db.projects.create_project_junc(newProject[0].project_id, teammates[i])
       .then(()=>res.sendStatus(200))
       .catch(err => console.log(err))
    }
  },

  getAllProjects: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    console.log(user_id)
    db.projects
      .get_allProjects_singleUser(user_id)
      .then(async data => {
         let projects = data
         console.log('data is: ', projects)
         for (let i=0; i<projects.length; i++){
            projects[i].teammates = await db.projects.get_teammates_eachProject(projects[i].project_id);
         }
         res.status(200).send(projects)
      });
  },
  getSingleProject: (req, res) => {
     const db = req.app.get('db'); 
     const { project_id } = req.params; 
     db.projects
      .get_single_project(project_id)
      .then(async data => res.status(200).send(data))
      .catch(err => console.log('error is: ', err))
  }
};
