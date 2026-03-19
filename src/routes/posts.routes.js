import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.author_id,
        authors.name AS author_name,
        authors.email AS author_email,
        posts.created_at
      FROM posts
      JOIN authors ON posts.author_id = authors.id
      ORDER BY posts.id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /posts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.author_id,
        authors.name AS author_name,
        authors.email AS author_email,
        posts.created_at
      FROM posts
      JOIN authors ON posts.author_id = authors.id
      WHERE posts.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// POST /posts
router.post('/', async (req, res, next) => {
  try {
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
      return res.status(400).json({
        error: 'title, content y author_id son obligatorios'
      });
    }

    const authorExists = await pool.query(
      'SELECT * FROM authors WHERE id = $1',
      [author_id]
    );

    if (authorExists.rows.length === 0) {
      return res.status(400).json({
        error: 'El author_id no existe'
      });
    }

    const result = await pool.query(
      'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT /posts/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
      return res.status(400).json({
        error: 'title, content y author_id son obligatorios'
      });
    }

    const authorExists = await pool.query(
      'SELECT * FROM authors WHERE id = $1',
      [author_id]
    );

    if (authorExists.rows.length === 0) {
      return res.status(400).json({
        error: 'El author_id no existe'
      });
    }

    const result = await pool.query(
      `UPDATE posts
       SET title = $1, content = $2, author_id = $3
       WHERE id = $4
       RETURNING *`,
      [title, content, author_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE /posts/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    next(error);
  }
});

export default router;