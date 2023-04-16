import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import appError from '../../common/utils/appError';
import userModel from '../../model/userModel';
import Products from '../../model/productModel';
import { getQueryOptions } from '../../common/utils/getQueryParams';
import moment from 'moment';
import AppError from '../../common/utils/appError';
import constant from '../../common/config/constant';
import Tokens from '../../model/tokenModel';
import tokenService from '../../common/services/tokenService';
import mongoose from 'mongoose';

const register = async (body: any) => {
    let str = body.sEmail;
    body.sEmail = str.toLowerCase()

    body.sPassword = await bcrypt.hash(body.sPassword, 8);
    // let lower = body;
    // body = lower.toLowerCase()
    let user: any
    if (user) {

        throw new AppError(httpStatus.CREATED, 'User regiter');
    }
    user = await new userModel(body).save();
    return user
};

const login = async (body: any) => {


    console.log(body, 'body');

    let str = body.sEmail;
    body.sEmail = str.toLowerCase()

    let user;
    try {

        user = await getUserByEmail(body.sEmail, body.sDeviceToken, body.sDevice);
        console.log(user, 'user');

        //const role = await checkRoles(user, body.sUserRole);
        //console.log(role);
        const password = await checkPassword(body.sPassword, user.sPassword);
        console.log("password-->", password);
        return user;
    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }
};
const getUserByEmail = async (email: String, deviceToken: any, device: any) => {
    const user: any = await userModel.findOne({ sEmail: email });
    console.log(user, 'user!!!!!!!!!!!!');

    if (user) {
        await userModel.findOneAndUpdate(user.sEmail, { sDeviceToken: deviceToken, sDevice: device })
    }
    else {
        throw new AppError(httpStatus.NOT_FOUND, "Email address is not found");
    }
    return user;
};
const checkPassword = async (password: any, correctPassword: any) => {
    const isPasswordMatch = await bcrypt.compare(password, correctPassword);
    console.log('isPasswordMatch->', isPasswordMatch);
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'Wrong Password ');
    }
    return isPasswordMatch;
};

const checkRoles = async (user: any, role: String) => {

    if (user.sUserRole === role) {
        return true
    } else {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "Not allowed to do this action."
        );
    }
};


export default {
    register,
    login,
    //adminlogin,
    checkPassword
}
