/* eslint-disable func-names */
/* eslint-disable no-undef */
import AWS from 'aws-sdk';

import config from '../config/config.js';

const UploadToAws = (file) => {
  const s3bucket = new AWS.S3({
    accessKeyId: config.MY_AWS_ACCESS_KEY,
    secretAccessKey: config.MY_AWS_SECRET_ACCESS_KEY,
    Bucket: config.S3_AWS_BUCKET,
  });

  return new Promise((resolve, reject) => {
    s3bucket.createBucket(() => {
      const params = {
        Bucket: config.AWS_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        ACL: 'public-read',
      };
      s3bucket.upload(params, (err, data) => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`Could'nt upload Files!!!!! ${err}`);
        } else {
          resolve(data.Location);
        }
      });
    });
  });
};

export default { UploadToAws };
