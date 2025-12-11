// src/db/pool.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'tasksdb',
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'Admin123!', // valeur par défaut pour le dev local
});

module.exports = pool;
