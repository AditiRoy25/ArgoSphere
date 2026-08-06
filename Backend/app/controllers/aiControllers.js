
const mongoose =
require("mongoose");

const AIConversation =
require("../models/AIConversation");

const {
    successResponse,
    errorResponse
} = require(
"../utils/response"
);

class AIController {

    // ==========================
    // AI CHAT
    // ==========================

    async chat(
        req,
        res
    ){

        try{

            const {
                message
            } = req.body;

            // Gemini/OpenAI API call here

            const aiResponse =
            `AI Suggestion For: ${message}`;

            const conversation =
            await AIConversation
            .create({

                farmer:
                req.user._id,

                question:
                message,

                answer:
                aiResponse

            });

            return successResponse(

                res,

                200,

                "AI Response Generated",

                conversation

            );

        }catch(error){

            return errorResponse(
                res,
                500,
                error.message
            );

        }

    }

    // ==========================
    // CROP RECOMMENDATION
    // ==========================

    async cropRecommendation(
        req,
        res
    ){

        try{

            const {
                soilType,
                season
            } = req.body;

            let crops = [];

            if(
                soilType === "Loamy"
            ){

                crops = [
                    "Rice",
                    "Wheat",
                    "Maize"
                ];

            }else{

                crops = [
                    "Potato",
                    "Mustard"
                ];

            }

            return successResponse(

                res,

                200,

                "Crop Recommendation",

                {
                    season,
                    soilType,
                    crops
                }

            );

        }catch(error){

            return errorResponse(
                res,
                500,
                error.message
            );

        }

    }

    // ==========================
    // DISEASE PREDICTION
    // ==========================

    async diseasePrediction(
        req,
        res
    ){

        try{

            const {
                cropName,
                symptoms
            } = req.body;

            let disease =
            "Unknown Disease";

            if(
                symptoms.includes(
                    "yellow leaves"
                )
            ){

                disease =
                "Nitrogen Deficiency";

            }

            return successResponse(

                res,

                200,

                "Disease Prediction",

                {
                    cropName,
                    symptoms,
                    disease
                }

            );

        }catch(error){

            return errorResponse(
                res,
                500,
                error.message
            );

        }

    }

    // ==========================
    // FERTILIZER SUGGESTION
    // ==========================

    async fertilizerSuggestion(
        req,
        res
    ){

        try{

            const {
                cropName,
                soilType
            } = req.body;

            return successResponse(

                res,

                200,

                "Fertilizer Recommendation",

                {

                    cropName,

                    soilType,

                    fertilizers:[
                        "Organic Compost",
                        "Vermicompost",
                        "Bio Fertilizer"
                    ]

                }

            );

        }catch(error){

            return errorResponse(
                res,
                500,
                error.message
            );

        }

    }

    // ==========================
    // CHAT HISTORY
    // ==========================

    async history(
        req,
        res
    ){

        try{

            const history =
            await AIConversation
            .aggregate([

                {
                    $match:{

                        farmer:
                        new mongoose
                        .Types
                        .ObjectId(
                            req.user._id
                        )

                    }
                },

                {
                    $sort:{
                        createdAt:-1
                    }
                }

            ]);

            return successResponse(

                res,

                200,

                "Chat History",

                history

            );

        }catch(error){

            return errorResponse(
                res,
                500,
                error.message
            );

        }

    }

    // ==========================
    // DELETE CHAT
    // ==========================

    async deleteChat(
        req,
        res
    ){

        try{

            await AIConversation
            .findByIdAndDelete(
                req.params.id
            );

            return successResponse(

                res,

                200,

                "Chat Deleted"

            );

        }catch(error){

            return errorResponse(
                res,
                500,
                error.message
            );

        }

    }

}

module.exports =
new AIController();

