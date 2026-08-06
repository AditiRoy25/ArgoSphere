
const mongoose =
require("mongoose");

const AllowanceApplication =
require("../models/AllowanceApplication");

const GovernmentScheme =
require("../models/GovernmentScheme");

class AllowanceController {

    // ==========================
    // APPLY FOR ALLOWANCE
    // ==========================
    async applyAllowance(
        req,
        res
    ) {

        try {

            const application =
            await AllowanceApplication
            .create({

                farmer:
                req.user._id,

                scheme:
                req.body.scheme,

                documents:
                req.body.documents,

                remarks:
                req.body.remarks

            });

            return res.status(201)
            .json({
                success:true,
                application
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // GET ALL APPLICATIONS
    // ==========================
    async getApplications(
        req,
        res
    ) {

        try {

            const applications =
            await AllowanceApplication
            .aggregate([

                {
                    $lookup:{
                        from:"users",
                        localField:"farmer",
                        foreignField:"_id",
                        as:"farmer"
                    }
                },

                {
                    $unwind:"$farmer"
                },

                {
                    $lookup:{
                        from:"governmentschemes",
                        localField:"scheme",
                        foreignField:"_id",
                        as:"scheme"
                    }
                },

                {
                    $unwind:"$scheme"
                },

                {
                    $sort:{
                        createdAt:-1
                    }
                }

            ]);

            return res.status(200)
            .json({
                success:true,
                applications
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // GET MY APPLICATIONS
    // ==========================
    async getMyApplications(
        req,
        res
    ) {

        try {

            const applications =
            await AllowanceApplication
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
                    $lookup:{
                        from:"governmentschemes",
                        localField:"scheme",
                        foreignField:"_id",
                        as:"scheme"
                    }
                },

                {
                    $unwind:"$scheme"
                }

            ]);

            return res.status(200)
            .json({
                success:true,
                applications
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // GET SINGLE APPLICATION
    // ==========================
    async getApplication(
        req,
        res
    ) {

        try {

            const application =
            await AllowanceApplication
            .aggregate([

                {
                    $match:{
                        _id:
                        new mongoose
                        .Types
                        .ObjectId(
                            req.params.id
                        )
                    }
                },

                {
                    $lookup:{
                        from:"users",
                        localField:"farmer",
                        foreignField:"_id",
                        as:"farmer"
                    }
                },

                {
                    $unwind:"$farmer"
                },

                {
                    $lookup:{
                        from:"governmentschemes",
                        localField:"scheme",
                        foreignField:"_id",
                        as:"scheme"
                    }
                },

                {
                    $unwind:"$scheme"
                }

            ]);

            if(!application.length){

                return res.status(404)
                .json({
                    success:false,
                    message:
                    "Application Not Found"
                });

            }

            return res.status(200)
            .json({
                success:true,
                application:
                application[0]
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // VERIFY APPLICATION
    // ==========================
    async verifyApplication(
        req,
        res
    ) {

        try {

            const application =
            await AllowanceApplication
            .findByIdAndUpdate(

                req.params.id,

                {
                    status:
                    "verified"
                },

                {
                    new:true
                }

            );

            return res.status(200)
            .json({
                success:true,
                application
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // APPROVE APPLICATION
    // ==========================
    async approveApplication(
        req,
        res
    ) {

        try {

            const application =
            await AllowanceApplication
            .findByIdAndUpdate(

                req.params.id,

                {
                    status:
                    "approved",

                    approvedBy:
                    req.user._id
                },

                {
                    new:true
                }

            );

            return res.status(200)
            .json({
                success:true,
                application
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // REJECT APPLICATION
    // ==========================
    async rejectApplication(
        req,
        res
    ) {

        try {

            const application =
            await AllowanceApplication
            .findByIdAndUpdate(

                req.params.id,

                {
                    status:
                    "rejected",

                    remarks:
                    req.body.remarks
                },

                {
                    new:true
                }

            );

            return res.status(200)
            .json({
                success:true,
                application
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // MARK AS PAID
    // ==========================
    async markAsPaid(
        req,
        res
    ) {

        try {

            const application =
            await AllowanceApplication
            .findByIdAndUpdate(

                req.params.id,

                {
                    status:"paid"
                },

                {
                    new:true
                }

            );

            return res.status(200)
            .json({
                success:true,
                application
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // STATUS REPORT
    // ==========================
    async statusReport(
        req,
        res
    ) {

        try {

            const report =
            await AllowanceApplication
            .aggregate([

                {
                    $group:{

                        _id:"$status",

                        total:{
                            $sum:1
                        }

                    }
                }

            ]);

            return res.status(200)
            .json({
                success:true,
                report
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // ==========================
    // SCHEME REPORT
    // ==========================
    async schemeReport(
        req,
        res
    ) {

        try {

            const report =
            await AllowanceApplication
            .aggregate([

                {
                    $group:{

                        _id:"$scheme",

                        totalApplications:{
                            $sum:1
                        }

                    }
                },

                {
                    $lookup:{
                        from:
                        "governmentschemes",

                        localField:
                        "_id",

                        foreignField:
                        "_id",

                        as:
                        "scheme"
                    }
                },

                {
                    $unwind:"$scheme"
                }

            ]);

            return res.status(200)
            .json({
                success:true,
                report
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

}

module.exports =
new AllowanceController();

