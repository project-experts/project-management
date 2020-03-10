module.exports = {
  createTask: (req, res) => {
    const db = req.app.get("db");
    const user_id = req.session.user.user_id;
    const {
      project_id,
      task_name,
      task_description,
      deadline,
      priority,
      status,
      owner
    } = req.body;
    db.create_task(
      project_id,
      user_id,
      task_name,
      task_description,
      deadline,
      priority,
      status,
      owner
    ).then(() => res.sendStatus(200));
  },

  getToDoTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db.get_allTasks_singleUser_todo(user_id).then(res.status(200).send(data));
  },

  getInProgressTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db.get_allTasks_singleUser_inProgress(user_id).then(
      res.status(200).send(data)
    );
  },

  getReviewTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db.get_allTasks_singleUser_review(user_id).then(res.status(200).send(data));
  },
  getDoneTasks: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db.get_allTasks_singleUser_done(user_id).then(res.status(200).send(data));
  },
  deleteTask: (req, res) => {
    const db = req.app.get("db");
    const { task_id } = req.params;
    db.delete_task(Number(task_id)).then(() => {
      db.delete_task(Number(task_id)).then(data => res.sendStatus(200));
    });
  }
};
