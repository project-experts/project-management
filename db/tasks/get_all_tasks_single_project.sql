select t.task_id, t.project_id, t.user_id, t.task_name, t.task_description, t.deadline, t.priority, t.status, t.owner, u.profile_image from tasks t
join users u on t.owner = u.user_id
where project_id = $1
order by task_id desc; 