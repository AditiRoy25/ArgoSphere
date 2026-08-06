const WeatherAlert = require("../models/WeatherAlert");

class WeatherController {

    // ===============================
    // Create Weather Alert
    // ===============================
    async createAlert(req, res) {
        try {

            const weatherAlert =
                await WeatherAlert.create(req.body);

            return res.status(201).json({
                success: true,
                message: "Weather alert created successfully.",
                data: weatherAlert
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

    // ===============================
    // Get All Alerts
    // ===============================
    async getAlerts(req, res) {

        try {

            const alerts =
                await WeatherAlert.find()
                    .sort({
                        createdAt: -1
                    });

            return res.status(200).json({
                success: true,
                total: alerts.length,
                data: alerts
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ===============================
    // Get Single Alert
    // ===============================
    async getAlert(req, res) {

        try {

            const alert =
                await WeatherAlert.findById(
                    req.params.id
                );

            if (!alert) {
                return res.status(404).json({
                    success: false,
                    message: "Weather alert not found."
                });
            }

            return res.status(200).json({
                success: true,
                data: alert
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ===============================
    // Update Alert
    // ===============================
    async updateAlert(req, res) {

        try {

            const alert =
                await WeatherAlert.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!alert) {
                return res.status(404).json({
                    success: false,
                    message: "Weather alert not found."
                });
            }

            return res.status(200).json({
                success: true,
                message: "Weather alert updated successfully.",
                data: alert
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ===============================
    // Delete Alert
    // ===============================
    async deleteAlert(req, res) {

        try {

            const alert =
                await WeatherAlert.findByIdAndDelete(
                    req.params.id
                );

            if (!alert) {
                return res.status(404).json({
                    success: false,
                    message: "Weather alert not found."
                });
            }

            return res.status(200).json({
                success: true,
                message: "Weather alert deleted successfully."
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ===============================
    // District Alerts
    // ===============================
    async districtAlerts(req, res) {

        try {

            const alerts =
                await WeatherAlert.find({
                    district: req.params.district
                }).sort({
                    startTime: -1
                });

            return res.status(200).json({
                success: true,
                total: alerts.length,
                data: alerts
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ===============================
    // Alert Type Report
    // ===============================
    async alertTypeReport(req, res) {

        try {

            const report =
                await WeatherAlert.aggregate([
                    {
                        $group: {
                            _id: "$alertType",
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
                data: report
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ===============================
    // District Report
    // ===============================
    async districtReport(req, res) {

        try {

            const report =
                await WeatherAlert.aggregate([
                    {
                        $group: {
                            _id: "$district",
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
                data: report
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ===============================
    // Severity Report
    // ===============================
    async severityReport(req, res) {

        try {

            const report =
                await WeatherAlert.aggregate([
                    {
                        $group: {
                            _id: "$severity",
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
                data: report
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports =
new WeatherController();