import uuid from "uuid/v1";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  params: {
    Bucket: "ratelink-assets"
  },
  endpoint: process.env.AWS_S3_ENDPOINT
});

export const uploadToS3 = ({ stream, filename }) => {
  return new Promise(async (resolve, reject) => {
    const extension = filename.split(".").pop();
    const key = `profile_images/${uuid()}.${extension}`;

    // Upload to S3
    const response = await s3
      .upload({
        Key: key,
        ACL: "public-read",
        Body: stream
      })
      .promise();

    const fullUrl = response.Location;
    const url = fullUrl.slice(process.env.AWS_S3_ENDPOINT.length);

    resolve(url);
  });
};

export const deletePrevProfileImage = url => {
  return new Promise((resolve, reject) => {
    if (!url) throw new Error("Filename has to be received");

    const filename = url.slice(1);

    s3.deleteObject(
      {
        Key: filename
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};
