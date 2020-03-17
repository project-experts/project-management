module.exports = {
  countToDoTask: (req, res) => {
    const db = req.app.get("db");
    const { project_id } = req.params;
    console.log("req.params :", project_id);
    db.stats
      .count_todo_singleProject(project_id)
      .then(data => res.status(200).send(data));
  },
  countInProgressTask: (req, res) => {
    const db = req.app.get("db");
    const { project_id } = req.params;
    db.stats
      .count_inProgress_singleProject(project_id)
      .then(data => res.status(200).send(data));
  },
  countReviewTask: (req, res) => {
    const db = req.app.get("db");
    const { project_id } = req.params;
    db.stats
      .count_review_singleProject(project_id)
      .then(data => res.status(200).send(data));
  },
  countDoneTask: (req, res) => {
    const db = req.app.get("db");
    const { project_id } = req.params;
    db.stats
      .count_done_singleProject(project_id)
      .then(data => res.status(200).send(data));
  }
};
