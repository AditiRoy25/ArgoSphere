const Joi =
require("joi");

// ==========================================
// CREATE PRODUCT
// ==========================================

const createProductValidation =
Joi.object({

    name:
        Joi.string()
            .trim()
            .required(),

    category:
        Joi.string()
            .valid(
                "tractor",
                "harvester",
                "pump",
                "sprayer",
                "tool",
                "seed",
                "fertilizer"
            )
            .required(),

    brand:
        Joi.string()
            .allow("")
            .optional(),

    price:
        Joi.number()
            .min(0)
            .required(),

    stock:
        Joi.number()
            .integer()
            .min(0)
            .required(),

    description:
        Joi.string()
            .allow("")
            .optional(),

    status:
        Joi.string()
            .valid(
                "available",
                "out_of_stock",
                "inactive"
            )
            .optional(),

    specifications:
        Joi.alternatives()
            .try(
                Joi.object(),
                Joi.string()
            )
            .optional()
});

// ==========================================
// CREATE ORDER
// ==========================================

const createOrderValidation =
Joi.object({

    products:
        Joi.array()
            .items(

                Joi.object({

                    product:
                        Joi.string()
                            .required(),

                    quantity:
                        Joi.number()
                            .integer()
                            .min(1)
                            .required(),

                    // Frontend may send it,
                    // but backend should not trust it.
                    price:
                        Joi.number()
                            .min(0)
                            .optional()

                })

            )
            .min(1)
            .required()

});

// ==========================================
// ORDER STATUS
// ==========================================

const updateOrderStatusValidation =
Joi.object({

    orderStatus:
        Joi.string()
            .valid(
                "processing",
                "shipped",
                "delivered",
                "cancelled"
            )
            .required()

});

module.exports = {

    createProductValidation,

    createOrderValidation,

    updateOrderStatusValidation

};