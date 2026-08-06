const mongoose =
require("mongoose");

const orderItemSchema =
new mongoose.Schema(
{
    product: {
        type:
            mongoose.Schema.Types.ObjectId,

        ref:
            "MarketplaceProduct",

        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    price: {
        type: Number,
        required: true,
        min: 0
    }
},
{
    _id: false
});

const marketplaceOrderSchema =
new mongoose.Schema(
{
    farmer: {
        type:
            mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
    },

    products: {
        type: [orderItemSchema],
        required: true
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    paymentStatus: {
        type: String,

        enum: [
            "pending",
            "paid",
            "failed"
        ],

        default: "pending"
    },

    orderStatus: {
        type: String,

        enum: [
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ],

        default: "processing"
    }
},
{
    timestamps: true
});

module.exports =
mongoose.model(
    "MarketplaceOrder",
    marketplaceOrderSchema
);