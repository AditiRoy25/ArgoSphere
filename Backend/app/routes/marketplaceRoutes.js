const express =
require("express");

const router =
express.Router();

const controller =
require(
    "../controllers/marketplaceController"
);

const auth =
require(
    "../middlewares/authMiddleware"
);

const authorize =
require(
    "../middlewares/roleMiddleware"
);

const 
    validate=
require(
    "../middlewares/validationMiddleware"
);

const {
    createProductValidation,
    createOrderValidation,
    updateOrderStatusValidation
} =
require(
    "../validators/marketplaceValidation"
);



const UserImage = require("../middlewares/uploadMiddleware");

// ==========================================
// REPORTS
// Keep BEFORE /products/:id
// ==========================================

router.get(
    "/products/category-report",

    auth,

    authorize(
        "admin",
        "officer",
        "ministry"
    ),

    controller.categoryReport
);

router.get(
    "/products/top-selling",

    auth,

    authorize(
        "admin",
        "officer",
        "ministry"
    ),

    controller.topSellingProducts
);

router.get(
    "/products/revenue-report",

    auth,

    authorize(
        "admin",
        "officer",
        "ministry"
    ),

    controller.revenueReport
);

// ==========================================
// PRODUCTS
// ==========================================

// PUBLIC

router.get(
    "/products",
    controller.getProducts
);

// ADMIN CREATE

router.post(
    "/products",

    auth,

    authorize(
        "admin"
    ),

    
    //
    UserImage.single("image"),

    validate(
        createProductValidation
    ),

    controller.createProduct
);

// SINGLE PRODUCT
// IMPORTANT:
// Put after report routes.

router.get(
    "/products/:id",
    controller.getProduct
);

// UPDATE

router.put(
    "/products/:id",

    auth,

    authorize(
        "admin"
    ),

    UserImage.single("image"),

    controller.updateProduct
);

// DELETE

router.delete(
    "/products/:id",

    auth,

    authorize(
        "admin"
    ),

    controller.deleteProduct
);

// ==========================================
// ORDERS
// ==========================================

// FARMER CREATE ORDER

router.post(
    "/orders",

    auth,

    authorize(
        "farmer"
    ),

    validate(
        createOrderValidation
    ),

    controller.createOrder
);

// ==========================================
// FARMER MY ORDERS
// IMPORTANT: BEFORE /orders/:id
// ==========================================

router.get(
    "/orders/my",

    auth,

    authorize(
        "farmer"
    ),

    controller.getMyOrders
);

// ==========================================
// ADMIN GET ALL ORDERS
// ==========================================

router.get(
    "/orders",

    auth,

    authorize(
        "admin",
        "ministry"
    ),

    controller.getAllOrders
);

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

router.put(
    "/orders/:id/status",

    auth,

    authorize(
        "admin"
    ),

    validate(
        updateOrderStatusValidation
    ),

    controller.updateOrderStatus
);

module.exports =
router;