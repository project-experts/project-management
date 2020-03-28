select distinct p.user_id, u.first_name, u.last_name, u.profile_image from project_junc p
join users u on u.user_id = p.user_id
where project_id = $1; 
