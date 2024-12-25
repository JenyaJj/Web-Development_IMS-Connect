const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000; 


// CORS configuration
const corsOptions = {
    origin: '*', 
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
        // Create users table if it doesn't exist
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
                console.error('Error creating users table', err.message);
            }
        });

        // Create ideas table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS ideas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                attachment TEXT,
                votes INTEGER DEFAULT 0
            )
        `, (err) => {
            if (err) {
                console.error('Error creating ideas table', err.message);
            } else {
                // Populate ideas table with initial data
                const ideas = [
                    ['Renewable Energy Solutions', 'Exploring innovative methods to harness renewable energy.', 'renewable_energy.pdf', 10],
                    ['Smart Agriculture', 'Leveraging IoT and AI for efficient farming.', 'smart_agriculture.docx', 25],
                    ['Recycling Incentives Program', 'A proposal to encourage recycling through rewards.', null, 15],
                    ['Urban Green Spaces', 'Designing more parks and green areas in urban centers.', 'urban_green_spaces.jpg', 30],
                ];
                ideas.forEach(([title, description, attachment, votes]) => {
                    db.run(`
                        INSERT INTO ideas (title, description, attachment, votes)
                        VALUES (?, ?, ?, ?)`,
                        [title, description, attachment, votes],
                        (err) => {
                            if (err) console.error('Error inserting initial ideas', err.message);
                        }
                    );
                });
            }
        });
    }
});

// Routes for user authentication
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

// Routes for ideas
app.get('/ideas', (req, res) => {
    db.all('SELECT * FROM ideas', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching ideas');
        } else {
            res.json(rows);
        }
    });
});

app.post('/ideas', (req, res) => {
    const { title, description, attachment } = req.body;
    db.run(
        `INSERT INTO ideas (title, description, attachment) VALUES (?, ?, ?)`,
        [title, description, attachment],
        function (err) {
            if (err) {
                res.status(500).send('Error adding idea');
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
