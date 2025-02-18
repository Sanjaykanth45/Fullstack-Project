const express = require('express');
const { register, login,brand, getBrand, putBrand, deleteBrand, product, getProduct, deleteProduct, putProduct, getCategory, deleteCategory, putCategory,category} = require('../controller/authController');
const uploadMiddleware = require('../middleware/upload');
const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post('/brand',brand);
router.get('/getbrand',getBrand);
router.put('/putBrand/:id',putBrand);
router.delete('/deleteBrand/:id',deleteBrand);


router.get('/getProduct',getProduct);
router.delete('/deleteProduct/:id',deleteProduct);
router.put('/putProduct/:id',uploadMiddleware,putProduct);
router.post('/product', uploadMiddleware, product);



module.exports = router;
