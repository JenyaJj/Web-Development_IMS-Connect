const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000; 

// app.use(cors());
// app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins, or specify your client URL like 'https://yourclienturl.com'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    // Add the Access-Control-Allow-Private-Network header to the response
    credentials: true,
};

app.use(cors(corsOptions)); // Use the CORS middleware with options
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                dob TEXT,
                email TEXT,
                contact TEXT,
                username TEXT UNIQUE,
                password TEXT,
                role TEXT
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            }
        });
    }
});

// Routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, row) => {
            if (err) {
                res.status(500).send('Error checking user');
            } else if (row) {
                res.json(row);
            } else {
                res.status(401).send('Invalid credentials');
            }
        }
    );
});

app.post('/signup', (req, res) => {
    const { name, dob, email, contact, username, password } = req.body;
    const role = 'user'; // Default role
    db.run(
        `INSERT INTO users (name, dob, email, contact, username, password, role)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, dob, email, contact, username, password, role],
        function (err) {
            if (err) {
                res.status(500).send('Error adding user');
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

app.put('/update-user', (req, res) => {
    const { id, email, contact } = req.body;

    if (!id || !email || !contact) {
        return res.status(400).send('ID, email, and contact are required');
    }

    db.run(
        'UPDATE users SET email = ?, contact = ? WHERE id = ?',
        [email, contact, id],
        function (err) {
            if (err) {
                console.error('Error updating user:', err.message);
                return res.status(500).send('Error updating user');
            }

            if (this.changes === 0) {
                return res.status(404).send('User not found');
            }

            res.send('User updated successfully');
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
