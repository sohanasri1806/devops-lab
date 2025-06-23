const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1234',
    database: 'event_registration'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/register', (req, res) => {
    const { name, email, phone, event } = req.body;
    if (!name || !email || !phone || !event) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const sql = 'INSERT INTO registrations (name, email, phone, event) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, event], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error.' });
        }
        res.json({ message: 'Registration successful!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
