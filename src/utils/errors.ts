export default {
  invalidBodyResponse: {
    statusCode: 400,
    body: { error: 'Has no data in request body' },
  },
  notFoundResponse: {
    statusCode: 404,
    body: { error: 'Object not found' },
  },
};
