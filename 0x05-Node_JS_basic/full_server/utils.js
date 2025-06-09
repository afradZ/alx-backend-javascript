import fs from 'fs/promises'; // Use fs.promises for async file operations
import path from 'path'; // To resolve file path correctly

/**
 * Reads the database asynchronously and returns a promise.
 *
 * @param {string} filePath - The path to the database file (CSV).
 * @returns {Promise<Object<string, string[]>>} A promise that resolves with
 * an object where keys are fields (e.g., 'CS', 'SWE') and values are
 * arrays of student first names. Rejects if the file is not accessible.
 */
const readDatabase = (filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get the absolute path if relative path is provided from process.argv
      const absolutePath = path.resolve(process.cwd(), filePath);
      const data = await fs.readFile(absolutePath, { encoding: 'utf8' });

      const lines = data.split('\n').filter(line => line.trim() !== '');
      if (lines.length === 0) {
        return resolve({}); // Resolve with empty object if file is empty or only header
      }

      const headers = lines[0].split(',');
      const firstNameIndex = headers.indexOf('firstname');
      const fieldIndex = headers.indexOf('field');

      if (firstNameIndex === -1 || fieldIndex === -1) {
        return reject(new Error('Invalid CSV format: missing "firstname" or "field" header'));
      }

      const studentsByField = {};

      for (let i = 1; i < lines.length; i += 1) { // Start from 1 to skip header
        const studentData = lines[i].split(',');
        const firstName = studentData[firstNameIndex];
        const field = studentData[fieldIndex];

        if (field) { // Ensure field is not empty
          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstName);
        }
      }
      resolve(studentsByField);
    } catch (error) {
      reject(new Error('Cannot load the database'));
    }
  });
};

export default readDatabase;

