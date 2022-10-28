const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Admin = require("./models/admin");
const Absence = require("./models/absence");
const Justification = require("./models/justification");

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
app.post("/signup", (req, res) => {

  const type = req.body.type;

  if (type === 'student') {
    const student = new Student({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      student_card_num: req.body.studentCardNum,
      speciality: req.body.speciality,
      group: req.body.group,
    });
    student
      .save()
      .then((result) => {
        console.log(result);
        res.send(result)
      })
      .catch((err) => {
        console.log(err);
        res.send({message: 'Failed to create student account'});
      });
  }
  else {
    if (req.body.teacherCode === '123456789') {
      const teacher = new Teacher({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        speciality: req.body.speciality,
        class_name: req.body.classModule,
      });
      teacher
        .save()
        .then((result) => {
          console.log(result);
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.send({message : "Failed to create teacher's account"});
        });
    }
    else {
      res.send({message: "Wrong teacher code, can't create teacher's account"});
    }
  }

});


app.post("/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  Student.findOne({ email: user }, (err, studentResult) => {
    if (err || studentResult === null) {
      Teacher.findOne({ email: user }, (err, teacherResult) => {
        if (err || teacherResult === null) {
          Admin.findOne({ email: user }, (err, adminResult) => {
            if (err || adminResult === null) {
              res.send({ message: "User not found" });
            } else {
              if (password == adminResult.password) {
                res.send(adminResult);
              } else {
                res.send({ message: "Wrong email/password combination" });
              }
            }
          });
        } else {
          if (password == teacherResult.password) {
            res.send(teacherResult);
          } else {
            res.send({ message: "Wrong email/password combination" });
          }
        }
      });
    } else {
      if (password == studentResult.password) {
        res.send(studentResult);
      } else {
        res.send({ message: "Wrong email/password combination" });
      }
    }
  });
});
