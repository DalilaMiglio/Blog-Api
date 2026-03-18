import request from 'supertest';
import app from '../src/app.js';

describe('Authors endpoints', () => {
  test('GET /authors debe responder 200', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
  });

  test('GET /authors/99999 debe responder 404 si no existe', async () => {
    const res = await request(app).get('/authors/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /authors debe responder 400 si faltan campos', async () => {
    const res = await request(app).post('/authors').send({
      name: 'Prueba'
    });
    expect(res.statusCode).toBe(400);
  });
});