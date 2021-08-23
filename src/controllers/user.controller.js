import db from "../db.js";
import { join } from "path";
import shortid from "shortid";

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

  db.data = { users: newUsers };

  await db.write();
}

var users = [];
readDb().then((data) => {
  users = data.users;
});

const __dirname = "/sandbox/src";

var controller = {
  index: function (req, res) {
    readDb().then((data) => {
      users = data.users;
      res.render(join(__dirname, "views/users/index"), { users });
    });
  },
  create: function (req, res) {
    res.render(join(__dirname, "views/users/create"));
  },
  viewById: function (req, res) {
    var id = req.params.id;
    var user = users.find(function (user) {
      return user.id === id;
    });
    res.render(join(__dirname, "views/users/viewUser"), { user });
  },
  deleteUserId: function (req, res) {
    var id = req.params.id;

    deleteUserbyID(id).then(console.log("Delete done!"));
    res.redirect("/users");
  },
  searchUserId: function (req, res) {
    var { query } = req;
    var matchUser = users.filter(function (user) {
      return user.name.toLowerCase().indexOf(query.q.toLowerCase()) !== -1;
    });

    res.render(join(__dirname, "views/users/index"), { users: matchUser });
  },
  createNewUser: function (req, res) {
    var errors = [];
    var values = req.body;

    if (!req.body.name.trim() || !req.body.name) {
      errors.push("Vui lòng nhập tên!");
    }

    if (!req.body.phoneNumber || !req.body.phoneNumber.trim()) {
      errors.push("Vui lòng nhập số điện thoại!");
    }

    if (errors.length) {
      console.log(values);
      res.render(join(__dirname, "views/users/create"), { errors, values });
      return;
    }

    if (req.body) {
      req.body.id = shortid();
      req.body.name = req.body.name.trim();
      req.body.phoneNumber = req.body.phoneNumber.trim();
      updateDb(req.body);
    }
    res.redirect("/users");
  }
};

export default controller;
