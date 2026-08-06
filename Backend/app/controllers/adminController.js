const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const User = require("../models/User");
const NGO = require("../models/NGO");
const Farm = require("../models/Farm");
const MarketplaceOrder =
  require("../models/MarketplaceOrder");

class AdminController {
  // ==================================================
  // DASHBOARD
  // GET /api/v1/admin/dashboard
  // ==================================================

  async dashboard(req, res) {

    try {

        const [
            userStats,
            totalNGOs,
            totalFarms,
            totalOrders,
            recentUsers
        ] =
        await Promise.all([

            // ==========================
            // USERS BY ROLE
            // ==========================

            User.aggregate([
                {
                    $group: {
                        _id: "$role",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]),

            // ==========================
            // NGO COUNT
            // ==========================

            NGO.countDocuments(),

            // ==========================
            // FARM COUNT
            // ==========================

            Farm.countDocuments(),

            // ==========================
            // MARKETPLACE ORDERS
            // ==========================

            MarketplaceOrder
                .countDocuments(),

            // ==========================
            // RECENT USERS
            // ==========================

            User.find()
                .select(
                    "name email phone role image isVerified isBlocked createdAt"
                )
                .sort({
                    createdAt: -1
                })
                .limit(5)
                .lean()
        ]);


        // ==========================
        // ROLE COUNTS
        // ==========================

        const roleCounts = {

            farmer: 0,

            ngo: 0,

            officer: 0,

            ministry: 0,

            admin: 0

        };


        let totalUsers = 0;


        userStats.forEach(
            (item) => {

                totalUsers +=
                    item.count;


                if (
                    Object.prototype
                        .hasOwnProperty
                        .call(
                            roleCounts,
                            item._id
                        )
                ) {

                    roleCounts[
                        item._id
                    ] =
                        item.count;

                }

            }
        );


        // ==========================
        // RESPONSE
        // ==========================

        return res
            .status(200)
            .json({

                success: true,

                message:
                    "Dashboard Data Retrieved Successfully",

                data: {

                    stats: {

                        totalUsers,

                        totalFarmers:
                            roleCounts.farmer,

                        totalNGOs,

                        totalFarms,

                        totalOrders

                    },


                    // ==================
                    // USER GROWTH
                    // ==================

                    userGrowth: [],


                    // ==================
                    // ROLE DISTRIBUTION
                    // ==================

                    roleDistribution: [

                        {
                            name:
                                "Farmers",

                            value:
                                roleCounts
                                    .farmer
                        },

                        {
                            name:
                                "NGOs",

                            value:
                                roleCounts
                                    .ngo
                        },

                        {
                            name:
                                "Officers",

                            value:
                                roleCounts
                                    .officer
                        },

                        {
                            name:
                                "Ministry",

                            value:
                                roleCounts
                                    .ministry
                        },

                        {
                            name:
                                "Admin",

                            value:
                                roleCounts
                                    .admin
                        }

                    ],


                    // ==================
                    // MARKETPLACE
                    // ==================

                    marketplace: {

                        totalOrders

                    },


                    // ==================
                    // RECENT USERS
                    // ==================

                    recentUsers,


                    alerts: [],

                    activities: []

                }

            });

    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );


        return res
            .status(500)
            .json({

                success: false,

                message:
                    error.message ||
                    "Failed to load dashboard"

            });

    }

}

  // ==================================================
  // CREATE USER
  // POST /api/v1/admin/users
  // ==================================================

  // async createUser(req, res) {
  //   try {
  //     const {
  //       name,
  //       email,
  //       phone,
  //       password,
  //       role,
  //       gender,
  //       address,
  //       district,
  //       state,
  //     } = req.body;

  //     // ------------------------------------------
  //     // Required Fields
  //     // ------------------------------------------

  //     if (
  //       !name ||
  //       !email ||
  //       !phone ||
  //       !password
  //     ) {
  //       return res.status(400).json({
  //         success: false,

  //         message:
  //           "Name, email, phone and password are required",
  //       });
  //     }

  //     // ------------------------------------------
  //     // Normalize Email
  //     // ------------------------------------------

  //     const normalizedEmail =
  //       email
  //         .toLowerCase()
  //         .trim();

  //     // ------------------------------------------
  //     // Existing User
  //     // ------------------------------------------

  //     const existingUser =
  //       await User.findOne({
  //         email: normalizedEmail,
  //       });

  //     if (existingUser) {
  //       return res.status(409).json({
  //         success: false,

  //         message:
  //           "User already exists with this email",
  //       });
  //     }

  //     // ------------------------------------------
  //     // Role Validation
  //     // ------------------------------------------

  //     const allowedRoles = [
  //       "farmer",
  //       "ngo",
  //       "officer",
  //       "ministry",
  //       "admin",
  //     ];

  //     const userRole =
  //       role
  //         ?.trim()
  //         .toLowerCase() ||
  //       "farmer";

  //     if (
  //       !allowedRoles.includes(
  //         userRole
  //       )
  //     ) {
  //       return res.status(400).json({
  //         success: false,

  //         message:
  //           "Invalid user role",
  //       });
  //     }

  //     // ------------------------------------------
  //     // Gender Validation
  //     // ------------------------------------------

  //     const allowedGenders = [
  //       "male",
  //       "female",
  //       "other",
  //     ];

  //     let userGender;

  //     if (gender) {
  //       userGender =
  //         gender
  //           .trim()
  //           .toLowerCase();

  //       if (
  //         !allowedGenders.includes(
  //           userGender
  //         )
  //       ) {
  //         return res.status(400).json({
  //           success: false,

  //           message:
  //             "Invalid gender",
  //         });
  //       }
  //     }

  //     // ------------------------------------------
  //     // Hash Password
  //     // ------------------------------------------

  //     const hashedPassword =
  //       await bcrypt.hash(
  //         password,
  //         12
  //       );

  //     // ------------------------------------------
  //     // Image
  //     // ------------------------------------------

  //     let image = "";

  //     if (req.file) {
  //       image =
  //         req.file.path ||
  //         req.file.filename ||
  //         "";
  //     }

  //     // ------------------------------------------
  //     // Create User
  //     // ------------------------------------------

  //     const user =
  //       await User.create({
  //         name:
  //           name,

  //         email:
  //           normalizedEmail,

  //         phone:
  //           phone.trim(),

  //         password:
  //           hashedPassword,

  //         role:
  //           userRole,

  //         gender:
  //           userGender,

  //         address:
  //           address?.trim() ||
  //           "",

  //         district:
  //           district?.trim() ||
  //           "",

  //         state:
  //           state?.trim() ||
  //           "",

  //         image,

  //         isVerified: true,

  //         isBlocked: false,
  //       });

  //     // ------------------------------------------
  //     // Get Safe User
  //     // ------------------------------------------

  //     const createdUser =
  //       await User.findById(
  //         user._id
  //       )
  //         .select("-password")
  //         .lean();

  //     return res.status(201).json({
  //       success: true,

  //       message:
  //         "User Created Successfully",

  //       data:
  //         createdUser,
  //     });
  //   } catch (error) {
  //     console.error(
  //       "Create User Error:",
  //       error
  //     );

  //     // Mongo duplicate error
  //     if (error.code === 11000) {
  //       return res.status(409).json({
  //         success: false,

  //         message:
  //           "User already exists",
  //       });
  //     }

  //     return res.status(500).json({
  //       success: false,

  //       message:
  //         error.message ||
  //         "Failed to create user",
  //     });
  //   }
  // }

  async createUser(
    req,
    res
  ) {
    try {

      console.log(
        "BODY:",
        req.body
      );

      console.log(
        "FILE:",
        req.file
      );

      const {
        name,
        email,
        phone,
        password,
        role,
        gender,
        address,
        district,
        state,
      } = req.body;

      // =========================
      // VALIDATION
      // =========================

      if (
        !name ||
        !email ||
        !phone ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Name, email, phone and password are required",
          });
      }

      // =========================
      // EXISTING USER
      // =========================

      const existingUser =
        await User.findOne({
          email:
            email
              .toLowerCase()
              .trim(),
        });

      if (existingUser) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "User already exists",
          });
      }

      // =========================
      // PASSWORD
      // =========================

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // =========================
      // IMAGE
      // THIS IS IMPORTANT
      // =========================

      let image = "";

      if (req.file) {
        image =
          `/uploads/users/${req.file.filename}`;
      }

      console.log(
        "IMAGE PATH:",
        image
      );

      // =========================
      // CREATE USER
      // =========================

      const user =
        await User.create({
          name,

          email:
            email
              .toLowerCase()
              .trim(),

          phone,

          password:
            hashedPassword,

          role:
            role || "farmer",

          gender:
            gender || undefined,

          address:
            address || "",

          district:
            district || "",

          state:
            state || "",

          // IMPORTANT
          image,

          isVerified: true,

          isBlocked: false,
        });

      // =========================
      // GET USER WITHOUT PASSWORD
      // =========================

      const createdUser =
        await User
          .findById(
            user._id
          )
          .select(
            "-password"
          );

      return res
        .status(201)
        .json({
          success: true,

          message:
            "User created successfully",

          data:
            createdUser,
        });

    } catch (error) {

      console.error(
        "CREATE USER ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  }



  // ==================================================
  // GET ALL USERS
  // GET /api/v1/admin/users
  // ==================================================

  async getUsers(req, res) {
    try {
      const page =
        Math.max(
          Number(
            req.query.page
          ) || 1,
          1
        );

      const limit =
        Math.max(
          Number(
            req.query.limit
          ) || 10,
          1
        );

      const skip =
        (page - 1) *
        limit;

      const filter = {};

      // ------------------------------------------
      // Role Filter
      // ------------------------------------------

      if (req.query.role) {
        filter.role =
          req.query.role;
      }

      // ------------------------------------------
      // Search
      // ------------------------------------------

      if (
        req.query.search &&
        req.query.search.trim()
      ) {
        const search =
          req.query.search.trim();

        filter.$or = [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },

          {
            email: {
              $regex: search,
              $options: "i",
            },
          },

          {
            phone: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      // ------------------------------------------
      // Block Filter
      // ------------------------------------------

      if (
        req.query.isBlocked !==
          undefined &&
        req.query.isBlocked !==
          ""
      ) {
        filter.isBlocked =
          req.query.isBlocked ===
          "true";
      }

      // ------------------------------------------
      // Database
      // ------------------------------------------

      const [users, total] =
        await Promise.all([
          User.find(filter)
            .select("-password")
            .sort({
              createdAt: -1,
            })
            .skip(skip)
            .limit(limit)
            .lean(),

          User.countDocuments(
            filter
          ),
        ]);

      return res.status(200).json({
        success: true,

        message:
          "Users Retrieved Successfully",

        data: users,

        pagination: {
          page,

          limit,

          total,

          totalPages:
            Math.ceil(
              total / limit
            ),
        },
      });
    } catch (error) {
      console.error(
        "Get Users Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to retrieve users",
      });
    }
  }

  // ==================================================
  // GET SINGLE USER
  // GET /api/v1/admin/users/:id
  // ==================================================

  async getUser(req, res) {
    try {
      const { id } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid User ID",
        });
      }

      const user =
        await User.findById(
          id
        )
          .select("-password")
          .lean();

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User Not Found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "User Retrieved Successfully",

        data: user,
      });
    } catch (error) {
      console.error(
        "Get User Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to retrieve user",
      });
    }
  }

  // ==================================================
  // UPDATE USER
  // PUT /api/v1/admin/users/:id
  // ==================================================

