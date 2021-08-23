const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var users = [
  { id: 1, name: "Thinh" },
  { id: 2, name: "Toan" },
  { id: 3, name: "Hung" }
];

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index", { name: "NNV" });
});

app.get("/users", function (req, res) {
  res.render(path.join(__dirname, "views/users/index"), { users });
});

app.get("/users/search", function (req, res) {
  var { query } = req;
  var matchUser = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(query.q.toLowerCase()) !== -1;
  });

  res.render(path.join(__dirname, "views/users/index"), { users: matchUser });
});

app.get("/users/create", function (req, res) {
  res.render(path.join(__dirname, "views/users/create"));
});

app.post("/users/create", function (req, res) {
  users.push(req.body);
  res.redirect("/users");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
