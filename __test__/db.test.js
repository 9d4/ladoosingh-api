const { ConnectionError } = require('sequelize');
const { connectDB } = require('../app/db');

describe('Database', () => {
  test('connect database', async () => {
    const sql = await connectDB('postgres://postgres:ladoosingh@localhost:5432/postgres');
    expect(sql).toBeDefined();
  });

  test('connect database with an auth error', async() => {
    try {
      await connectDB("postgres://postgres:postgres@localhost:5432/postgres");
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectionError);
    }
  });
});
