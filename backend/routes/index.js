const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../utils/errors/NotFoundError');
const { URL_VALIDATE, allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');

router.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      const requestHeaders = req.headers['access-control-request-headers'];
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  return next();
});

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_VALIDATE),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
// роуты, которым авторизация нужна
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Переданы некорректные данные'));
});

module.exports = router;