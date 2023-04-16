import Joi from '@hapi/joi';

const createProduct = {
    body: Joi.object().keys({
        sProductName: Joi.string().allow('', null),
        sProductImage: Joi.string().allow('', null),
        sDescription: Joi.string().allow('', null),
        sPrice: Joi.number().allow('', null),
        sQuantity: Joi.number().allow('', null)

    })
};

const allProduct = {
    query: Joi.object().keys({
        search: Joi.string().allow('', null),
        page: Joi.number(),
        limit: Joi.number()
    })
};

const updateProduct = {
    query: Joi.object().keys({
        id: Joi.string().required()
    }),
    body: Joi.object().keys({
        sProductName: Joi.string().allow('', null),
        sProductImage: Joi.string().allow('', null),
        sDescription: Joi.string().allow('', null),
        sPrice: Joi.number().allow('', null),
        sQuantity: Joi.number().allow('', null)
    })
};


export default {
    createProduct,
    allProduct,
    updateProduct

}