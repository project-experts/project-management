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
    db.projects
      .get_allProjects_singleUser(user_id)
      .then(async data => {
         let projects = data; 
         let projecttIds =  data.map(v => v.project_id)
         for (let i=0; i<projecttIds.length; i++){
            projects[i].teammates = await db.projects.get_teammates_eachProject(i);
            console.log('this is teammates: ', )
         }
         res.status(200).send(projects)
         // console.log(projects)
      });
  }
};
