module.exports = app => {
    const categories = require("../controllers/category.controller");
    app.post("/categories", categories.create);
    app.get("/categories", categories.findAll);
    app.get("/categories/:categoryId", categories.findById);
    app.put("/categories/:categoryId", categories.update);
    app.delete("/categories/:categoryId", categories.delete);
    app.delete("/categories", categories.deleteAll);
};