function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 400;
  const message = err.message || "Ocorreu um erro interno.";

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
}

module.exports = errorHandler;
