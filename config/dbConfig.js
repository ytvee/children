const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'clinic_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Database connected!');
    }
});

module.exports = db;
