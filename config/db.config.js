const mysql = require("mysql");

let connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "eshopProducts",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    insecureAuth: true
});

connection.connect((err) => {
    if (err) {
        return console.error("error: " + err.message);
    } else {
        console.log("Connected to the MySQL server.");
        let createProducts = `CREATE TABLE IF NOT EXISTS products(
                                product_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                                name VARCHAR (255) NOT NULL, 
                                description VARCHAR (255),
                                price DECIMAL (19,2),
                                sku VARCHAR (255),
                                image VARCHAR (255),
                                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE now())`;
        let createCategories = `CREATE TABLE IF NOT EXISTS categories(
                                category_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                                name VARCHAR (255) NOT NULL, 
                                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW())`;
        let createProductsCategories = `CREATE TABLE IF NOT EXISTS products_categories(
                                id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                product_id INT UNSIGNED NOT NULL,
                                category_id INT UNSIGNED NOT NULL,
                                FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE,
                                FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE,
                                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW())`;
        let createWarehouses = `CREATE TABLE IF NOT EXISTS warehouses(
                                warehouse_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                                name VARCHAR (255) NOT NULL,
                                address VARCHAR (255) NOT NULL,  
                                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW())`;
        let createInventory = `CREATE TABLE IF NOT EXISTS inventory(
                                quantity INT (255) NOT NULL DEFAULT 0,
                                product_id INT UNSIGNED NOT NULL,
                                warehouse_id INT UNSIGNED NOT NULL,
                                FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE,
                                FOREIGN KEY (warehouse_id) REFERENCES warehouses (warehouse_id) ON DELETE CASCADE,
                                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
                                PRIMARY KEY (product_id, warehouse_id))`;
        connection.query(createProducts, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
        connection.query(createCategories, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
        connection.query(createProductsCategories, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
        connection.query(createWarehouses, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
        connection.query(createInventory, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }
});

module.exports = connection;
