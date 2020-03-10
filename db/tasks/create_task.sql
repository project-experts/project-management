INSERT INTO tasks
(project_id, user_id, task_name, task_description,deadline, priority, status, owner)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8)

returning *