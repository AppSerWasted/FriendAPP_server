const Joi = require('@hapi/joi');

const registerValidationUser = data => {
    const schema = {
        nickName: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        phone: Joi.string()
            // .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

const loginValidation = data => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidationUser = registerValidationUser;
module.exports.loginValidation = loginValidation;
