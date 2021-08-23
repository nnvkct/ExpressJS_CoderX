import lodash from "lodash";
import { db, readDb } from "../db.js";
import { join } from "path";

const __dirname = "/sandbox/src";

async function addToCart(sessionId, productId) {
  db.chain = lodash.chain(await readDb());

  var count = db.chain
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + productId, 0)
    .value();

  var updateData = db.chain
    .get("sessions")
    .find({ id: sessionId })
    .set("cart." + productId, count + 1)
    .value();

  db.chain
    .get("sessions")
    .find({ id: sessionId })
    .assign({ cart: updateData.cart })
    .value();

  // Write db.data content to db.json
  db.write();
}

export var cartController = {
  index: async function (req, res) {
    db.chain = lodash.chain(await readDb());
    var { sessionID } = req.signedCookies;
    var cart = db.chain.get("sessions").find({ id: sessionID }).value();
    var giohang = [];
    for (let item in cart.cart) {
      var productItem = db.chain.get("products").find({ id: item }).value();
      giohang.push({
        id: item,
        name: productItem.name,
        quantity: cart.cart[item],
        image: productItem.image
      });
    }

    res.render(join(__dirname, "views/cart/index"), { giohang });
  },
  add: function (req, res) {
    var { productId } = req.params;
    var { sessionID } = req.signedCookies;
    addToCart(sessionID, productId);
    res.redirect("/product");
  }
};