async updateUser(req, res) {
  try {

    const { id } =
      req.params;

    // ==================================
    // VALIDATE ID
    // ==================================

    if (
      !mongoose.Types.ObjectId
        .isValid(id)
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid User ID",
        });
    }

    // ==================================
    // FIND USER
    // ==================================

    const user =
      await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "User not found",
        });
    }

    console.log(
      "UPDATE BODY:",
      req.body
    );

    console.log(
      "UPDATE FILE:",
      req.file
    );

    const {
      name,
      email,
      phone,
      role,
      gender,
      address,
      district,
      state,
    } = req.body;

    // ==================================
    // CHECK DUPLICATE EMAIL
    // ==================================

    if (
      email &&
      email.toLowerCase() !==
        user.email.toLowerCase()
    ) {

      const existingUser =
        await User.findOne({
          email:
            email
              .toLowerCase()
              .trim(),

          _id: {
            $ne: id,
          },
        });

      if (existingUser) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "Email already exists",
          });
      }
    }

    // ==================================
    // UPDATE BASIC DATA
    // ==================================

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email =
        email
          .toLowerCase()
          .trim();
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (gender !== undefined) {
      user.gender = gender;
    }

    if (address !== undefined) {
      user.address = address;
    }

    if (district !== undefined) {
      user.district =
        district;
    }

    if (state !== undefined) {
      user.state = state;
    }

    // ==================================
    // UPDATE IMAGE
    // ==================================

    if (req.file) {
      user.image =
        `/uploads/users/${req.file.filename}`;
    }

    // ==================================
    // SAVE
    // ==================================

    await user.save();

    const updatedUser =
      await User
        .findById(id)
        .select("-password");

    return res
      .status(200)
      .json({
        success: true,

        message:
          "User updated successfully",

        data:
          updatedUser,
      });

  } catch (error) {

    console.error(
      "UPDATE USER ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          error.message,
      });
  }
}
  // ==================================================
  // DELETE USER
  // DELETE /api/v1/admin/users/:id
  // ==================================================

  // async deleteUser(req, res) {
  //   try {
  //     const { id } =
  //       req.params;

  //     if (
  //       !mongoose.Types.ObjectId.isValid(
  //         id
  //       )
  //     ) {
  //       return res.status(400).json({
  //         success: false,

  //         message:
  //           "Invalid User ID",
  //       });
  //     }

  //     const user =
  //       await User.findByIdAndDelete(
  //         id
  //       );

  //     if (!user) {
  //       return res.status(404).json({
  //         success: false,

  //         message:
  //           "User Not Found",
  //       });
  //     }

  //     return res.status(200).json({
  //       success: true,

  //       message:
  //         "User Deleted Successfully",
  //     });
  //   } catch (error) {
  //     console.error(
  //       "Delete User Error:",
  //       error
  //     );

  //     return res.status(500).json({
  //       success: false,

  //       message:
  //         error.message ||
  //         "Failed to delete user",
  //     });
  //   }
  // }

  async deleteUser(req, res) {
  try {

    const { id } =
      req.params;

    // ==================================
    // VALIDATE ID
    // ==================================

    if (
      !mongoose.Types.ObjectId
        .isValid(id)
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid User ID",
        });
    }

    // ==================================
    // FIND USER
    // ==================================

    const user =
      await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "User not found",
        });
    }

    // ==================================
    // DELETE IMAGE
    // ==================================

    if (user.image) {

      const relativePath =
        user.image.replace(
          /^\/+/,
          ""
        );

      const imagePath =
        path.join(
          __dirname,
          "..",
          "..",
          relativePath
        );

      if (
        fs.existsSync(
          imagePath
        )
      ) {
        fs.unlinkSync(
          imagePath
        );
      }
    }

    // ==================================
    // DELETE USER
    // ==================================

    await User.findByIdAndDelete(
      id
    );

    return res
      .status(200)
      .json({
        success: true,

        message:
          "User deleted successfully",
      });

  } catch (error) {

    console.error(
      "DELETE USER ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          error.message,
      });
  }
}
  // ==================================================
  // UPDATE USER ROLE
  // PUT /api/v1/admin/users/:id/role
  // ==================================================

  async updateUserRole(
    req,
    res
  ) {
    try {
      const { id } =
        req.params;

      const { role } =
        req.body;

      const allowedRoles = [
        "farmer",
        "ngo",
        "officer",
        "ministry",
        "admin",
      ];

      if (
        !allowedRoles.includes(
          role
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid Role",
        });
      }

      const user =
        await User.findByIdAndUpdate(
          id,

          {
            role,
          },

          {
            new: true,
            runValidators: true,
          }
        )
          .select("-password")
          .lean();

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User Not Found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "Role Updated Successfully",

        data: user,
      });
    } catch (error) {
      console.error(
        "Update Role Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  }

  // ==================================================
  // BLOCK USER
  // PATCH /api/v1/admin/users/:id/block
  // ==================================================

  async blockUser(req, res) {
    try {
      const user =
        await User.findByIdAndUpdate(
          req.params.id,

          {
            isBlocked: true,
          },

          {
            new: true,
          }
        )
          .select("-password")
          .lean();

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User Not Found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "User Blocked Successfully",

        data: user,
      });
    } catch (error) {
      console.error(
        "Block User Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  }

  // ==================================================
  // UNBLOCK USER
  // PATCH /api/v1/admin/users/:id/unblock
  // ==================================================

  async unblockUser(
    req,
    res
  ) {
    try {
      const user =
        await User.findByIdAndUpdate(
          req.params.id,

          {
            isBlocked: false,
          },

          {
            new: true,
          }
        )
          .select("-password")
          .lean();

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User Not Found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "User Unblocked Successfully",

        data: user,
      });
    } catch (error) {
      console.error(
        "Unblock User Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  }

  async blockNGO(req, res) {
    try {
      const ngo = await NGO.findByIdAndUpdate(
        req.params.id,
        { isBlocked: true },
        { new: true }
      ).lean();
      if (!ngo) return res.status(404).json({ success: false, message: "NGO Not Found" });
      return res.json({ success: true, data: ngo });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async unblockNGO(req, res) {
    try {
      const ngo = await NGO.findByIdAndUpdate(
        req.params.id,
        { isBlocked: false },
        { new: true }
      ).lean();
      if (!ngo) return res.status(404).json({ success: false, message: "NGO Not Found" });
      return res.json({ success: true, data: ngo });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // ==================================================
  // VERIFY NGO
  // PATCH /api/v1/admin/ngo/:id/verify
  // ==================================================

  async verifyNGO(req, res) {
    try {
      const ngo =
        await NGO.findByIdAndUpdate(
          req.params.id,

          {
            ministryApproval: true,
          },

          {
            new: true,
          }
        ).lean();

      if (!ngo) {
        return res.status(404).json({
          success: false,

          message:
            "NGO Not Found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "NGO Verified Successfully",

        data: ngo,
      });
    } catch (error) {
      console.error(
        "Verify NGO Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  }

  // ==================================================
  // SYSTEM ANALYTICS
  // GET /api/v1/admin/analytics
  // ==================================================

  async systemAnalytics(
    req,
    res
  ) {
    try {
      const analytics =
        await User.aggregate([
          {
            $group: {
              _id: "$role",

              total: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              total: -1,
            },
          },
        ]);

      return res.status(200).json({
        success: true,

        message:
          "System Analytics Retrieved Successfully",

        data: analytics,
      });
    } catch (error) {
      console.error(
        "Analytics Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  }
}

module.exports =
  new AdminController();
