const express =
require("express");

const router =
express.Router();

const controller =
require(
    "../controllers/reportController"
);

const auth =
require(
    "../middlewares/authMiddleware"
);

const authorize =
require(
    "../middlewares/roleMiddleware"
);


// ==========================================
// ALL REPORTS REQUIRE LOGIN
// ==========================================

router.use(auth);


// ==========================================
// DASHBOARD
// ==========================================

router.get(
    "/dashboard-summary",
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.dashboardSummary
);


// ==========================================
// FARMER
// ==========================================

router.get(
    "/farmer-growth",
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.farmerGrowthReport
);


// ==========================================
// FARM
// ==========================================

router.get(
    "/farms",
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.farmReport
);


// ==========================================
// MARKETPLACE
// ==========================================

router.get(
    "/marketplace/revenue",
    authorize(
        "admin",
        "ministry"
    ),
    controller.marketplaceRevenueReport
);


router.get(
    "/marketplace/order-status",
    authorize(
        "admin",
        "ministry"
    ),
    controller.marketplaceOrderStatusReport
);


router.get(
    "/marketplace/payment-status",
    authorize(
        "admin",
        "ministry"
    ),
    controller.paymentStatusReport
);


router.get(
    "/marketplace/monthly-sales",
    authorize(
        "admin",
        "ministry"
    ),
    controller.monthlySalesReport
);


// ==========================================
// NGO
// ==========================================

router.get(
    "/ngo-performance",
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.ngoPerformanceReport
);


// ==========================================
// WEATHER
// ==========================================

router.get(
    "/weather",
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.weatherReport
);


router.get(
    "/weather/severity",
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.weatherSeverityReport
);


module.exports =
router;