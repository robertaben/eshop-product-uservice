const { productValidationRules, validate } = require("../validator.js");

module.exports = app => {
    const products = require("../controllers/product.controller.js");
    app.post("/products", productValidationRules(), validate, products.create);
    app.get("/products", products.findAll);
    app.get("/products/:productId", products.findById);
    app.put("/products/:productId", productValidationRules(), validate, products.update);
    app.delete("/products/:productId", products.delete);
    app.delete("/products", products.deleteAll);
};

