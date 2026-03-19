import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';
import authorsRouter from './routes/authors.routes.js';
import postsRouter from './routes/posts.routes.js';
import swaggerUi from 'swagger-ui-express';
const app = express();
const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);
const swaggerDocs = (req, res, next) => {
  const swaggerDocument = YAML.load(join(_dirname, '../openapi/openapi.yaml'))
   return swaggerUi.setup(swaggerDocument)(req, res, next);
}
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Mini Blog API funcionando'
  });
});

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);
app.use('/openapi', swaggerUi.serve, swaggerDocs);
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