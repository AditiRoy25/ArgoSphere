require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const logger = require("../utils/logger");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


// Check Cloudinary Configuration
if (
  process.env.CLOUD_NAME &&
  process.env.CLOUD_API_KEY &&
  process.env.CLOUD_API_SECRET
) {

  logger.info("Cloudinary config loaded successfully", {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
  });

} else {

  logger.error("Cloudinary config missing", {
    cloud_name: process.env.CLOUD_NAME || "missing",
    api_key: process.env.CLOUD_API_KEY || "missing",
    api_secret: process.env.CLOUD_API_SECRET
      ? "loaded"
      : "missing",
  });

}


// Test Connection
cloudinary.api
  .ping()
  .then((result) => {

    logger.info("Cloudinary Connected", {
      status: result.status,
    });

  })
  .catch((error) => {

    logger.error("Cloudinary Connection Failed", {
      message: error.message,
      http_code: error.http_code,
    });

  });


module.exports = cloudinary;