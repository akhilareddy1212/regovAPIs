var productModel = require('../model/productModel');
var paramValidator = require('../validators/paramValidator');

let productController = {
    addProduct(req, res) {
        if (paramValidator.checkObject({
            product_name: req.body.product_name,
            product_description: req.body.product_description,
        }) !== true) {
            return res.status(400).json({ error: paramValidator.errorMessage });
        }
        productModel.saveProduct(req.body).then(response => {
            var responseData = {
                "data": response ? response : [],
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    listProducts(req, res) {

        productModel.listProducts(req.query).then(response => {
            var responseData = {
                "data": response ? response : [],
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    listWarehouses(req, res) {

        productModel.listWarehouses(req.query).then(response => {
            var responseData = {
                "data": response ? response : [],
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    listWarehouse(req, res) {
        if (paramValidator.checkObject({
            id: req.body.id,
        }) !== true) {
            return res.status(400).json({ error: paramValidator.errorMessage });
        }
        productModel.listWarehouse(req.body).then(response => {
            var responseData = {
                "data": response ? response : [],
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },

    addWarehouse(req, res) {
        if (paramValidator.checkObject({
            warehouse_name: req.body.warehouse_name,
        }) !== true) {
            return res.status(400).json({ error: paramValidator.errorMessage });
        }
        productModel.saveWarehouse(req.body).then(response => {
            var responseData = {
                "data": response ? response : [],
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    ///
    stockInWarehouse(req, res) {
            if (paramValidator.checkObject({
                quantity: req.body.quantity,
                product_id: req.body.product_id,
                warehouse_id:req.body.warehouse_id,
            }) !== true) {
                return res.status(400).json({ error: paramValidator.errorMessage });
            }
            var dbProductId="";
            var dbwarehouseId="";
            productModel.getProductById(req.body).then(response => {
               console.log("response:"+response);
               console.log(JSON.stringify(response, null, 2));
                if(response){
                console.log("Inside product response")
                 var params={"id":req.body.warehouse_id  }
                 productModel.listWarehouse(params).then(response => {
                 console.log(JSON.stringify(response, null, 2));
                 if(response){
                 productModel.getStockInfoByProductIdAndHouseId(req.body).then(response => {
                 console.log("getStockInfoByProductIdAndHouseId response:"+JSON.stringify(response));
                 if(response.length>0){
                 var quantity=response[0].quantity;
                 console.log("quantity:"+quantity);
                 quantity=quantity+req.body.quantity;
                 var updateParams={"quantity":quantity,
                 "id":response[0].id
                 }
                 productModel.updateStockInproductWarehouse(updateParams).then(response => {
                 var responseData = {
                 "data": response ? response : [],
                 }
                 return res.status(200).json(responseData);
                 }).catch(error => {
                 return res.status(500).json(error);
                  })
                  }
                  else{
                  productModel.saveStockInproductWarehouse(req.body).then(response => {
                  var responseData = {
                   "data": response ? response : [],
                   }
                 return res.status(200).json(responseData);}).catch(error => { return res.status(500).json(error); })

                   }
               }).catch(error => {
               return res.status(500).json(error);
                })

                }else{
                return res.status(500).json({"msg":"invalid warehouse id"});
                }
                 }).catch(error => {
                                            return res.status(500).json(error);
                                        })
                }else{
                return res.status(500).json({"msg":"invalid product id"});
                }

            }).catch(error => {
                return res.status(500).json(error);
            })





        },
        stockOutWarehouse(req, res) {
                    if (paramValidator.checkObject({
                        quantity: req.body.quantity,
                        product_id: req.body.product_id,
                        warehouse_id:req.body.warehouse_id,
                    }) !== true) {
                        return res.status(400).json({ error: paramValidator.errorMessage });
                    }
                    var dbProductId="";
                    var dbwarehouseId="";
                    productModel.getProductById(req.body).then(response => {
                       console.log(JSON.stringify(response, null, 2));
                        if(response){
                         var params={"id":req.body.warehouse_id  }
                         productModel.listWarehouse(params).then(response => {
                         console.log(JSON.stringify(response, null, 2));
                         if(response){
                         productModel.getStockInfoByProductIdAndHouseId(req.body).then(response => {

                         if(response.length>0){
                         var quantity=response[0].quantity;

                         quantity=quantity-req.body.quantity;
                         if(quantity<=0){
                         quantity=0;
                         }
                         var updateParams={"quantity":quantity,
                         "id":response[0].id
                         }
                         productModel.updateStockInproductWarehouse(updateParams).then(response => {
                         var responseData = {
                         "data": response ? response : [],
                         }
                         return res.status(200).json(responseData);
                         }).catch(error => {
                         return res.status(500).json(error);
                          })
                          }
                          else{
                         return res.status(500).json({"msg":"invalid stock"});
                           }
                       }).catch(error => {
                       return res.status(500).json(error);
                        })

                        }else{
                        return res.status(500).json({"msg":"invalid warehouse id"});
                        }
                         }).catch(error => {
                                                    return res.status(500).json(error);
                                                })
                        }else{
                        return res.status(500).json({"msg":"invalid product id"});
                        }

                    }).catch(error => {
                        return res.status(500).json(error);
                    })





                },


    deleteWarehouse(req, res) {
        if (paramValidator.checkObject({
            id: req.body.id,
        }) !== true) {
            return res.status(400).json({ error: paramValidator.errorMessage });
        }
        productModel.deleteWarehouse(req.body).then(response => {
            var responseData = {
                "data": response ? response : [],
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    deleteProduct(req, res) {
        if (paramValidator.checkObject({
            id: req.body.id,
        }) !== true) {
            return res.status(400).json({ error: paramValidator.errorMessage });
        }
        productModel.deleteProduct(req.body).then(response => {
            var responseData = {
                "data": response ? response : [],
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
};
module.exports = productController;
