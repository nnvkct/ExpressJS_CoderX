import shortid from "shortid";
import { db } from "../db.js";

async function updateDb(data) {
  // You can also use this syntax if you prefer
  const posts = db.data.sessions;
  posts.push(data);

  // Write db.data content to db.json
  await db.write();
}

export default function (req, res, next) {
  if (!req.signedCookies.sessionID) {
    var sessionID = shortid.generate();
    res.cookie("sessionID", sessionID, { signed: true });
    updateDb({ id: sessionID });
  }

  next();
}
