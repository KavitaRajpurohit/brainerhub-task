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


const createProduct = async (body: any) => {
    const productBody = body;
    let str = body.sProductName;
    body.sProductName = str.trim()
    let brandData = await Products.findOne({ sProductName: productBody.sProductName, })
    console.log(productBody);
    if (brandData) {
        throw new AppError(httpStatus.CREATED, 'product already added');

    }
    return await Products.create(productBody);

};

const getallProduct = async (query: any) => {
    //let userData = await userModel.findById(id.user);

    const searchFilter: any = {};
    const { limit, skip,sort, page } = getQueryOptions(query);

    if (query.search) {
        const { search, sort } = query;
        const searchFields = ["sProductName"];

        searchFilter["$or"] = searchFields.map((field) => ({
            [field]: { $regex: search.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), $options: "i" },
        }));
    }

    const product = await Products.aggregate([
        { $match: 
        
                searchFilter
 },


        { '$skip': skip },
        { '$limit': limit },

    ]);
    console.log(product, 'product----------');
    const totalProduct = await Products.count({});

    return {
        productCount: totalProduct,
        product,
    }
};

const updateProduct = async (id: any, body: any) => {
    let productDetails = await Products.findOne({ sProductName: body.sProductName, _id: { $ne: id } })
    console.log(productDetails, 'productDetails');

    // if (productDetails) {
    //     throw new AppError(httpStatus.BAD_REQUEST, messages.ALREADY_EXITS);
    // }
    const product: any = await Products.findById(id);

    if (product) {
        return await Products.findByIdAndUpdate(id, body, { new: true });
    } else {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'UserId is not found');
    }
};

const deleteProduct = async (id: any) => {
    return await Products.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
};

const singleProduct = async (id: any) => {
    return await Products.findOne({ _id: new mongoose.Types.ObjectId(id) })
};

export default {
    createProduct,
    getallProduct,
    updateProduct,
    deleteProduct,
    singleProduct
}
