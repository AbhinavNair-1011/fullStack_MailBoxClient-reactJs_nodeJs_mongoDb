class Helpers {
  static sendSuccess(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({ success: true, message, data });
  }

  static sendCreated(res, data, message = 'Resource created') {
    return res.status(201).json({ success: true, message, data });
  }

  static sendNoContent(res) {
    return res.status(204).end();
  }

  static sendBadRequest(res, message = 'Bad request', error = null) {
    if (error) console.error('Bad Request:', error);
    return res.status(400).json({ success: false, message });
  }

  static sendUnauthorized(res, message = 'Unauthorized') {
    return res.status(401).json({ success: false, message });
  }

  static sendForbidden(res, message = 'Forbidden') {
    return res.status(403).json({ success: false, message });
  }

  static sendNotFound(res, message = 'Not found') {
    return res.status(404).json({ success: false, message });
  }

  static sendConflict(res, message = 'Conflict') {
    return res.status(409).json({ success: false, message });
  }

  static sendValidationError(res, errors, message = 'Validation failed') {
    console.error('Validation Error:', errors);
    return res.status(422).json({ success: false, message, errors });
  }

  static sendServerError(res, message = 'Internal server error', error = null) {
    if (error) console.error('Server Error:', error);
    return res.status(500).json({ success: false, message });
  }

  static sendCustom(res, success, message, data, statusCode) {
    return res.status(statusCode).json({ success, message, data });
  }
}

module.exports = Helpers;