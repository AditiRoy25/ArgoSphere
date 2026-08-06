const path = require("path");
const fs = require("fs");
const multer = require("multer");

// ==========================================
// ALLOWED IMAGE TYPES
// ==========================================

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/bmp": "bmp"
};

// ==========================================
// STORAGE
// ==========================================

const storage = multer.diskStorage({

    // ======================================
    // DESTINATION
    // ======================================

    destination: function (
        req,
        file,
        cb
    ) {

        let folder = "others";

        // USER
        if (
            req.baseUrl.includes(
                "/users"
            )
        ) {
            folder = "users";
        }

        // MARKETPLACE
        else if (
            req.baseUrl.includes(
                "/marketplace"
            )
        ) {
            folder = "marketplace";
        }

        // COURSE
        else if (
            req.baseUrl.includes(
                "/courses"
            )
        ) {
            folder = "courses";
        }

        // NGO
        else if (
            req.baseUrl.includes(
                "/ngo"
            )
        ) {
            folder = "ngo";
        }
 else if (
            req.baseUrl.includes(
                "/scheme"
            )
        ) {
            folder = "scheme";
        }

        // VLOG
        else if (
            req.baseUrl.includes(
                "/vlogs"
            )
        ) {
            folder = "vlogs";
        }

        const uploadDirectory =
            path.join(
                __dirname,
                "..",
                "..",
                "uploads",
                folder
            );

        fs.mkdirSync(
            uploadDirectory,
            {
                recursive: true
            }
        );

        cb(
            null,
            uploadDirectory
        );
    },

    // ======================================
    // FILENAME
    // ======================================

    filename: function (
        req,
        file,
        cb
    ) {

        const extension =
            FILE_TYPE_MAP[
                file.mimetype
            ];

        const originalName =
            path
                .parse(
                    file.originalname
                )
                .name
                .trim()
                .replace(
                    /\s+/g,
                    "-"
                )
                .replace(
                    /[^a-zA-Z0-9-_]/g,
                    ""
                );

        const fileName =
            `${originalName}-${Date.now()}.${extension}`;

        cb(
            null,
            fileName
        );
    }
});

// ==========================================
// FILE FILTER
// ==========================================

const fileFilter = (
    req,
    file,
    cb
) => {

    const isValid =
        FILE_TYPE_MAP[
            file.mimetype
        ];

    if (!isValid) {

        return cb(
            new Error(
                "Invalid image type"
            ),
            false
        );
    }

    cb(
        null,
        true
    );
};

// ==========================================
// MULTER
// ==========================================

const UserImage = multer({

    storage,

    fileFilter,

    limits: {
        fileSize:
            5 * 1024 * 1024
    }

});

module.exports = UserImage;