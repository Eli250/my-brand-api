import cloudinary from "cloudinary";

export const uploadFile = async (req, res) => {
  let imageUrl = "";
  console.log("Image Uploading...");
  await cloudinary.v2.uploader.upload(req.file.path, (error, image) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      imageUrl = image.url;
    }
  });
  console.log(imageUrl);
  return imageUrl;
};
