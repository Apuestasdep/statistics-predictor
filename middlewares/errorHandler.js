const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const errorFormat = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { logErrors, errorFormat };
