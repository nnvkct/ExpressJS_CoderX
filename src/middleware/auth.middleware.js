import lodash from "lodash";
import db from "../db.js";

export var authMiddleware = {
  requireAuth: function (req, res, next) {
    if (!req.cookies.userID) {
      res.redirect("/auth");
      return;
    }

    // Important: value() needs to be called to execute chain
    var user = lodash
      .chain(db.data)
      .get("users")
      .find({ id: req.cookies.userID })
      .value();

    if (!user) {
      res.redirect("/auth");
      return;
    }

    next();
  }
};
