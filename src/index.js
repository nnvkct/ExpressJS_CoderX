const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var users = [
  { id: 1, name: "Thinh" },
  { id: 2, name: "Toan" },
  { id: 3, name: "Hung" }
];

app.get("/", (req, res) => {
  res.render("index", { name: "NNV" });
});

app.get("/users", function (req, res) {
  res.render(path.join(__dirname, "views/users/index"), { users });
});

app.get("/users/search", function (req, res) {
  console.log("NNV is testing");
  var { query } = req;
  var matchUser = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(query.q.toLowerCase()) !== -1;
  });

  res.render(path.join(__dirname, "views/users/index"), { users: matchUser });
  console.log(matchUser);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
