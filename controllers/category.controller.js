const Category = require("../models/category.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const category = new Category({
        name: req.body.name
    });
    Category.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while creating the new Category."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving categories."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Category.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.categoryId
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
    Category.updateById(
        req.params.categoryId,
        new Category(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Category with id ${req.params.categoryId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Category with id " + req.params.categoryId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Category.delete(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Category with id " + req.params.categoryId
                });
            }
        } else res.send({message: `Category was deleted successfully!`});
    });
};

exports.deleteAll = (req, res) => {
    Category.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories."
            });
        else res.send({message: `All categories were deleted successfully!`});
    });
};