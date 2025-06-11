const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user');
// jest.setTimeout(60000);


let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Routes', () => {

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'TestUser',
          email: 'test@example.com',
          password: 'Test1234'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User registered');
      expect(res.body.data.user).toHaveProperty('_id');
      expect(res.body.data.user).toHaveProperty('email', 'test@example.com');
    });

    it('should not allow duplicate email', async () => {
      await User.create({
        username: 'ExistingUser',
        email: 'test@example.com',
        password: 'hashedpassword'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'TestUser2',
          email: 'test@example.com',
          password: 'Test1234'
        });

      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /auth/login', () => {
    it('should login successfully', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'TestUser',
          email: 'test@example.com',
          password: 'Test1234'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test1234'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Login successful');
      expect(res.body.data.user).toHaveProperty('id');
      expect(res.body.data.user).toHaveProperty('email', 'test@example.com');
    });

    it('should fail with wrong password', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'TestUser',
          email: 'test@example.com',
          password: 'Test1234'
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

});
