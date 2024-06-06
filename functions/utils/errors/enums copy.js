export const AppErrors = {
  ROUTING_ERROR: {
    message: 'Routing Error',
    cause: 'The requested route is not valid.',
    code: 404,
  },
  INVALID_TYPES_ERROR: {
    message: 'Invalid Types Error',
    cause: 'Some of the provided data has incorrect types.',
    code: 400,
  },
  DATABASE_ERROR: {
    message: 'Database Error',
    cause: 'There was an issue with the database operation.',
    code: 500,
  },
  AUTHENTICATION_ERROR: {
    message: 'Authentication Error',
    cause: 'Authentication failed or user is not authorized.',
    code: 401,
  },
  FORBIDDEN_ERROR: {
    message: 'Forbidden Error',
    cause: 'The client does not have the necessary permissions for certain content.',
    code: 403,
  },
  PRODUCT_NOT_FOUND: {
    message: 'Product Not Found',
    cause: 'The requested product was not found in the system.',
    code: 404,
  },
  SERVICE_NOT_FOUND: {
    message: 'Service Not Found',
    cause: 'The requested service was not found in the system.',
    code: 404,
  },
  PERMISSION_ERROR: {
    message: 'Permission Error',
    cause: 'The user does not have the necessary permissions.',
    code: 403,
  },
  NETWORK_ERROR: {
    message: 'Network Error',
    cause: 'There was an issue with the network connection.',
    code: 500,
  },
  PRODUCT_ALREADY_EXISTS: {
    message: 'Product Already Exists',
    cause: 'A product with the same information already exists.',
    code: 409,
  },
  USER_CREATION_ERROR: {
    message: 'User Creation Error',
    cause: 'There was an error while creating a user.',
    code: 500,
  },
  PRODUCT_CREATION_ERROR: {
    message: 'Product Creation Error',
    cause: 'There was an error while creating a product.',
    code: 500,
  },
  CLIENT_NOT_FOUND: {
    message: 'Client Not Found',
    cause: 'The requested client was not found in the system.',
    code: 404,
  },
  EMPLOYEE_NOT_FOUND: {
    message: 'Employee Not Found',
    cause: 'The requested employee was not found in the system.',
    code: 404,
  },
  SESSION_START_ERROR: {
    message: 'Session Start Error',
    cause: 'Failed to start a new session.',
    code: 500,
  },
  SESSION_END_ERROR: {
    message: 'Session End Error',
    cause: 'Failed to end the current session.',
    code: 500,
  },
}
