const getFormattedError = (message, status) => {
  let error = new Error(message);
  error.status = status;
  return error;
};

const getEndpointError = (message) => ({
  message,
  timestamp: Math.round(Date.now() / 1000),
});

const getEndpointSuccess = (data) => data;

module.exports = {
  getFormattedError,
  getEndpointError,
  getEndpointSuccess,
};
