import { join } from "path";
import { Product } from "../models/product.model.js";

const __dirname = "/sandbox/src";

export var productController = {
  index: function (req, res) {
    var page = parseInt(req.query.page, 10) || 1;
    var perPage = 8;
    var start = (page - 1) * perPage;
    var lastPage = 1;

    Product.paginate({}, { offset: start, limit: perPage }).then(function (
      result
    ) {
      lastPage = Math.ceil(result.total / perPage) || 1;

      var phanTrang = {
        firstPage: 1,
        lastPage,
        currentPage: page
      };
      res.render(join(__dirname, "views/product/index"), {
        products: result.docs,
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
      req.body.name = req.body.name.trim();
      req.body.image = req.file
        ? req.file.path.split("/").slice(4).join("/")
        : "";
      req.body.description = req.body.description.trim();
      Product.create(req.body);
    }
    res.redirect("/product");
  }
};
