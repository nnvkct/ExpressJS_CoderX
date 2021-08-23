import shortid from "shortid";

export default function (req, res, next) {
  if (!req.signedCookies.sessionID) {
    res.cookie("sessionID", shortid.generate(), { signed: true });
  }
  next();
}
