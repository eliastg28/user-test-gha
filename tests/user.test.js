const request = require('supertest');
const app = require('../src/apptest');
const pool = require('../src/models/db');

describe('API Users', () => {
  let userId;

  it('Debe crear un nuevo usuario', async () => {
    const newUser = {
      name: 'Test Name',
      email: 'test@test.com',
      password: 'testpassword',
      roles: 'user'
    };
  
    const response = await request(app).post('/api/users').send(newUser);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('userId');
  
    userId = response.body.userId;
  });
  
  it('Debe obtener la lista de usuarios', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Debe actualizar el usuario creado', async () => {
    const updatedUser = {
      name: 'Updated Name',
      email: 'updated@test.com',
      password: 'newpassword',
      roles: 'admin'
    };

    const response = await request(app).put(`/api/users/${userId}`).send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  it('Debe eliminar el usuario creado', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted');
  });

  afterAll(async () => {
    await pool.end();
  });
});
