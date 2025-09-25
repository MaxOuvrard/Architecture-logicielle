import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import * as userService from '../services/userService';
import * as userController from './userController';

jest.mock('../services/userService');

const app = express();
app.use(bodyParser.json());
app.post('/users', userController.create);
app.get('/users', userController.list);
app.get('/users/:id', userController.get);
app.put('/users/:id', userController.update);
app.delete('/users/:id', userController.remove);

const mockUser = {
  id: 1,
  username: 'john',
  email: 'john@example.com',
  password: 'secret',
};

describe('userController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    it('should create a user', async () => {
      (userService.create as jest.Mock).mockResolvedValue(mockUser);
      const res = await request(app).post('/users').send(mockUser);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      });
      expect(userService.create).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors', async () => {
      (userService.create as jest.Mock).mockRejectedValue(new Error('fail'));
      const res = await request(app).post('/users').send(mockUser);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', 'fail');
    });
  });

  describe('GET /users', () => {
    it('should list users', async () => {
      (userService.list as jest.Mock).mockResolvedValue([mockUser]);
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toMatchObject({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      });
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by id', async () => {
      (userService.get as jest.Mock).mockResolvedValue(mockUser);
      const res = await request(app).get('/users/1');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      });
    });

    it('should return 404 if user not found', async () => {
      (userService.get as jest.Mock).mockResolvedValue(null);
      const res = await request(app).get('/users/999');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'User not found');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user', async () => {
      (userService.update as jest.Mock).mockResolvedValue(mockUser);
      const res = await request(app).put('/users/1').send(mockUser);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      });
    });

    it('should return 404 if user not found', async () => {
      (userService.update as jest.Mock).mockResolvedValue(null);
      const res = await request(app).put('/users/999').send(mockUser);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'User not found');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      (userService.remove as jest.Mock).mockResolvedValue(mockUser);
      const res = await request(app).delete('/users/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ deleted: true });
    });

    it('should return 404 if user not found', async () => {
      (userService.remove as jest.Mock).mockResolvedValue(null);
      const res = await request(app).delete('/users/999');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'User not found');
    });
  });
});
