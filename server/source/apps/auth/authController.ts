import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import createResponse from '../../common/utils/response';
import authServices from '../auth/authServices';
//import smsService from '../../common/services/smsService';
import tokenService from '../../common/services/tokenService';
import AppError from '../../common/utils/appError';
import bcrypt from 'bcryptjs';
import Tokens from '../../model/tokenModel';
import auth from '../../common/middlewares/auth';
import mongoose from 'mongoose';
import constant from '../../common/config/constant';



const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.header('language');

        const user: any = await authServices.register(req.body);
        createResponse(res, httpStatus.OK,'User has been created successfully', user);
    } catch (error: any) {
        createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.header('language');

        // let { sEmail, sPassword, sUserRole } = req.body;
        const user: any = await authServices.login(req.body);

        const tokens = await tokenService.generateAuthTokens(user._id, user.sUserRole);
        const response = { user: user.transform(), tokens };
        createResponse(res, httpStatus.OK,'User login successfully', response);
    } catch (error: any) {
        createResponse(res, httpStatus.BAD_REQUEST, error.message, {})
    }
};



export default {
    register,
    login
}