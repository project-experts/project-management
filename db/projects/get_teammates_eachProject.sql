select u.user_id, u.profile_image, u.first_name, u.last_name, p.project_id
from users u
join project_junc p on u.user_id = p.user_id
where p.project_id = $1