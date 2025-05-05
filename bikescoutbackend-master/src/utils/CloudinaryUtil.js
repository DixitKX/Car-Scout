const cloudinary = require("cloudinary").v2;

// Configure Cloudinary once at the top
cloudinary.config({
    cloud_name: "dcjl790kt",
    api_key: "446613554825844",
    api_secret: "S1UR6j9L1wAVcy7nW2BbzsjSnAk"
});

const uploadFileToCloudinary = async (file) => {
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
        return cloudinaryResponse;
    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
        throw err; // Throw error for better debugging
    }
};

module.exports = {
    uploadFileToCloudinary
};

