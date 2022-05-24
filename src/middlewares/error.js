const errorMiddlware = (err, _req, res, _next) => {
  console.log(err.error);
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const { code, message } = err.error;

  res.status(code).json({ message });
};

module.exports = errorMiddlware;
