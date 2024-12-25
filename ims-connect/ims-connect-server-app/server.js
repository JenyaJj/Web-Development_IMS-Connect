const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

const allowedOrigins = [
    'https://web-development-ims-connect.vercel.app', 
    'https://ims-connect-app.vercel.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Database setup
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }

    // Create users table
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
            console.error('Error creating users table:', err.message);
        }
    });

    // Create ideas table
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
            console.error('Error creating ideas table:', err.message);
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
                        if (err) console.error('Error inserting initial ideas:', err.message);
                    }
                );
            });
        }
    });
});

// Routes for user authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }
    db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Error checking user' });
            }
            if (row) {
                res.json(row);
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    );
});

app.post('/signup', (req, res) => {
    const { name, dob, email, contact, username, password } = req.body;
    if (!name || !dob || !email || !contact || !username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const role = 'user'; // Default role
    db.run(
        `INSERT INTO users (name, dob, email, contact, username, password, role)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, dob, email, contact, username, password, role],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error adding user', details: err.message });
            }
            res.json({ id: this.lastID });
        }
    );
});

// Routes for ideas
app.get('/ideas', (req, res) => {
    db.all('SELECT * FROM ideas', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching ideas' });
        }
        res.json(rows);
    });
});

app.post('/ideas', (req, res) => {
    const { title, description, attachment } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    db.run(
        `INSERT INTO ideas (title, description, attachment) VALUES (?, ?, ?)`,
        [title, description, attachment],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error adding idea', details: err.message });
            }
            res.json({ id: this.lastID });
        }
    );
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
