const errorMiddlware = (err, _req, res, _next) => {
  if (err.isJoi) return res.status(400).json({ error: { message: err.details[0].message } });

  res.status(err.code).json({ error: { message: err.message } });
};

module.exports = errorMiddlware;
