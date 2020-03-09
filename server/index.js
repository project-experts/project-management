require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const app = express();
const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;
const authCtrl = require("./controllers/authController");

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
   app.set('db', db); 
   app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`))
})


//ENDPOINTS
//auth endpoints
app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.post("/api/logout", authCtrl.logout);
app.post("/api/email", authCtrl.email);
