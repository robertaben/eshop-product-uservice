const mysql = require("../config/db.config.js");

// constructor
const Category = function (category) {
    this.name = category.name;
};

Category.create = (newCategory, result) => {
    mysql.query(`INSERT INTO categories SET ?`, newCategory, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newCategory});
    });
};

Category.findById = (categoryId, result) => {
    mysql.query(`SELECT * FROM categories WHERE category_id = ${categoryId}`, (err, res) => {
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

Category.getAll = result => {
    mysql.query("SELECT * FROM categories", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Category.updateById = (categoryId, category, result) => {
    mysql.query("UPDATE categories SET name = ? WHERE category_id = ?",
        [category.name, categoryId],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }
            result(null, {id: categoryId, ...category});
        }
    );
};

Category.delete = (categoryId, result) => {
    mysql.query("DELETE FROM categories WHERE category_id = ?", categoryId, (err, res) => {
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

Category.deleteAll = result => {
    mysql.query("DELETE FROM categories", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Category;