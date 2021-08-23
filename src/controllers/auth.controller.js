import { join } from "path";

const __dirname = "/sandbox/src";

// db.chain = lodash.chain(db.data);

export var authController = {
  index: function (req, res) {
    res.render(join(__dirname, "views/auth/index"));
  },
  login: function (req, res) {
    res.cookie("userID", res.locals.user.id);
    res.redirect("/users");
  }
};
