select p.project_id, p.user_id as teamlead, p.project_name, p.project_description, p.deadline, j.user_id as teammate from projects p
join project_junc j on p.project_id = j.project_id