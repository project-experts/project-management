drop table if exists newProjects ;

create table newProjects 
as (select project_id,user_id, project_name, project_description,team_mates,deadline, unnest(team_mates) as teammate from projects);

select n.project_id, n.user_id, n.project_name, n.project_description,n.team_mates,n.deadline, users.profile_image from newProjects n
join users on users.user_id = n.user_id
where teammate = $1;