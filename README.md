# Mini Blog API
Este proyecto es una API REST desarrollada con Node.js, Express y PostgreSQL. Permite gestionar autores y publicaciones (posts), incluyendo operaciones CRUD completas.
## Descripción
La API permite:
- Crear, listar, actualizar y eliminar autores
- Crear, listar, actualizar y eliminar posts
- Relacionar posts con autores mediante una clave foránea
El proyecto está conectado a una base de datos PostgreSQL desplegada en Railway.
---
## Tecnologías utilizadas
- Node.js
- Express
- PostgreSQL
- Railway (deploy)
- Jest + Supertest (tests)
- OpenAPI (documentación)
---
## Instalación y ejecución local
### 1. Clonar el repositorio
```bash
git clone TU_LINK_AQUI
cd mini-blog-api
#Instalar dependencias
Npm install
#Configurar variables  de entorno
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
También se incluye .env.example como guía.
4. Crear base de datos
Ejecutar en psql:
\i db/setup.sql
\i db/seed.sql
5. Ejecutar servidor
npm run dev
Servidor disponible en:
http://localhost:3000
Endpoints

Authors
	•	GET /api/authors
	•	GET /api/authors/:id
	•	POST /api/authors
	•	PUT /api/authors/:id
	•	DELETE /api/authors/:id

Posts
	•	GET /api/posts
	•	GET /api/posts/:id
	•	POST /api/posts
	•	PUT /api/posts/:id
	•	DELETE /api/posts/:id
Tests
Para ejecutar los tests:
npm test
Se utilizan Jest y Supertest para validar endpoints principales.
Documentación OpenAPI
El archivo openapi.yaml contiene la documentación de la API.
Se puede visualizar usando click derecho Preview Swagger
Uso de Inteligencia Artificial
Durante el desarrollo utilice IA como apoyo para:
	•	Generación inicial de estructura del proyecto
	•	Resolución de errores específicos (conexión a base de datos, configuración de tests)
	•	Ejemplos de implementación de endpoints
Todo el código fue revisado, entendido y adaptado manualmente.