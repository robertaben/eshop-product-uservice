const Product = require("../models/product.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sku: req.body.sku,
        image: req.body.image
    });

    const categories = req.body.categories;

    Product.create(product, categories, (err, data) => {
        if (err) {
            if (err.kind === "category_not_found") {
                res.status(404).send({
                    message: `Categories not found`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Error occurred while creating the new Product."
                });
            }
        }
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving products."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.productId
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
    Product.updateById(
        req.params.productId,
        new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            sku: req.body.sku,
            image: req.body.image
        }),
        req.body.categories,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.productId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Product.delete(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.productId
                });
            }
        } else res.send({message: `Product was deleted successfully!`});
    });
};

exports.deleteAll = (req, res) => {
    Product.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all products."
            });
        else res.send({message: `All products were deleted successfully!`});
    });
};