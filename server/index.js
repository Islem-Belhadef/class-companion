const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TeacherModules = require("./models/teacherModules");
const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Admin = require("./models/admin");
const Absence = require("./models/absence");
const Sesion = require("./models/sesion");
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

// post signup
app.post("/signup", (req, res) => {
  const type = req.body.type;

  if (type === "student") {
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
        res.send({ dbresult: result, account_type: "student" });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Failed to create student account" });
      });
  } else {
    if (req.body.teacherCode === "12345679") {
      const teacher = new Teacher({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        departement: req.body.departement,
        class_name: req.body.classModule,
      });
      teacher
        .save()
        .then((result) => {
          console.log(result);
          res.send({ dbresult: result, account_type: "teacher" });
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "Failed to create teacher's account" });
        });
    } else {
      res.send({
        message: "Wrong teacher code, can't create teacher's account",
      });
    }
  }
});

// post login
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
                res.send({ dbresult: adminResult, account_type: "admin" });
                // res.send({account_type: "admin"});
              } else {
                res.send({ message: "Wrong email/password combination" });
              }
            }
          });
        } else {
          if (password == teacherResult.password) {
            res.send({ dbresult: teacherResult, account_type: "teacher" });
            // res.send({account_type: "teacher"});
          } else {
            res.send({ message: "Wrong email/password combination" });
          }
        }
      });
    } else {
      if (password == studentResult.password) {
        res.send({ dbresult: studentResult, account_type: "student" });
        // res.send({account_type: "student"});
      } else {
        res.send({ message: "Wrong email/password combination" });
      }
    }
  });
});

// get students
app.get("/students", (req, res) => {
  Student.find({}, (err, students) => {
    if (err || students === null) {
      res.send({ message: "Error, could not get students" });
    } else {
      res.send(students);
    }
  });
});

// get teachers
app.get("/teachers", (req, res) => {
  Teacher.find({}, (err, teachers) => {
    if (err || teachers === null) {
      res.send({ message: "Error, could not get teachers" });
    } else {
      res.send(teachers);
    }
  });
});

// get absences
app.get("/absences", (req, res) => {
  Absence.find({}, (err, absences) => {
    if (err || absences === null) {
      res.send({ message: "Error, could not get absences" });
    } else {
      res.send(absences);
    }
  });
});

// post user absences
app.post("/absences", (req, res) => {
  id = req.body.id;

  Absence.find({ student_id: id }, (err, absences) => {
    if (err) {
      res.send({ message: "Error, could not get absences" });
    } else if (absences === null) {
      res.send({ message: "You have no absences absences" });
    } else {
      res.send(absences);
    }
  });
});

// post user
app.post("/user", (req, res) => {
  const type = req.body.type;
  const id = req.body.id;

  if (type === "teacher") {
    Teacher.findById(id, (err, teacher) => {
      if (err || teacher === null) {
        res.send({ message: "Error, could not find teacher" });
      } else {
        res.send(teacher);
      }
    });
  } else if (type === "student") {
    Student.findById(id, (err, student) => {
      if (err || student === null) {
        res.send({ message: "Error, could not find student" });
      } else {
        res.send(student);
      }
    });
  } else if (type === "admin") {
    Admin.findById(id, (err, admin) => {
      if (err || admin === null) {
        res.send({ message: "Error, could not find admin" });
      } else {
        res.send(admin);
      }
    });
  }
});

// post edit user
// app.post("/edit", (req, res) => {
//   const type = req.body.type;
//   const id = req.body.id;

//   const email = req.body.email;
//   const password = req.body.password;
//   const speciality = req.body.speciality;
//   const group = req.body.group;
//   const departement = req.body.departement;
//   const classModule = req.body.classModule;

//   if (type === "student") {
//     Student.findByIdAndUpdate(
//       id,

//       {
//         email: email,
//         password: password,
//         speciality: speciality,
//         group: group,
//       },

