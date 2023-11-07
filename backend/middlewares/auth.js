const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AthorizedError = require('../utils/errors/AthorizedError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  let token;
  try {
    token = req.cookies.jwt;
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AthorizedError('Необходима авторизация'));
  }

  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AthorizedError('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
