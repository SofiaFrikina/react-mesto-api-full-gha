const SUCCESSFUL_ANSWER = 201;
const URL_VALIDATE = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://sofia.frikina.nomoredomainsrocks.ru',
  'https://sofia.frikina.nomoredomainsrocks.ru',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsOptions = {
  origin: [
    'https://sofia.frikina.nomoredomainsrocks.ru',
    'http://localhost:3000',
    'https://web.postman.co',
  ],
  credentials: true,
};

module.exports = {
  SUCCESSFUL_ANSWER, URL_VALIDATE, allowedCors, DEFAULT_ALLOWED_METHODS, corsOptions,
};