//       (err, student) => {
//         if (err) {
//           res.send({ message: err });
//         } else {
//           res.send(student);
//         }
//       }
//     );

//   } else if (type === "teacher") {
//     Teacher.findByIdAndUpdate(
//       id,

//       {
//         email: email,
//         password: password,
//         departement: departement,
//         classModule: classModule,
//       },

//       (err, teacher) => {
//         if (err) {
//           res.send({ message: err });
//         } else {
//           res.send(teacher);
//         }
//       }
//     );
//   }
//  else if (type === "admin") {
//     Admin.findByIdAndUpdate(
//       id,

//       {
//         email: email,
//         password: password,
//       },

//       (err, admin) => {
//         if (err) {
//           res.send({ message: err });
//         } else {
//           res.send(admin);
//         }
//       }
//     );
//   }
// });

// post edit user
app.post("/edit", (req, res) => {
  const type = req.body.type;
  const id = req.body.id;

  const email = req.body.email;
  const student_card_num = req.body.student_card_num;
  const speciality = req.body.speciality;
  const password = req.body.password;
  const group = req.body.group;
  const departement = req.body.departement;
  const classModule = req.body.classModule;

  if (type === "student") {
    Student.findByIdAndUpdate(
      id,

      {
        email: email,
        student_card_num: student_card_num,
        speciality: speciality,
        group: group,
      },

      (err, student) => {
        if (err) {
          res.send({ message: err });
        } else {
          res.send(student);
        }
      }
    );
  } else if (type === "teacher") {
    Teacher.findByIdAndUpdate(
      id,

      {
        email: email,
        departement: departement,
        class_name: classModule,
      },

      (err, teacher) => {
        if (err) {
          res.send({ message: err });
        } else {
          res.send(teacher);
        }
      }
    );
  } else if (type === "admin") {
    Admin.findByIdAndUpdate(
      id,

      {
        email: email,
        password: password,
      },

      (err, admin) => {
        if (err) {
          res.send({ message: err });
        } else {
          res.send(admin);
        }
      }
    );
  }
});

// post delete user
app.post("/delete", (req, res) => {
  const type = req.body.type;
  const id = req.body.id;

  if (type === "student") {
    Student.findByIdAndDelete(id, (err, tudent) => {
      if (err) {
        res.send({ message: err });
      } else {
        res.send(tudent);
        Absence.deleteMany({ student_id: id }, function (err, result) {
          if (err) {
            result.send(err);
          } else {
            console.log("no errors");
          }
        });
      }
    });
  } else if (type === "teacher") {
    Teacher.findByIdAndDelete(id, (err, teacher) => {
      if (err) {
        res.send({ message: err });
      } else {
        res.send(teacher);
        Absence.deleteMany({ taecher_id: id }, function (err, result) {
          if (err) {
            result.send(err);
          } else {
            console.log("no errors");
          }
        });
      }
    });
  }
});

//get sesions
app.get("/sesions", (req, res) => {
  Sesion.find({}, (err, sesions) => {
    if (err || sesions === null) {
      res.send({ message: "Error, could not get sesions" });
    } else {
      res.send(sesions);
    }
  });
});

//sesion and absences
let sesionGroup;
let speciality;

app.post("/addsesion",(req,res)=>{
  sesionGroup =req.body.group;
  sesionDate= new Date(req.body.sesiondate);
  sesionTime=req.body.sesiontime;
  classType=req.body.class_type ;
  sesionModule=req.body.module.split(" ")[0];
  speciality=req.body.module.split(" ")[1];
   const sesion = new Sesion({
   teacher_id : req.body.teacher_id,
   sesiondate :sesionDate,
   sesiontime : req.body.sesiontime,
   class_type :req.body.class_type ,
   module : req.body.module,
   group:req.body.group
  })
  sesion.save()
  .then((result) => {
   console.log(result);
   res.send({ dbresult: result });
 })
 .catch((err) => {
   console.log(err);
   res.send({ message: "Failed to create new sesion" });
 });
 });

