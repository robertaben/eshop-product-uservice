const mysql = require("../config/db.config.js");

// product constructor
const Product = function (product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.sku = product.sku;
    this.image = product.image;
};

Product.create = (newProduct, categories, result) => {
    categories.forEach(category => {
        if (mysql.query(`SELECT EXISTS (SELECT category_id FROM categories WHERE category_id = ${category})`)) {
        }
    });
    mysql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        const prod_Id = res.insertId;
        categories.forEach(category => {
            mysql.query("INSERT INTO products_categories SET product_id = ?, category_id = ? ",
                [prod_Id, category],
                (err, res) => {
                    if (err) {
                        result(err, null);
                    }
                });
        });
        result(null, {id: res.insertId, ...newProduct});
    });
};

Product.findById = (productId, result) => {
    mysql.query(`SELECT p.name AS 'name', p.description AS 'description', p.price AS 'price', p.sku AS 'sku', p.image AS 'image',
        GROUP_CONCAT(pc.category_id SEPARATOR ',') AS categories 
        FROM products as p 
        LEFT JOIN products_categories AS pc 
        ON p.product_id = pc.product_id
        WHERE p.product_id = ?
        GROUP BY p.product_id`, [productId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        // if Product not found with the id
        result({kind: "not_found"}, null);
    });
};

Product.getAll = result => {
    mysql.query(`SELECT p.name AS 'name', p.description AS 'description', p.price AS 'price', p.sku AS 'sku', p.image AS 'image',
        GROUP_CONCAT(pc.category_id SEPARATOR ',') AS categories 
        FROM products as p 
        LEFT JOIN products_categories AS pc 
        ON p.product_id = pc.product_id
        GROUP BY p.product_id`, [], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Product.updateById = (productId, product, categories, result) => {
    mysql.query(`UPDATE products SET name = ?, description = ?, price = ?, sku = ?, image = ? WHERE product_id = ?`,
        [product.name, product.description, product.price, product.sku, product.image, productId],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }
            mysql.query(`DELETE FROM products_categories WHERE product_id = ?`, [productId], (err, res) => {
                if (err) {
                    result(err, null);
                }
            });
            categories.forEach(category => {
                mysql.query("INSERT INTO products_categories SET product_id = ?, category_id = ? ",
                    [productId, category],
                    (err, res) => {
                        if (err) {
                            result(err, null);
                        }
                    });
            });
            result(null, {id: productId, ...product, categories});
        }
    );

};

// products_categories cascading
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

// products_categories cascading
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