const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      allowed_formats: ["jpg", "png"],
      folder: "movie-project",
    },
  });

  return multer({ storage });
};

export default configureCloudinary;
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = cloudinary;
