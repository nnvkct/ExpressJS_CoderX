import { join } from "path";

const __dirname = "/sandbox/src";

export var productValidate = {
  createProduct: function (req, res, next) {
    var errors = [];
    var values = req.body;

    if (!req.body.name || !req.body.name.trim()) {
      errors.push("Vui lòng nhập tên sản phẩm!");
    }

    if (!req.body.description || !req.body.description.trim()) {
      errors.push("Vui lòng nhập mô tả sản phẩm!");
    }

    if (errors.length) {
      console.log(values);
      res.render(join(__dirname, "views/product/create"), { errors, values });
      return;
    }
    next();
  }
};
