const Warehouse = require("../models/warehouse.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const warehouse = new Warehouse({
        name: req.body.name,
        address: req.body.address,
    });
    Warehouse.create(warehouse, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while creating the new Warehouse."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Warehouse.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving warehouses."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Warehouse.findById(req.params.warehouseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Warehouse with id ${req.params.warehouseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Warehouse with id " + req.params.warehouseId
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
    Warehouse.updateById(
        req.params.warehouseId,
        new Warehouse(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Warehouse with id ${req.params.warehouseId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Warehouse with id " + req.params.warehouseId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Warehouse.delete(req.params.warehouseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Warehouse with id ${req.params.warehouseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Warehouse with id " + req.params.warehouseId
                });
            }
        } else res.send({message: `Warehouse was deleted successfully!`});
    });
};

exports.deleteAll = (req, res) => {
    Warehouse.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all warehouses."
            });
        else res.send({message: `All warehouses were deleted successfully!`});
    });
};