const mongoose = require("mongoose");

const marketplaceProductSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true
            },

            category: {
                type: String,
                required: true,
                enum: [
                    "tractor",
                    "harvester",
                    "pump",
                    "sprayer",
                    "tool",
                    "seed",
                    "fertilizer"
                ]
            },

            brand: {
                type: String,
                trim: true,
                default: ""
            },

            price: {
                type: Number,
                required: true,
                min: 0
            },

            stock: {
                type: Number,
                required: true,
                default: 0,
                min: 0
            },

            specifications: {
                type: Map,
                of: String,
                default: {}
            },

            images: {
                type: [String],
                default: []
            },

            description: {
                type: String,
                default: ""
            },

            status: {
                type: String,
                enum: [
                    "available",
                    "out_of_stock",
                    "inactive"
                ],
                default: "available"
            },

            totalSold: {
                type: Number,
                default: 0
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "MarketplaceProduct",
        marketplaceProductSchema
    );