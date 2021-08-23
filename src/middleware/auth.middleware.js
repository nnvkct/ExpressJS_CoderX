import lodash from "lodash";
import { db } from "../db.js";

export var authMiddleware = {
  requireAuth: function (req, res, next) {
    if (!req.signedCookies.userID) {
      req.session.history = req.originalUrl; //or whatever
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
      req.session.message = "please login first"; //or whatever
      res.redirect("/auth");
      return;
    }

    res.locals.loginUser = user;

    next();
  },
  noRequireAuth: function (req, res, next) {
    // Important: value() needs to be called to execute chain
    var user = lodash
      .chain(db.data)
      .get("users")
      .find({ id: req.signedCookies.userID })
      .value();

    res.locals.loginUser = user;

    next();
  }
};
