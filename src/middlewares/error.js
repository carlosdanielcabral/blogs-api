const errorMiddlware = (err, _req, res, _next) => {
  console.log(err);
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (!err.error || !err.error.code) return res.status(500).json({ message: 'Internal Server Error' })

  const { code, message } = err.error;  

  res.status(code).json({ message });
};

module.exports = errorMiddlware;
