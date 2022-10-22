const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "class_companion",
// });

app.post("/signup", (req, res) => {

  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const student_card_num = req.body.studnetCardNum;

  // db.query(
  //   "INSERT INTO Students (first_name, last_name, email, password, student_card_num) VALUES (?, ?, ?, ?, ?)",
  //   [first_name, last_name, email, password, student_card_num],
  //   (err, result) => {
  //       console.log(err);
  //   }
  // );
});

app.listen(3001, () => {
  console.log("running server");
});
