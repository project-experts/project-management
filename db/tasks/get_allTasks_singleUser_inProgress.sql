SELECT * FROM tasks
WHERE user_id = $1 AND status = 'in progress';