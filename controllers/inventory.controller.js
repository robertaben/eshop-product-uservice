const Inventory = require("../models/inventory.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const inventoryItem = new Inventory({
        quantity: req.body.quantity,
    });

    const productId = req.body.productId;
    const warehouseId = req.body.warehouseId;

    Inventory.create(inventoryItem, productId, warehouseId, (err, data) => {
        if (err) {
            if (err.kind === "quantity_not_found") {
                res.status(404).send({
                    message: `Quantity can not be empty!`
                });
            } else if (err.kind === "productId_not_found") {
                res.status(404).send({
                    message: `Please choose existing product ID`
                });
            } else if (err.kind === "warehouseId_not_found") {
                res.status(404).send({
                    message: `Please choose existing warehouse ID`
                });
            } else if (err.kind === "inventory_item_found") {
                res.status(404).send({
                    message: `Inventory item with given product and warehouse IDs already exist!`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Error occurred while creating the new Inventory item."
                });
            }
        } else res.send(data);
    });

};

exports.findAll = (req, res) => {
    Inventory.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving all inventory"
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Inventory.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found inventory of product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving inventory of product with id " + req.params.productId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Inventory.updateById(
        req.params.productId,
        req.params.warehouseId,
        new Inventory({
            quantity: req.body.quantity,
        }),
        (err, data) => {
            if (err) {
                if (err.kind === "inventory_item_not_found") {
                    res.status(404).send({
                        message: `Inventory item does not exists, please check product and warehouse IDs `
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Error occurred while creating the new Product."
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Inventory.delete(req.params.productId, req.params.warehouseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found inventory with product id ${req.params.productId} and warehouse id ${req.params.warehouseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete inventory of product with id " + req.params.productId
                });
            }
        } else res.send({message: `Product inventory was deleted successfully!`});
    });
};

exports.deleteAll = (req, res) => {
    Inventory.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all inventory items."
            });
        else res.send({message: `All inventory items were deleted successfully!`});
    });
};