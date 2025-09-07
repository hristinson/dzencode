// returnTrue.js

export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ result: true }),
  };
};
