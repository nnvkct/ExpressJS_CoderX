import { User } from "../models/user.model.js";

export var authMiddleware = {
  requireAuth: async function (req, res, next) {
    if (!req.signedCookies.userID) {
      req.session.history = req.originalUrl; //or whatever
      res.redirect("/auth");
      return;
    }

    // Important: value() needs to be called to execute chain
    var user = await User.findOne({ _id: req.signedCookies.userID });

    if (!user) {
      req.session.message = "please login first"; //or whatever
      res.redirect("/auth");
      return;
    }

    res.locals.loginUser = user;

    next();
  },
  noRequireAuth: async function (req, res, next) {
    // Important: value() needs to be called to execute chain
    // var user = lodash
    //   .chain(db.data)
    //   .get("users")
    //   .find({ id: req.signedCookies.userID })
    //   .value();

    var user = await User.findOne({ id: req.signedCookies.userID });

    res.locals.loginUser = user;

    next();
  }
};
