const mysql = require("../config/db.config.js");

// constructor
const Warehouse = function (warehouse) {
    this.name = warehouse.name;
    this.address = warehouse.address;
};

Warehouse.create = (newWarehouse, result) => {
    mysql.query(`INSERT INTO warehouses SET ?`, newWarehouse, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newWarehouse});
    });
};

Warehouse.findById = (warehouseId, result) => {
    mysql.query(`SELECT * FROM warehouses WHERE warehouse_id = ?`, warehouseId, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // if warehouse not found with the id
        result({kind: "not_found"}, null);
    });
};

Warehouse.getAll = result => {
    mysql.query("SELECT * FROM warehouses", [],(err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Warehouse.updateById = (warehouseId, warehouse, result) => {
    mysql.query("UPDATE warehouses SET name = ?, address = ? WHERE warehouse_id = ?",
        [warehouse.name, warehouse.address, warehouseId],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }
            result(null, {id: warehouseId, ...warehouse});
        }
    );
};

Warehouse.delete = (warehouseId, result) => {
    mysql.query("DELETE FROM warehouses WHERE warehouse_id = ?", warehouseId, (err, res) => {
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

Warehouse.deleteAll = result => {
    mysql.query("DELETE FROM warehouses", [],(err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Warehouse;