require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const app = express();
const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;
const authCtrl = require("./controllers/authController");
const taskCtrl = require("./controllers/taskController");
const projectCtrl = require("./controllers/projectController");

app.use(express.json());

// server static files when hitting the server
app.use(express.static("build"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT, () =>
    console.log(`Server is listening on port ${SERVER_PORT}`)
  );
});

//ENDPOINTS
//auth endpoints
app.post("/api/register", authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post("/api/logout", authCtrl.logout);
app.post("/api/email", authCtrl.email);

//task endpoints
app.post("/api/createTask", taskCtrl.createTask);
app.get("/api/getToDoTasks/:user_id", taskCtrl.getToDoTasks);
app.get("/api/getInProgressTasks/:user_id", taskCtrl.getInProgressTasks);
app.get("/api/getReviewTasks/:user_id", taskCtrl.getReviewTasks);
app.get("/api/getDoneTasks/:user_id", taskCtrl.getDoneTasks);
app.delete("/api/deleteTask/:user_id", taskCtrl.deleteTask);

//project endpoints
app.get("/api/getProjects/:user_id", projectCtrl.getAllProjects);
