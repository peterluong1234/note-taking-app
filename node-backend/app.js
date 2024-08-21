const express = require('express');
const initDatabase = require('./db/init');
const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Database connection
initDatabase();

// Routes
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});