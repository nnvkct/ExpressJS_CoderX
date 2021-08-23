import express from "express";
import { join } from "path";
import shortid from "shortid";
import db from "../db.js";

const __dirname = "/sandbox/src";

var router = express.Router();

var users = [];
readDb().then((data) => {
  users = data.users;
});

async function readDb() {
  await db.read();

  if (!db.data) {
    db.data = { users: [] };
  }

  return db.data;
}

async function updateDb(data) {
  // You can also use this syntax if you prefer
  const posts = db.data.users;
  posts.push(data);

  // Write db.data content to db.json
  await db.write();
}

async function deleteUserbyID(id) {
  var newUsers = users.filter(function (user) {
    return user.id !== id;
  });

  console.log(newUsers);
  db.data = { users: newUsers };

  await db.write();
}

router.get("/", function (req, res) {
  readDb().then((data) => {
    users = data.users;
    res.render(join(__dirname, "views/users/index"), { users });
  });
});

router.get("/create", function (req, res) {
  res.render(join(__dirname, "views/users/create"));
});

router.get("/view/:id", function (req, res) {
  var id = req.params.id;
  var user = users.find(function (user) {
    return user.id === id;
  });
  res.render(join(__dirname, "views/users/viewUser"), { user });
});

router.get("/delete/:id", function (req, res) {
  var id = req.params.id;

  deleteUserbyID(id).then(console.log("Delete OK!"));
  res.redirect("/users");
});

router.get("/search", function (req, res) {
  var { query } = req;
  var matchUser = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(query.q.toLowerCase()) !== -1;
  });

  res.render(join(__dirname, "views/users/index"), { users: matchUser });
});

router.post("/create", function (req, res) {
  req.body.id = shortid();
  updateDb(req.body);

  res.redirect("/users");
});

export default router;
