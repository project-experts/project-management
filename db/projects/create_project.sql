INSERT INTO projects
(user_id, project_name, project_description,team_mates,deadline)
VALUES
($1,$2,$3,$4,$5)
return *;