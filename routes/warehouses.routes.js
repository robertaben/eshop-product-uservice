const { warehouseValidationRules, validate } = require("../validator.js");

module.exports = app => {
    const warehouse = require("../controllers/warehouse.controller");
    app.post("/warehouses", warehouseValidationRules(), validate, warehouse.create);
    app.get("/warehouses", warehouse.findAll);
    app.get("/warehouses/:warehouseId", warehouse.findById);
    app.put("/warehouses/:warehouseId", warehouseValidationRules(), validate, warehouse.update);
    app.delete("/warehouses/:warehouseId", warehouse.delete);
    app.delete("/warehouses", warehouse.deleteAll);
};