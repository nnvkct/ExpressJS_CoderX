import { join } from "path";
import { User } from "../models/user.model.js";

var users = [];

const __dirname = "/sandbox/src";

export var userController = {
  index: async function (req, res) {
    users = await User.find();
    console.log(users);
    res.render(join(__dirname, "views/users/index"), { users });
  },
  create: function (req, res) {
    res.render(join(__dirname, "views/users/create"), {
      csrfToken: req.csrfToken()
    });
  },
  viewById: async function (req, res) {
    var id = req.params.id;
    console.log("Im here 3");
    var user = await User.findOne({ _id: id });
    res.render(join(__dirname, "views/users/viewUser"), { user });
  },
  deleteUserId: function (req, res) {
    var id = req.params.id;

    User.deleteOne({ _id: id }, function (err) {
      if (err) return console.log(err);
    });

    res.redirect("/users");
  },
  searchUserId: function (req, res) {
    var { query } = req;
    var matchUser = users.filter(function (user) {
      return user.name.toLowerCase().indexOf(query.q.toLowerCase()) !== -1;
    });

    res.render(join(__dirname, "views/users/index"), { users: matchUser });
  },
  createNewUser: async function (req, res) {
    if (req.body) {
      var data = {
        name: req.body.name.trim(),
        phoneNumber: req.body.phoneNumber.trim()
      };
      await User.create(data);
    }
    res.redirect("/users");
  }
};
