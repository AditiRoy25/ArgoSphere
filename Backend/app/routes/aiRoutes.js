
const express =
require("express");

const router =
express.Router();

const controller =
require(
"../controllers/aiControllers"
);

const auth =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const 
    validate = require(
"../middlewares/validationMiddleware"
);

const {
    chatValidation,
    cropRecommendationValidation,
    diseasePredictionValidation,
    fertilizerSuggestionValidation
} = require(
"../validators/aiValidation"
);

// ======================
// AI CHAT
// ======================

router.post(
    "/chat",
    auth,
    authorize(
        "farmer"
    ),
    validate(
        chatValidation
    ),
    controller.chat
);

// ======================
// CROP RECOMMENDATION
// ======================

router.post(
    "/crop-recommendation",
    auth,
    authorize(
        "farmer"
    ),
    validate(
        cropRecommendationValidation
    ),
    controller.cropRecommendation
);

// ======================
// DISEASE PREDICTION
// ======================

router.post(
    "/disease-prediction",
    auth,
    authorize(
        "farmer"
    ),
    validate(
        diseasePredictionValidation
    ),
    controller.diseasePrediction
);

// ======================
// FERTILIZER SUGGESTION
// ======================

router.post(
    "/fertilizer-suggestion",
    auth,
    authorize(
        "farmer"
    ),
    validate(
        fertilizerSuggestionValidation
    ),
    controller.fertilizerSuggestion
);

// ======================
// CHAT HISTORY
// ======================

router.get(
    "/history",
    auth,
    authorize(
        "farmer"
    ),
    controller.history
);

// ======================
// DELETE CHAT
// ======================

router.delete(
    "/history/:id",
    auth,
    authorize(
        "farmer"
    ),
    controller.deleteChat
);

module.exports =
router;

