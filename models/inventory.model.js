const mysql = require("../config/db.config.js");

const Inventory = function (inventoryItem) {
    this.quantity = inventoryItem.quantity;
};

Inventory.create = (newInventoryItem, productId, warehouseId, result) => {
    if (newInventoryItem.quantity) {
        mysql.query("SELECT * FROM products WHERE product_id = ?",
            [productId],
            (err, res) => {
                if (err) {
                    result(err, null);
                } else if (res.length > 0) {
                    mysql.query("SELECT * FROM warehouses WHERE warehouse_id = ?",
                        [warehouseId],
                        (err, res) => {
                            if (err) {
                                result(err, null);
                            } else if (res.length > 0) {
                                mysql.query("SELECT * FROM inventory WHERE (product_id, warehouse_id) = (?, ?)",
                                    [productId, warehouseId],
                                    (err, res) => {
                                        if (err) {
                                            result(err, null);
                                        } else if (res.length === 0) {
                                            mysql.query("INSERT INTO inventory SET ?, product_Id = ?, warehouse_id = ?",
                                                [newInventoryItem, productId, warehouseId],
                                                (err, res) => {
                                                    if (err) {
                                                        result(err, null);
                                                        return;
                                                    }
                                                    result(null, {...newInventoryItem, productId, warehouseId});
                                                });
                                        } else {
                                            result({kind: "inventory_item_found"}, null);
                                            return;
                                        }
                                    })
                            } else {
                                result({kind: "warehouseId_not_found"}, null);
                                return;
                            }
                        })
                } else {
                    result({kind: "productId_not_found"}, null);
                    return;
                }
            })
    }
    else {
        result({kind: "quantity_not_found"}, null);
        return;
    }
};

Inventory.findById = (productId, result) => {
    mysql.query(`SELECT * FROM inventory WHERE product_id = ?`, [productId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        // if Product in inventory not found with the id
        result({kind: "not_found"}, null);
    });
};

Inventory.getAll = result => {
    mysql.query("SELECT * FROM inventory", [], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Inventory.updateById = (productId, warehouseId, inventoryItem, result) => {
    mysql.query("SELECT * FROM inventory WHERE (product_id, warehouse_id) = (?, ?)",
        [productId, warehouseId],
        (err, res) => {
            if (err) {
                result(err, null);
            } else if (res.length > 0) {
                mysql.query("UPDATE inventory SET quantity = ? WHERE product_id = ? AND warehouse_id = ?",
                    [inventoryItem.quantity, productId, warehouseId],
                    (err, res) => {
                        if (err) {
                            result(err, null);
                            return;
                        }
                        result(null, {...inventoryItem, productId, warehouseId});
                    });
            } else {
                result({kind: "inventory_item_not_found"}, null);
                return;
            }
        }
    )
};


Inventory.delete = (productId, warehouseId, result) => {
    mysql.query("DELETE FROM inventory WHERE product_id = ? AND warehouse_id =?",
        [productId, warehouseId],
        (err, res) => {
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

Inventory.deleteAll = result => {
    mysql.query("DELETE FROM inventory", [], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Inventory;