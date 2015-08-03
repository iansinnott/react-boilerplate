/**
 * @class HttpError
 * @extends Error
 * A simple helper class to allow creating an error with a message and a status.
 */
export default class HttpError extends Error {

  constructor(message, status = 500) {
    if (!message) throw new Error('HttpError requires a message.');
    super(message);
    this.message = message;
    this.status = status;
  }

}
