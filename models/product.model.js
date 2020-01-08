const mysql = require("./db.js");

// constructor
const Product = function (product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
};

Product.create = (newProduct, result) => {
    mysql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newProduct});
    });
};

Product.findById = (productId, result) => {
    mysql.query(`SELECT * FROM products WHERE product_id = ${productId}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // if Product not found with the id
        result({kind: "not_found"}, null);
    });
};

Product.getAll = result => {
    mysql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Product.updateById = (productId, product, result) => {
    mysql.query("UPDATE products SET name = ?, description = ?, price = ? WHERE product_id = ?",
        [product.name, product.description, product.price, productId],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }
            result(null, {id: productId, ...product});
        }
    );
};

Product.delete = (productId, result) => {
    mysql.query("DELETE FROM products WHERE product_id = ?", productId, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({kind: "not_found"}, null);
            return;
        }
        result(null, res);
    });
};

Product.deleteAll = result => {
    mysql.query("DELETE FROM products", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Product;