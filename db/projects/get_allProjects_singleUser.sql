select distinct p.project_id, p.user_id as teamlead, p.project_name, p.project_description, p.deadline, u.profile_image, j.user_id as teammate from projects p
join project_junc j on p.project_id = j.project_id
join users u on j.user_id = u.user_id
where j.user_id = $1
order by project_id desc;