require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const corsParams = {
  origin: ['localhost:3000',
    'localhost:3001',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://sofia.frikina.nomoredomainsrocks.ru',
    'https://sofia.frikina.nomoredomainsrocks.ru',
    'http://api.sofia.frikina.nomoredomainsrocks.ru',
    'https://api.sofia.frikina.nomoredomainsrocks.ru'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsParams));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

// подключаемся к серверу mongo
mongoose.connect(DB_URL);

// подключаем мидлвары, роуты и всё остальное...

app.use(router);
app.use(errors());
app.use(errorLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(err.statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
