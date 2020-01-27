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
    // checking if categories passed as array
    if (Array.isArray(categories)) {
        // selecting categories from categories table by passed array values
        mysql.query("SELECT COUNT(*) AS counted FROM categories WHERE category_id IN (?)",
            [categories],
            (err, res) => {
                if (err) {
                    result(err, null);
                } else {
                    const cat_count = res[0].counted;
                    // checking if all passed categories are from categories table
                    if (categories.length === cat_count) {
                        // inserting new product
                        mysql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
                            if (err) {
                                result(err, null);
                                return;
                            }
                            const prod_Id = res.insertId;
                            categories.forEach(category => {
                                // inserting products and categories into products_categories
                                mysql.query("INSERT INTO products_categories SET product_id = ?, category_id = ? ",
                                    [prod_Id, category],
                                    (err, res) => {
                                        if (err) {
                                            result(err, null);
                                        }
                                    });
                            });
                            result(null, {id: res.insertId, ...newProduct, categories});
                        });
                    } else {
                        // if any category not found
                        result({kind: "category_not_found"}, null);
                    }
                }
            });
        // checking if categories are not passed
    } else if (categories == null) {
        mysql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...newProduct});
        });
    } else {
        // if categories not in array
        result({kind: "category_not_array"}, null);
    }
};

Product.findById = (productId, result) => {
    mysql.query(`SELECT p.product_id AS 'product_id', p.name AS 'name', p.description AS 'description', p.price AS 'price', p.sku AS 'sku', p.image AS 'image',
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
    mysql.query(`SELECT p.product_id AS 'product_id', p.name AS 'name', p.description AS 'description', p.price AS 'price', p.sku AS 'sku', p.image AS 'image',
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
    // checking if categories passed as array
    if (Array.isArray(categories)) {
        // selecting categories from categories table by passed array values
        mysql.query("SELECT COUNT(*) AS counted FROM categories WHERE category_id IN (?)",
            [categories],
            (err, res) => {
                if (err) {
                    result(err, null);
                } else {
                    const cat_count = res[0].counted;
                    // checking if all passed categories are from categories table
                    if (categories.length === cat_count) {
                        mysql.query(`UPDATE products SET name = ?, description = ?, price = ?, sku = ?, image = ? 
                            WHERE product_id = ?`,
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
                                mysql.query(`DELETE FROM products_categories WHERE product_id = ?`,
                                    [productId],
                                    (err, res) => {
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
                    } else {
                        // if any category not found
                        result({kind: "category_not_found"}, null);
                    }
                }
            });
    } else if (categories == null) {
        mysql.query(`UPDATE products SET name = ?, description = ?, price = ?, sku = ?, image = ? 
                            WHERE product_id = ?`,
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
                mysql.query(`DELETE FROM products_categories WHERE product_id = ?`,
                    [productId],
                    (err, res) => {
                        if (err) {
                            result(err, null);
                        }
                    });
                result(null, {id: productId, ...product});
            })
    } else {
        // if categories not in array
        result({kind: "category_not_array"}, null);
    }
};

// products_categories are cascading
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

// products_categories are cascading
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