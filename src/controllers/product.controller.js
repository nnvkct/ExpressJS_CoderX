import { db, readDb } from "../db.js";
import { join } from "path";
import shortid from "shortid";

var products = [];

const __dirname = "/sandbox/src";

async function updateDb(data) {
  // You can also use this syntax if you prefer
  const posts = db.data.products;
  posts.push(data);

  // Write db.data content to db.json
  await db.write();
}

export var productController = {
  index: function (req, res) {
    var page = parseInt(req.query.page, 10) || 1;
    var perPage = 8;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    readDb().then((data) => {
      products = data.products.slice(start, end);
      var lastPage =
        Math.ceil(Object.keys(data.products).length / perPage) || 1;
      var phanTrang = {
        firstPage: 1,
        lastPage,
        currentPage: page
      };

      res.render(join(__dirname, "views/product/index"), {
        products,
        phanTrang
      });
    });
  },
  create: function (req, res) {
    var values = { name: "", description: "" };
    res.render(join(__dirname, "views/product/create"), {
      values,
      csrfToken: req.csrfToken()
    });
  },
  createNewProduct: function (req, res) {
    if (req.body) {
      req.body.id = shortid();
      req.body.name = req.body.name.trim();
      req.body.image = req.file
        ? req.file.path.split("/").slice(4).join("/")
        : "";
      req.body.description = req.body.description.trim();
      updateDb(req.body);
    }
    res.redirect("/product");
  }
};
