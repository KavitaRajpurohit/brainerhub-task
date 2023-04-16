import Joi from '@hapi/joi';
// import languageUsed from './../../common/midlewares/languageGet';

const register = {
    body: Joi.object().keys({
        sEmail: Joi.string().required(),
        sPassword: Joi.string().required()
    })
};

const login = {
    body: Joi.object().keys({
        sEmail: Joi.string().required(),
        sPassword: Joi.string().required()

    })
};

export default {
    login,
    register

}