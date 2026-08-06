const User =
require("../models/User");

const Farm =
require("../models/Farm");

const MarketplaceOrder =
require("../models/MarketplaceOrder");

const Workshop =
require("../models/Workshop");

const WeatherAlert =
require("../models/WeatherAlert");


class ReportController {

    // ==========================================
    // DASHBOARD SUMMARY
    // ==========================================

    async dashboardSummary(req, res) {

        try {

            const [
                farmers,
                farms,
                orders,
                workshops,
                weatherAlerts
            ] = await Promise.all([

                User.countDocuments({
                    role: "farmer"
                }),

                Farm.countDocuments(),

                MarketplaceOrder
                    .countDocuments(),

                Workshop
                    .countDocuments(),

                WeatherAlert
                    .countDocuments()

            ]);


            // ==================================
            // REVENUE
            // ==================================

            const revenueResult =
                await MarketplaceOrder.aggregate([
                    {
                        $match: {
                            orderStatus: {
                                $ne: "cancelled"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,

                            totalRevenue: {
                                $sum:
                                    "$totalAmount"
                            }
                        }
                    }
                ]);


            const totalRevenue =
                revenueResult[0]
                    ?.totalRevenue || 0;


            return res.status(200).json({

                success: true,

                summary: {

                    farmers,

                    farms,

                    orders,

                    workshops,

                    weatherAlerts,

                    totalRevenue

                }

            });

        } catch (error) {

            console.error(
                "DASHBOARD REPORT ERROR:",
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
    // FARMER GROWTH
    // ==========================================

    async farmerGrowthReport(req, res) {

        try {

            const report =
                await User.aggregate([

                    {
                        $match: {
                            role: "farmer"
                        }
                    },

                    {
                        $group: {

                            _id: {

                                year: {
                                    $year:
                                        "$createdAt"
                                },

                                month: {
                                    $month:
                                        "$createdAt"
                                }

                            },

                            totalFarmers: {
                                $sum: 1
                            }

                        }
                    },

                    {
                        $sort: {
                            "_id.year": 1,
                            "_id.month": 1
                        }
                    }

                ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // FARM REPORT
    // ==========================================

    async farmReport(req, res) {

        try {

            const report =
                await Farm.aggregate([

                    {
                        $group: {

                            _id:
                                "$soilType",

                            totalFarms: {
                                $sum: 1
                            },

                            totalArea: {
                                $sum:
                                    "$farmArea"
                            }

                        }
                    },

                    {
                        $sort: {
                            totalFarms: -1
                        }
                    }

                ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // MARKETPLACE REVENUE REPORT
    // ==========================================

    async marketplaceRevenueReport(
        req,
        res
    ) {

        try {

            const result =
                await MarketplaceOrder
                    .aggregate([

                        {
                            $match: {

                                orderStatus: {
                                    $ne:
                                        "cancelled"
                                }

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
                                },

                                averageOrderValue: {
                                    $avg:
                                        "$totalAmount"
                                }

                            }
                        }

                    ]);


            const report =
                result[0] || {

                    totalRevenue: 0,

                    totalOrders: 0,

                    averageOrderValue: 0

                };


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // MARKETPLACE ORDER STATUS REPORT
    // ==========================================

    async marketplaceOrderStatusReport(
        req,
        res
    ) {

        try {

            const report =
                await MarketplaceOrder
                    .aggregate([

                        {
                            $group: {

                                _id:
                                    "$orderStatus",

                                totalOrders: {
                                    $sum: 1
                                },

                                totalAmount: {
                                    $sum:
                                        "$totalAmount"
                                }

                            }
                        },

                        {
                            $sort: {
                                totalOrders: -1
                            }
                        }

                    ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // PAYMENT STATUS REPORT
    // ==========================================

    async paymentStatusReport(
        req,
        res
    ) {

        try {

            const report =
                await MarketplaceOrder
                    .aggregate([

                        {
                            $group: {

                                _id:
                                    "$paymentStatus",

                                totalOrders: {
                                    $sum: 1
                                },

                                totalAmount: {
                                    $sum:
                                        "$totalAmount"
                                }

                            }
                        },

                        {
                            $sort: {
                                totalOrders: -1
                            }
                        }

                    ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // MONTHLY MARKETPLACE SALES
    // ==========================================

    async monthlySalesReport(
        req,
        res
    ) {

        try {

            const report =
                await MarketplaceOrder
                    .aggregate([

                        {
                            $match: {

                                orderStatus: {
                                    $ne:
                                        "cancelled"
                                }

                            }
                        },

                        {
                            $group: {

                                _id: {

                                    year: {
                                        $year:
                                            "$createdAt"
                                    },

                                    month: {
                                        $month:
                                            "$createdAt"
                                    }

                                },

                                totalOrders: {
                                    $sum: 1
                                },

                                revenue: {
                                    $sum:
                                        "$totalAmount"
                                }

                            }
                        },

                        {
                            $sort: {
                                "_id.year": 1,
                                "_id.month": 1
                            }
                        }

                    ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // NGO PERFORMANCE
    // ==========================================

    async ngoPerformanceReport(
        req,
        res
    ) {

        try {

            const report =
                await Workshop.aggregate([

                    {
                        $group: {

                            _id:
                                "$ngo",

                            totalWorkshops: {
                                $sum: 1
                            },

                            totalAttendance: {

                                $sum: {

                                    $size: {
                                        $ifNull: [
                                            "$attendees",
                                            []
                                        ]
                                    }

                                }

                            }

                        }
                    },

                    {
                        $sort: {
                            totalWorkshops: -1
                        }
                    }

                ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // WEATHER REPORT
    // ==========================================

    async weatherReport(req, res) {

        try {

            const report =
                await WeatherAlert.aggregate([

                    {
                        $group: {

                            _id:
                                "$alertType",

                            totalAlerts: {
                                $sum: 1
                            }

                        }
                    },

                    {
                        $sort: {
                            totalAlerts: -1
                        }
                    }

                ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // WEATHER SEVERITY REPORT
    // ==========================================

    async weatherSeverityReport(
        req,
        res
    ) {

        try {

            const report =
                await WeatherAlert.aggregate([

                    {
                        $group: {

                            _id:
                                "$severity",

                            totalAlerts: {
                                $sum: 1
                            }

                        }
                    },

                    {
                        $sort: {
                            totalAlerts: -1
                        }
                    }

                ]);


            return res.status(200).json({

                success: true,

                report

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }

}


module.exports =
new ReportController();