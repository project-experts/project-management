select * from tasks 
where project_id = $1
order by task_id desc; 