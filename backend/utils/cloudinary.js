import cloudinary from "cloudinary";

const uploadToCloudinary = async (file, type, resourceId) => {
  return new Promise(async (resolve, reject) => {
    cloudinary.v2.config({
      cloud_name: process.env.cloudinaryCloudName,
      api_key: process.env.cloudinaryApiKey,
      api_secret: process.env.cloudinaryApiSecret,
    });

    try {
      if (resourceId) {
        await cloudinary.v2.uploader.destroy(resourceId);
      }
      const uploadedResponse = await cloudinary.v2.uploader.upload(file, {
        resource_type: type,
        folder: "ha_products",
        crop: "scale",
        quality: "auto",
      });
      resolve(uploadedResponse);
    } catch (err) {
      reject(err);
    }
  });
};

const uploadSIngleOrMultiImagesToClodinary = async (files) => {
  const [firstImage, ...others] = files;
  let singleImageRes;
  let otherImagesRes;
  singleImageRes = await uploadToCloudinary(firstImage.path, "image");

  if (files.length > 1) {
    otherImagesRes = await Promise.all(
      others.map(async (file) => {
        return await uploadToCloudinary(file.path, "image");
      })
    );
  }

  return { singleImageRes, otherImagesRes };
};

export { uploadToCloudinary, uploadSIngleOrMultiImagesToClodinary };
