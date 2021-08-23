import { Sessions } from "../models/session.model.js";
import { Product } from "../models/product.model.js";
import { join } from "path";

const __dirname = "/sandbox/src";

async function addToCart(sessionId, productId) {
  var count = 0;
  await Sessions.findOne({ sessionID: sessionId }).then(function (result) {
    try {
      count = result.cart[productId] || 0;
    } catch (err) {
      count = 0;
    }
  });

  await Sessions.updateOne(
    { sessionID: sessionId },
    {
      $set: {
        [`cart.${productId}`]: count + 1
      }
    }
  );
}

export var cartController = {
  index: async function (req, res) {
    var { sessionID } = req.signedCookies;
    var cart = [];
    var result = await Sessions.findOne({ sessionID });
    cart = result.cart;

    var giohang = [];
    for (let item in cart) {
      var productItem = await Product.findOne({ _id: item });
      giohang.push({
        id: item,
        name: productItem.name,
        quantity: cart[item],
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
