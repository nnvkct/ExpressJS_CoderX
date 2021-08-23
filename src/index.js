import bodyParser from "body-parser";
import express from "express";
import { join } from "path";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cartRoute from "./routes/cart.route.js";
import productRoute from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { common } from "./common/index.js";
import dotenv from "dotenv";
import sessionMiddleware from "./middleware/session.middleware.js";
import session from "express-session";
import csrf from "csurf";
import mongoose from "mongoose";

dotenv.config();

const __dirname = "/sandbox/src";

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({ secret: "mySecret", resave: false, saveUninitialized: false })
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(common.secretKey));

app.use(authMiddleware.noRequireAuth);
app.use(sessionMiddleware);

app.use(csrf({ cookie: true }));
// error handler
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.render(join(__dirname, "views/error/index"));
});

app.use(express.static(join(__dirname, "public")));

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.render("index", { name: "NNV" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
