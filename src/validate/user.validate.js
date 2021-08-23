import { join } from "path";

const __dirname = "/sandbox/src";

export var userValidate = {
  createUser: function (req, res, next) {
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
    next();
  }
};
