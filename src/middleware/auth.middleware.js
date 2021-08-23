import lodash from "lodash";
import db from "../db.js";

export var authMiddleware = {
  requireAuth: function (req, res, next) {
    if (!req.signedCookies.userID) {
      res.redirect("/auth");
      return;
    }

    // Important: value() needs to be called to execute chain
    var user = lodash
      .chain(db.data)
      .get("users")
      .find({ id: req.signedCookies.userID })
      .value();

    if (!user) {
      res.redirect("/auth");
      return;
    }

    res.locals.loginUser = user;

    next();
  }
};
