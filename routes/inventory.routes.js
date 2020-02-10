const { inventoryValidationRules, validate } = require("../validator.js");

module.exports = app => {
    const inventory = require("../controllers/inventory.controller.js");
    app.post("/inventory", inventoryValidationRules(), validate, inventory.create);
    app.get("/inventory", inventory.findAll);
    app.get("/inventory/:productId", inventory.findById);
    app.put("/inventory/:productId/:warehouseId", inventoryValidationRules(), validate, inventory.update);
    app.delete("/inventory/:productId/:warehouseId", inventory.delete);
    app.delete("/inventory", inventory.deleteAll);
};

