import { join } from "path";

const __dirname = "/sandbox/src";

export var authController = {
  index: function (req, res) {
    res.render(join(__dirname, "views/auth/index"));
  },
  login: function (req, res) {
    res.cookie("userID", res.locals.user.id, { signed: true });
    var { history } = req.session;
    res.redirect(history);
  }
};
