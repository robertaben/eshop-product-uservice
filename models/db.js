const mysql = require("mysql");

let connection = mysql.createConnection({
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: "eshopProducts",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT ||"3306",
    insecureAuth: true
});

connection.connect((err) => {
    if (err) {
        return console.error("error: " + err.message);
    } else {
        console.log("Connected to the MySQL server.");
        let createProducts = `CREATE TABLE IF NOT EXISTS products(
                                product_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
                                name VARCHAR (255) NOT NULL, 
                                description VARCHAR (255), 
                                price DECIMAL (19,2))`;
        connection.query(createProducts, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }
});

module.exports = connection;