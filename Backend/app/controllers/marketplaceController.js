const mongoose =
require("mongoose");

const MarketplaceProduct =
require(
    "../models/MarketplaceProduct"
);

const MarketplaceOrder =
require(
    "../models/MarketplaceOrder"
);

class MarketplaceController {

    // ==========================================
    // GET PRODUCTS
    // PUBLIC
    // ==========================================

   async getProducts(req, res) {

    try {

        const {
            search = "",
            category,
            status,
            page = 1,
            limit = 12
        } = req.query;

        const filter = {};

        // =====================================
        // SEARCH
        // =====================================

        if (search.trim()) {

            filter.$or = [

                {
                    name: {
                        $regex:
                            search.trim(),
                        $options: "i"
                    }
                },

                {
                    brand: {
                        $regex:
                            search.trim(),
                        $options: "i"
                    }
                }

            ];

        }

        // =====================================
        // CATEGORY
        // =====================================

        if (
            category &&
            category !== "all"
        ) {
            filter.category =
                category;
        }

        // =====================================
        // STATUS
        // =====================================

        if (status) {

            filter.status =
                status;

        } else {

            // public marketplace
            filter.status = {
                $ne: "inactive"
            };

        }

        // =====================================
        // PAGINATION
        // =====================================

        const pageNumber =
            Math.max(
                Number(page) || 1,
                1
            );

        const limitNumber =
            Math.min(
                Math.max(
                    Number(limit) || 12,
                    1
                ),
                100
            );

        const skip =
            (pageNumber - 1) *
            limitNumber;

        // =====================================
        // QUERY
        // =====================================

        const [
            products,
            total
        ] =
            await Promise.all([

                MarketplaceProduct
                    .find(filter)
                    .sort({
                        createdAt: -1
                    })
                    .skip(skip)
                    .limit(
                        limitNumber
                    ),

                MarketplaceProduct
                    .countDocuments(
                        filter
                    )

            ]);

        console.log(
            "Marketplace filter:",
            filter
        );

        console.log(
            "Products found:",
            total
        );

        return res.status(200).json({

            success: true,

            message:
                "Products fetched successfully.",

            total,

            page:
                pageNumber,

            totalPages:
                Math.ceil(
                    total /
                    limitNumber
                ),

            products

        });

    } catch (error) {

        console.error(
            "GET PRODUCTS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

}
    // ==========================================
    // SINGLE PRODUCT
    // ==========================================

    async getProduct(req, res) {

        try {

            const product =
                await MarketplaceProduct
                    .findById(
                        req.params.id
                    );

            if (!product) {

                return res.status(404)
                    .json({

                        success: false,

                        message:
                            "Product not found."

                    });

            }

            return res.status(200)
                .json({

                    success: true,

                    product

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

    // ==========================================
    // CREATE PRODUCT
    // ADMIN
    // ==========================================

   async createProduct(req, res) {

    try {

        const {
            name,
            category,
            brand,
            price,
            stock,
            description,
            status
        } = req.body;

        // =====================================
        // REQUIRED FIELDS
        // =====================================

        if (
            !name ||
            !category ||
            price === undefined ||
            stock === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, category, price and stock are required."
            });
        }

        // =====================================
        // SPECIFICATIONS
        // =====================================

        let specifications = {};

        if (req.body.specifications) {

            try {

                specifications =
                    typeof req.body.specifications ===
                    "string"
                        ? JSON.parse(
                            req.body.specifications
                        )
                        : req.body.specifications;

            } catch (error) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid specifications JSON."
                });

            }
        }

        // =====================================
        // IMAGES
        // =====================================

        const images = [];

        if (
            req.files &&
            Array.isArray(req.files)
        ) {

            req.files.forEach(
                (file) => {

                    images.push(
                        `/uploads/marketplace/${file.filename}`
                    );

                }
            );

        }

        // Support upload.single() too

        if (req.file) {

            images.push(
                `/uploads/marketplace/${req.file.filename}`
            );

        }

        // =====================================
        // STATUS
        // =====================================

        const stockNumber =
            Number(stock);

        let finalStatus =
            status || "available";

        if (stockNumber === 0) {
            finalStatus =
                "out_of_stock";
        }

        // =====================================
        // CREATE
        // =====================================

        const product =
            await MarketplaceProduct.create({

                name:
                    name.trim(),

                category,

                brand:
                    brand?.trim() || "",

                price:
                    Number(price),

                stock:
                    stockNumber,

                description:
                    description || "",

                specifications,

                images,

                status:
                    finalStatus

            });

        return res.status(201).json({

            success: true,

            message:
                "Product created successfully.",

            product

        });

    } catch (error) {

        console.error(
            "CREATE PRODUCT ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

}

    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

   async updateProduct(req, res) {

    try {

        const product =
            await MarketplaceProduct.findById(
                req.params.id
            );

        if (!product) {

            return res.status(404).json({
                success: false,
                message:
                    "Product not found."
            });

        }

        // =====================================
        // BASIC FIELDS
        // =====================================

        if (
            req.body.name !==
            undefined
        ) {
            product.name =
                req.body.name;
        }

        if (
            req.body.category !==
            undefined
        ) {
            product.category =
                req.body.category;
        }

        if (
            req.body.brand !==
            undefined
        ) {
            product.brand =
                req.body.brand;
        }

        if (
            req.body.description !==
            undefined
        ) {
            product.description =
                req.body.description;
        }

        if (
            req.body.price !==
            undefined
        ) {
            product.price =
                Number(
                    req.body.price
                );
        }

        if (
            req.body.stock !==
            undefined
        ) {
            product.stock =
                Number(
                    req.body.stock
                );
        }

        if (
            req.body.status !==
            undefined
        ) {
            product.status =
                req.body.status;
        }

        // =====================================
        // SPECIFICATIONS
        // =====================================

        if (
            req.body.specifications !==
            undefined
        ) {

            try {

                product.specifications =
                    typeof req.body
                        .specifications ===
                    "string"
                        ? JSON.parse(
                            req.body
                                .specifications
                        )
                        : req.body
                            .specifications;

            } catch (error) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid specifications."
                });

            }

        }

        // =====================================
        // NEW IMAGES
        // =====================================

        if (
            req.files &&
            Array.isArray(req.files) &&
            req.files.length > 0
        ) {

            product.images =
                req.files.map(
                    (file) =>
                        `/uploads/marketplace/${file.filename}`
                );

        }

        if (req.file) {

            product.images = [
                `/uploads/marketplace/${req.file.filename}`
            ];

        }

        // =====================================
        // STOCK STATUS
        // =====================================

        if (
            product.stock === 0 &&
            product.status ===
            "available"
        ) {
            product.status =
                "out_of_stock";
        }

        if (
            product.stock > 0 &&
            product.status ===
            "out_of_stock"
        ) {
            product.status =
                "available";
        }

        await product.save();

        return res.status(200).json({

            success: true,

            message:
                "Product updated successfully.",

            product

        });

    } catch (error) {

        console.error(
            "UPDATE PRODUCT ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

}

    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    async deleteProduct(req, res) {

        try {

            const product =
                await MarketplaceProduct
                    .findByIdAndDelete(
                        req.params.id
                    );

            if (!product) {

                return res.status(404)
                    .json({

                        success: false,

                        message:
                            "Product not found."

                    });

            }

            return res.status(200)
                .json({

                    success: true,

                    message:
                        "Product deleted successfully."

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

    // ==========================================
    // CREATE ORDER
    // FARMER
    // ==========================================

    async createOrder(req, res) {

        const session =
            await MarketplaceProduct
                .startSession();

        try {

            session.startTransaction();

            const {
                products,
                shippingAddress
            } = req.body;

            // ==========================
            // VALIDATION
            // ==========================

            if (
                !products ||
                !Array.isArray(products) ||
                products.length === 0
            ) {

                await session.abortTransaction();

                return res.status(400).json({
                    success: false,
                    message:
                        "At least one product is required."
                });
            }

            const orderProducts = [];

            let totalAmount = 0;

            // ==========================
            // CHECK PRODUCTS
            // ==========================

            for (
                const item of products
            ) {

                const quantity =
                    Number(item.quantity);

                if (
                    !quantity ||
                    quantity < 1
                ) {

                    await session.abortTransaction();

                    return res.status(400).json({
                        success: false,
                        message:
                            "Invalid product quantity."
                    });
                }

                const product =
                    await MarketplaceProduct
                        .findById(
                            item.product
                        )
                        .session(
                            session
                        );

                if (!product) {

                    await session.abortTransaction();

                    return res.status(404).json({
                        success: false,
                        message:
                            "Product not found."
                    });
                }

                if (
                    product.status !==
                    "available"
                ) {

                    await session.abortTransaction();

                    return res.status(400).json({
                        success: false,
                        message:
                            `${product.name} is not available.`
                    });
                }

                if (
                    product.stock <
                    quantity
                ) {

                    await session.abortTransaction();

                    return res.status(400).json({
                        success: false,
                        message:
                            `Only ${product.stock} ${product.name} available.`
                    });
                }

                // ==========================
                // CALCULATE PRICE
                // ==========================

                const itemTotal =
                    product.price *
                    quantity;

                totalAmount +=
                    itemTotal;

                orderProducts.push({
                    product:
                        product._id,

                    quantity,

                    price:
                        product.price
                });

                // ==========================
                // DECREASE STOCK
                // ==========================

                product.stock -=
                    quantity;

                // increase sold quantity
                product.totalSold +=
                    quantity;

                // automatically out of stock
                if (
                    product.stock === 0
                ) {
                    product.status =
                        "out_of_stock";
                }

                await product.save({
                    session
                });
            }

            // ==========================
            // CREATE ORDER
            // ==========================

            const [order] =
                await MarketplaceOrder.create(
                    [
                        {
                            farmer:
                                req.user._id ||
                                req.user.id,

                            products:
                                orderProducts,

                            totalAmount,

                            shippingAddress,

                            paymentStatus:
                                "pending",

                            orderStatus:
                                "processing"
                        }
                    ],
                    {
                        session
                    }
                );

            await session.commitTransaction();

            return res
                .status(201)
                .json({
                    success: true,

                    message:
                        "Order placed successfully.",

                    order
                });

        } catch (error) {

            await session.abortTransaction();

            console.error(
                "CREATE ORDER:",
                error
            );

            return res
                .status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        } finally {

            session.endSession();

        }
    }





    // ==========================================
    // FARMER MY ORDERS
    // ==========================================

    async getMyOrders(req, res) {

        try {

            const farmerId =
                req.user._id ||
                req.user.id;

            const orders =
                await MarketplaceOrder
                    .find({

                        farmer:
                            farmerId

                    })
                    .populate(
                        "products.product",
                        "name category brand images"
                    )
                    .sort({
                        createdAt: -1
                    });

            return res.status(200)
                .json({

                    success: true,

                    message:
                        "Orders fetched successfully.",

                    orders

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

    // ==========================================
    // ADMIN ALL ORDERS
    // ==========================================

    async getAllOrders(req, res) {

        try {

            const orders =
                await MarketplaceOrder
                    .find()
                    .populate(
                        "farmer",
                        "name email phone"
                    )
                    .populate(
                        "products.product",
                        "name category brand images"
                    )
                    .sort({
                        createdAt: -1
                    });

            return res.status(200)
                .json({

                    success: true,

                    message:
                        "All orders fetched successfully.",

                    orders

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

    // ==========================================
    // UPDATE ORDER STATUS
    // ==========================================

    async updateOrderStatus(
        req,
        res
    ) {

        try {

            const {
                orderStatus
            } = req.body;

            const order =
                await MarketplaceOrder
                    .findByIdAndUpdate(

                        req.params.id,

                        {
                            orderStatus
                        },

                        {
                            new: true,
                            runValidators: true
                        }

                    )
                    .populate(
                        "products.product",
                        "name category"
                    );

            if (!order) {

                return res.status(404)
                    .json({

                        success: false,

                        message:
                            "Order not found."

                    });

            }

            return res.status(200)
                .json({

                    success: true,

                    message:
                        "Order status updated successfully.",

                    order

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

    // ==========================================
    // CATEGORY REPORT
    // ==========================================

    async categoryReport(req, res) {

        try {

            const report =
                await MarketplaceProduct
                    .aggregate([

                        {
                            $group: {

                                _id:
                                    "$category",

                                totalProducts: {
                                    $sum: 1
                                }

                            }
                        },

                        {
                            $sort: {
                                totalProducts: -1
                            }
                        }

                    ]);

            return res.status(200)
                .json({

                    success: true,

                    report

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

    // ==========================================
    // TOP SELLING PRODUCTS
    // ==========================================

    async topSellingProducts(
        req,
        res
    ) {

        try {

            const products =
                await MarketplaceProduct
                    .find({
                        totalSold: {
                            $gt: 0
                        }
                    })
                    .select(
                        "name totalSold"
                    )
                    .sort({
                        totalSold: -1
                    })
                    .limit(10);

            return res.status(200)
                .json({

                    success: true,

                    products

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

    // ==========================================
    // REVENUE REPORT
    // ==========================================

    async revenueReport(req, res) {

        try {

            const result =
                await MarketplaceOrder
                    .aggregate([

                        {
                            $match: {

                                $or: [

                                    {
                                        paymentStatus:
                                            "paid"
                                    },

                                    {
                                        orderStatus:
                                            "delivered"
                                    }

                                ]

                            }
                        },

                        {
                            $group: {

                                _id: null,

                                totalRevenue: {
                                    $sum:
                                        "$totalAmount"
                                },

                                totalOrders: {
                                    $sum: 1
                                }

                            }
                        }

                    ]);

            const report =
                result[0] || {

                    totalRevenue: 0,

                    totalOrders: 0

                };

            return res.status(200)
                .json({

                    success: true,

                    totalRevenue:
                        report
                            .totalRevenue,

                    totalOrders:
                        report
                            .totalOrders

                });

        } catch (error) {

            return res.status(500)
                .json({

                    success: false,

                    message:
                        error.message

                });

        }

    }

}

module.exports =
new MarketplaceController();