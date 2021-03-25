const packJson = require('../package.json');
const sequelize = require('../config/config.json');

// [GET] ../dev/config
exports.getConfig = (req, res, next) => {
  return res.status(200).json({ packJson });
};

// [GET] ../dev/version
exports.getVersion = (req, res, next) => {
  return res.status(200).json({ 'Book Exchange App - version': packJson.version });
};

// [GET] ../dev/seq
exports.seq = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize Connection established');
    res.status(200).json('Sequelize Connection established');
    next();
  } catch (error) {
    next(error);
  }
};