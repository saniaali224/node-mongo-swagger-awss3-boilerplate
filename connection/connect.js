import chalk from 'chalk';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { cyan, yellow, red } = chalk;

const connected = cyan;
const error = yellow;
const disconnected = red;

const Connect = () => {
  mongoose.connect(process.env.DB_URI, {});

  mongoose.connection.on('connected', () => {
    console.log(
      connected(`Mongoose default connection is open to ${process.env.DB_URI}`)
    );
  });

  mongoose.connection.on('error', (err) => {
    console.log(error(`Mongoose default connection has occurred ${err} error`));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });
};

export default Connect;
