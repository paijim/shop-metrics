const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de la connexion à PostgreSQL via les variables d'environnement
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'secretpw',
  database: process.env.DB_NAME || 'shopmetrics',
  port: 5432,
});

app.get('/api/metrics', async (req, res) => {
  try {
    // Interrogation de la base de données pour tester la liaison et la persistance
    const dbResult = await pool.query('SELECT NOW()');
    
    res.json({
      status: 'success',
      data: {
        activeUsers: 1420,
        salesToday: '3,450 €',
        serverLoad: '42%',
        dbTime: dbResult.rows[0].now
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Erreur de connexion à la base de données' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});