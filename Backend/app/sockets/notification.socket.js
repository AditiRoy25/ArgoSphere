
const Notification =
require("../models/Notification");

module.exports = (io) => {

    io.on(
        "connection",
        (socket) => {

            console.log(
                `User Connected: ${socket.id}`
            );

            // ======================
            // JOIN USER ROOM
            // ======================

            socket.on(

                "join",

                (userId) => {

                    socket.join(
                        userId
                    );

                    console.log(

                        `User Joined Room: ${userId}`

                    );

                }

            );

            // ======================
            // WEATHER ALERT
            // ======================

            socket.on(

                "weatherAlert",

                async (data) => {

                    const {

                        userId,

                        title,

                        message

                    } = data;

                    await Notification
                    .create({

                        user:userId,

                        title,

                        message,

                        type:
                        "weather"

                    });

                    io.to(
                        userId
                    ).emit(

                        "newNotification",

                        {

                            type:
                            "weather",

                            title,

                            message

                        }

                    );

                }

            );

            // ======================
            // CROP REMINDER
            // ======================

            socket.on(

                "cropReminder",

                async (data) => {

                    const {

                        userId,

                        title,

                        message

                    } = data;

                    await Notification
                    .create({

                        user:userId,

                        title,

                        message,

                        type:
                        "crop"

                    });

                    io.to(
                        userId
                    ).emit(

                        "newNotification",

                        {

                            type:
                            "crop",

                            title,

                            message

                        }

                    );

                }

            );

            // ======================
            // ALLOWANCE UPDATE
            // ======================

            socket.on(

                "allowanceUpdate",

                async (data) => {

                    const {

                        userId,

                        title,

                        message

                    } = data;

                    await Notification
                    .create({

                        user:userId,

                        title,

                        message,

                        type:
                        "allowance"

                    });

                    io.to(
                        userId
                    ).emit(

                        "newNotification",

                        {

                            type:
                            "allowance",

                            title,

                            message

                        }

                    );

                }

            );

            // ======================
            // ORDER UPDATE
            // ======================

            socket.on(

                "orderUpdate",

                async (data) => {

                    const {

                        userId,

                        title,

                        message

                    } = data;

                    await Notification
                    .create({

                        user:userId,

                        title,

                        message,

                        type:
                        "order"

                    });

                    io.to(
                        userId
                    ).emit(

                        "newNotification",

                        {

                            type:
                            "order",

                            title,

                            message

                        }

                    );

                }

            );

            // ======================
            // ADMIN BROADCAST
            // ======================

            socket.on(

                "adminBroadcast",

                async (data) => {

                    io.emit(

                        "newNotification",

                        {

                            type:
                            "announcement",

                            title:
                            data.title,

                            message:
                            data.message

                        }

                    );

                }

            );

            // ======================
            // DISCONNECT
            // ======================

            socket.on(

                "disconnect",

                () => {

                    console.log(

                        `Disconnected: ${socket.id}`

                    );

                }

            );

        }

    );

};

