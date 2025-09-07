// returnTrue.js
import dotenv from "dotenv";
dotenv.config();

export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ result: process.env.MONGODB_URI }),
  };
};
