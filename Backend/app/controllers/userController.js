
const bcrypt =
require("bcryptjs");

const mongoose =
require("mongoose");

const User =
require("../models/User");

const FarmerProfile =
require(
"../models/FarmerProfile"
);

const {
    successResponse,
    errorResponse
} = require(
"../utils/response"
);

class UserController {

    // ======================
    // MY PROFILE
    // ======================

   async myProfile(req,res){

    try{

        const user =
        await User.findById(
            req.user._id
        ).select(
            "-password -resetPasswordToken -resetPasswordExpire"
        );

        if(!user){

            return errorResponse(
                res,
                404,
                "User Not Found"
            );

        }

        const profile = {

            _id:user._id,

            name:user.name,

            email:user.email,

            phone:user.phone,

            role:user.role,

            gender:user.gender,

            profileImage:user.image,

            address:user.address,

            district:user.district,

            state:user.state,

            isEmailVerified:
            user.isVerified,

            status:
            user.isBlocked
            ? "blocked"
            : "active",

            createdAt:
            user.createdAt,

            updatedAt:
            user.updatedAt

        };

        return successResponse(
            res,
            200,
            "Profile Retrieved",
            profile
        );

    }catch(error){

        return errorResponse(
            res,
            500,
            error.message
        );

    }

}

    // ======================
    // UPDATE PROFILE
    // ======================

   async updateProfile(req,res){

    try{

        const user =
        await User.findByIdAndUpdate(

            req.user._id,

            {

                gender:
                req.body.gender,

                address:
                req.body.address,

                district:
                req.body.district,

                state:
                req.body.state

            },

            {
                new:true
            }

        ).select("-password");

        return successResponse(
            res,
            200,
            "Profile Updated",
            user
        );

    }catch(error){

        return errorResponse(
            res,
            500,
            error.message
        );

    }

}

    // ======================
    // CHANGE PASSWORD
    // ======================

    // async changePassword(
    //     req,
    //     res
    // ){

    //     try{

    //         const {
    //             currentPassword,
    //             newPassword
    //         } = req.body;

    //         const user =
    //         await User.findById(
    //             req.user._id
    //         );

    //         const isMatch =
    //         await bcrypt.compare(

    //             currentPassword,

    //             user.password

    //         );

    //         if(!isMatch){

    //             return errorResponse(

    //                 res,

    //                 400,

    //                 "Current Password Incorrect"

    //             );

    //         }

    //         const hashedPassword =
    //         await bcrypt.hash(
    //             newPassword,
    //             10
    //         );

    //         user.password =
    //         hashedPassword;

    //         await user.save();

    //         return successResponse(

    //             res,

    //             200,

    //             "Password Changed"

    //         );

    //     }catch(error){

    //         return errorResponse(
    //             res,
    //             500,
    //             error.message
    //         );

    //     }

    // }


   async changePassword(req, res) {

    try {

        // =====================================
        // BODY
        // =====================================

        const {
            currentPassword,
            newPassword
        } = req.body;

        // =====================================
        // VALIDATE BODY
        // =====================================

        if (
            !currentPassword ||
            !newPassword
        ) {

            return errorResponse(
                res,
                400,
                "Current password and new password are required"
            );

        }

        // =====================================
        // USER ID
        // =====================================

        const userId =
            req.user?._id ||
            req.user?.id;

        if (!userId) {

            return errorResponse(
                res,
                401,
                "Unauthorized"
            );

        }

        // =====================================
        // FIND USER
        //
        // IMPORTANT:
        // explicitly include password
        // =====================================

        const user =
            await User
                .findById(userId)
                .select("+password");

        if (!user) {

            return errorResponse(
                res,
                404,
                "User Not Found"
            );

        }

        // =====================================
        // PASSWORD EXISTS
        // =====================================

        if (!user.password) {

            console.log(
                "Password missing for user:",
                userId
            );

            return errorResponse(
                res,
                500,
                "User password is not available"
            );

        }

        // =====================================
        // VERIFY CURRENT PASSWORD
        // =====================================

        const isMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isMatch) {

            return errorResponse(
                res,
                400,
                "Current Password Incorrect"
            );

        }

        // =====================================
        // CHECK SAME PASSWORD
        // =====================================

        const isSamePassword =
            await bcrypt.compare(
                newPassword,
                user.password
            );

        if (isSamePassword) {

            return errorResponse(
                res,
                400,
                "New password must be different from current password"
            );

        }

        // =====================================
        // HASH NEW PASSWORD
        // =====================================

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        // =====================================
        // UPDATE PASSWORD
        // =====================================

        user.password =
            hashedPassword;

        await user.save();

        // =====================================
        // SUCCESS
        // =====================================

        return successResponse(
            res,
            200,
            "Password Changed Successfully"
        );

    } catch (error) {

        console.error(
            "CHANGE PASSWORD ERROR:",
            error
        );

        return errorResponse(
            res,
            500,
            error.message
        );

    }

}


    // ======================
    // GET ALL FARMERS
    // ======================

    async getFarmers(
        req,
        res
    ){

        try{

            const farmers =
            await User.aggregate([

                {
                    $match:{
                        role:"farmer"
                    }
                },

                {
                    $lookup:{

                        from:
                        "farmerprofiles",

                        localField:
                        "_id",

                        foreignField:
                        "user",

                        as:
                        "profile"

                    }
                },

                {
                    $project:{
                        password:0
                    }
                }

            ]);

            return successResponse(

                res,

                200,

                "Farmers Retrieved",

                farmers

            );

        }catch(error){

            return errorResponse(
                res,
                500,
                error.message
            );

        }

    }

    // ======================
    // GET FARMER
    // ======================

    async getFarmer(
        req,
        res
    ){

        try{

            const farmer =
            await User.aggregate([

                {
                    $match:{

                        _id:
                        new mongoose
                        .Types
                        .ObjectId(
                            req.params.id
                        ),

                        role:"farmer"

                    }
                },

                {
                    $lookup:{

                        from:
                        "farmerprofiles",

                        localField:
                        "_id",

                        foreignField:
                        "user",

                        as:
                        "profile"

                    }
                }

            ]);

            if(!farmer.length){

                return errorResponse(
                    res,
                    404,
                    "Farmer Not Found"
                );

            }

            return successResponse(

                res,

                200,

                "Farmer Retrieved",

                farmer[0]

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
new UserController();

