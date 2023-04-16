import { any } from '@hapi/joi';
import express from 'express';
import authRoutes from '../apps/auth/authRoute';
import productsRoutes from '../apps/products/productRoute';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);

export = router;