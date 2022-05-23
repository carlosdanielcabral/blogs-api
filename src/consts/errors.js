const HTTP_STATUS_CODE = require('./httpStatusCode');

const ERRORS = {
  categoryNotFound: {
    code: HTTP_STATUS_CODE.notFound,
    message: '\\"categoryIds\\" not found',
  },
  missingData: {
    code: HTTP_STATUS_CODE.badRequest,
    message: 'Some required fields are missing',
  },
  internalServerError: {
    code: HTTP_STATUS_CODE.internalServerError,
    message: 'Internal server error',
  },
  invalidFields: {
    code: HTTP_STATUS_CODE.badRequest,
    message: 'Invalid fields',
  },
  invalidToken: {
    code: HTTP_STATUS_CODE.unauthorized,
    message: 'Expired or invalid token',
  },
  postNotFound: {
    code: HTTP_STATUS_CODE.notFound,
    message: 'Post does not exist',
  },
  tokenNotFound: {
    code: HTTP_STATUS_CODE.unauthorized,
    message: 'Token not found',
  },
  unauthorizedUser: {
    code: HTTP_STATUS_CODE.unauthorized,
    message: 'Unauthorized user',
  },
  userAlreadyRegistered: {
    code: HTTP_STATUS_CODE.conflict,
    message: 'User already registered',
  },
  userNotFound: {
    code: HTTP_STATUS_CODE.notFound,
    message: 'User does not exist',
  },
};

module.exports = ERRORS;
