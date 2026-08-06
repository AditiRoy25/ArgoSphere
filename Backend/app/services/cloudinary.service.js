
const cloudinary =
require("cloudinary")
.v2;

cloudinary.config({

    cloud_name:
    process.env
    .CLOUDINARY_NAME,

    api_key:
    process.env
    .CLOUDINARY_KEY,

    api_secret:
    process.env
    .CLOUDINARY_SECRET

});

class CloudinaryService {

    async uploadFile(
        filePath,
        folder
    ){

        const result =
        await cloudinary
        .uploader
        .upload(

            filePath,

            {
                folder
            }

        );

        return {

            url:
            result.secure_url,

            public_id:
            result.public_id

        };

    }

    async deleteFile(
        public_id
    ){

        return await cloudinary
        .uploader
        .destroy(
            public_id
        );

    }

}

module.exports =
new CloudinaryService();

