const cloudinary = require('cloudinary').v2;
const { Readable } = require("stream");
const crypto = require('crypto');

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

function computeFileHash (fileBuffer) {
    const hash = crypto.createHash('md5');
    hash.update(fileBuffer);
    return hash.digest('hex');
}


// upload buffer file to cloudinary 
async function uploadStreamToCloudinary(buffer, subFolderName, width ) {
    const fileHash = computeFileHash(buffer);
    return new Promise((resolve, reject) => {
        const theTransformStream = cloudinary.uploader.upload_stream(
            { 
                folder: `mern-supermarket/${subFolderName}`,
                width: width,
                public_id: `${fileHash}`,
                overwrite: false,
            },
            (err, result) => {
                // console.log(result);
                if (err) reject(err);
                else resolve(result);
            }
        );
        let str = Readable.from(buffer);
        str.pipe(theTransformStream);  // pipe the readable stream into writable stream
    });
}

async function removeFromCloudinary(picture) {
    return await cloudinary.uploader.destroy(picture.public_id)
}

async function deleteFolderInCloudinary(folderPath) {
    return await cloudinary.api.delete_folder(`mern-supermarket/${folderPath}`);
}


const getCloundinaryThumbnail = (originalUrl) => {
    // Extract the transformation part of the URL (the section after "/upload/")
    const parts = originalUrl.split('/upload/');
    const basePart = parts[0] + '/upload/';
    // Add the transformation parameters to the URL
    const thumbnailUrl = `${basePart}c_thumb,w_100/${parts[1]}`;
    return thumbnailUrl;
}


module.exports = {
    uploadStreamToCloudinary,
    removeFromCloudinary,
    deleteFolderInCloudinary,
    getCloundinaryThumbnail,
};