const { nanoid } = require('nanoid');
const Link = require('../app/database/models/link');
const { connectDB } = require('../app/db');

describe('Model: Link', () => {
  test('create new Link', async () => {
    const sql = await connectDB(process.env.DB_URI_TEST); 
    const links = [{linkId: nanoid()}, {linkId: nanoid()}, {linkId: nanoid()}];

    const linkModel = Link(sql);

    for (const link of links) {
      const result = await linkModel.create(link);
      expect(result).toBeInstanceOf(linkModel);
      await result.destroy();
    }
  })
});
