import bodyParser from "body-parser";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import userRoute from "./routes/user.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.render("index", { name: "NNV" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
