import express from 'express';
import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

/**
 * @function useRoutes
 * @description Configures all application routes using an Express Router.
 * @param {import('express').Application} app - The Express application instance.
 * @returns {void}
 */
const useRoutes = (app) => {
  const router = express.Router();

  // Route for the homepage
  router.get('/', AppController.getHomepage);

  // Route for all students
  router.get('/students', StudentsController.getAllStudents);

  // Route for students by major
  router.get('/students/:major', StudentsController.getAllStudentsByMajor);

  // Use the defined router for all incoming requests
  app.use('/', router);
};

export default useRoutes;

