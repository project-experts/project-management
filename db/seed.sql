CREATE TABLE users(
  user_id serial primary key,
  first_name varchar(100),
  last_name varchar(100),
  email varchar(100),
  hash varchar(300),
  profile_image text
);



create table projects(
  project_id serial primary key,
  user_id int references users(user_id),
  project_name varchar(100),
  project_description text,
  deadline date
);


create table tasks(
  task_id serial primary key,
  project_id int references projects(project_id),
  user_id int,
  task_name varchar(100),
  task_description text,
  deadline date,
  priority varchar (30),
  status varchar(20),
  owner int
);


CREATE TABLE project_junc (
    project_junc_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    user_id INT REFERENCES users(user_id)
);