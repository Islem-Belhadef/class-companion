const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Student = require("./models/student");
const Teacher = require("./models/teacher");

const app = express();
app.use(cors());

app.use(express.json());

// mongoDB connection
const uri =
  "mongodb+srv://islem-belhadef:ED15OPZFn5gkSTbp@classcompanion.tjg97lq.mongodb.net/ClassCompanion?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3001, () => {
      console.log("running server");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// API routes
app.post("/signup/student", (req, res) => {
  const student = new Student({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    student_card_num: req.body.studentCardNum,
    speciality: "TI",
    group: "1",
  });
  student
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/signup/teacher", (req, res) => {
  const teacher = new Teacher({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    class_name: req.body.class,
  });
  teacher
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login/student", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  Student.findOne({email: user}, (err, result) => {
    if (err || result === null) {
      res.send({message: 'User not found'});
    }
    else {
      if (password == result.password) {
        res.send(result);
      }
      else {
        res.send({message: 'Wrong email/password combination'});
      }
    }
  })
});

app.post("/login/teacher", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  Teacher.findOne({ email: user, password: password })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
