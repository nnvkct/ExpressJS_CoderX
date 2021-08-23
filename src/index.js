import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const app = express();
const port = 3000;

async function readDb() {
  await db.read();

  if (!db.data) {
    db.data = { users: [] };
  }

  return db.data;
}

async function updateDb(data) {
  // You can also use this syntax if you prefer
  const posts = db.data.users;
  posts.push(data);

  // Write db.data content to db.json
  await db.write();
}

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

var users = [];
readDb().then((data) => {
  users = data.users;
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index", { name: "NNV" });
});

app.get("/users", function (req, res) {
  readDb().then((data) => {
    users = data.users;
    res.render(join(__dirname, "views/users/index"), { users });
  });
});

app.get("/users/search", function (req, res) {
  var { query } = req;
  var matchUser = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(query.q.toLowerCase()) !== -1;
  });

  res.render(join(__dirname, "views/users/index"), { users: matchUser });
});

app.get("/users/create", function (req, res) {
  res.render(join(__dirname, "views/users/create"));
});

app.post("/users/create", function (req, res) {
  updateDb(req.body);
  res.redirect("/users");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
