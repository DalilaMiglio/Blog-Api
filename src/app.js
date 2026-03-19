import express from 'express';
import cors from 'cors';
import authorsRouter from './routes/authors.routes.js';
import postsRouter from './routes/posts.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Mini Blog API funcionando'
  });
});

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

// ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

// manejo global de errores
app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === '23505') {
    return res.status(400).json({
      error: 'Valor duplicado, probablemente email ya registrado'
    });
  }

  res.status(500).json({
    error: 'Error interno del servidor'
  });
});

export default app;