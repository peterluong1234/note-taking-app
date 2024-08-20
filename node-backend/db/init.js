const db = require('./connection');

const initDatabase = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    )
  `;

  const createNotesTable = `
  CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        deleted INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  db.query(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created or already exists');
    }
  });

  db.query(createNotesTable, (err) => {
    if (err) {
      console.error('Error creating notes table:', err);
    } else {
      console.log('Notes table created or already exists');
    }
  });

  // Add more table creation queries as needed
};

module.exports = initDatabase;