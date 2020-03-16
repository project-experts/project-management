module.exports = {
  createTask: (req, res) => {
    const db = req.app.get("db");
   //  const user_id = req.session.user.user_id;
    console.log("req.session.user :", req.session.user);
    console.log('body is ', req.body)
    const {
      project_id,
      user_id,
      task_name,
      task_description,
      deadline,
      priority,
      status,
      owner
    } = req.body;
    db.tasks
      .create_task(
        project_id,
        user_id,
        task_name,
        task_description,
        deadline,
        priority,
        status,
        owner
      )
      .then(() => res.sendStatus(200));
  },

  getToDoTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    console.log("asd", req.params);
    db.tasks
      .get_allTasks_singleUser_todo(user_id)
      .then(data => console.log("data :", data) || res.status(200).send(data));
  },

  getInProgressTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db.tasks
      .get_allTasks_singleUser_inProgress(user_id)
      .then(data => res.status(200).send(data));
  },

  getReviewTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db.tasks
      .get_allTasks_singleUser_review(user_id)
      .then(data => res.status(200).send(data));
  },
  getDoneTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db.tasks
      .get_allTasks_singleUser_done(user_id)
      .then(data => res.status(200).send(data));
  },
  deleteTask: (req, res) => {
    const db = req.app.get("db");
    const { task_id } = req.params;
    db.tasks.delete_task(Number(task_id)).then(() => {
      db.tasks.delete_task(Number(task_id)).then(data => res.sendStatus(200));
    });
  },
  getAllTeammates: async (req, res) => {
    const db = req.app.get("db");
    const { project_id } = req.params;
    console.log('task ctrl line 69 ', project_id)
    await db.tasks.get_allTeam_perProject(project_id)
    .then(response => res.status(200).send(response))
  }, 
  getAllTasksSingleProject: async(req, res) => {
     const db = req.app.get('db'); 
     const { project_id } = req.params; 
     console.log('project_id: ', project_id)
     await db.tasks.get_all_tasks_single_project(project_id)
     .then(response => res.status(200).send(response))
     .catch(err => res.status(500).send(err))
    console.log("task ctrl line 69 ", project_id);
    await db.tasks
      .get_allTeam_perProject(project_id)
      .then(response => res.status(200).send(response));
  },
  updateTaskInProgress: (req, res) => {
    const db = req.app.get("db");
    const { task_id } = req.params;
    db.tasks
      .update_task_to_inProgress(task_id)
      .then(data => res.status(200).send(data));
  },
  updateTaskReview: (req, res) => {
    const db = req.app.get("db");
    const { task_id } = req.params;
    db.tasks
      .update_task_to_review(task_id)
      .then(data => res.status(200).send(data));
  },
  updateTaskDone: (req, res) => {
    const db = req.app.get("db");
    const { task_id } = req.params;
    db.tasks
      .update_task_to_done(task_id)
      .then(data => res.status(200).send(data));
  },
  updateTaskToDo: (req, res) => {
    const db = req.app.get("db");
    const { task_id } = req.params;
    db.tasks
      .update_task_to_todo(task_id)
      .then(data => res.status(200).send(data));
  }
};
