/**
 * @class AppController
 * @description Controller for general application routes.
 */
class AppController {
  /**
   * Handles the request for the homepage.
   * @param {import('express').Request} request - The Express request object.
   * @param {import('express').Response} response - The Express response object.
   * @returns {void}
   */
  static getHomepage(request, response) {
    response.status(200).send('Hello ALX!');
  }
}

export default AppController;

