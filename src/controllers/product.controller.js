import db from "../db.js";
import { join } from "path";

async function readDb() {
  await db.read();

  if (!db.data) {
    db.data = { products: [] };
  }

  return db.data;
}

var products = [];

const __dirname = "/sandbox/src";

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
      console.log(lastPage);
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
  }
};
