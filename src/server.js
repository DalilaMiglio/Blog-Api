import dotenv from 'dotenv';
import app from './app.js';
import pool from './config.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Base de datos conectada:', result.rows[0]);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error conectando a la base de datos:', error.message);
  }
};

startServer();