// src/index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db/pool')

const app = express();
// Port configuré par variable d'environnement ou défaut 3000
const PORT = process.env.PORT || 3000;

// Middleware pour parser du JSON
app.use(express.json());

// CORS simple (adapter si besoin)
app.use(cors({
  origin: '*',
}));

// Healthcheck : teste aussi la DB
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'up' });
  } catch (err) {
    console.error('Erreur DB health:', err);
    res.status(500).json({ status: 'error', db: 'down' });
  }
});



// Petites données en mémoire pour tester
let tasks = [
  { id: 1, title: 'Exemple de tâche', completed: false },
];

// GET /api/tasks → lit en base
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, completed FROM tasks ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur GET /api/tasks:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/tasks → insère en base
app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'title requis' });
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING id, title, completed',
      [title.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur POST /api/tasks:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
