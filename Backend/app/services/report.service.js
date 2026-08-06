
const User =
require("../models/User");

const Farm =
require("../models/Farm");

const MarketplaceOrder =
require(
"../models/MarketplaceOrder"
);

class ReportService {

    async dashboardReport(){

        const [

            users,

            farms,

            orders

        ] = await Promise.all([

            User.countDocuments(),

            Farm.countDocuments(),

            MarketplaceOrder
            .countDocuments()

        ]);

        return {

            users,

            farms,

            orders

        };

    }

    async farmerGrowth(){

        return await User
        .aggregate([

            {
                $match:{
                    role:
                    "farmer"
                }
            },

            {
                $group:{

                    _id:{

                        month:{
                            $month:
                            "$createdAt"
                        }

                    },

                    total:{
                        $sum:1
                    }

                }
            }

        ]);

    }

}

module.exports =
new ReportService();

