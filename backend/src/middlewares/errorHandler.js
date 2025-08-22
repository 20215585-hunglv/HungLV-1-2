import { ValidationError } from 'express-validation';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: 'Validation failed',
      details: err.details,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};
