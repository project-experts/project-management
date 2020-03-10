require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = process.env;

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, email, password, profile_image } = req.body;
    console.log(first_name, last_name, email, password, profile_image);
    //  const result = await db.users.get_user(email);
    //  if (result[0]) {
    //    return res.status(409).send("Email already registered.");
    //  }
    //  console.log("result :", result[0]);
    const salt = bcrypt.genSaltSync(10);
    console.log("password :", password);
    console.log("username :", email);
    const hash = bcrypt.hashSync(password, salt);
    console.log("Hash is: ", hash);
    const user = await db.users.register_user([
      first_name,
      last_name,
      email,
      hash,
      profile_image
    ]);
    console.log("user :", user);
    if (user[0]) {
      delete user[0].hash;
    }
    req.session.user = user[0];
    res.status(200).send(req.session.user);

    //Nodemailer
    let message = "Thank you for registering your account!";
    let image =
      "https://i.kym-cdn.com/entries/icons/mobile/000/005/608/nyan-cat-01-625x450.jpg";
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });
      let info = await transporter.sendMail(
        {
          from: EMAIL,
          to: `<${email}>`,
          subject: "Register",
          text: message,
          html: `<div>${message}</div>
                   <img src="cid:unique@nodemailer.com"/>`,

          attachments: [
            {
              filename: "license.txt",
              path:
                "https://raw.github.com/nodemailer/nodemailer/master/LICENSE"
            },
            {
              cid: "unique@nodemailer.com",
              path: image
            }
          ]
        },
        (err, res) => {
          if (err) {
            console.log("err", err);
          } else {
            console.log("res", res);
            res.status(200).send(info);
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    console.log(req.body);
    const result = await db.users.get_user(email);
    const user = result[0];
    if (!user) {
      return res.status(401).send("User not found.");
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
      return res.status(403).send("Incorrect password.");
    }
    delete user.hash;
    req.session.user = user;
    console.log("this is user :", user);
    res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  email: async (req, res) => {
    console.log("req.body :", req.body);
    const { email } = req.body;
  },
  getAllUsers: (req, res) => {
    const db = req.app.get("db");
    db.users.get_allUsers().then(data => res.status(200).send(data));
  }
};
