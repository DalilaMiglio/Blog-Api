import request from 'supertest';
import app from '../src/app.js';

describe('Posts endpoints', () => {
  test('GET /posts debe responder 200', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
  });

  test('GET /posts/99999 debe responder 404 si no existe', async () => {
    const res = await request(app).get('/posts/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /posts debe responder 400 si faltan campos', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Hola'
    });
    expect(res.statusCode).toBe(400);
  });
});