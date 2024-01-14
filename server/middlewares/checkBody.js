const checkBody = function (req, res, next) {
  if (!req.body)
    return res.status(404).json({
      error: true,
      statusCode: 404,
      status: 'bad request',
      message: 'invalid body',
    });
  next();
};

module.exports = checkBody;
