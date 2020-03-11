INSERT INTO projects
(user_id, project_name, project_description,deadline)
VALUES
($1,$2,$3,$4)
returning *; 