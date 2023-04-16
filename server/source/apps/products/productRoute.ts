import express from 'express';
import validate from '../../common/middlewares/validate';

// import auth from '../../common/midlewares/auth';
import productValidation from './productValidation';
import productController from './productController';
// Multer for the storage of the profile image
// import multer from 'multer';

const router = express.Router();

// const storage = multer.diskStorage({});  
// let upload = multer({storage:storage});

router.post('/createProduct', validate(productValidation.createProduct), productController.createProduct);
router.get('/allProducts', validate(productValidation.allProduct), productController.getallProducts);
router.put('/updateProduct', validate(productValidation.updateProduct), productController.updateProduct)
router.get('/:id', productController.singleProduct)
router.delete('/product/:id', productController.deleteProduct);

export = router