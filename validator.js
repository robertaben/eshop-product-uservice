const {body, validationResult} = require('express-validator');
const productValidationRules = () => {
    return [
        body("name").isLength({min: 3, max: 255})
            .withMessage("Invalid value. Product name should be minimum 3 symbols"),
        body("description").optional(true).isLength({max: 255})
            .withMessage("Invalid value. Product description should be maximum 255 symbols"),
        body("price").optional(true).isCurrency({digits_after_decimal: [1, 2]})
            .withMessage("Invalid value. Price should contain max 2 numbers after . e.g. ***.**")
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    productValidationRules,
    validate,
};