import db from "../db.js";
import lodash from "lodash";
import { join } from "path";
import md5 from "md5";

const __dirname = "/sandbox/src";

export var authValidate = {
  login: function (req, res, next) {
    var values = req.body;
    var { email, password } = values;
    var errors = [];

    // Important: value() needs to be called to execute chain
    var user = lodash
      .chain(db.data)
      .get("users")
      .find({ email: email })
      .value();

    if (!user) {
      errors.push("User does not existed!");
      res.render(join(__dirname, "views/auth"), { errors, values });
    }

    if (user.password !== md5(password)) {
      errors.push("Wrong password!");
      res.render(join(__dirname, "views/auth"), { errors, values });
    }
    res.locals.user = user;

    next();
  }
};
