import bcryptjs from 'bcryptjs';

import awsHandler from './aws.js';
import Model from '../Models/Model.js';

const userSignUp = (req, res, next) => {
  const { name, password, email, imageUrl } = req.body;

  // Check if the email is already taken
  Model.UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Email already taken.' });
      }

      // Proceed with user creation
      const handleUserCreation = (image) => {
        bcryptjs.hash(password, 12).then((hashedPassword) => {
          const newUser = new Model.UserModel({
            name,
            password: hashedPassword,
            email,
            imageUrl: image || imageUrl, // Use either the uploaded image or the provided URL
            userType: 'user',
          });

          newUser
            .save()
            .then((savedUser) =>
              res.status(200).json({
                message: 'Account created successfully.',
                savedUser,
              })
            )
            .catch((err) => {
              res.status(500);
              next(
                new Error(`Unable to create user. Please try later. ${err}`)
              );
            });
        });
      };

      // Handle file upload if present, otherwise proceed with the provided imageUrl
      if (req.file) {
        awsHandler
          .UploadToAws(req.file)
          .then((uploadedImage) => {
            handleUserCreation(uploadedImage);
          })
          .catch((err) => {
            res.status(500);
            next(new Error(`Image upload failed. ${err}`));
          });
      } else {
        handleUserCreation(imageUrl || ''); // Pass imageUrl or an empty string if neither is provided
      }
    })
    .catch((err) => {
      res.status(500);
      next(new Error(err));
    });
};

export default userSignUp;
