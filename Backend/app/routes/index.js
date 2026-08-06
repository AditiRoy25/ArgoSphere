
const express =
require("express");

const router =
express.Router();

// Auth

router.use(
    "/",
    require(
        "./authRoute"
    )
);

// Users

router.use(
    "/user",
    require(
        "./userRoutes"
    )
);

// Farms

router.use(
    "/farms",
    require(
        "./farmRoutes"
    )
);



// Marketplace

router.use(
    "/marketplace",
    require(
        "./marketplaceRoutes"
    )
);


router.use(
    "/learning",
    require(
        "./learningRoutes"
    )
);




// Weather

router.use(
    "/weather",
    require(
        "./weatherRoutes"
    )
);

// NGOs

router.use(
    "/ngo",
    require(
        "./ngoRoutes"
    )
);



// Reports

router.use(
    "/reports",
    require(
        "./reportRoutes"
    )
);

// Admin

router.use(
    "/admin",
    require(
        "./adminRoutes"
    )
);

// AI

router.use(
    "/ai",
    require(
        "./aiRoutes"
    )
);
router.use(
    "/contacts",
    require(
        "./contactRoutes"
    )
);
router.use(
    "/schemes",
    require(
        "./schemeRoutes"
    )
);

module.exports =
router;

