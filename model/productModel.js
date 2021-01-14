var db = require('../db/dbConnection');

var productModel = {
    /**
    * Get the FAQ deatils based on level_id
    *
    * @function getFAQInfo
    * @param {int} level_id
    * @returns {FAQ details}
    * @throws {Error}
    */
    saveProduct: function (params) {
        try {
            console.log(params,'test')
            return new Promise((resolve, reject) => {
                var insertStmnt = "INSERT INTO product(product_name, product_description) VALUES(?,?)";
                var insertValue = [params.product_name, params.product_description];

                console.log(insertStmnt,insertValue)
                db.query(insertStmnt, insertValue,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({ "msg": "product added successfully",});
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    saveWarehouse: function (params) {
        try {
            return new Promise((resolve, reject) => {
                var insertStmnt = "INSERT INTO warehouse(warehouse_name) VALUES(?)";
                var insertValue = [params.warehouse_name];
                db.query(insertStmnt, insertValue,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({ "msg": "warehouse added successfully",});
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    listProducts: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = 'SELECT * FROM product';
                db.query(selectStatement,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    listWarehouses: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = 'SELECT * FROM warehouse';
                db.query(selectStatement,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    listWarehouse: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = 'SELECT * FROM warehouse where id=?';
                console.log("warehoue id:"+params.id);
                let selectStatementvalue =[params.id];
                db.query(selectStatement,selectStatementvalue,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    deleteWarehouse: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let deleteStatement = 'DELETE FROM warehouse where id=?';
                let deleteStatementvalue = [params.id]
                db.query(deleteStatement,deleteStatementvalue,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({"msg":"warehouse deleted successfully"});
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    deleteProduct: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let deleteStatement = 'DELETE FROM product where id=?';
                let deleteStatementvalue = [params.id]
                db.query(deleteStatement,deleteStatementvalue,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({"msg":"product deleted successfully"});
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    getProductById: function (params) {
            try {
                return new Promise((resolve, reject) => {
                    let selectStatement = 'SELECT * FROM product where id=?';
                    console.log("productquery");
                    let selectStatementvalue =[params.product_id];
                    db.query(selectStatement,selectStatementvalue,(error, rows) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(rows);
                        }
                    });
                });
            } catch (e) {
                console.log(e);
            }
        },
        getStockInfoByProductIdAndHouseId: function (params) {
                    try {
                        return new Promise((resolve, reject) => {
                            let selectStatement = 'SELECT * FROM stocks where product_id=? AND warehouse_id=?';
                            let selectStatementvalue =[params.product_id,params.warehouse_id];
                            db.query(selectStatement,selectStatementvalue,(error, rows) => {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve(rows);
                                }
                            });
                        });
                    } catch (e) {
                        console.log(e);
                    }
                },
                saveStockInproductWarehouse: function (params) {
                        try {
                            console.log(params,'test')
                            return new Promise((resolve, reject) => {
                                var insertStmnt = "INSERT INTO stocks(quantity, product_id,warehouse_id) VALUES(?,?,?)";
                                var insertValue = [params.quantity, params.product_id,params.warehouse_id];

                                console.log(insertStmnt,insertValue)
                                db.query(insertStmnt, insertValue,(error, rows) => {
                                    if (error) {
                                        reject(error);
                                    }
                                    else {
                                        resolve({ "msg": "Stock Updated Successfully",});
                                    }
                                });
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    },
                updateStockInproductWarehouse: function (params) {
                                            try {
                                                console.log(params,'test')
                                                return new Promise((resolve, reject) => {
                                                    var insertStmnt = "Update stocks SET quantity=? Where Id=?";
                                                    var insertValue = [params.quantity, params.id];

                                                    console.log(insertStmnt,insertValue)
                                                    db.query(insertStmnt, insertValue,(error, rows) => {
                                                        if (error) {
                                                            reject(error);
                                                        }
                                                        else {
                                                            resolve({ "msg": "Stock Updated successfully",});
                                                        }
                                                    });
                                                });
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        }
};
module.exports = productModel;
