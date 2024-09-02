import dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

// Export the environment variables as a config object
const config = {
  port: process.env.PORT || 5000,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  awsAccessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  s3BucketName: process.env.S3_BUCKET_NAME,
};

export default config;
