import { Request, Response, NextFunction } from 'express';
const cron = require('node-cron');
import httpStatus from 'http-status';
import createResponse from '../../common/utils/response';
import productServices from '../products/productServices';
import { any } from '@hapi/joi';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.header('language');
        //let { user }: any = req.user;
        console.log(req.user, 'req.user');

        //let { sEmail } = req.body;

        const product: any = await productServices.createProduct(req.body);
        console.log(req.body, 'hello');
        createResponse(res, httpStatus.OK, 'product add successfully', product);
    } catch (error: any) {
        createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
    }
};

const getallProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.header('language');

        const product: any = await productServices.getallProduct(req.query);
        createResponse(res, httpStatus.OK, ' get product list ', product);

    } catch (error: any) {
        createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
    }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.header('language');

        const product: any = await productServices.updateProduct(req.query.id, req.body)
        createResponse(res, httpStatus.OK, 'product update successfully', product);

    } catch (error: any) {
        createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.header('language');

        const product: any = await productServices.deleteProduct(req.params.id);
        console.log(product, 'product--------');
        createResponse(res, httpStatus.OK, 'product delete', product);

    } catch (error: any) {
        createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
    }
};

const singleProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.id, "id");
        const product: any = await productServices.singleProduct(req.params.id);
        console.log(product, 'product--------');
        createResponse(res, httpStatus.OK, 'product delete', product);

    } catch (error: any) {
        console.log( error);
        
        createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
    }
};


export default {
    createProduct,
    getallProducts,
    updateProduct,
    deleteProduct,
    singleProduct
}