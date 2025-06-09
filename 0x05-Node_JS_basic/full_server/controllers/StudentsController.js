import readDatabase from '../utils'; // Import the readDatabase function
import path from 'path'; // To resolve file path for process.argv

/**
 * @class StudentsController
 * @description Controller for student-related routes.
 */
class StudentsController {
  /**
   * Retrieves all students and organizes them by field.
   * Displays the count and list of first names for each field.
   * @param {import('express').Request} request - The Express request object.
   * @param {import('express').Response} response - The Express response object.
   * @returns {Promise<void>}
   */
  static async getAllStudents(request, response) {
    // The database path is passed as an argument to server.js
    // We assume it's the second argument in process.argv (index 2)
    const dbPath = process.argv[2];

    if (!dbPath) {
      return response.status(500).send('Cannot load the database: Database path not provided.');
    }

    try {
      const studentsByField = await readDatabase(dbPath);
      let output = 'This is the list of our students\n';

      // Get fields and sort them alphabetically (case-insensitive)
      const fields = Object.keys(studentsByField).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      for (const field of fields) {
        const studentList = studentsByField[field];
        output += `Number of students in ${field}: ${studentList.length}. List: ${studentList.join(', ')}\n`;
      }
      response.status(200).send(output.trim()); // trim to remove trailing newline
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  /**
   * Retrieves students filtered by a specific major.
   * @param {import('express').Request} request - The Express request object.
   * @param {import('express').Response} response - The Express response object.
   * @returns {Promise<void>}
   */
  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    const dbPath = process.argv[2];

    if (!dbPath) {
      return response.status(500).send('Cannot load the database: Database path not provided.');
    }

    // Validate the major parameter
    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const studentsByField = await readDatabase(dbPath);
      const studentList = studentsByField[major];

      if (!studentList || studentList.length === 0) {
        // If the major exists but has no students, or if the major field itself is not found
        return response.status(200).send(`List: `); // Return empty list for consistency
      }

      response.status(200).send(`List: ${studentList.join(', ')}`);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
}

export default StudentsController;

