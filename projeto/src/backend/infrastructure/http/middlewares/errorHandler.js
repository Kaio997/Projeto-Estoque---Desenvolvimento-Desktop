const { ZodError } = require('zod');

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: err.errors[0].message,
      errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
    });
  }

  const statusCode = err.statusCode || 400;
  const message = err.message || "Ocorreu um erro interno.";

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
}

module.exports = errorHandler;
