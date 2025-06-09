import express from 'express';
import useRoutes from './routes'; // Import the function to configure routes

const app = express();
const PORT = 1245; // Define the port

// Configure all routes for the application
useRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // Log the database path being used, which is passed as an argument
  console.log(`Using database file: ${process.argv[2] || 'Not specified'}`);
});

export default app;
