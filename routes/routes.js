const express = require('express');
const router = express.Router();

var loginController = require('../controller/loginController');
var productController = require('../controller/productController');
var tokenController = require('../controller/tokenController');


router.post('/addProduct', tokenController.Validate, productController.addProduct);
router.put('/deleteProduct', tokenController.Validate, productController.deleteProduct);
router.put('/deleteWarehouse', tokenController.Validate, productController.deleteWarehouse);
router.get('/listProducts', tokenController.Validate, productController.listProducts);
router.post('/addWarehouse', tokenController.Validate, productController.addWarehouse);
router.get('/listWarehouses', tokenController.Validate, productController.listWarehouses);
router.get('/listWarehouse', tokenController.Validate, productController.listWarehouse);

//stockin
router.post('/stockInWarehouse', tokenController.Validate, productController.stockInWarehouse);
//unstock
router.post('/stockOutWarehouse', tokenController.Validate, productController.stockOutWarehouse);
router.post('/login', loginController.Login);
router.post('/logout', tokenController.Validate, loginController.Logout);



module.exports = router;
