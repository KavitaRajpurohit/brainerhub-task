import express from 'express';
import validate from '../../common/middlewares/validate';
import auth from '../../common/middlewares/auth'
import authValidation from './authValidation';
import authController from './authController';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);

export = router