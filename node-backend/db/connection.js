const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'pluong1234',
  password: '!Chocolat1',
  database: 'notes'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;