if (!sesionGroup && !speciality) {
  app.get("/studentsbyGroup", (req, res) => {
    Student.find(
      { group: sesionGroup, speciality: speciality },
      (err, students) => {
        if (err || students === null) {
          res.send({ message: "Error, could not get students" });
        } else {
          res.send(students);
        }
      }
    );
  });
}
app.post("/addabsences", (req, res) => {
  var absentStudentsList = req.body.absentStudents;
  var absence;
  const dat = req.body.date;
  const tim = req.body.time;
  const type = req.body.class_type;
  const idt = req.body.teacher_id;
  const Classname = req.body.class_name;
  if (absentStudentsList.length === 0) {
    console.log("no new absences");
    return;
  }
  for (var i = 0; i < absentStudentsList.length; i++) {
    absence = new Absence({
      date: dat,
      time: tim,
      student_id: absentStudentsList[i],
      teacher_id: idt,
      class_name: Classname,
      class_type: type,
      justified: false,
      justification_sent: false,
    });
    absence.save().catch((err) => {
      console.log(err);
      res.send({ message: "Failed to create new absence" });
    });
  }
});
app.post("/modules", (req, res) => {
  TeacherModules.find({ teacherId: req.body.id }, (err, TeacherModuless) => {
    if (err || TeacherModuless === null) {
      res.send({ message: "Error, could not get TeacherModuless" });
    } else {
      res.send(TeacherModuless);
    }
  });
});

// post justification

app.post("/justification", (req, res) => {
  const date = new Date();
  const link = req.body.link;
  const absence_id = req.body.absence_id;

  const justification = new Justification({
    date: date,
    link: link,
    absence_id: absence_id,
  });

  justification
    .save()
    .then((justification) => {
      console.log(justification);
      res.send(justification);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Failed to create new Justification" });
    });

  Absence.findByIdAndUpdate(
    absence_id,
    {
      justification_sent: true,
    },
    (err, result) => {
      if (err) {
        res.send({ message: "Failed to update Justification" });
      }
    }
  );
});

// get justifications

app.get("/justifications", (req, res) => {
  Justification.find({}, (err, justifications) => {
    if (err || justifications === null) {
      res.send({ message: "Error, could not get justifications" });
    } else {
      res.send(justifications);
    }
  });
});

// get absence by id

app.get("/absence/:id", (req, res) => {
  Absence.findOne({ _id: req.params.id }, (err, abs) => {
    if (err || abs === null) {
      res.send({ message: "Error, could not get absence" });
    } else {
      res.send(abs);
    }
  });
});

// change absence type
app.post("/editAbsenceType", (req, res) => {
  const id = req.body.id;
  const justified = req.body.justified;

  Absence.findByIdAndUpdate(
    id,
    {
      justified: justified,
    },
    (err, result) => {
      if (err) {
        res.send({ message: "Failed to update absence" });
      } else {
        res.send(result);
      }
    }
  );
});

//deletesesion

app.post("/deletesesion", (req, res) => {
 
  const id = req.body.id;
 const teacherId=req.body.teacherId;
  const date=req.body.date;
  const time=req.body.time;

    Sesion.findByIdAndDelete(id, (err, sesion) => {
      if (err) {
        res.send({ message: err });
      } else {
        console.log(time);
        console.log(date);
        console.log(teacherId)
        res.send(sesion);
        Absence.deleteMany({teacher_id:teacherId,time:time,date:date}, function(err, result) {
          if (err) {
            result.send(err);
          } else {
            console.log("no errors")
            
          }
        });
        
       
      }
    });
  
});
app.post("/teacherSesions",(req,res)=>{
  Sesion.find({teacher_id:req.body.id}, (err, sesions) => {
    if (err || sesions === null) {
      res.send({ message: "Error, could not get sesions" });
    } else {
      res.send(sesions);
    }
  });
})
