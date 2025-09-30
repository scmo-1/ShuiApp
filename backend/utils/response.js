export const response = (statusCode, message, data = null) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message,
      data,
    }),
  };
};
