const { categoryValidationRules, validate } = require("../validator.js");

module.exports = app => {
    const categories = require("../controllers/category.controller");
    app.post("/categories", categoryValidationRules(), validate, categories.create);
    app.get("/categories", categories.findAll);
    app.get("/categories/:categoryId", categories.findById);
    app.put("/categories/:categoryId", categoryValidationRules(), validate, categories.update);
    app.delete("/categories/:categoryId", categories.delete);
    app.delete("/categories", categories.deleteAll);
};