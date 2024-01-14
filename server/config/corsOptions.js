const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    whitelist.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error('not allowed by cors'));
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
