import express from 'express';
import { pool } from '../config.js';


const router = express.Router();

// GET /authors
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM authors ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /authors/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM authors WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// POST /authors
router.post('/', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'name y email son obligatorios'
      });
    }

    const result = await pool.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT /authors/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'name y email son obligatorios'
      });
    }

    const result = await pool.query(
      `UPDATE authors
       SET name = $1, email = $2, bio = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, bio || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE /authors/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM authors WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json({ message: 'Autor eliminado correctamente' });
  } catch (error) {
    next(error);
  }
});

export default router;