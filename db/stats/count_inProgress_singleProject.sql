select count(*) from tasks
where project_id = $1 and status = 'in progress'